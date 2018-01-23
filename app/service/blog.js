'use strict';

const Service = require('egg').Service;
module.exports = () => {
  class BlogService extends Service {
    async create() {
      const body = this.ctx.request.body;
      const blog = new this.ctx.model.Blog(body);
      blog.author_user = this.ctx.user._id;
      blog._id = this.ctx.toObjectID();
      const result = await blog.save();
      return result;
    }
    async list() {
      console.log(this.ctx.query);
      const page = parseInt(this.ctx.query.page || 1);
      const size = parseInt(this.ctx.query.per_page || 20);
      const skip = (page - 1) * size;
      const cond = {};
      const blogs = await this.ctx.model.Blog.find(cond).skip(skip).limit(size);
      const _count = await this.ctx.model.Blog.count({});
      const result = {
        data: blogs,
        count: _count,
        total_page: Math.ceil(_count / size),
      };
      result.page = page;
      return result;
    }
  }
  return BlogService;
};

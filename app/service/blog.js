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
      const skip = parseInt(this.ctx.query.start || 0);
      const size = parseInt(this.ctx.query.length || 10);
      const cond = {};
      const blogs = await this.ctx.model.Blog.find(cond).skip(skip).limit(size);
      return blogs;
    }
  }
  return BlogService;
};

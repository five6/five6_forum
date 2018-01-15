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
  }
  return BlogService;
};

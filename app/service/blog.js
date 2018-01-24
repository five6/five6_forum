'use strict';
const _ = require('lodash');
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
      // blogs
      let blogs = await this.ctx.model.Blog.find(cond).skip(skip).limit(size).
        lean();
      const _count = await this.ctx.model.Blog.count({});
      // blog's replies
      const blogIds = [];
      const replyObj = {};
      _.each(blogs, blog => {
        blogIds.push(blog._id + '');
      });
      const replies = await this.ctx.model.BlogReply.find({
        blogId: { $in: blogIds },
      }).lean();

      _.chain(replies).groupBy(b => {
        return b.blogId;
      }).each((array, b) => {
        replyObj[b] = array;
      })
        .value();
      blogs = _.map(blogs, blog => {
        blog.replies = replyObj[blog._id + ''];
        return blog;
      });
      const result = {
        data: blogs,
        count: _count,
        total_page: Math.ceil(_count / size),
      };
      result.page = page;
      return result;
    }
    async reply() {
      let blogId = this.ctx.params._id;
      const body = this.ctx.request.body;
      body.blogId = blogId;
      const reply = new this.ctx.model.BlogReply(body);
      reply._id = this.ctx.toObjectID();
      reply.author_id = this.ctx.user._id;
      blogId = this.ctx.toObjectID(blogId);
      await Promise.all([
        reply.save(),
        this.ctx.model.Blog.updateOne({ _id: blogId }, { $inc: { reply_count: 1 } }),
      ]);
      return await reply.save();
    }
  }
  return BlogService;
};

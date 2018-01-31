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
      const self = this;
      const page = parseInt(this.ctx.query.page || 1);
      const size = parseInt(this.ctx.query.per_page || 20);
      const skip = (page - 1) * size;
      const userIds = [];
      const cond = {};
      // blogs
      let blogs = await this.ctx.model.Blog.find(cond).skip(skip).limit(size).
        lean();
      const _count = await this.ctx.model.Blog.count({});

      // 修改view count
      const viewArray = [];
      _.each(blogs, blog => {
        userIds.push(blog.author_user);
        viewArray.push(self.ctx.model.Blog.updateOne({ _id: self.ctx.toObjectID(blog._id) }, { $inc: { visit_count: 1 } }));
      });
      await Promise.all(viewArray);
      const user_list = await this.ctx.model.User.find({ _id: { $in: userIds } }).lean();
      const user_obj = {};
      _.each(user_list, user => {
        user_obj[user._id] = user.avatar;
      });
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
        userIds.push(b.author_user);
        return b.blogId;
      }).each((array, b) => {
        replyObj[b] = array;
      })
        .value();
      blogs = _.map(blogs, blog => {
        blog.avatar = user_obj[blog.author_user];
        blog.replies = _.map(replyObj[blog._id + ''], reply => {
          reply.avatar = user_obj[blog.author_user];
          return reply;
        });
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
      reply.author_user = this.ctx.user._id;
      blogId = this.ctx.toObjectID(blogId);
      await Promise.all([
        reply.save(),
        this.ctx.model.Blog.updateOne({ _id: blogId }, { $set: { last_reply: reply.author_id, last_reply_at: new Date() }, $inc: { reply_count: 1 } }),
      ]);
      return await reply.save();
    }
    async star() {
      const replyId = this.ctx.params._id;
      const body = this.ctx.request.body;
      return await this.ctx.model.BlogReply.updateOne({ _id: this.ctx.toObjectID(replyId) }, { stars: body });
    }
    async one() {
      const blogId = this.ctx.params._id;
      const _id = this.ctx.toObjectID(blogId);
      const blog = await this.ctx.model.Blog.findOne({ _id: _id });
      return blog;
    }
    async blog_replies() {
      const blogId = this.ctx.params._id;
      const replies = await this.ctx.model.Reply.find({ blogId: blogId }).lean();
      return replies;
    }
  }
  return BlogService;
};

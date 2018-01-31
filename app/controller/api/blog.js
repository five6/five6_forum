'use strict';

const Controller = require('egg').Controller;

module.exports = () => {
  class BlogController extends Controller {
    async create(ctx) {
      const rule = {
        title: { required: true, type: 'string' },
        content: { required: true, type: 'string' },
      };
      const errors = this.ctx.validate(rule, this.ctx.request.body);
      if (errors) {
        this.ctx.body = { code: -1, message: '标题和内容必须' };
      } else {
        const result = await ctx.service.blog.create();
        ctx.body = {
          code: 0,
          data: result,
        };
      }
    }
    async delete(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async list(ctx) {
      const list = await ctx.service.blog.list();
      ctx.body = {
        code: 0,
        data: list,
      };
    }
    async edit(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async reply(ctx) {
      const reply = await ctx.service.blog.reply();
      ctx.body = {
        code: 0,
        data: reply,
        msg: '回复成功！',
      };
    }
    async star(ctx) {
      const star = await ctx.service.blog.star();
      ctx.body = {
        code: 0,
        data: star,
        msg: 'star成功！',
      };
    }
    async one(ctx) {
      const blog = await ctx.service.blog.one();
      ctx.body = {
        code: 0,
        data: blog,
        msg: '获取成功！',
      };
    }
    async blog_replies(ctx) {
      const replies = await ctx.service.blog.blog_replies();
      ctx.body = {
        code: 0,
        data: replies,
        msg: '获取成功！',
      };
    }
  }
  return BlogController;
};

'use strict';

const Controller = require('egg').Controller;

module.exports = () => {
  class ForumController extends Controller {
    async createForum(ctx) {
      const rule = {
        // category: { required: true, type: 'string' },
        title: { required: true, type: 'string' },
        description: { required: true, type: 'string' },
      };
      const errors = this.ctx.validate(rule, this.ctx.request.body);
      if (errors) {
        this.ctx.body = { code: -1, message: '请输入必填内容' };
      } else {
        const result = await ctx.service.forum.createForum(ctx);
        ctx.body = {
          code: 0,
          data: result,
        };
      }
    }
    async deleteForum(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async editForum(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async forumList(ctx) {
      const list = await ctx.service.forum.forumList();
      ctx.body = {
        code: 0,
        data: list,
      };
    }
    async oneForum(ctx) {
      const data = await ctx.service.forum.oneForum();
      ctx.body = {
        code: 0,
        forum: data,
      };
    }
    async createTopic(ctx) {
      const rule = {
        title: { required: true, type: 'string' },
        content: { required: true, type: 'string' },
      };
      const errors = this.ctx.validate(rule, this.ctx.request.body);
      if (errors) {
        this.ctx.body = { code: -1, message: '请输入必填内容' };
      } else {
        const result = await ctx.service.forum.createTopic(ctx);
        ctx.body = {
          code: 0,
          data: result,
        };
      }
    }
    async deleteTopic(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async editTopic(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async topicList(ctx) {
      const list = await ctx.service.forum.topicList();
      ctx.body = {
        code: 0,
        data: list,
      };
    }
    async oneTopic(ctx) {
      const data = await ctx.service.forum.oneTopic();
      ctx.body = {
        code: 0,
        topic: data,
      };
    }
    async createPost(ctx) {
      const data = await ctx.service.forum.createPost();
      ctx.body = {
        code: 0,
        data: data,
      };
    }
    async deletePost(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async postList(ctx) {
      const list = await ctx.service.forum.postList();
      ctx.body = {
        code: 0,
        data: list,
      };
    }
  }
  return ForumController;
};

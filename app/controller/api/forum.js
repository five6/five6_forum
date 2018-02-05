'use strict';

const Controller = require('egg').Controller;

module.exports = () => {
  class ForumController extends Controller {
    async createForum(ctx) {
      const rule = {
        category: { required: true, type: 'string' },
        title: { required: true, type: 'string' },
        description: { required: true, type: 'string' },
      };
      const errors = this.ctx.validate(rule, this.ctx.request.body);
      if (errors) {
        this.ctx.body = { code: -1, message: '请输入必填内容' };
      } else {
        const result = await ctx.service.topic.createForum(ctx);
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
      const result = await ctx.service.forum.forumList();
      ctx.body = {
        code: 0,
        data: result,
      };
    }
    async oneForum(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async createTopic(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
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
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async oneTopic(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async createPost(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async deletePost(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async postList(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
  }
  return ForumController;
};

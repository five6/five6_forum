'use strict';

const Controller = require('egg').Controller;

module.exports = () => {
  class BlogController extends Controller {
    async create(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async delete(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async list(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async edit(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
    async reply(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
  }
  return BlogController;
};

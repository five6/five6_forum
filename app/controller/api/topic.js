'use strict';

const Controller = require('egg').Controller;

module.exports = app => {
  class TopicController extends Controller {
    async create(ctx) {
      ctx.body = {
        code: 0,
        data: [],
      };
    }
  }
  return TopicController;
};

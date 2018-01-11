'use strict';

const Controller = require('egg').Controller;

module.exports = app => {
  class ReplyController extends Controller {
    async create(ctx) {
      ctx.body = {
        code: 0,
        msg: 'Ok',
      };
    }
  }
  return ReplyController;
};

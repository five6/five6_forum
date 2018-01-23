'use strict';

const Controller = require('egg').Controller;

class ForumController extends Controller {
  constructor(config) {
    super(config);
    this.ctx.prefixRouter = '/forum';
  }
  async index(ctx) {
    ctx.logger.info('访问论坛主页');
    await ctx.show('index');
  }
  async one(ctx) {
    ctx.logger.info('访问');
    await ctx.show('topics');
  }
}

module.exports = ForumController;

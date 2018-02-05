'use strict';

const Controller = require('egg').Controller;

class ForumController extends Controller {
  constructor(config) {
    super(config);
    this.ctx.prefixRouter = '/forum';
  }
  async forums(ctx) {
    ctx.logger.info('访问论坛主页');
    await ctx.show('forums');
  }
  async topics(ctx) {
    ctx.logger.info('访问topics');
    await ctx.show('topics');
  }
  async topic(ctx) {
    ctx.logger.info('访问topic');
    await ctx.show('posts');
  }
}

module.exports = ForumController;

'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(options) {
    super(options);
    this.ctx.prefixRouter = '';
  }
  async index(ctx) {
    ctx.logger.info('访问主页');
    await ctx.show('index');
  }
  async error500(ctx) {
    await ctx.show('/common/error500');
  }
}

module.exports = HomeController;

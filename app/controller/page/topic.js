'use strict';

const Controller = require('egg').Controller;

class TopicController extends Controller {
  constructor(options) {
    super(options);
    this.ctx.prefixRouter = '/topic';
  }
  async index(ctx) {
    ctx.logger.info('访问topic主页');
    await ctx.show('index');
  }
  async create(ctx) {
    await ctx.show('create');
  }
}

module.exports = TopicController;

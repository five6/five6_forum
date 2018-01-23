'use strict';

const Controller = require('egg').Controller;

class TopicController extends Controller {
  constructor(options) {
    super(options);
    this.ctx.prefixRouter = '/forum/topic';
  }
  async create(ctx) {
    await ctx.show('create');
  }
}

module.exports = TopicController;

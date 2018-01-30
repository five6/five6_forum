'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
  constructor(options) {
    super(options);
    this.ctx.prefixRouter = '/blog';
  }
  async index(ctx) {
    ctx.logger.info('访问blog主页');
    await ctx.show('index');
  }
  async create(ctx) {
    await ctx.show('create');
  }
  async detail(ctx) {
    ctx.state.blogId = ctx.params._id;
    await ctx.show('detail');
  }
}

module.exports = BlogController;

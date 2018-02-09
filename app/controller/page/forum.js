'use strict';

const Controller = require('egg').Controller;

class ForumController extends Controller {
  constructor(config) {
    super(config);
    this.ctx.prefixRouter = '/forum';
  }
  async forums(ctx) {
    await ctx.show('forums');
  }
  async topics(ctx) {
    ctx.state.forum_id = ctx.params._id;
    await ctx.show('topics');
  }
  async topic(ctx) {
    ctx.state.forum_id = ctx.params.forum_id;
    ctx.state.topic_id = ctx.params.topic_id;
    await ctx.show('posts');
  }
}

module.exports = ForumController;

'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(options) {
    super(options);
    this.ctx.prefixRouter = '/user';
  }
  async qq(ctx) {
    await ctx.show('signin');
  }
  async weixin(ctx) {
    await ctx.show('signin');
  }
  async signup(ctx) {
    await ctx.show('signup');
  }
  async signin(ctx) {
    await ctx.show('signin');
  }
  async profile(ctx) {
    await ctx.show('profile');
  }
}

module.exports = UserController;


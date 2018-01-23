'use strict';

const Controller = require('egg').Controller;

class ForumController extends Controller {
  async index() {
    this.ctx.body = [];
  }
}

module.exports = ForumController;

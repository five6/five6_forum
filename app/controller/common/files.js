'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
  async files(ctx) {
    ctx.body = await ctx.service.common.files.files();
  }
}

module.exports = FileController;

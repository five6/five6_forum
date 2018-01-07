'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
  async files(ctx) {
    console.log(ctx.request.body.fil);
    ctx.body = await ctx.service.common.files.files();
    // const rule = {
    // };
    // console.log(this.ctx.request.body);
    // const errors = this.ctx.validate(rule, this.ctx.request.body);
    // if (errors) {
    //   ctx.body = {
    //     code: -1,
    //     message: '文件不存在',
    //   };
    // } else {
    //   ctx.body = await ctx.service.common.files.files();
    // }
  }
}

module.exports = FileController;

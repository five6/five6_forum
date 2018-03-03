'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async qq() {
    console.log(this.ctx.request);
    this.ctx.body = {};
  }
  async signin() {
    const rule = {
      username: { required: true, type: 'string' },
      password: { required: true, type: 'string' },
    };
    const errors = this.ctx.validate(rule, this.ctx.request.body);
    if (errors) {
      this.ctx.body = { code: -1, message: '用输入名称和密码' };
    } else {
      const user = await this.ctx.service.user.signin();
      if (user) {
        const self = this;
        this.ctx.login(user, function () {
          self.ctx.redirect('/');
        });
      } else {
        this.ctx.redirect('/user/signin');
      }
    }
  }
  async signup() {
    const rule = {
      _id: { required: true, type: 'string' },
      nickname: { required: true, type: 'string' },
      email: { type: 'string' },
      password: { required: true, type: 'string' },
    };
    const errors = this.ctx.validate(rule, this.ctx.request.body);
    if (!errors) {
      const result = await this.ctx.service.user.signup();
      if (result) {
        this.ctx.redirect('/user/signin');
      } else {
        this.ctx.state.message = '注册失败';
        this.ctx.redirect('/user/signup');
      }
    } else {
      this.ctx.state.message = '注册失败';
      this.ctx.redirect('/user/signup');
    }
  }
  async signout() {
    this.ctx.logout();
    this.ctx.redirect('/user/signin');
  }
  async topic() {
    const result = await this.ctx.service.user.topic();
    this.ctx.body = {
      data: result.data, recordsTotal: result.count, recordsFiltered: result.count,
    };
  }
  async blog() {
    const blog = await this.ctx.service.user.blog();
    this.ctx.body = {
      code: 0,
      data: blog,
    };
  }
  async edit() {
    const result = await this.ctx.service.user.edit();
    this.ctx.body = {
      code: 0,
      data: result,
    };
  }
  async detail() {
    const result = await this.ctx.service.user.detail();
    this.ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = UserController;

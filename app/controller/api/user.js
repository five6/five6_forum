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
        this.ctx.login(user, function() {
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
    const topic = await this.ctx.service.user.topic();
    this.ctx.body = {
      code: 0,
      data: topic,
    };
  }
}

module.exports = UserController;

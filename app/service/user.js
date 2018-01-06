'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async signin() {
    const body = this.ctx.request.body;
    const user = await this.ctx.model.User.findOne({ $or: [{ _id: body.username }, { email: body.username }] });
    if (user) {
      const flag = user.authenticate(body.password);
      if (flag) {
        return user;
      }
      return flag;
    }
  }
  async signup() {
    const user = new this.ctx.model.User(this.ctx.request.body);
    user.registerTime = new Date();
    const salt = user.makeSalt();
    user.salt = salt;
    user.password = user.encryptPassword(user.password);
    let ret = null;
    try {
      ret = await user.save();
      ret = ret.toJSON();
      delete ret.password;
    } catch (e) {
      this.ctx.logger.error(e);
    }
    return ret;
  }
}

module.exports = UserService;

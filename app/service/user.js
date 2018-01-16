'use strict';
const Service = require('egg').Service;
const _ = require('lodash');
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
  async topic() {
    const skip = parseInt(this.ctx.query.start || 0);
    const size = parseInt(this.ctx.query.length || 10);
    const topics = await this.ctx.model.Topic.find({}).skip(skip).limit(size);
    const replyObj = {};
    const topicIds = _.map(topics, topic => {
      return topic._id + '';
    });
    const cond = {
      topic_id: topicIds,
    };
    const replies = await this.ctx.model.TopicReply.find(cond);
    _.chain(replies).groupBy(c => {
      return c.topic_id;
    }).each((array, c) => {
      replyObj[c] = array;
    })
      .value();
    _.each(topics, topic => {
      topic.replies = replyObj[topic._id];
    });
    return topics;
  }
}

module.exports = UserService;

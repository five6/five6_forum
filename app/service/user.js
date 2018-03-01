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
    const cond = {
      author_user: this.ctx.user._id,
    };
    const skip = parseInt(this.ctx.query.start || 0);
    const size = parseInt(this.ctx.query.length || 10);
    const topics = await this.ctx.model.Topic.find(cond).skip(skip).limit(size);
    const _count = await this.ctx.model.Topic.count(cond);
    const replyObj = {};
    const topicIds = _.map(topics, topic => {
      return topic._id + '';
    });
    const cond2 = {
      topic_id: topicIds,
    };
    const replies = await this.ctx.model.TopicReply.find(cond2);
    _.chain(replies).groupBy(c => {
      return c.topic_id;
    }).each((array, c) => {
      replyObj[c] = array;
    })
      .value();
    _.each(topics, topic => {
      topic.DT_RowId = topic._id;
      topic.replies = replyObj[topic._id];
    });
    return {
      data: topics,
      count: _count,
    };
  }
  async blog() {
    return [];
  }
  async edit() {
    const body = this.ctx.request.body;
    const user_id = this.ctx.user._id;
    delete body._id;
    console.log(body);
    await this.ctx.model.User.updateOne({ _id: user_id }, { $set: body });
    const user = await this.ctx.model.User.findOne({ _id: user_id }).lean();
    return _.pick(user, [ '_id', 'nickname', 'email', 'avatar', 'registerTime', 'lastLoginTime' ]);
  }
  async detail() {
    const user = await this.ctx.model.User.findOne({ _id: this.ctx.user._id }).lean();
    return _.pick(user, [ '_id', 'nickname', 'email', 'avatar', 'registerTime', 'lastLoginTime' ]);
  }
}

module.exports = UserService;

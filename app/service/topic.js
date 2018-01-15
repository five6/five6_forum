'use strict';

const Service = require('egg').Service;

module.exports = () => {
  class TopicService extends Service {
    async create() {
      const body = this.ctx.request.body;
      const topic = new this.ctx.model.Topic(body);
      topic.author_user = this.ctx.user._id;
      topic._id = this.ctx.toObjectID();
      const result = await topic.save();
      return result;
    }
  }
  return TopicService;
};

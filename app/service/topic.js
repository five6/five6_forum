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
    async list() {
      const skip = parseInt(this.ctx.query.start || 0);
      const size = parseInt(this.ctx.query.length || 10);
      const cond = {};
      const topics = await this.ctx.model.Topic.find(cond).skip(skip).limit(size).
        lean();
      return topics;
    }
  }
  return TopicService;
};

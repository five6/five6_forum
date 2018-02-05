'use strict';
const _ = require('lodash');
const Service = require('egg').Service;
module.exports = () => {
  class ForumService extends Service {
    async createForum() {
      const body = this.ctx.request.body;
      const forum = new this.ctx.model.Forum(body);
      forum.author_user = this.ctx.user._id;
      forum._id = this.ctx.toObjectID();
      forum.create_at = new Date();
      const result = await forum.save();
      return result;
    }
    async deleteForum() {
      const _id = this.ctx.params._id;
      await this.ctx.model.Forum.deleteOne({ _id: this.ctx.toObjectID(_id) });
      return await Promise.all([
        this.ctx.model.Forum.deleteOne({ _id: this.ctx.toObjectID(_id) }),
        this.ctx.model.ForumTopic.delete({ forum_id: _id }),
        this.ctx.model.ForumTopic.delete({ forum_id: _id }),
      ]);
    }
    async editForum() {
      return;
    }
    async forumList() {
      const page = parseInt(this.ctx.query.page || 1);
      const size = parseInt(this.ctx.query.per_page || 20);
      const skip = (page - 1) * size;
      const forumIds = [];
      const { forums, count } = await Promise.all([
        this.ctx.model.Forum.find({}).skip(skip).limit(size).
          lean(),
        this.ctx.model.Forum.count({}),
      ]);

      const { users, topic_count, post_count } = await Promise.all([
        this.ctx.model.Users.find({
          _id: {
            $in: _.map(forums, f => {
              return f.author_user;
            }),
          },
        }),
        this.ctx.model.ForumTopic.aggregateForumTopicCount(),
        this.ctx.model.ForumPost.aggregateForumPostCount(),
      ]);
      // todo
      const result = {
        data: forums,
        count: count,
        total_page: Math.ceil(count / size),
      };
      result.page = page;
      return result;
    }
    async oneForum() {
      return [];
    }
    async createTopic() {
      return [];
    }
    async editTopic() {
      return [];
    }
    async topicList() {
      return [];
    }
    async oneTopic() {
      return [];
    }
    async createPost() {
      return [];
    }
    async deletePost() {
      return [];
    }
    async postList() {
      return [];
    }
  }
  return ForumService;
};

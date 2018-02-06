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
      const fidObj = {};
      const ret = await Promise.all([
        this.ctx.model.Forum.find({}).skip(skip).limit(size).
          lean(),
        this.ctx.model.Forum.count({}),
      ]);
      const forums = ret[0];
      const count = ret[1];
      _.each(forums, f => {
        forumIds.push(f._id + '');
      });
      const aggregateResult = await Promise.all([
        this.ctx.model.ForumTopic.aggregate([
          { $match: { forum_id: { $in: forumIds } } }, {
            $group: {
              _id: {
                forum_id: '$forum_id',
              },
              count: { $sum: 1 },
            },
          },
        ]),
        this.ctx.model.ForumPost.aggregate([
          { $match: { forum_id: { $in: forumIds } } }, {
            $group: {
              _id: {
                forum_id: '$forum_id',
              },
              count: { $sum: 1 },
            },
          },
        ]),
      ]);
      console.log(aggregateResult);
      // todo
      _.each(forumIds, forum_id => {
        const topicResult = _.find(aggregateResult[0], r => {
          return r._id.forum_id === forum_id;
        });
        fidObj[forum_id] = {};
        if (topicResult) {
          fidObj[forum_id].topic_count = topicResult.count;
        }
        const postResult = _.find(aggregateResult[1], r => {
          return r._id.forum_id === forum_id;
        });
        if (postResult) {
          fidObj[forum_id].post_count = postResult.count;
        }
      });

      const result = {
        code: 0,
        data: _.map(forums, f => {
          f.post_count = fidObj[f._id + ''].post_count;
          f.topic_count = fidObj[f._id + ''].topic_count;
          return f;
        }),
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
      const forum_id = this.ctx.params._id;
      const body = this.ctx.request.body;
      const topic = new this.ctx.model.ForumTopic(body);
      topic.author_user = this.ctx.user._id;
      topic._id = this.ctx.toObjectID();
      topic.forum_id = forum_id;
      topic.create_at = new Date();
      const result = await topic.save();
      return result;
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

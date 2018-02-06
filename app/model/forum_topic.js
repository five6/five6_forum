'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const TopicSchema = new mongoose.Schema({
    _id: { type: Object },
    forum_id: { type: String },
    title: { type: String },
    content: { type: String },
    author_user: { type: String },
    top: { type: Boolean, default: false }, // 置顶
    good: { type: Boolean, default: false }, // 精华
    if_stop_post: { type: Boolean, default: false }, // 是否截止回帖
    visit_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
  });
  TopicSchema.index({ create_at: -1 });
  TopicSchema.index({ author_user: 1, create_at: -1 });

  return mongoose.model('ForumTopic', TopicSchema);
};

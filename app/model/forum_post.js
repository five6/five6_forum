'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const PostSchema = new mongoose.Schema({
    _id: { type: Object },
    content: { type: String },
    forum_id: { type: String },
    topic_id: { type: String },
    author_user: { type: String },
    post_id: { type: String, default: '' }, // 回复其他的回复
    author_id: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });
  PostSchema.methods = {
  };
  return mongoose.model('ForumPost', PostSchema);
};

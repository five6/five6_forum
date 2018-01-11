'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const TopicSchema = new mongoose.Schema({
    _id: { type: Object },
    author_user: { type: String },
    content: { typpe: String },
    top: { type: Boolean, default: false }, // 置顶
    good: { type: Boolean, default: false }, // 精华
    lock: { type: Boolean, default: false }, // 系统不显示
    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    last_reply: { type: String },
    last_reply_at: { type: Date, default: Date.now },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });
  TopicSchema.index({ create_at: -1 });
  TopicSchema.index({ top: -1, last_reply_at: -1 });
  TopicSchema.index({ author_user: 1, create_at: -1 });
  return mongoose.model('Topic', TopicSchema);
};

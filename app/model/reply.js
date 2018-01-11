'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ReplySchema = new mongoose.Schema({
    _id: { type: Object },
    content: { type: String },
    topic_id: { type: String },
    reply_id: { type: String, default: '' }, // 回复其他的回复
    author_id: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
  });
  return mongoose.model('Reply', ReplySchema);
};

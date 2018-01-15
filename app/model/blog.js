'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const BlogSchema = new mongoose.Schema({
    _id: { type: Object },
    author_user: { type: String },
    title: { type: String },
    content: { type: String },
    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    last_reply: { type: String, default: '' },
    last_reply_at: { type: Date, default: Date.now },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });
  BlogSchema.index({ create_at: -1 });
  BlogSchema.index({ top: -1, last_reply_at: -1 });
  BlogSchema.index({ author_user: 1, create_at: -1 });
  return mongoose.model('Blog', BlogSchema);
};

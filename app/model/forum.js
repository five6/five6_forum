'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ForumSchema = new mongoose.Schema({
    _id: { type: Object },
    category: { type: String },
    icon: { type: String, default: '' },
    title: { type: String },
    description: { type: String },
    author_user: { type: String },
    visit_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
  });
  ForumSchema.index({ create_at: -1 });
  ForumSchema.index({ author_user: 1, create_at: -1 });
  return mongoose.model('Forum', ForumSchema);
};

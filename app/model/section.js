'use strict';
// 论坛板块
module.exports = app => {
  const mongoose = app.mongoose;
  const SectionSchema = new mongoose.Schema({
    _id: { type: Object },
    administrator: { type: String },
    name: { type: String, default: 'share' },
    topic_count: { type: Number, default: 0 }, // 帖子数
    visit_count: { type: Number, default: 0 }, // 浏览数
    post_count: { type: Number, default: 0 }, // 回帖数
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });
  SectionSchema.index({ create_at: -1 });
  return mongoose.model('Section', SectionSchema);
};

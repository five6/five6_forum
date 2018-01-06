'use strict';

const crypto = require('crypto');
module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    _id: { type: String },
    nickname: { type: String },
    salt: { type: String, default: '' },
    authToken: { type: String, default: '' },
    email: { type: String, index: true, unique: true },
    password: { type: String },
    registerTime: { type: Date, default: new Date() },
    lastLoginTime: { type: Date },
  });
  UserSchema.methods = {
    authenticate(password) {
      return this.encryptPassword(password) === this.password;
    },
    makeSalt() {
      return Date.now();
    },
    encryptPassword(password) {
      if (!password) return '';
      try {
        return crypto
          .createHmac('sha1', this.salt)
          .update(password)
          .digest('hex');
      } catch (err) {
        return '';
      }
    },
  };
  return mongoose.model('User', UserSchema);
};

'use strict';
const mongoose = require('mongoose');
module.exports = {
  show(html) {
    this.prefixRouter = this.prefixRouter || '';
    return this.render(this.prefixRouter + '/' + html);
  },
  toObjectID(_id) {
    if (_id) return new mongoose.Types.ObjectId(_id);
    return new mongoose.Types.ObjectId();
  },
};

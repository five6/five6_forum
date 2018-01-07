'use strict';
const crypto = require('crypto');
module.exports = {
  md5(content) {
    const md5 = crypto.createHash('sha1');
    return md5.update(content).digest('hex');
  },
};

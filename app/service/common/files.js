'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const size = require('image-size');
const sendToWormhole = require('stream-wormhole');
const toArray = require('stream-to-array');
module.exports = app => {
  class FileService extends Service {
    async files() {
      const stream = await this.ctx.getFileStream();
      let buf;
      try {
        const parts = await toArray(stream);
        buf = Buffer.concat(parts);
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      const filename = encodeURIComponent(stream.filename);
      const md5 = app.md5(filename + Date.now());
      const target = path.join(this.config.baseDir, 'app/public/files', md5);
      await fs.writeFile(target, buf);
      return md5;
    }
  }
  return FileService;
};

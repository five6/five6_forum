'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
module.exports = app => {
  class FileService extends Service {
    async files() {
      const stream = await this.ctx.getFileStream();
      const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
      const md5 = app.md5(filename + Date.now());
      const target = path.join(this.config.baseDir, 'app/public/files', md5);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      console.log(md5);
      // jquery-file-upload接受服务器端数据必须是json格式
      return { md5: md5 };
    }
  }
  return FileService;
};

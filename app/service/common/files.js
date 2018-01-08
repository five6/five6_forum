'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const sizeOf = require('sizeof');
const mime = require('mime-types');
const sendToWormhole = require('stream-wormhole');
const toArray = require('stream-to-array');
module.exports = app => {
  class FileService extends Service {
    async files(ctx) {
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
      console.log(stream);
      const md5 = app.md5(filename + Date.now());
      const target = path.join(this.config.baseDir, 'app/public/files', md5);
      await fs.writeFile(target, buf);
      const dimensions = sizeOf(stream);
      console.log(dimensions);
      const meta = {
        size: stream.fields.size,
        mime: stream.fields.mimetype,
        name: stream.fields.name,
        width: dimensions.width,
        height: dimensions.height,
      };
      meta._id = md5;
      const fileDoc = new ctx.model.files(meta);
      await fileDoc.save();
      return md5;
    }
  }
  return FileService;
};

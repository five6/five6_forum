'use strict';

const Service = require('egg').Service;
module.exports = () => {
  class ForumService extends Service {
    async index() {
      return [];
    }
  }
  return ForumService;
};

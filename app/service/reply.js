'use strict';

const Service = require('egg').Service;

module.exports = app => {
  class ReplyService extends Service {
    async create() {
      return [];
    }
  }
  return ReplyService;
};

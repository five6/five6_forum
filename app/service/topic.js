'use strict';

const Service = require('egg').Service;

module.exports = app => {
  class TopicService extends Service {
    async create() {
      return [];
    }
  }
  return TopicService;
};

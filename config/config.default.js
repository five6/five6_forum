'use strict';
const fs = require('fs');
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_2017_1213_1635';
  config.middleware = [
    'notfoundHander',
    // 'error',
  ];
  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1/five6',
    options: {},
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, '../', 'favicon.png')),
  };
  config.security = {
    domainWhiteList: [],
    csp: {
      enable: false,
    },
    csrf: {
      enable: false,
      useSession: false,
      ignoreJSON: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token',
      bodyName: '_csrf',
      queryName: '_csrf',
    },
  };
  config.multipart = {
    fileSize: '50mb',
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '1000kb',
    jsonLimit: '50000kb',
    strict: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
  };
  config.onerror = {
    html(err, ctx) {
      ctx.redirect('/error500');
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
  };
  return config;
};

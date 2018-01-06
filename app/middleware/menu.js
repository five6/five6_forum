'use strict';
const _ = require('lodash');

module.exports = () => {
  return function* (next) {
    const sidenav = [
      {
        link: '/', title: '主页',
      },
      {
        link: '/user/profile', title: '个人中心',
      },
      {
        link: '', title: '其他页面',
        submenu: [
          {
            link: '/error404', title: '404',
          },
          { link: '/error500', title: '500' },
        ],
      },
    ];
    this.state.$layouts = sidenav;
    this.state.user_name = this.user ? this.user._id : null;
    yield next;
  };
};

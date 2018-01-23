'use strict';
const _ = require('lodash');
const url = require('url');
module.exports = () => {
  return function* (next) {
    const sidenav = [
      {
        link: '/forum', title: '论坛',
      },
      {
        link: '/blog/index', title: '博客',
      },
      {
        link: null, title: '个人中心',
        submenu: [
          {
            link: '/user/profile', title: '我的主页',
          },
          {
            link: '/user/topic', title: '我的主题文章',
          },
          {
            link: '/user/blog', title: '我的博客',
          },
          {
            link: '/blog/create', title: '写博客',
          },
          {
            link: '/topic/create', title: '发帖子',
          },
        ],
      },
    ];
    const self = this;
    _.map(sidenav, side => {
      if (side.submenu) {
        _.each(side.submenu, child => {
          if (url.parse(self.req.url).pathname === child.link) {
            child.active = 'active';
            side.active = 'active';
          }
        });
      } else {
        if (url.parse(self.req.url).pathname === side.link) {
          side.active = 'active';
        }
      }
      return side;
    });
    this.state.$layouts = sidenav;
    this.state.user_name = this.user ? this.user._id : null;
    yield next;
  };
};

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const menu = middleware.menu();
  const api = middleware.api();
  const page = middleware.page();
  router.get('/', page, menu, controller.page.home.index);

  // **********用户 ***************
  // page
  router.get('/user/signin', controller.page.user.signin);
  router.get('/user/signup', controller.page.user.signup);


  router.get('/user/profile', page, menu, controller.page.user.profile);
  router.get('/user/topic', page, menu, controller.page.user.topic);
  router.get('/user/blog', page, menu, controller.page.user.blog);
  // api
  router.post('/user/signin', controller.api.user.signin);
  router.post('/user/signup', controller.api.user.signup);
  router.get('/user/signout', api, controller.api.user.signout);
  router.get('/api/v1/user/topic', api, controller.api.user.topic);
  router.get('/api/v1/user/blog', api, controller.api.user.blog);
  router.post('/user/signin/qq', controller.api.user.qq);
  router.get('/user/signin/qq', controller.api.user.qq);

  router.get('/error500', controller.page.home.error500);


  //  ******* blog ********
  // page
  router.get('/blog/create', page, menu, controller.page.blog.create);
  router.get('/blog/index', page, menu, controller.page.blog.index);
  // api
  router.post('/api/v1/blog', api, controller.api.blog.create);
  router.delete('/api/v1/blog/:_id', api, controller.api.blog.delete);
  router.put('/api/v1/blog/:_id', api, controller.api.blog.edit);
  router.get('/api/v1/blog', api, controller.api.blog.list);
  router.get('/api/v1/blog/:_id', api, controller.api.blog.one);
  router.post('/api/v1/blog/:_id/reply', api, controller.api.blog.reply);

  // ********************************* 论坛  ********************************
  // page
  router.get('/forum', page, menu, controller.page.forum.main.index);
  router.get('/forum/_id', page, menu, controller.page.forum.main.one);
  router.get('/topic/create', page, menu, controller.page.forum.topic.create);
  // api
  router.post('/api/v1/topic', api, controller.api.forum.topic.create);
  router.delete('/api/v1/topic/:_id', api, controller.api.forum.topic.delete);
  router.put('/api/v1/topic/:_id', api, controller.api.forum.topic.edit);
  router.get('/api/v1/topic/', api, controller.api.forum.topic.list);
  router.post('/api/v1/topic/:_id/reply', api, controller.api.forum.topic.reply);

  // 文件
  router.post('/api/v1/files', api, controller.common.files.files);
};

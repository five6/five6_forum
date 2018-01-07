'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const menu = middleware.menu();
  const api = middleware.api();
  // const api = middleware.api();
  router.get('/', api, menu, controller.page.home.index);
  router.get('/user/qq', controller.page.user.signin);
  router.get('/user/weixin', controller.page.user.signin);
  router.get('/user/signin', controller.page.user.signin);
  router.get('/user/signup', controller.page.user.signup);
  router.get('/user/profile', api, menu, controller.page.user.profile);
  router.post('/user/signin', controller.api.user.signin);
  router.post('/user/signup', controller.api.user.signup);
  router.get('/user/signout', api, controller.api.user.signout);
  router.get('/error500', controller.page.home.error500);

  router.post('/files', controller.common.files.files);
};

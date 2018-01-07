'use strict';
module.exports = () => {
  return async function(ctx, next) {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.app.emit('error', '未登录', this);
      const error = {
        message: '您尚未登录',
        status: 500,
        code: -1,
      };
      ctx.status = error.status;
      ctx.body = { error };
    }
  };
};

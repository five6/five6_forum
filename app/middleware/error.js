'use strict';
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.logger.error(err);
      await ctx.show('/common/error500');
    }
  };
};

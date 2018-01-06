'use strict';

module.exports = {
  show(html) {
    this.prefixRouter = this.prefixRouter || '';
    return this.render(this.prefixRouter + '/' + html);
  },
};

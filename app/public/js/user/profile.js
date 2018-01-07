'use strict';

new Vue({
  el: '#profile',
  data() {
    return {
    };
  },
});

$(function() {
  $('#id-docs-upload').fileupload({
    url: '/files',
    dataType: 'json',
    dropZone: null,
    pasteZone: null,
    start: () => {

    },
    done: () => {

    },
    fail: () => {

    },
    always: () => {
    },
    progress: () => {
    //   var progress = parseInt(data.loaded / data.total * 100, 10);
    //   $('#progress-bar').css('width', progress + '%').text(progress + '%');
    },
  });
});

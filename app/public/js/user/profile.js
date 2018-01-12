'use strict';

new Vue({
  el: '#profile',
  data() {
    return {
    };
  },
  methods: {
    upload() {
      $('#id_upload').click();
    },
  },
});

$(function () {
  $('#id_upload').fileupload({
    url: '/api/v1/files',
    dataType: 'json',
    dropZone: null,
    pasteZone: null,
    start(start) {
      console.log(start);
    },
    done(e, data) {
      const result = data.result[0];
      console.log(result);
    },
    fail(err) {
      console.log(err);
    },
    always: () => {
    },
    progress: () => {
      //   var progress = parseInt(data.loaded / data.total * 100, 10);
      //   $('#progress-bar').css('width', progress + '%').text(progress + '%');
    },
  });
});

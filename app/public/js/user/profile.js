'use strict';

var app = new Vue({
  el: '#profile',
  data() {
    return {
      user: {}
    };
  },
  mounte() {
    $.get('/', ret => {

    })
  },
  methods: {
    setAvatar(avatar) {
      $.ajax({
        type: 'put',
        url: '/user',
        data: JSON.stringify({avatar: avatar}),
        contentType: 'application/json',
        success: function () {
          toastr.success('头像上传成功！', '通知');
        },
        error: function (err, status) {
          console.log(err, status)
        }
      })
    },
    upload() {
      $('#id_upload').click();
    },
  },
});

$(function () {
  $('#id_upload').fileupload({
    url: '/api/v1/files',
    dataType: 'json',
    autoUpload: true,
    dropZone: null,
    pasteZone: null,
    maxNumberOfFiles: 1,//最大上传文件数目
    maxFileSize: 5000000, //文件最大为5MB
    start(start) {
      // console.log(start);
    },
    done(e, data) {
      const md5 = data.result ? data.result.md5 : '';
      app.setAvatar(md5);
    },
    fail(err) {
      console.log(err);
    },
    always: () => {
    },
    progress: (data) => {
      // var progress = parseInt(data.loaded / data.total * 100, 10);
      // if (progress === 100) {
      //   toastr.success('头像上传成功！', '通知');
      // }
      //   $('#progress-bar').css('width', progress + '%').text(progress + '%');
    },
  });
});

var app = new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            forumsUrl: '/api/v1/forum',
            forums: [],
            user_list: [],
            hovers: [],
            forum: {
                icon: '',
                author_user: '',
                title: '',
                description: '',
                category: '',
            }
        }
    },
    mounted() {
    },
    methods: {
        mouseover: function (_id) {
            this.hovers[_id] = true;
            this.$forceUpdate();
        },
        mouseout: function (_id) {
            delete this.hovers[_id];
            this.$forceUpdate();
        },
        setForumRid: function (item) {
            this.forum.rid = item._id;
            this.forum.rid_name = item.text;
        },
        selectForumIcon: function () {
            $('#forum_icon_preview').trigger('click');
        },
        setForumIcon(md5) {
            this.forum.icon = md5;
        },
        forbiddenSaveButton() {

        },
        btnSave: function ($event) {
            if (!this.forum.title || !this.forum.description) {
                toastr.warning('请输入板块标题和描述！', '创建失败');
                return false;
            }
            $('#id_modal_forum').modal('hide');
            this.saveToServer(function () {
                toastr.success('即将刷新页面！', '创建成功');
                setTimeout(function () {
                    window.location.href = '/forums'
                }, 3000)
            })
        },
        saveToServer: function (callback) {
            var self = this;
            this.forbiddenSaveButton();
            $.ajax({
                type: 'post',
                url: '/api/v1/forum',
                data: JSON.stringify(self.forum),
                contentType: 'application/json',
                success: function (ret) {
                    if (typeof callback === 'function') {
                        if (ret.code === 0) {
                            callback(ret._id);
                        }
                    }
                }
            })
        },
        renderData: function (data) {
            this.forums = data;
        },
        createForum: function () {
            $('#id_modal_forum').modal('show');
        },
    },
    filters: {
        formatTime: function (time) {
            return moment(time).fromNow();
        },
        formatImage(md5) {
            if (md5)
                return '/public/files/' + md5;
            return ''
        }
    }
})

$(function () {
    $('#forum_icon_preview').fileupload({
        url: '/api/v1/files',
        dataType: 'json',
        autoUpload: true,
        dropZone: null,
        pasteZone: null,
        maxNumberOfFiles: 1,
        maxFileSize: 5000000,
        start(start) {
        },
        done(e, data) {
            const md5 = data.result ? data.result.md5 : '';
            app.setForumIcon(md5);
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
})

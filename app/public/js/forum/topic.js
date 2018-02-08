new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            username: '',
            placeholder: '',
            forumsUrl: '/api/v1/forum/',
            threadsUrl: '/api/v1/forum/' + $forum_id + '/topic',
            user_list: [],
            threads: [],
            threadSize: 10,
            forum: {},
            thread: {
                _id: '',
                title: '',
                content: '',
                fid: '',
                created_by: '',
                created_at: ''
            },
            creatingThread: false,
            post: {
                fid: '',
                ftid: '',
                content: '',
                created_at: '',
                created_by: ''
            }
        }
    },
    mounted() {
        this.initParams();
        this.getForum();
    },
    methods: {
        createThread: function () {
            var self = this;
            this.thread.created_at = new Date();
            this.thread.created_by = this.username;
            this.thread.fid = this.forum_id;
            var html = $('#thread_summernote').summernote('code');
            this.thread.content = html;
            this.saveToServer(this.threadsUrl, this.thread, function (_id) {
                var thread = _.clone(self.thread);
                self.thread = {
                    _id: '',
                    title: '',
                    content: '',
                    fid: '',
                    created_by: '',
                    created_at: ''
                };
                thread._id = _id;
                self.threads.push(thread);
                $('#thread_summernote').summernote('reset')
                if (self.threads.length % self.threadSize === 0) {
                    window.location.reload();
                }
            });
        },
        renderData: function (data) {
            this.threads = data;
        },
        saveToServer: function (url, data, callback) {
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (ret) {
                    if (typeof callback === 'function') {
                        if (ret.code === 0) {
                            callback(ret._id);
                        }
                    } else {
                        window.location.href = '/forums'
                    }
                }
            })
        },
        getForum: function () {
            var self = this;
            $.get(this.forumsUrl + this.forum_id, function (result) {
                if (result.forum) {
                    self.forum = result.forum;
                }
            });
        },
        initParams: function () {
            this.forum_id = $forum_id;
            this.username = $user_name;
            // $('#thread_summernote').summernote({
            //     height: 150,
            //     placeholder: '在此输入内容',
            //     autoHeight: true,

            // });
        }
    },
    filters: {
        formatAvatar: function (avatar) {
            if (avatar) {
                return '/files/' + avatar;
            }
            return ''
        },
        formatTime: function (time) {
            if (time) {
                return moment(time).format('YYYY-MM-DD HH:mm:ss')
            }
            return ''
        }
    }
})
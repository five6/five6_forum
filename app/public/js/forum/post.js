new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data() {
        return {
            postSize: 10,
            forumUrl: '/api/v1/forum/' + $forum_id,
            topicUrl: '/api/v1/forum/' + $forum_id + '/topic/' + $topic_id,
            postsUrl: '/api/v1/forum/' + $forum_id + '/topic/' + $topic_id + '/post',
            forum: {},
            topic: {},
            posts: [],
            post: {}
        }
    },
    mounted() {
        this.initParams();
        this.getForum();
        this.getTopic();
    },
    methods: {
        saveToServer(content, callback) {
            var url = this.postsUrl;
            var self = this;
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify({
                    content: content
                }),
                contentType: 'application/json',
                success: function (ret) {
                    if (typeof callback === 'function') {
                        if (ret.code === 0) {
                            callback(ret.data._id);
                        }
                    } else {
                        window.location.href = self.topicUrl
                    }
                }
            })
        },
        createPost() {
            var self = this;
            var html = $('#post_summernote').summernote('code');
            this.saveToServer(html, function (_id) {
                self.posts.push({
                    _id: _id,
                    author_user: self.username,
                    content: html
                });
                if (self.posts.length % self.postSize === 0) {
                    window.location.reload();
                }
            })
        },
        renderData(data) {
            this.posts = data;
        },
        getForum() {
            var self = this;
            $.get(this.forumUrl, function (result) {
                if (result.forum) {
                    self.forum = result.forum;
                }
            });
        },
        getTopic() {
            var self = this;
            $.get(this.topicUrl, function (result) {
                if (result.topic) {
                    self.topic = result.topic;
                }
            });
        },
        initParams() {
            this.forum_id = $forum_id;
            this.username = $user_name;
            this.topic_id = $topic_id;
            $('#post_summernote').summernote({
                lang: 'zh-CN',
                height: 150,
                placeholder: '在此输入内容',
                autoHeight: true
            });
        }
    },
    filters: {
        formatAvatar(avatar) {
            if (avatar) {
                return '/files/' + avatar;
            }
            return '/public/img/avatar/common.jpg'
        },
        formatTime(time) {
            if (time) {
                return moment(time).format('YYYY-MM-DD HH:mm:ss')
            }
            return ''
        },
        formatTimeNow(time) {
            return moment(time).fromNow();
        }
    },
    watch: {

    }
})
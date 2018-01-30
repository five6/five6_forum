new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blog: null,
            blogId: null,
            replyUrl: '/api/v1/blog/:_id/reply',
            reply: {
                content: '',
                replyId: '',
                blogId: '',
                author_id: '',
            }
        }
    },
    mounted() {
        var self = this;
        this.blogId = $blogId;
        $.get('/api/v1/blog/' + this.blogId, function (result) {
            self.blog = result.blog;
        })
    },
    methods: {
        
    },
    filters: {
        formatTime(time) {
            return moment(time).fromNow();
        },
        formatAvatar(avatar) {
            if (avatar) {
                return '/public/files/' + avatar;
            } else {
                return '/public/img/avatar.png'
            }
        }
    }
})
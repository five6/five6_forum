new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blogs: [],
            placeholders: [],
            showReply: [],
            selectedBlog: null,
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
    },
    methods: {
        blur(e, _id) {
            if (!e.target.innerText.length)
                this.placeholders[_id] = '写下你的评论...';
            this.$forceUpdate();
        },
        focus(_id) {
            this.placeholders[_id] = '';
            this.$forceUpdate();
        },
        hideReplyList(_id) {
            delete this.showReply[_id];
            this.$forceUpdate();
        },
        showReplyList(_id) {
            this.showReply[_id] = true;
            this.$forceUpdate();
        },
        replyBlog(blogId) {
            this.saveToServer(this.reply, this.replyUrl.replace(':_id', blogId));
        },
        renderData(data) {
            this.blogs = data;
            _.each(data, d => {
                this.placeholders[d._id] = '写下你的评论...'
            });
        }
    },
    saveToServer(data, url) {
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            contentType: 'application/json',
            success: function () {
                console.log('success');
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    filters: {
        formatTime: function (time) {
            return moment(time).fromNow();
        }
    }
})
new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blog: null,
            placeholders: [],
            showReply: [],
            focusing: null,
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
        blur(e) {
            if (!e.target.innerText.length)
                this.placeholder = '写下你的评论...';
            this.$forceUpdate();
        },
        focus(e) {
            this.placeholder = '';
            this.focusing = e.target;
            this.$forceUpdate();
        },
        hideReplyList(_id) {
            this.showReply = false;
            this.$forceUpdate();
        },
        showReplyList() {
            this.showReply = true;
            this.$forceUpdate();
        },
        replyBlog() {
            if (this.focusing) {
                this.reply.content = this.focusing.innerHTML;
                this.reply.blogId = this.blog._id;
                this.saveToServer(this.reply, this.replyUrl.replace(':_id', this.blog._id));
            }
        },
        rerenderReply(blogId, reply) {
            this.blog.reply_count++;
            this.blog.replies.push(reply);
            this.$forceUpdate();
        },
        saveToServer(data, url) {
            var self = this;
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (reply) {
                    self.rerenderReply(data.blogId, reply.data);
                    self.focusing.innerHTML = '';
                    console.log('success');
                },
                error: function (err) {
                    console.log(err);
                }
            })
        },
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
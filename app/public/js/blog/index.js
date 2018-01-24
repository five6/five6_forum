new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blogs: [],
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
        blur(e, _id) {
            if (!e.target.innerText.length)
                this.placeholders[_id] = '写下你的评论...';
            this.$forceUpdate();
        },
        focus(e, _id) {
            this.placeholders[_id] = '';
            this.focusing = e.target;
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
            if (this.focusing) {
                this.reply.content = this.focusing.innerHTML;
                this.reply.blogId = blogId;
                this.saveToServer(this.reply, this.replyUrl.replace(':_id', blogId));
            }
        },
        renderData(data) {
            this.blogs = data;
            _.each(data, d => {
                this.placeholders[d._id] = '写下你的评论...'
            });
        },
        rerenderReply(blogId, reply) {
            this.blogs = _.map(this.blogs, blog => {
                if (blog._id === blogId) {
                    blog.reply_count++;
                    blog.replies.push(reply);
                }
                return blog;
            })
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
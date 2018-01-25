new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blogs: [],
            hoverReply:[],
            placeholders: [],
            inputing: [],
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
        onMouseOver(_id){
            this.hoverReply[_id] = true;
            this.$forceUpdate();
        },
        onMouseOut(_id) {
            this.hoverReply[_id] = false;
            this.$forceUpdate();
        },
        blur(e, _id) {
            var self = this;
            if (!e.target.innerText.length)
                this.placeholders[_id] = '写下你的评论...';
            setTimeout(function () {
                self.inputing[_id] = false;
                self.$forceUpdate();
            }, 1000)
            this.$forceUpdate();
        },
        focus(e, _id) {
            this.placeholders[_id] = '';
            this.focusing = e.target;
            this.inputing[_id] = true;
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
                    if (!blog.replies)
                        blog.replies = [];
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
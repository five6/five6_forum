new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blog: null,
            blogId: null,
            hoverReply: [],
            activeCurrentReply: [],
            reply_placeholders: [],
            session_content: [],
            user_name: '',
            replies: [],
            replyUrl: '/api/v1/blog/:_id/reply',
            starUrl: '/api/v1/blog/reply/:_id/star',
            reply: {
                content: '',
                replyId: '',
                blogId: '',
                author_id: '',
            }
        }
    },
    mounted() {
        this.blogId = $blogId;
        this.user_name = $user_name;
        this.getBlog();
        this.getReplies();
    },
    methods: {
        starReply(reply) {
            var self = this;
            var stars = _.clone(reply.stars);
            var index = reply.stars.indexOf(this.user_name);
            if (index > -1) {
                stars.splice(index, 1);
            } else {
                stars.push(this.user_name);
            }
            $.ajax({
                type: 'post',
                url: this.starUrl.replace(':_id', reply._id),
                data: JSON.stringify(stars),
                contentType: 'application/json',
                success: function () {
                    reply.stars = stars;
                    self.$forceUpdate();
                    console.log('success');
                },
                error: function (err) {
                    console.log(err);
                }
            })
        },
        showSessionModal(reply) {
            var replyId = reply._id;
            this.session_content = [];
            this.recursionFindReplySession(this.replies, replyId);
            $('#id_modal_session').modal('show');
        },
        recursionFindReplySession(replies, replyId) {
            var find = _.find(replies, r => {
                return r._id === replyId;
            })
            if (find) {
                this.session_content.unshift(find);
                this.recursionFindReplySession(replies, find.replyId);
            }
            console.log(find);
        },
        reply_blur(e, reply) {
            if (!e.target.innerText.length)
                this.reply_placeholders[reply._id] = '回复' + reply.author_user;
            this.$forceUpdate();
        },
        reply_focus(e, _id) {
            this.reply_placeholders[_id] = '';
            this.$forceUpdate();
        },
        replingBlogReply(reply) {
            var self = this;
            this.reply.content = $(this.$refs[reply._id]).html();
            this.reply.blogId = this.blog._id;
            this.reply.replyId = reply._id;
            this.saveToServer(this.reply, this.replyUrl.replace(':_id', this.blog._id), function () {
                delete self.activeCurrentReply[reply._id];
                $(self.$refs[reply._id]).html('');
                self.reply = {
                    content: '',
                    replyId: '',
                    blogId: self.blog._id,
                    author_user: self.user_name,
                }
                self.$forceUpdate();
            });
        },
        cancelReply(_id) {
            delete this.activeCurrentReply[_id];
            this.$forceUpdate();
        },
        activeReply(reply) {
            this.activeCurrentReply[reply._id] = true;
            this.reply_placeholders[reply._id] = '回复' + reply.author_user;
            this.$forceUpdate();
        },
        onMouseOver(id) {
            this.hoverReply[id] = true;
            this.$forceUpdate();

        },
        onMouseOut(id) {
            delete this.hoverReply[id];
            this.$forceUpdate();
        },
        replyBlog() {
            var self = this;
            if (this.$refs.replyContent.innerText.length | $(this.$refs.replyContent).children().length) {
                this.reply.content = this.$refs.replyContent.innerHTML;
                this.reply.blogId = this.blog._id;
                this.saveToServer(this.reply, this.replyUrl.replace(':_id', this.blog._id), function () {
                    self.$refs.replyContent.innerHTML = '';
                    self.reply = {
                        content: '',
                        replyId: '',
                        blogId: self.blog._id,
                        author_user: self.user_name,
                    }
                });
            }
        },
        getBlog() {
            var self = this;
            $.get('/api/v1/blog/' + this.blogId, function (result) {
                self.blog = result.data;
            })
        },
        getReplies() {
            var self = this;
            $.get('/api/v1/blog/' + this.blogId + '/reply', function (result) {
                self.replies = result.data;
            })
        },
        rerenderReply(reply) {
            this.replies.push(reply)
            this.blog.reply_count++;
            this.$forceUpdate();
        },
        saveToServer(data, url, callback) {
            var self = this;
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (reply) {
                    self.rerenderReply(reply.data);
                    if (self.focusing) {
                        self.focusing.innerHTML = '';
                    }
                    if (self.$refs[data._id]) {
                        self.$refs[data._id].innerHTML = ''
                    }
                    if (typeof callback === 'function') {
                        callback();
                    }
                    console.log('success');
                },
                error: function (err) {
                    console.log(err);
                }
            })
        },
        formatIfMeOrAuthor(reply, flag) {
            var reply_for;
            var blog = this.blog;
            var replyId = reply.replyId;
            if (flag) {
                if (flag === this.user_name) {
                    return '（我）'
                } else if (flag === blog.author_user) {
                    return '（作者）';
                }
                return '';
            } else {
                reply_for = _.find(this.replies, r => {
                    return r._id === replyId;
                })
                if (reply_for) {
                    if (reply_for.author_user === this.user_name) {
                        return '（我）'
                    } else if (reply_for.author_user === blog.author_user) {
                        return '（作者）';
                    }
                    return '';
                }
            }
        },
        formatReplyId(blog, replyId) {
            var reply;
            if (blog) {
                reply = _.find(this.replies, r => {
                    return r._id === replyId;
                })
                return reply ? reply.author_user : '';
            } else {
                reply = _.find(this.session_content, r => {
                    return r._id === replyId;
                })
                return reply ? reply.author_user : '';
            }
        }
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
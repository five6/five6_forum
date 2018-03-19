new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            selected_blog: null,
            user_name: '',
            blogs: [],
            hoverReply: [],
            placeholders: [],
            reply_placeholders: [],
            inputing: [],
            showReply: [],
            noBlog: false,
            focusing: null,
            activeCurrentReply: [],
            replyUrl: '/api/v1/blog/:_id/reply',
            starUrl: '/api/v1/blog/reply/:_id/star',
            session_content: [],
            reply: {
                content: '',
                replyId: '',
                blogId: '',
                author_user: '',
            }
        }
    },
    mounted() {
        this.user_name = $user_name;
    },
    methods: {
        formatIfMeOrAuthor(blog, reply, flag) {
            var reply_for;
            var replyId = reply.replyId;
            blog = blog || this.selected_blog;
            if (blog) {
                if (flag) {
                    if (flag === this.user_name) {
                        return '（我）'
                    } else if (flag == blog.author_user) {
                        return '（作者）';
                    }
                    return '';
                } else {
                    reply_for = _.find(blog.replies, r => {
                        return r._id === replyId;
                    })
                    if (reply_for) {
                        if (reply_for.author_user === this.user_name) {
                            return '（我）'
                        } else if (reply_for.author_user == blog.author_user) {
                            return '（作者）';
                        }
                        return '';
                    }
                }
            } else {
                return '';
            }
        },
        formatReplyId(blog, replyId) {
            var reply;
            if (blog) {
                reply = _.find(blog.replies, r => {
                    return r._id === replyId;
                })
                return reply ? reply.author_user : '';
            } else {
                reply = _.find(this.session_content, r => {
                    return r._id === replyId;
                })
                return reply ? reply.author_user : '';
            }

        },
        showDetail(blog) {
            window.location.href = '/blogs/' + blog._id;
        },
        starReply(reply, flag) {
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
        showSessionModal(blog, reply) {
            var replyId = reply._id;
            this.selected_blog = blog;
            this.session_content = [];
            this.recursionFindReplySession(blog.replies, replyId);
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
        replingBlogReply(blog, reply) {
            var self = this;
            this.reply.content = $(this.$refs[reply._id]).html();
            this.reply.blogId = blog._id;
            this.reply.replyId = reply._id;
            this.saveToServer(this.reply, this.replyUrl.replace(':_id', blog._id), function () {
                delete self.activeCurrentReply[reply._id];
                $(self.$refs[reply._id]).html('');
                self.reply = {
                    content: '',
                    replyId: '',
                    blogId: '',
                    author_user: '',
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
        onMouseOver(_id) {
            if (!this.activeCurrentReply[_id]) {
                this.hoverReply[_id] = true;
                this.$forceUpdate();
            }

        },
        onMouseOut(_id) {
            this.hoverReply[_id] = false;
            this.$forceUpdate();
        },
        blur(e, _id) {
            if (!e.target.innerText.length)
                this.placeholders[_id] = '写下你的评论...';
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
            var self = this;
            if (this.focusing) {
                this.reply.content = this.focusing.innerHTML;
                this.reply.blogId = blogId;
                this.saveToServer(this.reply, this.replyUrl.replace(':_id', blogId), function () {
                    self.reply = {
                        content: '',
                        replyId: '',
                        blogId: '',
                        author_user: '',
                    }
                });
            }
        },
        renderData(data) {
            this.blogs = data;
            if (!this.blogs.length) {
                this.noBlog = true;
            }
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
        saveToServer(data, url, callback) {
            var self = this;
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (reply) {
                    self.rerenderReply(data.blogId, reply.data);
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
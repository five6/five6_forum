new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data() {
        return {
            postSize:10,
            forumUrl: '/api/v1/forum/' + $forum_id,
            topicUrl: '/api/v1/forum/' + $forum_id + '/topic/'+ $topic_id,
            postsUrl:'/api/v1/forum/' + $forum_id + '/topic/'+ $topic_id +'/posts',
            forum: {},
            topic: {},
            posts: [],
            post: {}
        }
    },
    mounted(){
        this.getForum();
        this.getTopic();
    },
    methods: {
        createPost() {

        },
        renderData() {

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
new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            topics: []
        }
    },
    mounted() {
    },
    methods: {
        createForum(){

        },
        showForumTopic(_id) {
            window.location.href = "/forum/" + _id
        }
    },
    filters: {
        formatTime: function (time) {
            return moment(time).fromNow();
        }
    }
})
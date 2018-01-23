new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blogs: []
        }
    },
    mounted() {
    },
    methods: {
        renderData(data) {
            this.blogs = data;
        }
    },
    filters: {
        formatTime: function (time) {
            return moment(time).fromNow();
        }
    }
})
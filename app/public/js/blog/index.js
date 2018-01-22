new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blogs: []
        }
    },
    mounted() {
        var self = this;
        $.get('/api/v1/blog', function (result) {
            if (result.data) {
                self.blogs = result.data;
            }
        })
    },
    filters: {
        formatTime: function(time) {
            return moment(time).fromNow();
        }
    }
})
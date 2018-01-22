new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            topics: []
        }
    },
    mounted() {
        var self = this;
        $.get('/api/v1/topic', function (result) {
            if (result.data) {
                self.topics = result.data;
            }
        })
    },
    filters: {
        formatTime: function(time) {
            return moment(time).fromNow();
        }
    }
})
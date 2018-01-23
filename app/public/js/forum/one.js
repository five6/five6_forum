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
    
    },
    filters: {
        formatTime: function (time) {
            return moment(time).fromNow();
        }
    }
})
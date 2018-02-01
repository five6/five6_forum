
new Vue({
    el: '#app',
    data() {
        return {
            blog: {
                title: '',
                content: '',
                create_at: '',
            }
        };
    },
    mounted() {
        $('.summernote').summernote({
            height: 200,
            autoHeight: true
        });
    },
    methods: {
        save() {
            var self = this;
            var date = new Date();
            var html = $('.summernote').summernote('code');
            this.blog.content = html;
            this.blog.create_at = date;
            this.blog.update_at = date
            $.ajax({
                type: 'post',
                url: '/api/v1/blog',
                data: JSON.stringify(self.blog),
                contentType: 'application/json',
                success: function (e) {
                    console.log(e);
                    location.href = '/blogs';
                },
                error: function () {
                }
            })
        },
    },
});

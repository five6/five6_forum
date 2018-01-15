
new Vue({
    el: '#app',
    data() {
        return {
            types:[
                {id:'share', content: '分享'},
                { id:'interlocution', content: '问答' },
                {id:'employ', content: '招聘'}
            ],
            topic: {
                type:'share',
                title: '',
                content: '',
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
            var html = $('.summernote').summernote('code');
            this.topic.content = html;
            this.topic.create_at = new Date();
            $.ajax({
                type: 'post',
                url: '/api/v1/topic',
                data: JSON.stringify(self.topic),
                contentType: 'application/json',
                success: function (ee) {
                    console.log(ee);
                    // location.href = '/user/topic';
                },
                error: function () {
                }
            })
        },
    },
});


new Vue({
    el: '#app',
    data() {
        return {
            sections:[],
            topic: {
                sectionId: -9999,
                title: '',
                section:'',
                content: '',
            }
        };
    },
    mounted() {
        $('.summernote').summernote({
            height: 200,
            placeholder:'请输入内容。。。',
            autoHeight: true
        });
        this.sections = [
            {
                id:'123',
                name: '娱乐八卦'
            },
            {
                id:'1234',
                name: '杂谈'
            },
            {
                id:'12345',
                name: '情感天地'
            }
        ]
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

new Vue({
    el: '#app',
    data() {
        return {
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            var columns = [
                { title: '标题', data: 'title', defaultContent: '' },
                {
                    title: '类型', data: (item) => {
                        const type = item.type;
                        if (type === 'share') {
                            return '分享'
                        }
                        else if (type === 'interlocution') {
                            return '问答'
                        }
                        else if (type === 'employ') {
                            return '招聘'
                        }
                    }
                },
                {
                    title: '', data: function (item) {
                        return '<a class="btn btn-xs text-navy class-detail-row">详情</a>' +
                            '<a class="btn btn-xs text-danger class-delete-row">删除</a>';

                    }
                }
            ];
            var url = '/api/v1/user/topic';
            $('#id_topics').DataTable({
                columns: columns,
                ajax: url,
                pageLength: 10,
                serverSide: true,
                ordering: false,
                searching: false,
                processing: true,
                info: false,
                bLengthChange: false,
                select: true,
                dom: "Bfrtip",
                buttons: [],
                autoWidth: true,
                language: {
                    sZeroRecords: '',
                    sEmptyTable: '',
                    paginate: {
                        previous: '上一页',
                        next: '下一页'
                    }
                },
                rowCallback: function (nRow, rowData) {
                    $(nRow).find('.class-detail-row').on('click', function () {
                        $('#id_modal').modal('show');
                    })
                },
                drawCallback: function (oSettings) {

                },
            });
        }
    },
});

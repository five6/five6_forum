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
                    title: '时间', data: function (item) {
                        return item.create_at
                    }, defaultContent: ''
                },
                {
                    title: '', data: function (item) {
                        return '<a class="btn btn-xs text-navy class-detail-row">详情</a>' +
                            '<a class="btn btn-xs text-danger class-delete-row">删除</a>';

                    }
                }
            ];
            var url = '/api/v1/user/blog';
            $('#id_blogs').DataTable({
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

$(function () {
    var columns = [
        { title: '标题', data: 'title', defaultContent: '' },
        { title: '内容', data: 'content', defaultContent: '' },
        {
            title: '分类', data: (item) => {
                const type = item.type;
                if (type === 'share') {
                    return '分类'
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
            title: '操作', data: function (item) {
                return '<a class="btn btn-xs text-navy class-edit-row"><i class="fa fa-edit"></i></a>'
            }
        }
    ];
    var url = '/api/v1/articles/stations';
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
            $(nRow).find('.class-edit-row').on('click', function () {
                if (!rowData.place)
                    rowData.place = {
                        input: ''
                    }
                self.station = rowData;

                self.edit = true;
            })
        },
        drawCallback: function (oSettings) {

        },
    });
})
/**
 * Created by descusr on 15/2/10.
 */

// postData 用于提交表单的json数据
var postData = {};

$(function () {

    /* 处理 tab 切换显示 */
    $('#status_tab a[href="#'+ location.pathname.replace(/\//g, '_') +'"]').tab('show');
    $('#status_tab a').click(function(e){
        location.href = e.currentTarget.hash.replace(/#/, '').replace(/_/g, '/');
    });

    /* 处理操作选择行 */
    $('ul .dropdown-menu li').click(function(e){
        postData.next_status = $(this).children('a').eq(0).attr('data-value');
        postData.obj_name = [];
        $('.warning').each(function(){
            postData.obj_name.push($(this).find('td').eq(2).text());
        });
    });

    // 过滤操作
    $('#filter-menu li').click(function(e){
        var self = $(this);
        $('#filter_name').text((self.text()));
        $('#filter-menu li[class="active"]').attr('class', '');
        self.attr('class', 'active');
        $('#filter-selector').val(self.children('a').attr('data-filter'));
    });


    // 处理页面上的单点操作，比如推荐，置顶，添加到rss等
    $('.admin_operation').click(function(){
        var self = $(this);

        // 属性data-admin的值必须是json格式
        postData = $.parseJSON(self.attr('data-admin'));
        postData.obj_name = [];
        postData.id = self.parents('tr').children('td').eq(0).children('input').val();
        postData.obj_name.push(self.parents('tr').children('td').eq(2).text());

    });

    $('#changelist-form').on('click', '.js-btn-submit', function() {
        var selfForm = $('#changelist-form');
        if ($('input[name=next_status]').length > 0 && $('input[name=next_status]').val() == 'add'){
            selfForm.submit();
            return false;
        }

        var data = Object.keys(postData).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
        }).join('&');

        $.ajax({
            type:'post',
            url:'',
            data:data+'&'+selfForm.serialize(),
            success:function(ret){
                location.reload();
            }
        });
    });

    $('#operation_dialog .btn-success').click(function(){
        var selfForm = $('#changelist-form');
        var data = Object.keys(postData).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
        }).join('&');


        $.ajax({
            type:'post',
            url:'',
            data:data+'&'+selfForm.serialize(),
            success:function(ret){
                location.reload();
            }
        });
    });


    // 提交所有表单操作
//    $('.modal-dialog .btn-success').click(function(){
//        var selfForm = $('#changelist-form');
//        var data = Object.keys(postData).map(function(k) {
//            return encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
//        }).join('&');
//
//
//        $.ajax({
//            type:'post',
//            url:'',
//            data:data+'&'+selfForm.serialize(),
//            success:function(ret){
//                if(ret.result == 0){
//                    location.reload();
//                }
//            }
//        });
//    });

});

function AddRow(){
    var vTb=$("#TbData");//得到表格ID=TbData的jquery对象
    //所有的数据行有一个.CaseRow的Class,得到数据行的大小
    var vNum=$("#TbData tr").size()+1;//表格有多少个数据行
    var vTr=$("#TbData .grid-item").eq(0); //得到表格中的第一行数据
    var vTrClone=vTr.clone(true);//创建第一行的副本对象vTrClone
    vTrClone.children('td').each(function(){
        if($(this).attr('class') !== 'action-checkbox' && $(this).children('input').eq(0).val() !== '_id'
            && $(this).children('input').eq(0).val() !== 'created_at' && $(this).children('input').eq(0).val() !== 'updated_at') {
            $(this).html('<input type="text" name="' + $(this).children('input').eq(0).val() + '">');
        }
    });
    vTrClone.children('td').eq(1).html(vNum-1);
    vTrClone.children('td').last().html('<a class="btn btn-default btn-xs js-btn-submit">提交</a><a class="btn btn-warning btn-xs ml5" onclick="$(this).parent().parent(\'tr\').remove();">撤销</a>');
    vTrClone.appendTo(vTb);//把副本单元格对象添加到表格下方
    vTrClone.append('<input type="hidden" name="next_status" value="add">');
    $('#changelist-form').attr('method', 'post');
}


function upload(obj, upload_name, save_name){
    var upload_file = $(obj)[0].files[0];
    var formData = new FormData();
    formData.append(upload_name, upload_file);

    $.ajax({
        type: 'post',
        url: '/admin/proxy/upload/',
        contentType: false,
        processData: false,
        data: formData,
        success: function(ret){
            $(obj).parent().html('<img src="'+ ret.key +'" width="50px"/>' +
                    '<input type="hidden" name="'+ save_name +'" value="'+ ret.key +'">'+$(obj)[0].outerHTML)
        }
    });
}

function addSubject(sid, aid){
    $.post('/lvpai/subject/list', function(ret){
        console.log();
    });
}

function addToSubject(albumId) {
    var dialogHtml = '<div id="id-albums" class="modal fade in" aria-hidden="false" style="display: block;">' +
        '<div class="modal-dialog"><div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" onclick="$(\'#id-albums\').remove()" aria-hidden="true">×</button>' +
        '<h4 class="modal-title">确认此操作</h4>' +
        '</div><div class="modal-body">添加到专题：';
    var dialogHtml2 = '</div><span id="hidden_input"></span>' +
        '<div class="modal-footer"><form action="/admin/subject/list" enctype="multipart/form-data" method="post">' +
        '<input type="hidden" name="aid" value="'+ albumId +'">' +
        '<input type="hidden" id="id-sid" name="sid" value="">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal" onclick="$(\'#id-albums\').remove()">取消</button>' +
        '<button type="submit" class="btn btn-success">确定</button></form></div></div></div></div>';
    var selectHtml = '<select id="id-subjects" onchange="$(\'#id-sid\').val($(this).val());">';
    selectHtml += '<option value="">---请选择---</option>';
    $.get('/admin/subject/list', function(ret){
        $.each(ret.data.list, function(i, item){
            selectHtml += '<option value="'+ item._id.$oid +'">'+ item.remarks +'</option>';
        });
        selectHtml += '</select>';
        dialogHtml = dialogHtml + selectHtml + dialogHtml2;
        $('#operation_dialog').after(dialogHtml);
    });
}

function addToCoupon(subjectId) {
    var dialogHtml = '<div id="id-albums" class="modal fade in" aria-hidden="false" style="display: block;">' +
        '<div class="modal-dialog"><div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" onclick="$(\'#id-albums\').remove()" aria-hidden="true">×</button>' +
        '<h4 class="modal-title">确认此操作</h4>' +
        '</div><div class="modal-body">添加到优惠活动：';
    var dialogHtml2 = '</div><span id="hidden_input"></span>' +
        '<div class="modal-footer"><form action="/admin/coupon/list" enctype="multipart/form-data" method="post">' +
        '<input type="hidden" name="aid" value="'+ subjectId +'">' +
        '<input type="hidden" id="id-sid" name="sid" value="">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal" onclick="$(\'#id-albums\').remove()">取消</button>' +
        '<button type="submit" class="btn btn-success">确定</button></form></div></div></div></div>';
    var selectHtml = '<select id="id-subjects" onchange="$(\'#id-sid\').val($(this).val());">';
    selectHtml += '<option value="">---请选择---</option>';
    $.get('/admin/coupon/list', function(ret){
        $.each(ret.data.list, function(i, item){
            selectHtml += '<option value="'+ item._id.$oid +'">'+ item.title_price +'</option>';
        });
        selectHtml += '</select>';
        dialogHtml = dialogHtml + selectHtml + dialogHtml2;
        $('#operation_dialog').after(dialogHtml);
    });
}
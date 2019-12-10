var srvData = {};

$(function () {
    $.getJSON("./static/data.json", function (data) {　 //each循环 使用$.each方法遍历返回的数据date
        srvData = data;
        $.each(data, function (key, item) {
           $("#service").append("<option value='"+key+"'>"+item.name+"</option>")
        })
    });

    $("#start").click(function (e) {
        var key = $("#service").val();
        var tps = $("#tps").val();
        var srv = JSON.stringify(srvData[key]);
        srv = JSON.parse(srv)
        srv.threads = tps;
        console.log(srv)
        $.ajax({
            url: "./api_post",
            type: "post",
            data: srv,
            dataType: "json",
            success: function (data) {
            },
        })
    })
});

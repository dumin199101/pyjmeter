/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var total_tps = 0;
$(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow");
});
$(document).ready(function () {
    $('.menu_button').click(function (e) {
        if ($('.menu_container').css('left') > "0") {
            $('.menu_container').css('left', "-50%");
            $('.menu_icon_open').toggleClass('transform_deactive');
            $('.menu_icon_close').toggleClass('transform_active');
            $('.menu_button').toggleClass('menu_button_active');
            $('.outfoucs').toggleClass('of_true');
        } else {
            $('.menu_container').css('left', "0%");
            $('.menu_icon_open').toggleClass('transform_deactive');
            $('.menu_icon_close').toggleClass('transform_active');
            $('.menu_button').toggleClass('menu_button_active');
            $('.outfoucs').toggleClass('of_true');
        }
    });
});

//example 1: check radio
$('.command_send_container').addClass('command_send_container_false');
$("input[type=radio]").change(function(){
    if($('.test_input:checked').val() <= 0){
        $('.command_send_container').addClass('command_send_container_false');
    }else{
        $('.command_send_container').removeClass('command_send_container_false');
    }
});


//Temp, for set
//TODO
function setTPS(number) {
    ws.send({tpye: 'TPS', role: 'Mobile', value: number});
    total_tps = total_tps + number; //for testing
}

//get string format TPS for fontend
//TODO
function getTPS(){
    if(total_tps === 0){
        return total_tps;
    }else if(total_tps > 0){
        return '+'+total_tps;
    }else{
        return '-'+total_tps;
    }
}

//Temp, for change target service
//TODO
function setService(target){
    $('.test_title').html(target);
    $('.menu_button').click();
}





document.body.addEventListener('touchmove', function(event) {
event.preventDefault();
}, false); 


$('.form_bt button').bind('touchstart',function(e){
    e.preventDefault();
    e.addClass('touchdown');
    alert(1);
});
$('.form_bt button').bind('touchend',function(e){
    e.preventDefault();
    e.removeClass('touchdown');
    alert(0);
});



//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:3001');

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('Mobile: open connection');
    ws.send({tpye: 'Notice', role: 'Mobile', value: 'Open connection'});
};

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('Mobile: close connection');
    ws.send({tpye: 'Notice', role: 'Mobile', value: 'Close connection'});
};

//接收 Server 發送的訊息
ws.onmessage = event => {
    event.
            console.log(event.tpye + ':' + event.role + ' ' + event.value);
};
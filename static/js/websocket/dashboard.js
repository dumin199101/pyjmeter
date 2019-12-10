/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:3000');

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('Dashboard: open connection');
    ws.send({tpye: 'Notice', role: 'Dashboard', value: 'Open connection'});
};

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('Dashboard: close connection');
    ws.send({tpye: 'Notice', role: 'Dashboard', value: 'Close connection'});
};

//接收 Server 發送的訊息
ws.onmessage = event => {
    console.log(event.tpye + ':' + event.role + ' ' + event.value);
    if(event.type === 'TPS'){
        alert();
        $('.TPS_content').text(event.value);
    }
};
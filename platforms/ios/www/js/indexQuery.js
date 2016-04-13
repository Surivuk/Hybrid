$(document).ready(function(){
	$("#d").text("AAAA");

    var socket = new WebSocket('ws://192.168.1.6:1337');
    socket.onopen = function () {
        socket.send('hello from the client');
    };
    socket.onmessage = function (message) {
        $("#content").text(message.data +'<br />');
    };
    
    socket.onerror = function (error) {
        console.log('WebSocket error: ' + error);
    };
    
});
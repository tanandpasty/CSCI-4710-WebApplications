$(document).ready(function() {
    
    const socket = io();
    socket = io.connect('http://127.0.0.1:5000/');

    socket.on('connect', function() {
        socket.send('Connected!');
    });

    socket.on('message', function(msg) {
        $("#messages").append('<li>'+msg+'</li>');
        console.log('Received message');
    });

    $('#sendbutton').on('click', function() {
        socket.send($('#myMessage').val());
        $('#myMessage').val('');
    });

});
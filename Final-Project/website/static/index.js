$(document).ready(function() {

    $('#howAreYouButton').click(function() {
        $("#homepage-reponse").html("I am sick...");
    })

    $('#whatIsYourRoleButton').click(function() {
        $("#homepage-reponse").html("I am Sick wizard_almight09 The Wizard");
    })

    $('#whatIsRoleChatButton').click(function() {
        $("#homepage-reponse").html("Role Chat is a place where people act like who they are not.");
    })

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
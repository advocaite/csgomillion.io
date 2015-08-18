var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var fs   = require('fs');

app.get('/', function(req, res){
    res.send('<pre>csgomillion.com</pre>');
});

io.on('connection', function(socket){

    console.log('Guet user connected');

    socket.on('disconnect', function() {
        console.log('Guest user disconnected');
    });

    socket.on('chat', function(user, message) {

        var data = {
            user : user,
            message : message
        };

        socket.emit('chat', data);
        //io.emit('chat', data);
        //socket.broadcast.emit('chat', data);


        //Broadcast a message to connected users when someone connects or disconnects
        //Add support for nicknames
        //    Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
        //    Add “{user} is typing” functionality
        //Show who’s online
        //Add private messaging
        //Share your improvements!

        console.log(user.PERSON_NAME + ' type on chat : ' + message);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
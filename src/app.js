var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var fs   = require('fs');

app.get('/', function(req, res){
    res.send('<pre>csgomillion.com</pre>');
});

io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat', function(user, message) {

        var data = {
            user : user,
            message : message
        };

        //socket.emit('chat', data);
        socket.broadcast.emit('chatSend', data);

        console.log('Chat Text FROM ' + user.PERSON_NAME + ' : ' + message);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
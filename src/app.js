var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var fs   = require('fs');

app.get('/', function(req, res){
    res.send('<pre>csgomillion.com</pre>');
});

io.on('connection', function(socket){

    var online = 0;
    var users = {};

    var round = {};

    // Increase users online.
    online++;
    io.emit('chat:online', online);

    console.log('Guet user connected');

    socket.on('disconnect', function() {
        // Decrease users online.
        online--;
        io.emit('chat:online', online);

        console.log('Guest user disconnected');
    });

    socket.on('chat:message', function(data) {
        socket.broadcast.emit('chat:message', data);
        console.log(data.user.PERSON_NAME + ' type on chat : ' + data.message.text);
    });

    socket.on('jackpot:round', function() {

        console.log(round);

        socket.broadcast.emit('jackpot:round', 1);


    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
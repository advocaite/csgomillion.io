var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var fs   = require('fs');

var online = 0;
var users  = {};

var jackpot = {

    hash     : null,
    players  : [],
    value    : 0.00,
    time     : 120,
    items    : [],
    finished : 0,

    pull : function() {
        return jackpot;
    },

    setHash : function(data) {

        this.hash = data;

        return this.hash;
    }

};

app.get('/', function(req, res){
    res.send('<pre>csgomillion.com</pre>');
});

io.on('connection', function(socket){

    console.log(jackpot.hash);

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

    socket.on('jackpot:search', function(data) {

        //console.log(data);

        if (jackpot.hash || jackpot.hash == data.HASH)
            return false;

        console.log("nao pode passar");
        jackpot.setHash(data.HASH);

        //console.log(jackpot);
        //console.log(teste);
        console.log("nao encontrou o jogo");

    });

    socket.on('jackpot:round', function() {

        console.log(round);

        socket.emit('jackpot:round', round);
        socket.emit('jackpot:round', 1);


    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
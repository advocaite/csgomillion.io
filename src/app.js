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
    time     : 10,
    items    : [],
    finished : 0,

    init : function(data) {

        this.setHash(data.HASH);

        console.log("Game Rodando:" + data.HASH);

        this.deposit();
    },

    deposit : function() {

        if (this.players.length == 0)
            this.countdown();

    },

    countdown : function() {

        var countdown = setInterval(function () {

            this.time--;

            if (this.time <= 0)
                clearInterval(countdown);

            console.log("Tempo na Mesa:" + this.time);

        }, 1000);

        return jackpot.time;
    },

    check : function(data) {

        if (this.hash || this.hash == data.HASH)
            return true;

        return false;
    },

    setHash : function(data) {
        return this.hash = data;
    }

};

app.get('/', function(req, res){
    res.send('<pre>csgomillion.com</pre>');
});

io.on('connection', function(socket){

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

        if (jackpot.check(data))
            return false;

        jackpot.init(data.HASH);
    });

    io.emit('jackpot:countdown', jackpot.time);

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
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
    running  : false,

    init : function(data) {

        jackpot.hash = data.HASH;

        console.log("Game Rodando:" + data.HASH);
        console.log("Game Tempo:" + jackpot.time);

        jackpot.running = true;

        jackpot.data();
    },

    data : function() {
        io.emit('jackpot:init', jackpot);
    },

    deposit : function(data) {

        console.log(data);

        for (var i = 0; i < data.length; i++) {
            io.emit('jackpot:deposit', data[i]);
            jackpot.items.push(data[i]);
        }

        console.log(jackpot.items);


//        io.emit('jackpot:deposit', data);

        //if ( ! jackpot.running)
        //    jackpot.start();

    },

    start : function() {

        io.emit('jackpot:start', 1);

        jackpot.runing = true;
        jackpot.countdown();

    },

    stop : function() {

        io.emit('jackpot:stop', 1);

        jackpot.runing = false;

    },

    reset : function (data) {

        console.log(data);

        console.log("Reseta o game");

    },

    countdown : function() {

        var countdown = setInterval(function () {

            jackpot.time--;
            io.emit('jackpot:countdown', jackpot.time);

            if (jackpot.time == 0) {
                jackpot.stop();
                clearInterval(countdown);
            }

            console.log("Game Tempo:" + jackpot.time);

        }, 1000);

        return jackpot.time;
    },

    check : function(data) {

        if (jackpot.hash || this.jackpot == data.HASH)
            return true;

        return false;
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
            return jackpot.data();

        return jackpot.init(data);
    });

    socket.on('jackpot:deposit', function(data) {
        jackpot.deposit(data);
    });

    socket.on('jackpot:reset', function() {
        jackpot.reset();
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
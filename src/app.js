var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var fs   = require('fs');

var online = 0;
var users  = {};

var jackpot = {

    hash     : null,
    players  : [],
    items    : [],
    value    : 0.00,
    time     : 10,
    finished : 0,
    running  : false,

    init : function(data) {

        console.log("INIT");
        console.log(data);

        jackpot.hash = data.HASH;

        if (data.items.length > 0)
            jackpot.items = data.items;


        if (data.players.length > 0)
            jackpot.players = data.players;

        jackpot.value   = data.VALUE;
        jackpot.running = true;

        console.log("Round HASH:" + data.HASH);
        console.log("Round TIME:" + jackpot.time);

        io.emit('jackpot:init', jackpot);
    },

    index : function() {

        console.log("INDEX");
        console.log(jackpot);

        io.emit('jackpot:init', jackpot);
    },

    update : function(data) {

        jackpot.players = data.players;
        jackpot.items   = data.items;
        jackpot.value   = data.VALUE;

        io.emit('jackpot:update', jackpot);
    },

    deposit : function(data) {

        for (var i = 0; i < data.length; i++) {
            jackpot.items.push(data[i]);
            io.emit('jackpot:deposit', data[i]);
        }
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
        console.log("Round RESET");
    },

    countdown : function() {

        var countdown = setInterval(function () {

            jackpot.time--;
            io.emit('jackpot:countdown', jackpot.time);

            if (jackpot.time == 0) {
                jackpot.stop();
                clearInterval(countdown);
            }

            console.log("Round TIME:" + jackpot.time);

        }, 1000);

        return jackpot.time;
    },

    check : function(data) {

        console.log(data);
        console.log(jackpot);
        
        if (this.jackpot.hash == data.HASH)
            return true;

        return false;
    }

};

app.get('/', function(req, res){
    res.send('<pre>csgomillion.com</pre>');
});

io.on('connection', function(socket){

    console.log('Guest user Connected.');

    online++;
    io.emit('chat:online', online);

    socket.on('disconnect', function() {

        online--;
        io.emit('chat:online', online);

        console.log('Guest user Disconnected.');
    });

    socket.on('chat:message', function(data) {
        socket.broadcast.emit('chat:message', data);
        console.log(data.user.PERSON_NAME + ' type on chat : ' + data.message.text);
    });

    socket.on('jackpot:search', function(data) {

        if (jackpot.check(data))
            return jackpot.index();

        return jackpot.init(data);
    });

    socket.on('jackpot:deposit', function(data) {
        jackpot.deposit(data);
    });

    socket.on('jackpot:update', function(data) {
        jackpot.update(data);
    });

    socket.on('jackpot:reset', function() {
        jackpot.reset();
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
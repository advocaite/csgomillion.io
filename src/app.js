var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var online = 0;

var roulette = {
    ease    : 0,
    million : 0,
    items   : []
};

var round = {
    hash: null,
    players: [],
    items: [],
    time: {
        seconds: 120,
        percentage: 0
    },
    value: 0.00,
    finished: 0,
    running: false
};

var jackpot = {

    init : function(data) {

        jackpot.hash = data.HASH;

        if (data.items && data.items.length > 0)
            jackpot.items = data.items;


        if (data.players && data.players.length > 0)
            jackpot.players = data.players;

        if (data.VALUE)
            jackpot.value = data.VALUE;

        jackpot.running = true;

        console.log("Round HASH: " + data.HASH);
        console.log("Round TIME: " + jackpot.time);

        io.emit('jackpot:init', jackpot);
    },

    index : function() {
        io.emit('jackpot:init', jackpot);
    },

    update : function(data) {

        console.log("Round UPDATE");

        jackpot.players = data.players;
        jackpot.items   = data.items;
        jackpot.value   = data.VALUE;

        io.emit('jackpot:update', jackpot);

        if (jackpot.players.length > 1 && jackpot.time === 10)
            jackpot.start();
    },

    deposit : function(data) {

        console.log("Round DEPOSIT ");

        if (jackpot.finished === 1)
            return false;

        for (var i = 0; i < data.length; i++) {
            jackpot.items.push(data[i]);
            io.emit('jackpot:deposit', data[i]);
        }

    },

    start : function() {

        console.log("Round START");

        io.emit('jackpot:start');
        jackpot.countdown();
    },

    stop : function() {

        console.log("Round STOP");

        jackpot.running  = false;
        jackpot.finished = 1;

        io.emit('jackpot:stop');

        //jackpot.process();
    },

    process : function() {

        console.log("Round PROCESS");

        io.emit('jackpot:process');
    },

    winner : function(data) {

        console.log("Round WINNER");

        io.emit('jackpot:winner', data);
    },

    reset : function (data) {

        console.log(data);
        console.log("Round RESET");
    },

    countdown : function() {

        var countdown = setInterval(function () {

            jackpot.time--;
            io.emit('jackpot:countdown', jackpot.time);

            if (jackpot.time <= 0) {
                jackpot.stop();
                clearInterval(countdown);
            }

            console.log("Round TIME: " + jackpot.time);

        }, 1000);

        return jackpot.time;
    },

    check : function(data) {

        if (jackpot.hash == data.HASH)
            return true;

        return false;
    }

};

app.get('/', function(req, res){
    res.send('<pre>csgomillion.com</pre>');
});

io.on('connection', function(socket){

    online++;
    io.emit('chat:online', online);

    socket.on('disconnect', function() {

        online--;
        io.emit('chat:online', online);
    });

    socket.on('chat:message', function(data) {
        socket.broadcast.emit('chat:message', data);
    });

    socket.on('jackpot:search', function(data) {

        console.log("User request SEARCH");

        console.log(data);

        var auth = jackpot.check(data);

        if (auth) {
            console.log("INDEX");
            jackpot.index();
            return false;
        }

        console.log("INIT");
        jackpot.init(data);

        return false;
    });

    socket.on('jackpot:deposit', function(data) {
        jackpot.deposit(data);
    });

    //socket.on('jackpot:winner', function(data) {
    //    jackpot.winner(data);
    //});

    socket.on('jackpot:update', function(data) {
        jackpot.update(data);
    });

    //socket.on('jackpot:reset', function() {
    //    jackpot.reset();
    //});

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
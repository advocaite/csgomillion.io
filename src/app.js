var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var requestify = require('requestify');

var users   = [];
var service = "jackpot";

/*jshint esnext: true */
const API = {
    HOST    : "http://api.csgomillion.com/",
    KEY     : "348caba53c1234487714035965ad49fb",
    VERSION : "v1",
    FORMAT  : "json"
};

var online = 0;

var roulette = {
    ease    : 0,
    million : 0,
    winner  : null,
    items   : []
};

var round = {
    hash    : null,
    players : [],
    items   : [],
    time    : {
        seconds    : 10,
        percentage : 0
    },
    value    : 0.00,
    finished : 0,
    running  : false
};

var jackpot = {

    init : function(data) {

        round.hash = data.HASH;

        if (data.items && data.items.length > 0)
            round.items = data.items;

        if (data.players && data.players.length > 0)
            round.players = data.players;

        if (data.VALUE)
            round.value = data.VALUE;

        round.running = true;

        console.log("Round HASH: " + round.hash);
        console.log("Round TIME: " + round.time.seconds);

        return jackpot.data();
    },

    data : function() {
        return round;
    },

    update : function(data) {

        console.log("Round UPDATE");

        round.players = data.players;
        round.items   = data.items;
        round.value   = data.VALUE;

        if (round.players.length > 1 && round.time.seconds === 10)
            jackpot.start();

        return jackpot.data();
    },

    start : function() {

        console.log("Round START");

        jackpot.countdown();
    },

    stop : function() {

        console.log("Round STOP");

        round.running  = false;
        round.finished = 1;

        io.emit('jackpot:stop');

        jackpot.process();
    },

    process : function() {

        console.log("Round PROCESS");

        requestify.request(API.HOST + service + "/process/" + API.FORMAT, {
            method: 'POST',
            body: {
                api_key : API.KEY,
                hash : round.hash
            },
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            dataType: 'json'
        }).then(function(response) {

            console.log(response);
            console.log(response.getBody());

            var data = response.getBody();

            roulette = {
                ease    : data.game.EASE,
                million : data.game.MILLION,
                winner  : data.game.WINNER,
                items   : data.game.ROULETTE
            };

            jackpot.winner(roulette);
        });

    },

    winner : function(data) {

        console.log("Round WINNER");

        io.emit('jackpot:winner', data);

        setTimeout(function(){
            jackpot.reset();
        }, 15000);

    },

    reset : function () {

        console.log("Round RESET");

        requestify.request(API.HOST + service + "/reset/" + API.FORMAT, {
            method: 'POST',
            body: {
                api_key : API.KEY,
                hash : round.hash
            },
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            dataType: 'json'
        }).then(function(response) {

            var data = response.getBody();

            roulette = {
                ease    : 0,
                million : 0,
                winner  : null,
                items   : []
            };

            round = {
                hash    : null,
                players : [],
                items   : [],
                time    : {
                    seconds    : 10,
                    percentage : 0
                },
                value    : 0.00,
                finished : 0,
                running  : false
            };

            jackpot.init(data.game);

            io.emit('jackpot:reset');
        });

    },

    countdown : function() {

        var countdown = setInterval(function () {

            round.time.seconds--;
            io.emit('jackpot:countdown', round.time.seconds);

            if (round.time.seconds <= 0) {
                jackpot.stop();
                clearInterval(countdown);
            }

            console.log("Round TIME: " + round.time.seconds);

        }, 1000);

        return round.time.seconds;
    },

    check : function(data) {

        if (round.hash == data.HASH)
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

    users.push(socket.id);

    socket.on('chat:message', function(data) {
        socket.broadcast.emit('chat:message', data);
    });

    socket.on('jackpot:search', function(data) {

        console.log("Round SEARCH");

        var auth = jackpot.check(data);

        if (auth) {
            console.log("Round INDEX");

            var response = jackpot.data();
            socket.emit('jackpot:load', response);

            return false;
        }

        console.log("Round INIT");

        var response = jackpot.init(data);
        socket.emit('jackpot:load', response);

        return false;
    });

    socket.on('jackpot:update', function(data) {
        jackpot.update(data);
        io.emit('jackpot:update', round);
    });

    socket.on('disconnect', function() {

        online--;
        io.emit('chat:online', online);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var requestify = require('requestify');

const STEAM = {
    HOST    : "http://api.steampowered.com/",
    KEY     : "8B9C69B3B52A52290F28758B8CD386F9",
    VERSION : "v1",
    FORMAT  : "json"
};

const BOTS = {
    1 : "76561198235986140" //CS:GO Million
};

// http://api.steampowered.com/IEconService/GetTradeOffers/v1/?key=3612D141DCBEB991AB08BBB9C11DA027&get_received_offers=1&historical_only=false

var bot = {

    getTradeOffers : function() {

        var service = "IEconService";
        var method  = "GetTradeOffers"

        requestify.request(STEAM.HOST + service + "/" + method + "/" + STEAM.VERSION, {
            method : 'GET',
            params : {
                key : STEAM.KEY,
                get_received_offers : 1
            },
            dataType: STEAM.FORMAT
        }).then(function(response) {

            console.log(response.getBody());

        });
    }

};

bot.getTradeOffers();
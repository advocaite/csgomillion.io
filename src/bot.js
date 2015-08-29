var app = require('express')();
var _   = require('underscore');

var Long       = require('long');
var moment     = require('moment');
var requestify = require('requestify');

const STEAM = {
    HOST      : "http://api.steampowered.com/",
    COMMUNITY : "https://steamcommunity.com/",
    KEY       : "8B9C69B3B52A52290F28758B8CD386F9",
    VERSION   : "v1",
    FORMAT    : "json"
};

const BOTS = {
    1 : "76561198235986140" //CS:GO Million
};

// http://api.steampowered.com/IEconService/GetTradeOffers/v1/?key=3612D141DCBEB991AB08BBB9C11DA027&get_received_offers=1&historical_only=false

//k_ETradeOfferStateInvalid	1	Invalid
//k_ETradeOfferStateActive	2	This trade offer has been sent, neither party has acted on it yet.
//    k_ETradeOfferStateAccepted	3	The trade offer was accepted by the recipient and items were exchanged.
//    k_ETradeOfferStateCountered	4	The recipient made a counter offer
//k_ETradeOfferStateExpired	5	The trade offer was not accepted before the expiration date
//k_ETradeOfferStateCanceled	6	The sender cancelled the offer
//k_ETradeOfferStateDeclined	7	The recipient declined the offer
//k_ETradeOfferStateInvalidItems	8	Some of the items in the offer are no longer available (indicated by the missing flag in the output)
//k_ETradeOfferStateEmailPending	9	The offer hasn't been sent yet and is awaiting email confirmation
//k_ETradeOfferStateEmailCanceled	10	The receiver cancelled the offer via email

var bot = {

    init : function () {

        console.log("Listando as Trades:");

        bot.getTradeOffers(function(err, data) {

            var trade = data;

            bot.getTradeOffer(trade, function(err, data){

                if (err === null)
                    trade.ITEMS.push(data);

                console.log(trade);
            });
        });
    },

    getTradeOffer : function(trade, callback) {

        var service = "IEconService";
        var method  = "GetTradeOffer"

        var promise = requestify.request(STEAM.HOST + service + "/" + method + "/" + STEAM.VERSION, {
            method : 'GET',
            params : {
                key : STEAM.KEY,
                tradeofferid : trade.TRADE_ID
            },
            dataType: STEAM.FORMAT
        });

        promise.then(function(response) {

            var data  = response.getBody().response;
            var items = [];

            for (var i in data.offer.items_to_receive) {

                var item = data.offer.items_to_receive[i];

                response = {
                    APP_ID      : item.appid,
                    CONTEXT_ID  : item.contextid,
                    ASSET_ID    : item.assetid,
                    CLASS_ID    : item.classid,
                    INSTANCE_ID : item.instanceid,
                    AMOUNT      : item.amount
                };

                var description = _.where(data.descriptions, { instanceid: item.instanceid })

                for (var d in description) {
                    response.NAME                = description[d].name;
                    response.MARKET_NAME         = description[d].market_name;
                    response.IMAGE               = description[d].icon_url_large;
                    response.TYPE                = description[d].type;
                    response.COMMODITY           = description[d].commodity;
                    response.TRADABLE            = description[d].tradable;
                    response.TRADABLE_RETRICTION = description[d].market_tradable_restriction;
                }

                if (response.TRADABLE === true)
                    items.push(response);
            }

            if (items.length > 0)
                callback(null, items);

        });

    },

    getTradeOffers : function (callback) {

        var service = "IEconService";
        var method  = "GetTradeOffers";

        var promise = requestify.request(STEAM.HOST + service + "/" + method + "/" + STEAM.VERSION, {
            method : 'GET',
            params : {
                key : STEAM.KEY,
                get_received_offers : 1
            },
            dataType: STEAM.FORMAT
        });

        promise.then(function(response) {

            var data = response.getBody().response;

            if ( ! data)
                callback("errou", null);

            for (var i in data.trade_offers_received) {

                var offer = data.trade_offers_received[i];

                // Offer expired
                if (moment().unix() > offer.expiration_time)
                    return false;

                // Offer invalid, status
                if (offer.trade_offer_state !== 2)
                    return false;

                // Offer invalid, only receive
                if (typeof offer.items_to_give !== "undefined" && offer.items_to_give.length > 0)
                    return false;

                var response = {
                    TRADE_ID   : offer.tradeofferid,
                    STEAM_ID64 : bot.toSteamId(offer.accountid_other),
                    MESSAGE    : offer.message,
                    ITEMS      : [],
                    EXPIRES    : offer.expiration_time,
                    STATE      : offer.trade_offer_state,
                    CREATED    : offer.time_created,
                    UPDATED    : offer.time_updated
                };

                callback(null, response)
            }

        });

    },

    toSteamId : function(accountId) {
        return new Long(parseInt(accountId, 10), 0x1100001).toString();
    },

    toAccountId : function(steamId) {
        return Long.fromString(steamId).toInt().toString();
    }
};

bot.init();
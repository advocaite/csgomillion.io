$("body").on("click", "a.chatButton", function() {
    chatFunction();
});

if ($.cookie('disable_chat') == 'true') {
    chatFunction();
}

function chatFunction() {
    if ($(".page-chat").is(":visible")) {
        $(".chatButton i").removeClass("fa-arrow-circle-right").addClass("fa-arrow-circle-left");
        $(".page-chat").hide();
        $(".navbar-fixed-top").css("width", "100%");
        $("#footer").css("width", "100%");
        $(".page-container").css("width", "100%");
        $(".page-container div").first().removeClass("fixed-width");
        $(".navbar-fixed-top div").first().removeClass("fixed-width");
        $.cookie('disable_chat', 'true', {
            expires: 7,
            path: '/'
        });
    } else {
        $(".chatButton i").removeClass("fa-arrow-circle-left").addClass("fa-arrow-circle-right");
        $(".page-chat").show();
        $(".navbar-fixed-top").css("width", "calc(100% - 400px)");
        $("#footer").css("width", "calc(100% - 400px)");
        $(".page-container").css("width", "calc(100% - 400px)");
        $(".page-container div").first().addClass("fixed-width");
        $(".navbar-fixed-top div").first().addClass("fixed-width");
        $.cookie('disable_chat', 'false', {
            expires: 7,
            path: '/'
        });
    }
}

function fbPopup() {
    var myWindow = window.open("https://www.facebook.com/v2.3/plugins/page.php?adapt_container_width=true&app_id=113869198637480&channel=https%3A%2F%2Fs-static.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F1ldYU13brY_.js%3Fversion%3D41%23cb%3Df2531f4fb4%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff3919361c8%26relation%3Dparent.parent&container_width=588&height=500&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FCSGORiver%2F1440525922920453&locale=en_US&sdk=joey&show_facepile=true&show_posts=true&small_header=false&width=500", "", "width=500, height=500");
}

function twPopup() {
    var myWindow = window.open("https://twitter.com/intent/follow?original_referer=http%3A%2F%2FCSGORiver.com%2F&screen_name=csgo_river&tw_p=followbutton", "", "width=550, height=520");
}

function parseName(name) {
    var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
    if (base64Matcher.test(name)) {
        name = Base64.decode(name);
    }
    return name;
}

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

var steam_id = '00000000000000000',
    steam_bg = 'valonia was here';

var socket = io('http://89.163.144.87:3000/');
var isrunning_low = false;
var items_low = 0;
var isrunning_high = false;
var items_high = 0;
var highid = 0;
var lowid = 0;
var cached_profile = Date.now();
var muted_low = $.cookie('muted_low');
var muted_high = $.cookie('muted_high');
var current_page = "none";
var tableText = "Low";
$(function() {
    $("body").on("click", "button#inventoryRefresh", function() {
        $(".inventory-overlay").hide();
        $("#player-inventory .panel-body").html('<div style="text-align: center;width:100%;font-size: 64px;"><i class="fa fa-circle-o-notch fa-spin"></i></div>');
        $.get("http://89.163.144.87/index_inv.php?table=" + tableText + "&id=" + steam_id, function(data) {
            $("#player-inventory .panel-body").html(data);
            $('#player-inventory-click').jScrollPane();
            $('#deposit-text').html(tableText)
        }).fail(function() {
            $("#player-inventory .panel-body").html('<i class="fa fa-exclamation-triangle"></i>')
        })
    });
    $("body").on("click", "button#inventoryClose", function() {
        $(".inventory-overlay").hide();
        $("#player-inventory").hide()
    });
    $("body").on("click", "#player-inventory-click li", function() {
        if ($(this).hasClass("inventory-active")) {
            $(this).removeClass("inventory-active")
        } else {
            $(this).addClass("inventory-active")
        }
        calculatePrices()
    });
    $("body").on("click", "div#deposit", function() {
        $(".inventory-overlay").hide();
        $("#player-inventory").show();
        $("#player-inventory .panel-body").html('<div style="text-align: center;width:100%;font-size: 64px;"><i class="fa fa-circle-o-notch fa-spin"></i></div>');
        tableText = $(this).data("deposit");
        $.get("http://89.163.144.87/index_inv.php?table=" + tableText + "&id=" + steam_id, function(data) {
            $("#player-inventory .panel-body").html(data);
            $('#player-inventory-click').jScrollPane();
            $('#deposit-text').html(tableText)
        }).fail(function() {
            $("#player-inventory .panel-body").html('<i class="fa fa-exclamation-triangle"></i>')
        })
    });
    $("body").on("click", "#change-deposit > li", function(e) {
        $(".inventory-overlay").hide();
        $("#player-inventory .panel-body").html('<div style="text-align: center;width:100%;font-size: 64px;"><i class="fa fa-circle-o-notch fa-spin"></i></div>');
        tableText = $(this).data("deposit");
        $.get("http://89.163.144.87/index_inv.php?table=" + tableText + "&id=" + steam_id, function(data) {
            $("#player-inventory .panel-body").html(data);
            $('#player-inventory-click').jScrollPane();
            $('#deposit-text').html(tableText)
        }).fail(function() {
            $("#player-inventory .panel-body").html('<i class="fa fa-exclamation-triangle"></i>')
        });
        e.preventDefault()
    });
    $("body").on("click", "a#deposit-make", function(e) {
        $.get("http://" + document.location.host + "/dist/plugins/sendTrade.php?table=" + $("#deposit-text").html() + "&value=" + $("#deposit-value").html() + "&items= " + $(this).data("items"), function(data) {
            var data = JSON.parse(data);
            if (data.status == 'success') {
                $("#overlay-value").html(data.value);
                $("#overlay-table").html(data.table);
                $("#overlay-code").html(data.code);
                $("#overlay-message").html('<p>Please wait while we send a trade request.</p><div style="text-align: center;width:100%;font-size: 64px;"><i class="fa fa-circle-o-notch fa-spin"></i></div>');
                $(".inventory-overlay").show()
            } else {
                toastr['error'](data.message)
            }
        }).fail(function() {
            $("#player-inventory .panel-body").html('<i class="fa fa-exclamation-triangle"></i>')
        });
        e.preventDefault()
    });

    function calculatePrices() {
        var price = 0.0;
        var items = "";
        $("li").each(function() {
            if ($(this).hasClass("inventory-active")) {
                price += parseFloat($(this).data('price'));
                items += "," + $(this).data('id') + "_" + $(this).data('classid')
            }
        });
        $("#deposit-value").html(roundToTwo(price));
        $("#deposit-make").data("items", items.substring(1))
    }
    var tos_agree = $.cookie('tos_agree');
    if (tos_agree == undefined && steam_id != '00000000000000000') {
        $('#myTOS').modal('show')
    }
    $("#tos_continue").click(function() {
        if ($('#tos_agree').is(':checked')) {
            tos_agree = 'checked';
            $.cookie('tos_agree', 'checked', {
                expires: 365
            });
            location.reload()
        } else {
            alert("To continue, you must read and agree to our Terms of Service.")
        }
    });
    $("#raffle-close").click(function() {
        $(".raffle-overlay").fadeOut("slow")
    });
    $(".raffle-button").click(function() {
        $(".raffle-overlay").fadeIn("slow")
    });
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('body').on('submit', 'form#steamtradeurl', function() {
        $.post("dist/plugins/settings.php", $(this).serialize(), function(data) {
            if (data == 'true') {
                toastr['success']('Your settings was updated!');
                location.reload()
            } else {
                toastr['error'](data)
            }
        });
        event.preventDefault()
    });
    $(".dial").knob({
        'width': '100%',
        'min': 0,
        'max': 100
    });
    $('body').on('click', 'a#mute-low', function() {
        if (muted_low == 'true') {
            $.cookie('muted_low', 'false', {
                expires: 7,
                path: '/'
            });
            $(this).removeClass('label-danger').addClass('label-success')
        } else {
            $.cookie('muted_low', 'true', {
                expires: 7,
                path: '/'
            });
            $(this).removeClass('label-success').addClass('label-danger')
        }
        muted_low = $.cookie('muted_low')
    });
    $('body').on('click', 'a#mute-high', function() {
        if (muted_high == 'true') {
            $.cookie('muted_high', 'false', {
                expires: 7,
                path: '/'
            });
            $(this).removeClass('label-danger').addClass('label-success')
        } else {
            $.cookie('muted_high', 'true', {
                expires: 7,
                path: '/'
            });
            $(this).removeClass('label-success').addClass('label-danger')
        }
        muted_high = $.cookie('muted_high')
    });
    $('body').on('click', 'a#current-game', function() {
        $("#pb-notification").hide();
        $('#myProvablyFair').modal('show')
    });
    $('body').on('click', 'a#latest-game', function() {
        $("#pb-notification").hide();
        $("#pb-hash").val($(this).attr("data-fairmd5"));
        $("#pb-salt").val($(this).attr("data-fairsalt"));
        $("#pb-precentage").val($(this).attr("data-fairprecentage"));
        $("#pb-tickets").val($(this).attr("data-fairtickets"));
        $('#myProvablyFair').modal('show')
    });
    $('body').on('click', '#provably-fair .btn', function() {
        checkProvablyFair($("#pb-hash").val(), $("#pb-salt").val(), $("#pb-precentage").val(), $("#pb-tickets").val())
    });
    $("#reload-profile").click(function() {
        $("#modal-profile").html('<i class="fa fa-circle-o-notch fa-spin"></i>');
        $.get("dist/plugins/profile.php", function(data) {
            if (data == 'false') {
                $("#modal-profile").html('You need to relog to see your stats!')
            } else {
                $("#modal-profile").html(data)
            }
        }).fail(function() {
            $("#modal-profile").html('<i class="fa fa-exclamation-triangle"></i>')
        })
    });
    if (window.location.hash) {
        loadData(window.location.hash)
    } else {
        loadData("#index")
    }
    $("#navbar a").click(function() {
        if ($(this).attr("href").indexOf("#") >= 0) {
            loadData($(this).attr("href"))
        }
    });
    $('body').on('click', 'a#tradelink', function() {
        loadData("#profile")
    });
    $('body').on('click', 'a', function() {
        var checkArchive = $(this).attr("href");
        if (checkArchive.indexOf("#archive") >= 0) {
            loadData($(this).attr("href"))
        }
    });

    function loadData(page) {
        page = page.replace("#", "");
        var archiveTable = 'low';
        var archiveId = 12000;
        var id = (lowid + highid);
        if (page == "") {
            page = "index"
        }
        $("#navbar").find(".active").removeClass("active");
        if (id == 0) {
            setTimeout(function() {
                loadData(page)
            }, 100);
            return
        }
        if (page.indexOf("archive") >= 0) {
            var split = page.split(";");
            page = split[0];
            archiveTable = split[1];
            archiveId = split[2]
        }
        current_page = page;
        if (page == 'archive') {
            $('#history_active').addClass('active')
        } else {
            $('#' + page + '_active').addClass('active')
        }
        $("#content-data").load("http://" + document.location.host + "/dist/plugins/" + page + ".php?id=" + id + '&timestamp=' + cached_profile + '&archive=' + archiveId + '&table=' + archiveTable, function() {
            if (page == "index") {
                isrunning_low = false;
                items_low = 0;
                isrunning_high = false;
                items_high = 0
            } else {
                items_low = -1;
                items_high = -1
            }
            if (muted_low == 'true') {
                $("#mute-low").removeClass('label-success').addClass('label-danger')
            }
            if (muted_high == 'true') {
                $("#mute-high").removeClass('label-success').addClass('label-danger')
            }
            $(".dial").knob({
                'width': '100%',
                'min': 0,
                'max': 100
            });
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover()
        })
    }
});
socket.on(steam_id, function(msg) {
    var data = JSON.parse(msg);
    toastr[data.type](data.message);
    if (data.inventory != undefined) {
        $(".inventory-overlay").hide();
        if (data.message.indexOf("Your deposit of $") >= 0 && tableText == data.table) {
            $("#player-inventory").hide()
        } else {
            $.get("http://89.163.144.87/index_inv.php?table=" + tableText + "&id=" + steam_id, function(data) {
                $("#player-inventory .panel-body").html(data);
                $('#player-inventory-click').jScrollPane();
                $('#deposit-text').html(tableText)
            }).fail(function() {
                $("#player-inventory .panel-body").html('<i class="fa fa-exclamation-triangle"></i>')
            })
        }
    }
    cached_profile = Date.now()
});
socket.on("inventory-tradeoffer", function(msg) {
    var data = JSON.parse(msg);
    if (tableText == data.table && steam_id == data.steamId) {
        $("#deposit-value").html(data.value);
        $("#overlay-value").html(data.value);
        $("#overlay-table").html(data.table);
        $("#overlay-code").html(data.code);
        $("#overlay-message").html('<a href="https://steamcommunity.com/tradeoffer/' + data.offerId + '/" id="tradeUrl" class="btn btn-success" target="_blank" style="width: 100%;">Accept Trade Offer</a><p>Warning: Accepting the trade offer will place your deposit into a pot as soon as it is processed by Steam without further confirmation. Your deposit will expire in five (5) minutes if you do not accept nor decline the trade offer.</p><p>[NOTE: Processing your trade offer and placing them into the raffle may take a while, do not be alarmed if your item does not show up instantly as this heavily relies on the site’s traffic. It should take no longer than 5 minutes (Worst Case Scenario).]</p>');
        $(".inventory-overlay").show()
    }
    cached_profile = Date.now()
});
socket.on('ffresh', function(msg) {
    location.reload()
});
socket.on('update table', function(msg) {
    var data = JSON.parse(msg);
    var divLow = $("#low-table");
    var divHigh = $("#high-table");
    $("#tawkchat-iframe-container").hide();
    if (data.low && items_low >= 0) {
        if (data.low.betCountdown > 0) {
            isrunning_low = false;
            divLow.find("#bet-carousel").hide();
            divLow.find("#bet-carousel .items").css({
                transform: 'translate3d(0px, 0px, 0px)'
            });
            divLow.find("#bet-value").html("$0");
            divLow.find("#bet-carousel .items").html("");
            divLow.find("#bet-notifications").hide()
        }
        divLow.find("#low span").html(data.low.betBets + "/100");
        if (data.low.betUsers > 1 && data.low.betCountdown > 0) {
            divLow.find("#bet-notifications").show().html('<div class="alert alert-danger" role="alert" id="lowCount"><strong>Game #' + data.low.betId + '</strong> ends in about <strong>' + data.low.betCountdown + '</strong> second(s)</div>')
        }
        divLow.find("#bet-value").html("$" + data.low.betValue);
        divLow.find("#bet-players").html(data.low.betUsers);
        divLow.find("#lowArray").html("");
        if (data.low.betArray.length >= 4) {
            for (i = 0; i < 4; i++) {
                divLow.find("#lowArray").append("<li>" + data.low.betArray[i]['name'] + " (" + data.low.betArray[i]['quality'] + ") $" + data.low.betArray[i]['price'] + "</li>")
            }
        }
        var inPool = false;
        if (inPool == false) {
            if (data.low.betLastWinner != null && data.low.betCountdown > 0) {
                divLow.find("#winner-image").attr("src", data.low.betLastWinner.winnerImage);
                divLow.find(".cname").html("CONGRATULATIONS!<br><b><a href='https://steamcommunity.com/profiles/" + data.low.betLastWinner.winnerId + "' target='_blank'>" + parseName(data.low.betLastWinner.winnerName) + "</a></b><br>$" + +data.low.betLastWinner.winnerValue + " (" + data.low.betLastWinner.winnerProcentage + "%)");
                divLow.find("#latest-game").attr("data-content", "<b>Game:</b> #" + (data.low.betId - 1) + "<br><b>Hash:</b> " + data.low.betLastWinner.fairMD5 + "<br><b>Salt:</b> " + data.low.betLastWinner.fairSalt + "<br><b>Winning Percentage:</b> " + data.low.betLastWinner.fairProcentage + "<br><b>Ticket:</b> " + data.low.betLastWinner.fairTickets);
                divLow.find("#latest-game").attr("data-fairmd5", data.low.betLastWinner.fairMD5);
                divLow.find("#latest-game").attr("data-fairsalt", data.low.betLastWinner.fairSalt);
                divLow.find("#latest-game").attr("data-fairprecentage", data.low.betLastWinner.fairProcentage);
                divLow.find("#latest-game").attr("data-fairtickets", data.low.betLastWinner.fairTickets);
                divLow.find("#latest-archive").attr("href", "#archive;low;" + (data.low.betId - 1))
            }
        }
        if (data.low.betCountdown <= 0) {
            divLow.find("#bet-notifications").show().html('<div class="alert alert-danger" role="alert" id="lowCount"><strong>Game #' + data.low.betId + '</strong>  has ended!</div>')
        }
        if (data.low.betCountdown < -2 && data.low.betWinner > 0 && data.low.betCountdown > -10) {
            var low_winner = data.low.betWinner;
            var low_winnerId = data.low.betWinnerId;
            var low_fast = ((low_winner * 120) + Math.floor((Math.random() * 110) + 2));
            if (!isrunning_low) {
                isrunning_low = true;
                divLow.find("#bet-carousel").show();
                divLow.find("#bet-carousel .items").html("");
                for (var number in data.low.betWinners) {
                    divLow.find("#bet-carousel .items").append(addAvatar(data.low.betWinners[number], number))
                }
                setTimeout(function() {
                    divLow.find("#bet-carousel .items").css({
                        transform: 'translate3d(-' + low_fast + 'px, 0px, 0px)'
                    });
                    var rollerlow = document.getElementById("low-bet-roller");
                    rollerlow.volume = 0.05;
                    if (current_page == "index") {
                        if (muted_low != 'true') {
                            rollerlow.play()
                        }
                    }
                }, 1500);
                setTimeout(function() {
                    divLow.find("#bet-players-statistic").find("#" + low_winnerId + "").css({
                        'transition-duration': '1s',
                        '-webkit-transition-duration': '1s'
                    });
                    divLow.find("#bet-players-statistic").find("#" + low_winnerId + "").css({
                        background: '#B2943C'
                    })
                }, 9000)
            }
        }
        divLow.find('.dial').val(data.low.betArray.length).trigger('change');
        if (data.low.betArray.length != items_low) {
            items_low = data.low.betArray.length;
            divLow.find("#bet-items").html("");
            data.low.betArray.forEach(function(items) {
                $("#bet-items").append(addFeed(items))
            });
            divLow.find("#bet-players-statistic").html("");
            for (var bets in data.low.betData) {
                divLow.find("#bet-players-statistic").append(addPlayers(data.low.betData[bets], data.low.betArray))
            }
            var droplow = document.getElementById("low-drop-" + Math.floor((Math.random() * 3) + 1));
            droplow.volume = 0.1;
            if (current_page == "index") {
                if (muted_low != 'true') {
                    droplow.play()
                }
            }
            divLow.find('[data-toggle="tooltip"]').tooltip();
            divLow.find("#bet-players-statistic > tr").hover(function() {
                $(this).find('ul:first').slideDown(100)
            }, function() {
                $(this).find('ul:first').slideUp(100)
            })
        }
        divLow.find("#current-game").attr("data-content", "<b>Game:</b> #" + data.low.betId + "<br><b>Hash:</b> " + data.low.betHash);
        divLow.find("#bet-player .panel-title").html("Game #" + data.low.betId);
        lowid = data.low.betId;
        if (data.low.betCountdown == -20) {
            divLow.find("#current-game").attr("data-content", "<b>Game:</b> #" + data.low.betId + "<br><b>Hash:</b> " + data.low.betLastWinner.fairMD5 + "<br><b>Salt:</b> " + data.low.betLastWinner.fairSalt + "<br><b>Winning Percentage:</b> " + data.low.betLastWinner.fairProcentage + "<br><b>Ticket:</b> " + data.low.betLastWinner.fairTickets);
            divLow.find("#current-game").attr("data-fairmd5", data.low.betLastWinner.fairMD5);
            divLow.find("#current-game").attr("data-fairsalt", data.low.betLastWinner.fairSalt);
            divLow.find("#current-game").attr("data-fairprecentage", data.low.betLastWinner.fairProcentage);
            divLow.find("#current-game").attr("data-fairtickets", data.low.betLastWinner.fairTickets)
        }
    }
    if (data.high && items_high >= 0) {
        if (data.high.betCountdown > 0) {
            isrunning_high = false;
            divHigh.find("#bet-carousel").hide();
            divHigh.find("#bet-carousel .items").css({
                transform: 'translate3d(0px, 0px, 0px)'
            });
            divHigh.find("#bet-value").html("$0");
            divHigh.find("#bet-carousel .items").html("");
            divHigh.find("#bet-notifications").hide()
        }
        divHigh.find("#high span").html(data.high.betBets + "/100");
        if (data.high.betUsers > 1 && data.high.betCountdown > 0) {
            divHigh.find("#bet-notifications").show().html('<div class="alert alert-danger" role="alert" id="highCount"><strong>Game #' + data.high.betId + '</strong> ends in about <strong>' + data.high.betCountdown + '</strong> second(s)</div>')
        }
        divHigh.find("#bet-value").html("$" + data.high.betValue);
        divHigh.find("#bet-players").html(data.high.betUsers);
        divHigh.find("#highArray").html("");
        if (data.high.betArray.length >= 4) {
            for (i = 0; i < 4; i++) {
                divHigh.find("#highArray").append("<li>" + data.high.betArray[i]['name'] + " (" + data.high.betArray[i]['quality'] + ") $" + data.high.betArray[i]['price'] + "</li>")
            }
        }
        var inPool = false;
        if (inPool == false) {
            if (data.high.betLastWinner != null && data.high.betCountdown > 0) {
                divHigh.find("#winner-image").attr("src", data.high.betLastWinner.winnerImage);
                divHigh.find(".cname").html("CONGRATULATIONS!<br><b><a href='https://steamcommunity.com/profiles/" + data.high.betLastWinner.winnerId + "' target='_blank'>" + parseName(data.high.betLastWinner.winnerName) + "</a></b><br>$" + +data.high.betLastWinner.winnerValue + " (" + data.high.betLastWinner.winnerProcentage + "%)");
                divHigh.find("#latest-game").attr("data-content", "<b>Game:</b> #" + (data.high.betId - 1) + "<br><b>Hash:</b> " + data.high.betLastWinner.fairMD5 + "<br><b>Salt:</b> " + data.high.betLastWinner.fairSalt + "<br><b>Winning Percentage:</b> " + data.high.betLastWinner.fairProcentage + "<br><b>Ticket:</b> " + data.high.betLastWinner.fairTickets);
                divHigh.find("#latest-game").attr("data-fairmd5", data.high.betLastWinner.fairMD5);
                divHigh.find("#latest-game").attr("data-fairsalt", data.high.betLastWinner.fairSalt);
                divHigh.find("#latest-game").attr("data-fairprecentage", data.high.betLastWinner.fairProcentage);
                divHigh.find("#latest-game").attr("data-fairtickets", data.high.betLastWinner.fairTickets);
                divHigh.find("#latest-archive").attr("href", "#archive;high;" + (data.high.betId - 1))
            }
        }
        if (data.high.betCountdown <= 0) {
            divHigh.find("#bet-notifications").show().html('<div class="alert alert-danger" role="alert" id="highCount"><strong>Game #' + data.high.betId + '</strong>  has ended!</div>')
        }
        if (data.high.betCountdown < -2 && data.high.betWinner > 0 && data.high.betCountdown > -10) {
            var high_winner = data.high.betWinner;
            var high_winnerId = data.high.betWinnerId;
            var high_fast = ((high_winner * 120) + Math.floor((Math.random() * 110) + 2));
            if (!isrunning_high) {
                isrunning_high = true;
                divHigh.find("#bet-carousel").show();
                divHigh.find("#bet-carousel .items").html("");
                for (var number in data.high.betWinners) {
                    divHigh.find("#bet-carousel .items").append(addAvatar(data.high.betWinners[number], number))
                }
                setTimeout(function() {
                    divHigh.find("#bet-carousel .items").css({
                        transform: 'translate3d(-' + high_fast + 'px, 0px, 0px)'
                    });
                    var rollerhigh = document.getElementById("high-bet-roller");
                    rollerhigh.volume = 0.05;
                    if (current_page == "index") {
                        if (muted_high != 'true') {
                            rollerhigh.play()
                        }
                    }
                }, 1500);
                setTimeout(function() {
                    divHigh.find("#bet-players-statistic").find("#" + high_winnerId + "").css({
                        'transition-duration': '1s',
                        '-webkit-transition-duration': '1s'
                    });
                    divHigh.find("#bet-players-statistic").find("#" + high_winnerId + "").css({
                        background: '#B2943C'
                    })
                }, 9000)
            }
        }
        divHigh.find('.dial').val(data.high.betArray.length).trigger('change');
        if (data.high.betArray.length != items_high) {
            items_high = data.high.betArray.length;
            divHigh.find("#bet-items").html("");
            data.high.betArray.forEach(function(items) {
                $("#bet-items").append(addFeed(items))
            });
            divHigh.find("#bet-players-statistic").html("");
            for (var bets in data.high.betData) {
                divHigh.find("#bet-players-statistic").append(addPlayers(data.high.betData[bets], data.high.betArray))
            }
            var drophigh = document.getElementById("high-drop-" + Math.floor((Math.random() * 3) + 1));
            drophigh.volume = 0.05;
            if (current_page == "index") {
                if (muted_high != 'true') {
                    drophigh.play()
                }
            }
            divHigh.find('[data-toggle="tooltip"]').tooltip();
            divHigh.find("#bet-players-statistic > tr").hover(function() {
                $(this).find('ul:first').slideDown(100)
            }, function() {
                $(this).find('ul:first').slideUp(100)
            })
        }
        divHigh.find("#current-game").attr("data-content", "<b>Game:</b> #" + data.high.betId + "<br><b>Hash:</b> " + data.high.betHash);
        divHigh.find("#bet-player .panel-title").html("Game #" + data.high.betId);
        highid = data.high.betId
    }
    $("#online-players").html(data.users)
});

function addFeed(data) {
    var bg = "background:#" + data.color;
    if (data.color == 'b0c3d9') bg = "background:#fff;color:#263238";
    return "<div class='col-md-12 item' style='" + bg + "'><div style='width:100px;float:left;'><img src='" + data.steam_user.image + "' class='ava profile-picture'></div><div class='col-md-10 citem'>" + parseName(data.steam_user.username) + " <b><br>" + data.item + "</b> (~ $" + data.value + ")</div><div style='width:100px;float:left;margin-right:20px;'><img src='http://cdn.steamcommunity.com/economy/image/" + data.image + "' class='ava' style='margin: 11px 0;' onError='this.style.display=\"none\";'></div></div>"
}

function addPlayers(data, items) {
    var xitems = 0;
    var pitems = "";
    items.forEach(function(item) {
        if (data.steam_user.id == item.steam_user.id) {
            ++xitems;
            pitems += "<li style='background:#" + item.color + "' data-toggle='tooltip' data-placement='top' title='" + item.item.replace("'", "") + " (~ $" + item.value + ")'><img src='http://cdn.steamcommunity.com/economy/image/" + item.image + "' onError='this.src=\"dist/images/no_item.png\";'></li>"
        }
    });
    return "<tr><td id='" + data.steam_user.id + "'><div style='margin: 5px'><img width='40' src='" + data.steam_user.image + "'/><a href='https://steamcommunity.com/profiles/" + data.steam_user.id + "' target='_blank'>" + parseName(data.steam_user.username) + "</a><div class='table-stats'><span class='label label-default'>" + data.chance + "%</span><span class='label label-default'>$" + data.value + "</span><span class='label label-default'>" + xitems + " Item(s)</span></div></div><ul style='display:none'>" + pitems + "</ul></td></tr>"
}

function addAvatar(data, number) {
    return "<div class='item' id='" + number + "'><img src='" + data.image + "'><div class='item-nickname'>" + parseName(data.username) + "</div></div>"
}

function addNotification(data) {
    return '<div class="toast toast-' + data.type + '" style="display: block;width: 100%;"><div class="toast-progress"></div><div class="toast-message">' + data.message + '</div></div>'
}

function checkProvablyFair(hash, salt, precentage, tickets) {
    $.post("dist/plugins/verify.php", {
        hash: hash,
        salt: salt,
        precentage: precentage,
        tickets: tickets
    }, function(data) {
        $("#pb-notification").html(data);
        $("#pb-notification").slideDown()
    })
}
var myMapArray = ['cbble', 'dust2', 'inferno', 'mirage', 'nuke', 'overpass'];

function changeBg() {
    var number = Math.floor(Math.random() * myMapArray.length);
    var map = myMapArray[number];
    myMapArray.splice(number, 1);
    if (myMapArray.length == 0) {
        myMapArray = ['cbble', 'dust2', 'inferno', 'mirage', 'nuke', 'overpass']
    }
    $("body").css("background-image", "url(dist/images/maps/Csgo-de-" + map + ".jpg)")
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2")
}
if (steam_bg == 'valonia was here') {
    changeBg();
    setInterval(changeBg, 300000)
} else {
    $("body").css("background", "#00FF11")
}


toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-full-width container",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "60000",
    "extendedTimeOut": "10000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
//toastr['error']('Due to a bug users cant update their trade link atm!');
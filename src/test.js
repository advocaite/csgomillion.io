function hexToRgb(t) {
    var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    t = t.replace(e, function(t, e, n, i) {
        return e + e + n + n + i + i
    });
    var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
    return n ? {
        r: parseInt(n[1], 16),
        g: parseInt(n[2], 16),
        b: parseInt(n[3], 16)
    } : null
}

function clamp(t, e, n) {
    return Math.min(Math.max(t, e), n)
}

function isInArray(t, e) {
    return e.indexOf(t) > -1
}

function isImageOk(t) {
    return t.complete ? "undefined" != typeof t.naturalWidth && 0 === t.naturalWidth ? !1 : !0 : !1
}

function getCookie(t) {
    for (var e = t + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
        for (var r = n[i];
             " " == r.charAt(0);) r = r.substring(1);
        if (0 === r.indexOf(e)) return r.substring(e.length, r.length)
    }
    return ""
}

function addMessage(t, e, n, i, r, o) {
    console.log(i + "addDep");
    var a, s;
    t.length > 18 && (t = t.substring(0, 18) + ".."), $(".chat .message").length >= 50 && $(".chat .message:first-of-type").remove(), 2 === o ? (o = "ADMIN", s = '<span class="status">' + o + "</span>") : 1 === o ? (o = "MOD", s = '<span class="status">' + o + "</span>") : (o = "", s = ""), -1 != e.indexOf("I have validated your trade!") && ga("send", "event", "Deposit", "Added Deposit"), "WARNING" == t || "SYSTEM" == t ? (a = '<div class="message animated fadeIn"><div class="row"><div class="col-xs-12"><div class="row"><a class="name" style="color:#e74c3c;">' + t + '</a></div><div class="row text"><b>' + e + '</b></div><span class="timestamp" data-livestamp="' + i + '"></span></div></div></div>', $("#chat").append(a), stop === !1 && $("#chat").animate({
        scrollTop: $("#chat")[0].scrollHeight
    }, 1)) : (a = '<div class="message animated fadeIn"><div class="row"><div class="col-xs-12"><div class="row"><a href="#" data-steam64="' + r + '"  class="name"><img src="' + n + '" alt="">' + t + s + '</a></span></div><div class="row text">' + e + '</div><span class="timestamp" data-livestamp="' + i + '"></span></div></div></div>', $("#chat").append(a), stop === !1 && $("#chat").animate({
        scrollTop: $("#chat")[0].scrollHeight
    }, 1))
}

function viewChat() {
    setTimeout(function() {
        stop === !1 && $("#chat").animate({
            scrollTop: $("#chat")[0].scrollHeight
        }, 1)
    }, 250)
}

function updateItemCount(t, e) {
    var n = t / e * 100,
        i = 100 - n;
    $("#item-count").remove(), $(".progress-bar-animation").css("right", i + "%"), $("<style id='item-count'>.jackpot-container > .col-xs-10 > .tab-content::before{content: '" + t + "/" + e + "' !important;}.tab-content::after{right: " + i + "% !important;}</style>").appendTo("head")
}

function count(t) {
    $(".count").numerator({
        easing: "swing",
        duration: 500,
        delimiter: ".",
        rounding: 2,
        toValue: t,
        onComplete: function() {
            $(".count").animate({
                color: $(".amount").css("color")
            }, 250)
        }
    }), 0 === t || $(".count").animate({
        color: "rgba(39,174,96,.9)"
    }, 400)
}

function addItem(t, e, n) {
    $('<div class="item animated flipInX" title="' + n + '" style="display: inline-block;"><img src="' + t + '" class="img-responsive" alt=""><span class="price">$' + e + "</span></div>").prependTo(".items")
}

function addDeposit(t, e, n, i, r) {
    "small" === e && dep_counter++, dep_counter > 25 && (depositsLoaded = !0), depositsLoaded && increaseTabNotification(e);
    var o = $("#deposits > .table-responsive > .table > ." + e + "-tbody"),
        a = (i.length, "");
    for (c = 0; c < i.length; c++) a += '<img title="$' + i[c].price + " - " + i[c].name + '" src="' + i[c].image + '" class="img-responsive">';
    var s = '<tr class="animated fadeIn"><th scope="row">' + t + "</th><td>$" + n + "</td><td>" + a.replace('<img src="["" class="img-responsive">', "") + '</td><td><span class="livestamp" data-livestamp="' + r + '"></span></td></tr>';
    o.prepend(s), $("#deposits > .table-responsive > .table > ." + e + "-tbody > tr").length >= 25 && $("#deposits > .table-responsive > .table > ." + e + "-tbody > tr:last-of-type").remove();
    for (var c = 0; c < document.images.length; c++) isImageOk(document.images[c]) || (document.images[c].alt = "", document.images[c].style = "padding: 5px")
}

function addWinner(t, e, n, i, r, o) {
    win_counter++, win_counter >= 26 && (winnersLoaded = !0);
    var a = $("#winners > .table-responsive > .table > ." + e + "-tbody"),
        s = '<tr class="animated fadeIn"><th scope="row">' + t + " (" + r + "%)</th><td>" + n + "</td><td>" + i + '</td><td><span class="livestamp" data-livestamp="' + o + '"></span></td></tr>';
    a.prepend(s), $("#winners > .table-responsive > .table > ." + e + "-tbody > tr").length >= 25 && $("#winners > .table-responsive > .table > ." + e + "-tbody > tr:last-of-type").remove()
}

function winner(t) {
    winner_counter++, winner_counter >= 26 && (winnersLoadedd = !0), winnersLoadedd && (void 0 !== t && winnerArray.push(t), currentlySpinning || winnerArray.length > 0 && spinner(winnerArray[0]))
}

function rouletteIsOver(t) {
    console.log("Over"), currentlySpinning = !1, lastWinner = winnerArray[0].winnername, winnerArray.splice(0, 1), winnerArray.length > 0 ? (Roulette.over(), setTimeout(function() {
        winner()
    }, 1500)) : (console.log("Roulette DONE"), Roulette.over(), setTimeout(function() {
        $("#roulette-cont").hide(), $("#jackpot-items").fadeIn("slow")
    }, 1e3), "1" === getCookie("sounds") && document.getElementById("cock").play())
}

function spinner(t) {
    currentlySpinning = !0, console.log(t);
    var e = document.getElementById("roulette-cont");
    $("#jackpot-items").hide(), $("#roulette-cont").show(), Roulette.start(e, t, t.id), "1" === getCookie("sounds") && document.getElementById("fire").play()
}

function newRound() {
    var t = $("#deposits > .table-responsive > .table"),
        e = '<tr class="new-round"> <td colspan="3">NEW ROUND</td> </tr>';
    t.prepend(e), $("#deposits > .table-responsive > .table > tbody > tr").length >= 25 && $("#deposits > .table-responsive > .table > tbody > tr:last-of-type").remove()
}

function changeCurrentJackpot(t) {
    $(".current-jackpot").text(t)
}

function countTotal(t) {
    $(".total").stop(), $(".total").numerator({
        easing: "swing",
        duration: 500,
        delimiter: ".",
        rounding: 2,
        toValue: t,
        onComplete: function() {
            $(".total").animate({
                color: $(".amount").css("color")
            }, 250)
        }
    }), 0 === t || t < parseInt($(".total").text()) || $(".total").animate({
        color: "rgba(39,174,96,.9)"
    }, 500)
}

function depositIntoInventory(t, e, n) {
    console.log(t, e, n), $(".inventoryItems").prepend('<div class="item animated flipInX" id="' + itemId + '"><img src="' + t + '" class="img-responsive"> <span class="name">' + e + '</span> <span class="price">' + n + "</span></div>"), itemId++
}

function depositIntoJackpot() {
    var t = $(".current-jackpot").text();
    console.log(t), console.log(itemsSelected)
}

function resetTabNotification(t) {
    "small" === t ? smallCount = 0 : "regular" === t ? regularCount = 0 : "large" === t && (largeCount = 0), $("#" + t + " .notif-tab").text("0").hide()
}

function increaseTabNotification(t) {
    depositsLoaded && ("small" === t ? (smallCount++, $("#small").hasClass("active") || $("#small .notif-tab").text(smallCount).show()) : "regular" === t ? (regularCount++, $("#regular").hasClass("active") || $("#regular .notif-tab").text(regularCount).show()) : "large" === t && (largeCount++, $("#large").hasClass("active") || $("#large .notif-tab").text(largeCount).show()))
}

function pushNotification(t, e) {
    getCookie("notification") === t || ($("#notifications > .message").text(e), $("#notifications").fadeIn("slow")), $("#notifications > i").click(function() {
        $("#notifications").fadeOut("slow"), document.cookie = "notification=" + t
    })
}

function updateJPDOM(t, e, n, i, r, o, a) {
    if (document.getElementById("deposit").href = a, $(".item").remove(), null !== o[0])
        for (var s = 0; s < o.length; s++) addItem(o[s].image, o[s].price, o[s].name);
    count(r), updateItemCount(t, e), $("#jp_minDesposit").html("(Min. $" + parseFloat(n).toFixed(2) + ")"), $("#jp_maxDeposit").html("(Max. $" + parseFloat(i).toFixed(2) + ")")
}

function resetTrade() {
    socket.emit("resetTradeUrl")
}

function updateChatNotification() {
    num += 1, $("#chatnotification").html(num)
}

function setHistory() {
    socket.emit("getTradeHistory", function(t) {
        for (var e = [], n = 0; n < t.length; n++) e.push({
            total: t[n].traderesponse.total,
            jackpot: t[n].botid,
            timestamp: t[n].date,
            itemcount: t[n].traderesponse.itemlist.length,
            offerid: t[n].traderesponse.tradeofferid
        });
        $("#history .row .item2").remove();
        for (var i = 0; i < e.length; i++) $("#history .row").append('<div class="item2">[' + e[i].offerid + "] You deposited " + e[i].itemcount + " items worth $" + e[i].total + " into the " + e[i].jackpot + ' jackpot just <span class="timestamp" data-livestamp="' + e[i].timestamp + '"></span>. </div>')
    })
}
if (function(t, e) {
        function n(t) {
            var e = t.length,
                n = ut.type(t);
            return ut.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === n || "function" !== n && (0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function i(t) {
            var e = Ct[t] = {};
            return ut.each(t.match(pt) || [], function(t, n) {
                e[n] = !0
            }), e
        }

        function r(t, n, i, r) {
            if (ut.acceptData(t)) {
                var o, a, s = ut.expando,
                    c = t.nodeType,
                    l = c ? ut.cache : t,
                    u = c ? t[s] : t[s] && s;
                if (u && l[u] && (r || l[u].data) || i !== e || "string" != typeof n) return u || (u = c ? t[s] = et.pop() || ut.guid++ : s), l[u] || (l[u] = c ? {} : {
                    toJSON: ut.noop
                }), ("object" == typeof n || "function" == typeof n) && (r ? l[u] = ut.extend(l[u], n) : l[u].data = ut.extend(l[u].data, n)), a = l[u], r || (a.data || (a.data = {}), a = a.data), i !== e && (a[ut.camelCase(n)] = i), "string" == typeof n ? (o = a[n], null == o && (o = a[ut.camelCase(n)])) : o = a, o
            }
        }

        function o(t, e, n) {
            if (ut.acceptData(t)) {
                var i, r, o = t.nodeType,
                    a = o ? ut.cache : t,
                    c = o ? t[ut.expando] : ut.expando;
                if (a[c]) {
                    if (e && (i = n ? a[c] : a[c].data)) {
                        ut.isArray(e) ? e = e.concat(ut.map(e, ut.camelCase)) : e in i ? e = [e] : (e = ut.camelCase(e), e = e in i ? [e] : e.split(" ")), r = e.length;
                        for (; r--;) delete i[e[r]];
                        if (n ? !s(i) : !ut.isEmptyObject(i)) return
                    }(n || (delete a[c].data, s(a[c]))) && (o ? ut.cleanData([t], !0) : ut.support.deleteExpando || a != a.window ? delete a[c] : a[c] = null)
                }
            }
        }

        function a(t, n, i) {
            if (i === e && 1 === t.nodeType) {
                var r = "data-" + n.replace(Dt, "-$1").toLowerCase();
                if (i = t.getAttribute(r), "string" == typeof i) {
                    try {
                        i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : St.test(i) ? ut.parseJSON(i) : i
                    } catch (o) {}
                    ut.data(t, n, i)
                } else i = e
            }
            return i
        }

        function s(t) {
            var e;
            for (e in t)
                if (("data" !== e || !ut.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
            return !0
        }

        function c() {
            return !0
        }

        function l() {
            return !1
        }

        function u() {
            try {
                return V.activeElement
            } catch (t) {}
        }

        function d(t, e) {
            do t = t[e]; while (t && 1 !== t.nodeType);
            return t
        }

        function p(t, e, n) {
            if (ut.isFunction(e)) return ut.grep(t, function(t, i) {
                return !!e.call(t, i, t) !== n
            });
            if (e.nodeType) return ut.grep(t, function(t) {
                return t === e !== n
            });
            if ("string" == typeof e) {
                if (Ht.test(e)) return ut.filter(e, t, n);
                e = ut.filter(e, t)
            }
            return ut.grep(t, function(t) {
                return ut.inArray(t, e) >= 0 !== n
            })
        }

        function f(t) {
            var e = Wt.split("|"),
                n = t.createDocumentFragment();
            if (n.createElement)
                for (; e.length;) n.createElement(e.pop());
            return n
        }

        function h(t, e) {
            return ut.nodeName(t, "table") && ut.nodeName(1 === e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function m(t) {
            return t.type = (null !== ut.find.attr(t, "type")) + "/" + t.type, t
        }

        function g(t) {
            var e = re.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function v(t, e) {
            for (var n, i = 0; null != (n = t[i]); i++) ut._data(n, "globalEval", !e || ut._data(e[i], "globalEval"))
        }

        function y(t, e) {
            if (1 === e.nodeType && ut.hasData(t)) {
                var n, i, r, o = ut._data(t),
                    a = ut._data(e, o),
                    s = o.events;
                if (s) {
                    delete a.handle, a.events = {};
                    for (n in s)
                        for (i = 0, r = s[n].length; r > i; i++) ut.event.add(e, n, s[n][i])
                }
                a.data && (a.data = ut.extend({}, a.data))
            }
        }

        function b(t, e) {
            var n, i, r;
            if (1 === e.nodeType) {
                if (n = e.nodeName.toLowerCase(), !ut.support.noCloneEvent && e[ut.expando]) {
                    r = ut._data(e);
                    for (i in r.events) ut.removeEvent(e, i, r.handle);
                    e.removeAttribute(ut.expando)
                }
                "script" === n && e.text !== t.text ? (m(e).text = t.text, g(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), ut.support.html5Clone && t.innerHTML && !ut.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && ee.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
            }
        }

        function w(t, n) {
            var i, r, o = 0,
                a = typeof t.getElementsByTagName !== J ? t.getElementsByTagName(n || "*") : typeof t.querySelectorAll !== J ? t.querySelectorAll(n || "*") : e;
            if (!a)
                for (a = [], i = t.childNodes || t; null != (r = i[o]); o++) !n || ut.nodeName(r, n) ? a.push(r) : ut.merge(a, w(r, n));
            return n === e || n && ut.nodeName(t, n) ? ut.merge([t], a) : a
        }

        function x(t) {
            ee.test(t.type) && (t.defaultChecked = t.checked)
        }

        function _(t, e) {
            if (e in t) return e;
            for (var n = e.charAt(0).toUpperCase() + e.slice(1), i = e, r = Te.length; r--;)
                if (e = Te[r] + n, e in t) return e;
            return i
        }

        function k(t, e) {
            return t = e || t, "none" === ut.css(t, "display") || !ut.contains(t.ownerDocument, t)
        }

        function T(t, e) {
            for (var n, i, r, o = [], a = 0, s = t.length; s > a; a++) i = t[a], i.style && (o[a] = ut._data(i, "olddisplay"), n = i.style.display, e ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && k(i) && (o[a] = ut._data(i, "olddisplay", E(i.nodeName)))) : o[a] || (r = k(i), (n && "none" !== n || !r) && ut._data(i, "olddisplay", r ? n : ut.css(i, "display"))));
            for (a = 0; s > a; a++) i = t[a], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[a] || "" : "none"));
            return t
        }

        function C(t, e, n) {
            var i = ve.exec(e);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
        }

        function S(t, e, n, i, r) {
            for (var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += ut.css(t, n + ke[o], !0, r)), i ? ("content" === n && (a -= ut.css(t, "padding" + ke[o], !0, r)), "margin" !== n && (a -= ut.css(t, "border" + ke[o] + "Width", !0, r))) : (a += ut.css(t, "padding" + ke[o], !0, r), "padding" !== n && (a += ut.css(t, "border" + ke[o] + "Width", !0, r)));
            return a
        }

        function D(t, e, n) {
            var i = !0,
                r = "width" === e ? t.offsetWidth : t.offsetHeight,
                o = ue(t),
                a = ut.support.boxSizing && "border-box" === ut.css(t, "boxSizing", !1, o);
            if (0 >= r || null == r) {
                if (r = de(t, e, o), (0 > r || null == r) && (r = t.style[e]), ye.test(r)) return r;
                i = a && (ut.support.boxSizingReliable || r === t.style[e]), r = parseFloat(r) || 0
            }
            return r + S(t, e, n || (a ? "border" : "content"), i, o) + "px"
        }

        function E(t) {
            var e = V,
                n = we[t];
            return n || (n = A(t, e), "none" !== n && n || (le = (le || ut("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(e.documentElement), e = (le[0].contentWindow || le[0].contentDocument).document, e.write("<!doctype html><html><body>"), e.close(), n = A(t, e), le.detach()), we[t] = n), n
        }

        function A(t, e) {
            var n = ut(e.createElement(t)).appendTo(e.body),
                i = ut.css(n[0], "display");
            return n.remove(), i
        }

        function $(t, e, n, i) {
            var r;
            if (ut.isArray(e)) ut.each(e, function(e, r) {
                n || Se.test(t) ? i(t, r) : $(t + "[" + ("object" == typeof r ? e : "") + "]", r, n, i)
            });
            else if (n || "object" !== ut.type(e)) i(t, e);
            else
                for (r in e) $(t + "[" + r + "]", e[r], n, i)
        }

        function N(t) {
            return function(e, n) {
                "string" != typeof e && (n = e, e = "*");
                var i, r = 0,
                    o = e.toLowerCase().match(pt) || [];
                if (ut.isFunction(n))
                    for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
            }
        }

        function M(t, n, i, r) {
            function o(c) {
                var l;
                return a[c] = !0, ut.each(t[c] || [], function(t, c) {
                    var u = c(n, i, r);
                    return "string" != typeof u || s || a[u] ? s ? !(l = u) : e : (n.dataTypes.unshift(u), o(u), !1)
                }), l
            }
            var a = {},
                s = t === Ue;
            return o(n.dataTypes[0]) || !a["*"] && o("*")
        }

        function j(t, n) {
            var i, r, o = ut.ajaxSettings.flatOptions || {};
            for (r in n) n[r] !== e && ((o[r] ? t : i || (i = {}))[r] = n[r]);
            return i && ut.extend(!0, t, i), t
        }

        function I(t, n, i) {
            for (var r, o, a, s, c = t.contents, l = t.dataTypes;
                 "*" === l[0];) l.shift(), o === e && (o = t.mimeType || n.getResponseHeader("Content-Type"));
            if (o)
                for (s in c)
                    if (c[s] && c[s].test(o)) {
                        l.unshift(s);
                        break
                    }
            if (l[0] in i) a = l[0];
            else {
                for (s in i) {
                    if (!l[0] || t.converters[s + " " + l[0]]) {
                        a = s;
                        break
                    }
                    r || (r = s)
                }
                a = a || r
            }
            return a ? (a !== l[0] && l.unshift(a), i[a]) : e
        }

        function O(t, e, n, i) {
            var r, o, a, s, c, l = {},
                u = t.dataTypes.slice();
            if (u[1])
                for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
            for (o = u.shift(); o;)
                if (t.responseFields[o] && (n[t.responseFields[o]] = e), !c && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), c = o, o = u.shift())
                    if ("*" === o) o = c;
                    else if ("*" !== c && c !== o) {
                        if (a = l[c + " " + o] || l["* " + o], !a)
                            for (r in l)
                                if (s = r.split(" "), s[1] === o && (a = l[c + " " + s[0]] || l["* " + s[0]])) {
                                    a === !0 ? a = l[r] : l[r] !== !0 && (o = s[0], u.unshift(s[1]));
                                    break
                                }
                        if (a !== !0)
                            if (a && t["throws"]) e = a(e);
                            else try {
                                e = a(e)
                            } catch (d) {
                                return {
                                    state: "parsererror",
                                    error: a ? d : "No conversion from " + c + " to " + o
                                }
                            }
                    }
            return {
                state: "success",
                data: e
            }
        }

        function P() {
            try {
                return new t.XMLHttpRequest
            } catch (e) {}
        }

        function B() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function L() {
            return setTimeout(function() {
                Ze = e
            }), Ze = ut.now()
        }

        function R(t, e, n) {
            for (var i, r = (on[e] || []).concat(on["*"]), o = 0, a = r.length; a > o; o++)
                if (i = r[o].call(n, e, t)) return i
        }

        function F(t, e, n) {
            var i, r, o = 0,
                a = rn.length,
                s = ut.Deferred().always(function() {
                    delete c.elem
                }),
                c = function() {
                    if (r) return !1;
                    for (var e = Ze || L(), n = Math.max(0, l.startTime + l.duration - e), i = n / l.duration || 0, o = 1 - i, a = 0, c = l.tweens.length; c > a; a++) l.tweens[a].run(o);
                    return s.notifyWith(t, [l, o, n]), 1 > o && c ? n : (s.resolveWith(t, [l]), !1)
                },
                l = s.promise({
                    elem: t,
                    props: ut.extend({}, e),
                    opts: ut.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: e,
                    originalOptions: n,
                    startTime: Ze || L(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(e, n) {
                        var i = ut.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                        return l.tweens.push(i), i
                    },
                    stop: function(e) {
                        var n = 0,
                            i = e ? l.tweens.length : 0;
                        if (r) return this;
                        for (r = !0; i > n; n++) l.tweens[n].run(1);
                        return e ? s.resolveWith(t, [l, e]) : s.rejectWith(t, [l, e]), this
                    }
                }),
                u = l.props;
            for (q(u, l.opts.specialEasing); a > o; o++)
                if (i = rn[o].call(l, t, u, l.opts)) return i;
            return ut.map(u, R, l), ut.isFunction(l.opts.start) && l.opts.start.call(t, l), ut.fx.timer(ut.extend(c, {
                elem: t,
                anim: l,
                queue: l.opts.queue
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function q(t, e) {
            var n, i, r, o, a;
            for (n in t)
                if (i = ut.camelCase(n), r = e[i], o = t[n], ut.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), a = ut.cssHooks[i], a && "expand" in a) {
                    o = a.expand(o), delete t[i];
                    for (n in o) n in t || (t[n] = o[n], e[n] = r)
                } else e[i] = r
        }

        function H(t, e, n) {
            var i, r, o, a, s, c, l = this,
                u = {},
                d = t.style,
                p = t.nodeType && k(t),
                f = ut._data(t, "fxshow");
            n.queue || (s = ut._queueHooks(t, "fx"), null == s.unqueued && (s.unqueued = 0, c = s.empty.fire, s.empty.fire = function() {
                s.unqueued || c()
            }), s.unqueued++, l.always(function() {
                l.always(function() {
                    s.unqueued--, ut.queue(t, "fx").length || s.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === ut.css(t, "display") && "none" === ut.css(t, "float") && (ut.support.inlineBlockNeedsLayout && "inline" !== E(t.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", ut.support.shrinkWrapBlocks || l.always(function() {
                d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
            }));
            for (i in e)
                if (r = e[i], tn.exec(r)) {
                    if (delete e[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) continue;
                    u[i] = f && f[i] || ut.style(t, i)
                }
            if (!ut.isEmptyObject(u)) {
                f ? "hidden" in f && (p = f.hidden) : f = ut._data(t, "fxshow", {}), o && (f.hidden = !p), p ? ut(t).show() : l.done(function() {
                    ut(t).hide()
                }), l.done(function() {
                    var e;
                    ut._removeData(t, "fxshow");
                    for (e in u) ut.style(t, e, u[e])
                });
                for (i in u) a = R(p ? f[i] : 0, i, l), i in f || (f[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function U(t, e, n, i, r) {
            return new U.prototype.init(t, e, n, i, r)
        }

        function Y(t, e) {
            var n, i = {
                    height: t
                },
                r = 0;
            for (e = e ? 1 : 0; 4 > r; r += 2 - e) n = ke[r], i["margin" + n] = i["padding" + n] = t;
            return e && (i.opacity = i.width = t), i
        }

        function z(t) {
            return ut.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
        }
        var W, X, J = typeof e,
            G = t.location,
            V = t.document,
            Q = V.documentElement,
            Z = t.jQuery,
            K = t.$,
            tt = {},
            et = [],
            nt = "1.10.2",
            it = et.concat,
            rt = et.push,
            ot = et.slice,
            at = et.indexOf,
            st = tt.toString,
            ct = tt.hasOwnProperty,
            lt = nt.trim,
            ut = function(t, e) {
                return new ut.fn.init(t, e, X)
            },
            dt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            pt = /\S+/g,
            ft = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ht = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            mt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            gt = /^[\],:{}\s]*$/,
            vt = /(?:^|:|,)(?:\s*\[)+/g,
            yt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            bt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            wt = /^-ms-/,
            xt = /-([\da-z])/gi,
            _t = function(t, e) {
                return e.toUpperCase()
            },
            kt = function(t) {
                (V.addEventListener || "load" === t.type || "complete" === V.readyState) && (Tt(), ut.ready())
            },
            Tt = function() {
                V.addEventListener ? (V.removeEventListener("DOMContentLoaded", kt, !1), t.removeEventListener("load", kt, !1)) : (V.detachEvent("onreadystatechange", kt), t.detachEvent("onload", kt))
            };
        ut.fn = ut.prototype = {
            jquery: nt,
            constructor: ut,
            init: function(t, n, i) {
                var r, o;
                if (!t) return this;
                if ("string" == typeof t) {
                    if (r = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : ht.exec(t), !r || !r[1] && n) return !n || n.jquery ? (n || i).find(t) : this.constructor(n).find(t);
                    if (r[1]) {
                        if (n = n instanceof ut ? n[0] : n, ut.merge(this, ut.parseHTML(r[1], n && n.nodeType ? n.ownerDocument || n : V, !0)), mt.test(r[1]) && ut.isPlainObject(n))
                            for (r in n) ut.isFunction(this[r]) ? this[r](n[r]) : this.attr(r, n[r]);
                        return this
                    }
                    if (o = V.getElementById(r[2]), o && o.parentNode) {
                        if (o.id !== r[2]) return i.find(t);
                        this.length = 1, this[0] = o
                    }
                    return this.context = V, this.selector = t, this
                }
                return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ut.isFunction(t) ? i.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), ut.makeArray(t, this))
            },
            selector: "",
            length: 0,
            toArray: function() {
                return ot.call(this)
            },
            get: function(t) {
                return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
            },
            pushStack: function(t) {
                var e = ut.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            },
            each: function(t, e) {
                return ut.each(this, t, e)
            },
            ready: function(t) {
                return ut.ready.promise().done(t), this
            },
            slice: function() {
                return this.pushStack(ot.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    n = +t + (0 > t ? e : 0);
                return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
            },
            map: function(t) {
                return this.pushStack(ut.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: rt,
            sort: [].sort,
            splice: [].splice
        }, ut.fn.init.prototype = ut.fn, ut.extend = ut.fn.extend = function() {
            var t, n, i, r, o, a, s = arguments[0] || {},
                c = 1,
                l = arguments.length,
                u = !1;
            for ("boolean" == typeof s && (u = s, s = arguments[1] || {}, c = 2), "object" == typeof s || ut.isFunction(s) || (s = {}), l === c && (s = this, --c); l > c; c++)
                if (null != (o = arguments[c]))
                    for (r in o) t = s[r], i = o[r], s !== i && (u && i && (ut.isPlainObject(i) || (n = ut.isArray(i))) ? (n ? (n = !1, a = t && ut.isArray(t) ? t : []) : a = t && ut.isPlainObject(t) ? t : {}, s[r] = ut.extend(u, a, i)) : i !== e && (s[r] = i));
            return s
        }, ut.extend({
            expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
            noConflict: function(e) {
                return t.$ === ut && (t.$ = K), e && t.jQuery === ut && (t.jQuery = Z), ut
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(t) {
                t ? ut.readyWait++ : ut.ready(!0)
            },
            ready: function(t) {
                if (t === !0 ? !--ut.readyWait : !ut.isReady) {
                    if (!V.body) return setTimeout(ut.ready);
                    ut.isReady = !0, t !== !0 && --ut.readyWait > 0 || (W.resolveWith(V, [ut]), ut.fn.trigger && ut(V).trigger("ready").off("ready"))
                }
            },
            isFunction: function(t) {
                return "function" === ut.type(t)
            },
            isArray: Array.isArray || function(t) {
                return "array" === ut.type(t)
            },
            isWindow: function(t) {
                return null != t && t == t.window
            },
            isNumeric: function(t) {
                return !isNaN(parseFloat(t)) && isFinite(t)
            },
            type: function(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? tt[st.call(t)] || "object" : typeof t
            },
            isPlainObject: function(t) {
                var n;
                if (!t || "object" !== ut.type(t) || t.nodeType || ut.isWindow(t)) return !1;
                try {
                    if (t.constructor && !ct.call(t, "constructor") && !ct.call(t.constructor.prototype, "isPrototypeOf")) return !1
                } catch (i) {
                    return !1
                }
                if (ut.support.ownLast)
                    for (n in t) return ct.call(t, n);
                for (n in t);
                return n === e || ct.call(t, n)
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            error: function(t) {
                throw Error(t)
            },
            parseHTML: function(t, e, n) {
                if (!t || "string" != typeof t) return null;
                "boolean" == typeof e && (n = e, e = !1), e = e || V;
                var i = mt.exec(t),
                    r = !n && [];
                return i ? [e.createElement(i[1])] : (i = ut.buildFragment([t], e, r), r && ut(r).remove(), ut.merge([], i.childNodes))
            },
            parseJSON: function(n) {
                return t.JSON && t.JSON.parse ? t.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = ut.trim(n), n && gt.test(n.replace(yt, "@").replace(bt, "]").replace(vt, ""))) ? Function("return " + n)() : (ut.error("Invalid JSON: " + n), e)
            },
            parseXML: function(n) {
                var i, r;
                if (!n || "string" != typeof n) return null;
                try {
                    t.DOMParser ? (r = new DOMParser, i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
                } catch (o) {
                    i = e
                }
                return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ut.error("Invalid XML: " + n), i
            },
            noop: function() {},
            globalEval: function(e) {
                e && ut.trim(e) && (t.execScript || function(e) {
                    t.eval.call(t, e)
                })(e)
            },
            camelCase: function(t) {
                return t.replace(wt, "ms-").replace(xt, _t)
            },
            nodeName: function(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function(t, e, i) {
                var r, o = 0,
                    a = t.length,
                    s = n(t);
                if (i) {
                    if (s)
                        for (; a > o && (r = e.apply(t[o], i), r !== !1); o++);
                    else
                        for (o in t)
                            if (r = e.apply(t[o], i), r === !1) break
                } else if (s)
                    for (; a > o && (r = e.call(t[o], o, t[o]), r !== !1); o++);
                else
                    for (o in t)
                        if (r = e.call(t[o], o, t[o]), r === !1) break; return t
            },
            trim: lt && !lt.call("\ufeff ") ? function(t) {
                return null == t ? "" : lt.call(t)
            } : function(t) {
                return null == t ? "" : (t + "").replace(ft, "")
            },
            makeArray: function(t, e) {
                var i = e || [];
                return null != t && (n(Object(t)) ? ut.merge(i, "string" == typeof t ? [t] : t) : rt.call(i, t)), i
            },
            inArray: function(t, e, n) {
                var i;
                if (e) {
                    if (at) return at.call(e, t, n);
                    for (i = e.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                        if (n in e && e[n] === t) return n
                }
                return -1
            },
            merge: function(t, n) {
                var i = n.length,
                    r = t.length,
                    o = 0;
                if ("number" == typeof i)
                    for (; i > o; o++) t[r++] = n[o];
                else
                    for (; n[o] !== e;) t[r++] = n[o++];
                return t.length = r, t
            },
            grep: function(t, e, n) {
                var i, r = [],
                    o = 0,
                    a = t.length;
                for (n = !!n; a > o; o++) i = !!e(t[o], o), n !== i && r.push(t[o]);
                return r
            },
            map: function(t, e, i) {
                var r, o = 0,
                    a = t.length,
                    s = n(t),
                    c = [];
                if (s)
                    for (; a > o; o++) r = e(t[o], o, i), null != r && (c[c.length] = r);
                else
                    for (o in t) r = e(t[o], o, i), null != r && (c[c.length] = r);
                return it.apply([], c)
            },
            guid: 1,
            proxy: function(t, n) {
                var i, r, o;
                return "string" == typeof n && (o = t[n], n = t, t = o), ut.isFunction(t) ? (i = ot.call(arguments, 2), r = function() {
                    return t.apply(n || this, i.concat(ot.call(arguments)))
                }, r.guid = t.guid = t.guid || ut.guid++, r) : e
            },
            access: function(t, n, i, r, o, a, s) {
                var c = 0,
                    l = t.length,
                    u = null == i;
                if ("object" === ut.type(i)) {
                    o = !0;
                    for (c in i) ut.access(t, n, c, i[c], !0, a, s)
                } else if (r !== e && (o = !0, ut.isFunction(r) || (s = !0), u && (s ? (n.call(t, r), n = null) : (u = n, n = function(t, e, n) {
                        return u.call(ut(t), n)
                    })), n))
                    for (; l > c; c++) n(t[c], i, s ? r : r.call(t[c], c, n(t[c], i)));
                return o ? t : u ? n.call(t) : l ? n(t[0], i) : a
            },
            now: function() {
                return (new Date).getTime()
            },
            swap: function(t, e, n, i) {
                var r, o, a = {};
                for (o in e) a[o] = t.style[o], t.style[o] = e[o];
                r = n.apply(t, i || []);
                for (o in e) t.style[o] = a[o];
                return r
            }
        }), ut.ready.promise = function(e) {
            if (!W)
                if (W = ut.Deferred(), "complete" === V.readyState) setTimeout(ut.ready);
                else if (V.addEventListener) V.addEventListener("DOMContentLoaded", kt, !1), t.addEventListener("load", kt, !1);
                else {
                    V.attachEvent("onreadystatechange", kt), t.attachEvent("onload", kt);
                    var n = !1;
                    try {
                        n = null == t.frameElement && V.documentElement
                    } catch (i) {}
                    n && n.doScroll && function r() {
                        if (!ut.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (t) {
                                return setTimeout(r, 50)
                            }
                            Tt(), ut.ready()
                        }
                    }()
                }
            return W.promise(e)
        }, ut.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            tt["[object " + e + "]"] = e.toLowerCase()
        }), X = ut(V),
            function(t, e) {
                function n(t, e, n, i) {
                    var r, o, a, s, c, l, u, d, h, m;
                    if ((e ? e.ownerDocument || e : F) !== M && N(e), e = e || M, n = n || [], !t || "string" != typeof t) return n;
                    if (1 !== (s = e.nodeType) && 9 !== s) return [];
                    if (I && !i) {
                        if (r = bt.exec(t))
                            if (a = r[1]) {
                                if (9 === s) {
                                    if (o = e.getElementById(a), !o || !o.parentNode) return n;
                                    if (o.id === a) return n.push(o), n
                                } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(a)) && L(e, o) && o.id === a) return n.push(o), n
                            } else {
                                if (r[2]) return tt.apply(n, e.getElementsByTagName(t)), n;
                                if ((a = r[3]) && k.getElementsByClassName && e.getElementsByClassName) return tt.apply(n, e.getElementsByClassName(a)), n
                            }
                        if (k.qsa && (!O || !O.test(t))) {
                            if (d = u = R, h = e, m = 9 === s && t, 1 === s && "object" !== e.nodeName.toLowerCase()) {
                                for (l = p(t), (u = e.getAttribute("id")) ? d = u.replace(_t, "\\$&") : e.setAttribute("id", d), d = "[id='" + d + "'] ", c = l.length; c--;) l[c] = d + f(l[c]);
                                h = ft.test(t) && e.parentNode || e, m = l.join(",")
                            }
                            if (m) try {
                                return tt.apply(n, h.querySelectorAll(m)), n
                            } catch (g) {} finally {
                                u || e.removeAttribute("id")
                            }
                        }
                    }
                    return x(t.replace(lt, "$1"), e, n, i)
                }

                function i() {
                    function t(n, i) {
                        return e.push(n += " ") > C.cacheLength && delete t[e.shift()], t[n] = i
                    }
                    var e = [];
                    return t
                }

                function r(t) {
                    return t[R] = !0, t
                }

                function o(t) {
                    var e = M.createElement("div");
                    try {
                        return !!t(e)
                    } catch (n) {
                        return !1
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function a(t, e) {
                    for (var n = t.split("|"), i = t.length; i--;) C.attrHandle[n[i]] = e
                }

                function s(t, e) {
                    var n = e && t,
                        i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || G) - (~t.sourceIndex || G);
                    if (i) return i;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === e) return -1;
                    return t ? 1 : -1
                }

                function c(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return "input" === n && e.type === t
                    }
                }

                function l(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && e.type === t
                    }
                }

                function u(t) {
                    return r(function(e) {
                        return e = +e, r(function(n, i) {
                            for (var r, o = t([], n.length, e), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                        })
                    })
                }

                function d() {}

                function p(t, e) {
                    var i, r, o, a, s, c, l, u = Y[t + " "];
                    if (u) return e ? 0 : u.slice(0);
                    for (s = t, c = [], l = C.preFilter; s;) {
                        (!i || (r = dt.exec(s))) && (r && (s = s.slice(r[0].length) || s), c.push(o = [])), i = !1, (r = pt.exec(s)) && (i = r.shift(), o.push({
                            value: i,
                            type: r[0].replace(lt, " ")
                        }), s = s.slice(i.length));
                        for (a in C.filter) !(r = vt[a].exec(s)) || l[a] && !(r = l[a](r)) || (i = r.shift(), o.push({
                            value: i,
                            type: a,
                            matches: r
                        }), s = s.slice(i.length));
                        if (!i) break
                    }
                    return e ? s.length : s ? n.error(t) : Y(t, c).slice(0)
                }

                function f(t) {
                    for (var e = 0, n = t.length, i = ""; n > e; e++) i += t[e].value;
                    return i
                }

                function h(t, e, n) {
                    var i = e.dir,
                        r = n && "parentNode" === i,
                        o = H++;
                    return e.first ? function(e, n, o) {
                        for (; e = e[i];)
                            if (1 === e.nodeType || r) return t(e, n, o)
                    } : function(e, n, a) {
                        var s, c, l, u = q + " " + o;
                        if (a) {
                            for (; e = e[i];)
                                if ((1 === e.nodeType || r) && t(e, n, a)) return !0
                        } else
                            for (; e = e[i];)
                                if (1 === e.nodeType || r)
                                    if (l = e[R] || (e[R] = {}), (c = l[i]) && c[0] === u) {
                                        if ((s = c[1]) === !0 || s === T) return s === !0
                                    } else if (c = l[i] = [u], c[1] = t(e, n, a) || T, c[1] === !0) return !0
                    }
                }

                function m(t) {
                    return t.length > 1 ? function(e, n, i) {
                        for (var r = t.length; r--;)
                            if (!t[r](e, n, i)) return !1;
                        return !0
                    } : t[0]
                }

                function g(t, e, n, i, r) {
                    for (var o, a = [], s = 0, c = t.length, l = null != e; c > s; s++)(o = t[s]) && (!n || n(o, i, r)) && (a.push(o), l && e.push(s));
                    return a
                }

                function v(t, e, n, i, o, a) {
                    return i && !i[R] && (i = v(i)), o && !o[R] && (o = v(o, a)), r(function(r, a, s, c) {
                        var l, u, d, p = [],
                            f = [],
                            h = a.length,
                            m = r || w(e || "*", s.nodeType ? [s] : s, []),
                            v = !t || !r && e ? m : g(m, p, t, s, c),
                            y = n ? o || (r ? t : h || i) ? [] : a : v;
                        if (n && n(v, y, s, c), i)
                            for (l = g(y, f), i(l, [], s, c), u = l.length; u--;)(d = l[u]) && (y[f[u]] = !(v[f[u]] = d));
                        if (r) {
                            if (o || t) {
                                if (o) {
                                    for (l = [], u = y.length; u--;)(d = y[u]) && l.push(v[u] = d);
                                    o(null, y = [], l, c)
                                }
                                for (u = y.length; u--;)(d = y[u]) && (l = o ? nt.call(r, d) : p[u]) > -1 && (r[l] = !(a[l] = d))
                            }
                        } else y = g(y === a ? y.splice(h, y.length) : y), o ? o(null, a, y, c) : tt.apply(a, y)
                    })
                }

                function y(t) {
                    for (var e, n, i, r = t.length, o = C.relative[t[0].type], a = o || C.relative[" "], s = o ? 1 : 0, c = h(function(t) {
                        return t === e
                    }, a, !0), l = h(function(t) {
                        return nt.call(e, t) > -1
                    }, a, !0), u = [function(t, n, i) {
                        return !o && (i || n !== A) || ((e = n).nodeType ? c(t, n, i) : l(t, n, i))
                    }]; r > s; s++)
                        if (n = C.relative[t[s].type]) u = [h(m(u), n)];
                        else {
                            if (n = C.filter[t[s].type].apply(null, t[s].matches), n[R]) {
                                for (i = ++s; r > i && !C.relative[t[i].type]; i++);
                                return v(s > 1 && m(u), s > 1 && f(t.slice(0, s - 1).concat({
                                    value: " " === t[s - 2].type ? "*" : ""
                                })).replace(lt, "$1"), n, i > s && y(t.slice(s, i)), r > i && y(t = t.slice(i)), r > i && f(t))
                            }
                            u.push(n)
                        }
                    return m(u)
                }

                function b(t, e) {
                    var i = 0,
                        o = e.length > 0,
                        a = t.length > 0,
                        s = function(r, s, c, l, u) {
                            var d, p, f, h = [],
                                m = 0,
                                v = "0",
                                y = r && [],
                                b = null != u,
                                w = A,
                                x = r || a && C.find.TAG("*", u && s.parentNode || s),
                                _ = q += null == w ? 1 : Math.random() || .1;
                            for (b && (A = s !== M && s, T = i); null != (d = x[v]); v++) {
                                if (a && d) {
                                    for (p = 0; f = t[p++];)
                                        if (f(d, s, c)) {
                                            l.push(d);
                                            break
                                        }
                                    b && (q = _, T = ++i)
                                }
                                o && ((d = !f && d) && m--, r && y.push(d))
                            }
                            if (m += v, o && v !== m) {
                                for (p = 0; f = e[p++];) f(y, h, s, c);
                                if (r) {
                                    if (m > 0)
                                        for (; v--;) y[v] || h[v] || (h[v] = Z.call(l));
                                    h = g(h)
                                }
                                tt.apply(l, h), b && !r && h.length > 0 && m + e.length > 1 && n.uniqueSort(l)
                            }
                            return b && (q = _, A = w), y
                        };
                    return o ? r(s) : s
                }

                function w(t, e, i) {
                    for (var r = 0, o = e.length; o > r; r++) n(t, e[r], i);
                    return i
                }

                function x(t, e, n, i) {
                    var r, o, a, s, c, l = p(t);
                    if (!i && 1 === l.length) {
                        if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && k.getById && 9 === e.nodeType && I && C.relative[o[1].type]) {
                            if (e = (C.find.ID(a.matches[0].replace(kt, Tt), e) || [])[0], !e) return n;
                            t = t.slice(o.shift().value.length)
                        }
                        for (r = vt.needsContext.test(t) ? 0 : o.length; r-- && (a = o[r], !C.relative[s = a.type]);)
                            if ((c = C.find[s]) && (i = c(a.matches[0].replace(kt, Tt), ft.test(o[0].type) && e.parentNode || e))) {
                                if (o.splice(r, 1), t = i.length && f(o), !t) return tt.apply(n, i), n;
                                break
                            }
                    }
                    return E(t, l)(i, e, !I, n, ft.test(t)), n
                }
                var _, k, T, C, S, D, E, A, $, N, M, j, I, O, P, B, L, R = "sizzle" + -new Date,
                    F = t.document,
                    q = 0,
                    H = 0,
                    U = i(),
                    Y = i(),
                    z = i(),
                    W = !1,
                    X = function(t, e) {
                        return t === e ? (W = !0, 0) : 0
                    },
                    J = typeof e,
                    G = 1 << 31,
                    V = {}.hasOwnProperty,
                    Q = [],
                    Z = Q.pop,
                    K = Q.push,
                    tt = Q.push,
                    et = Q.slice,
                    nt = Q.indexOf || function(t) {
                            for (var e = 0, n = this.length; n > e; e++)
                                if (this[e] === t) return e;
                            return -1
                        },
                    it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    rt = "[\\x20\\t\\r\\n\\f]",
                    ot = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    at = ot.replace("w", "w#"),
                    st = "\\[" + rt + "*(" + ot + ")" + rt + "*(?:([*^$|!~]?=)" + rt + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + at + ")|)|)" + rt + "*\\]",
                    ct = ":(" + ot + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + st.replace(3, 8) + ")*)|.*)\\)|)",
                    lt = RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"),
                    dt = RegExp("^" + rt + "*," + rt + "*"),
                    pt = RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"),
                    ft = RegExp(rt + "*[+~]"),
                    ht = RegExp("=" + rt + "*([^\\]'\"]*)" + rt + "*\\]", "g"),
                    mt = RegExp(ct),
                    gt = RegExp("^" + at + "$"),
                    vt = {
                        ID: RegExp("^#(" + ot + ")"),
                        CLASS: RegExp("^\\.(" + ot + ")"),
                        TAG: RegExp("^(" + ot.replace("w", "w*") + ")"),
                        ATTR: RegExp("^" + st),
                        PSEUDO: RegExp("^" + ct),
                        CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
                        bool: RegExp("^(?:" + it + ")$", "i"),
                        needsContext: RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
                    },
                    yt = /^[^{]+\{\s*\[native \w/,
                    bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    wt = /^(?:input|select|textarea|button)$/i,
                    xt = /^h\d$/i,
                    _t = /'|\\/g,
                    kt = RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"),
                    Tt = function(t, e, n) {
                        var i = "0x" + e - 65536;
                        return i !== i || n ? e : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
                    };
                try {
                    tt.apply(Q = et.call(F.childNodes), F.childNodes), Q[F.childNodes.length].nodeType
                } catch (Ct) {
                    tt = {
                        apply: Q.length ? function(t, e) {
                            K.apply(t, et.call(e))
                        } : function(t, e) {
                            for (var n = t.length, i = 0; t[n++] = e[i++];);
                            t.length = n - 1
                        }
                    }
                }
                D = n.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return e ? "HTML" !== e.nodeName : !1
                }, k = n.support = {}, N = n.setDocument = function(t) {
                    var n = t ? t.ownerDocument || t : F,
                        i = n.defaultView;
                    return n !== M && 9 === n.nodeType && n.documentElement ? (M = n, j = n.documentElement, I = !D(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() {
                        N()
                    }), k.attributes = o(function(t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), k.getElementsByTagName = o(function(t) {
                        return t.appendChild(n.createComment("")), !t.getElementsByTagName("*").length
                    }), k.getElementsByClassName = o(function(t) {
                        return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
                    }), k.getById = o(function(t) {
                        return j.appendChild(t).id = R, !n.getElementsByName || !n.getElementsByName(R).length
                    }), k.getById ? (C.find.ID = function(t, e) {
                        if (typeof e.getElementById !== J && I) {
                            var n = e.getElementById(t);
                            return n && n.parentNode ? [n] : []
                        }
                    }, C.filter.ID = function(t) {
                        var e = t.replace(kt, Tt);
                        return function(t) {
                            return t.getAttribute("id") === e
                        }
                    }) : (delete C.find.ID, C.filter.ID = function(t) {
                        var e = t.replace(kt, Tt);
                        return function(t) {
                            var n = typeof t.getAttributeNode !== J && t.getAttributeNode("id");
                            return n && n.value === e
                        }
                    }), C.find.TAG = k.getElementsByTagName ? function(t, n) {
                        return typeof n.getElementsByTagName !== J ? n.getElementsByTagName(t) : e
                    } : function(t, e) {
                        var n, i = [],
                            r = 0,
                            o = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                            return i
                        }
                        return o
                    }, C.find.CLASS = k.getElementsByClassName && function(t, n) {
                        return typeof n.getElementsByClassName !== J && I ? n.getElementsByClassName(t) : e
                    }, P = [], O = [], (k.qsa = yt.test(n.querySelectorAll)) && (o(function(t) {
                        t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || O.push("\\[" + rt + "*(?:value|" + it + ")"), t.querySelectorAll(":checked").length || O.push(":checked")
                    }), o(function(t) {
                        var e = n.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("t", ""), t.querySelectorAll("[t^='']").length && O.push("[*^$]=" + rt + "*(?:''|\"\")"), t.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), O.push(",.*:")
                    })), (k.matchesSelector = yt.test(B = j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && o(function(t) {
                        k.disconnectedMatch = B.call(t, "div"), B.call(t, "[s!='']:x"), P.push("!=", ct)
                    }), O = O.length && RegExp(O.join("|")), P = P.length && RegExp(P.join("|")), L = yt.test(j.contains) || j.compareDocumentPosition ? function(t, e) {
                        var n = 9 === t.nodeType ? t.documentElement : t,
                            i = e && e.parentNode;
                        return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                    } : function(t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return !0;
                        return !1
                    }, X = j.compareDocumentPosition ? function(t, e) {
                        if (t === e) return W = !0, 0;
                        var i = e.compareDocumentPosition && t.compareDocumentPosition && t.compareDocumentPosition(e);
                        return i ? 1 & i || !k.sortDetached && e.compareDocumentPosition(t) === i ? t === n || L(F, t) ? -1 : e === n || L(F, e) ? 1 : $ ? nt.call($, t) - nt.call($, e) : 0 : 4 & i ? -1 : 1 : t.compareDocumentPosition ? -1 : 1
                    } : function(t, e) {
                        var i, r = 0,
                            o = t.parentNode,
                            a = e.parentNode,
                            c = [t],
                            l = [e];
                        if (t === e) return W = !0, 0;
                        if (!o || !a) return t === n ? -1 : e === n ? 1 : o ? -1 : a ? 1 : $ ? nt.call($, t) - nt.call($, e) : 0;
                        if (o === a) return s(t, e);
                        for (i = t; i = i.parentNode;) c.unshift(i);
                        for (i = e; i = i.parentNode;) l.unshift(i);
                        for (; c[r] === l[r];) r++;
                        return r ? s(c[r], l[r]) : c[r] === F ? -1 : l[r] === F ? 1 : 0
                    }, n) : M
                }, n.matches = function(t, e) {
                    return n(t, null, null, e)
                }, n.matchesSelector = function(t, e) {
                    if ((t.ownerDocument || t) !== M && N(t), e = e.replace(ht, "='$1']"), !(!k.matchesSelector || !I || P && P.test(e) || O && O.test(e))) try {
                        var i = B.call(t, e);
                        if (i || k.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                    } catch (r) {}
                    return n(e, M, null, [t]).length > 0
                }, n.contains = function(t, e) {
                    return (t.ownerDocument || t) !== M && N(t), L(t, e)
                }, n.attr = function(t, n) {
                    (t.ownerDocument || t) !== M && N(t);
                    var i = C.attrHandle[n.toLowerCase()],
                        r = i && V.call(C.attrHandle, n.toLowerCase()) ? i(t, n, !I) : e;
                    return r === e ? k.attributes || !I ? t.getAttribute(n) : (r = t.getAttributeNode(n)) && r.specified ? r.value : null : r
                }, n.error = function(t) {
                    throw Error("Syntax error, unrecognized expression: " + t)
                }, n.uniqueSort = function(t) {
                    var e, n = [],
                        i = 0,
                        r = 0;
                    if (W = !k.detectDuplicates, $ = !k.sortStable && t.slice(0), t.sort(X), W) {
                        for (; e = t[r++];) e === t[r] && (i = n.push(r));
                        for (; i--;) t.splice(n[i], 1)
                    }
                    return t
                }, S = n.getText = function(t) {
                    var e, n = "",
                        i = 0,
                        r = t.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) n += S(t)
                        } else if (3 === r || 4 === r) return t.nodeValue
                    } else
                        for (; e = t[i]; i++) n += S(e);
                    return n
                }, C = n.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: vt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(kt, Tt), t[3] = (t[4] || t[5] || "").replace(kt, Tt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || n.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && n.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var n, i = !t[5] && t[2];
                            return vt.CHILD.test(t[0]) ? null : (t[3] && t[4] !== e ? t[2] = t[4] : i && mt.test(i) && (n = p(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (t[0] = t[0].slice(0, n), t[2] = i.slice(0, n)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(kt, Tt).toLowerCase();
                            return "*" === t ? function() {
                                return !0
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function(t) {
                            var e = U[t + " "];
                            return e || (e = RegExp("(^|" + rt + ")" + t + "(" + rt + "|$)")) && U(t, function(t) {
                                    return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== J && t.getAttribute("class") || "")
                                })
                        },
                        ATTR: function(t, e, i) {
                            return function(r) {
                                var o = n.attr(r, t);
                                return null == o ? "!=" === e : e ? (o += "", "=" === e ? o === i : "!=" === e ? o !== i : "^=" === e ? i && 0 === o.indexOf(i) : "*=" === e ? i && o.indexOf(i) > -1 : "$=" === e ? i && o.slice(-i.length) === i : "~=" === e ? (" " + o + " ").indexOf(i) > -1 : "|=" === e ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
                            }
                        },
                        CHILD: function(t, e, n, i, r) {
                            var o = "nth" !== t.slice(0, 3),
                                a = "last" !== t.slice(-4),
                                s = "of-type" === e;
                            return 1 === i && 0 === r ? function(t) {
                                return !!t.parentNode
                            } : function(e, n, c) {
                                var l, u, d, p, f, h, m = o !== a ? "nextSibling" : "previousSibling",
                                    g = e.parentNode,
                                    v = s && e.nodeName.toLowerCase(),
                                    y = !c && !s;
                                if (g) {
                                    if (o) {
                                        for (; m;) {
                                            for (d = e; d = d[m];)
                                                if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                            h = m = "only" === t && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                        for (u = g[R] || (g[R] = {}), l = u[t] || [], f = l[0] === q && l[1], p = l[0] === q && l[2], d = f && g.childNodes[f]; d = ++f && d && d[m] || (p = f = 0) || h.pop();)
                                            if (1 === d.nodeType && ++p && d === e) {
                                                u[t] = [q, f, p];
                                                break
                                            }
                                    } else if (y && (l = (e[R] || (e[R] = {}))[t]) && l[0] === q) p = l[1];
                                    else
                                        for (;
                                            (d = ++f && d && d[m] || (p = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++p || (y && ((d[R] || (d[R] = {}))[t] = [q, p]), d !== e)););
                                    return p -= r, p === i || 0 === p % i && p / i >= 0
                                }
                            }
                        },
                        PSEUDO: function(t, e) {
                            var i, o = C.pseudos[t] || C.setFilters[t.toLowerCase()] || n.error("unsupported pseudo: " + t);
                            return o[R] ? o(e) : o.length > 1 ? (i = [t, t, "", e], C.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(t, n) {
                                for (var i, r = o(t, e), a = r.length; a--;) i = nt.call(t, r[a]), t[i] = !(n[i] = r[a])
                            }) : function(t) {
                                return o(t, 0, i)
                            }) : o
                        }
                    },
                    pseudos: {
                        not: r(function(t) {
                            var e = [],
                                n = [],
                                i = E(t.replace(lt, "$1"));
                            return i[R] ? r(function(t, e, n, r) {
                                for (var o, a = i(t, null, r, []), s = t.length; s--;)(o = a[s]) && (t[s] = !(e[s] = o))
                            }) : function(t, r, o) {
                                return e[0] = t, i(e, null, o, n), !n.pop()
                            }
                        }),
                        has: r(function(t) {
                            return function(e) {
                                return n(t, e).length > 0
                            }
                        }),
                        contains: r(function(t) {
                            return function(e) {
                                return (e.textContent || e.innerText || S(e)).indexOf(t) > -1
                            }
                        }),
                        lang: r(function(t) {
                            return gt.test(t || "") || n.error("unsupported lang: " + t), t = t.replace(kt, Tt).toLowerCase(),
                                function(e) {
                                    var n;
                                    do
                                        if (n = I ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-");
                                    while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function(e) {
                            var n = t.location && t.location.hash;
                            return n && n.slice(1) === e.id
                        },
                        root: function(t) {
                            return t === j
                        },
                        focus: function(t) {
                            return t === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: function(t) {
                            return t.disabled === !1
                        },
                        disabled: function(t) {
                            return t.disabled === !0
                        },
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeName > "@" || 3 === t.nodeType || 4 === t.nodeType) return !1;
                            return !0
                        },
                        parent: function(t) {
                            return !C.pseudos.empty(t)
                        },
                        header: function(t) {
                            return xt.test(t.nodeName)
                        },
                        input: function(t) {
                            return wt.test(t.nodeName)
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || e.toLowerCase() === t.type)
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(t, e) {
                            return [e - 1]
                        }),
                        eq: u(function(t, e, n) {
                            return [0 > n ? n + e : n]
                        }),
                        even: u(function(t, e) {
                            for (var n = 0; e > n; n += 2) t.push(n);
                            return t
                        }),
                        odd: u(function(t, e) {
                            for (var n = 1; e > n; n += 2) t.push(n);
                            return t
                        }),
                        lt: u(function(t, e, n) {
                            for (var i = 0 > n ? n + e : n; --i >= 0;) t.push(i);
                            return t
                        }),
                        gt: u(function(t, e, n) {
                            for (var i = 0 > n ? n + e : n; e > ++i;) t.push(i);
                            return t
                        })
                    }
                }, C.pseudos.nth = C.pseudos.eq;
                for (_ in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) C.pseudos[_] = c(_);
                for (_ in {
                    submit: !0,
                    reset: !0
                }) C.pseudos[_] = l(_);
                d.prototype = C.filters = C.pseudos, C.setFilters = new d, E = n.compile = function(t, e) {
                    var n, i = [],
                        r = [],
                        o = z[t + " "];
                    if (!o) {
                        for (e || (e = p(t)), n = e.length; n--;) o = y(e[n]), o[R] ? i.push(o) : r.push(o);
                        o = z(t, b(r, i))
                    }
                    return o
                }, k.sortStable = R.split("").sort(X).join("") === R, k.detectDuplicates = W, N(), k.sortDetached = o(function(t) {
                    return 1 & t.compareDocumentPosition(M.createElement("div"))
                }), o(function(t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                }) || a("type|href|height|width", function(t, n, i) {
                    return i ? e : t.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2)
                }), k.attributes && o(function(t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                }) || a("value", function(t, n, i) {
                    return i || "input" !== t.nodeName.toLowerCase() ? e : t.defaultValue
                }), o(function(t) {
                    return null == t.getAttribute("disabled")
                }) || a(it, function(t, n, i) {
                    var r;
                    return i ? e : (r = t.getAttributeNode(n)) && r.specified ? r.value : t[n] === !0 ? n.toLowerCase() : null
                }), ut.find = n, ut.expr = n.selectors, ut.expr[":"] = ut.expr.pseudos, ut.unique = n.uniqueSort, ut.text = n.getText, ut.isXMLDoc = n.isXML, ut.contains = n.contains
            }(t);
        var Ct = {};
        ut.Callbacks = function(t) {
            t = "string" == typeof t ? Ct[t] || i(t) : ut.extend({}, t);
            var n, r, o, a, s, c, l = [],
                u = !t.once && [],
                d = function(e) {
                    for (r = t.memory && e, o = !0, s = c || 0, c = 0, a = l.length, n = !0; l && a > s; s++)
                        if (l[s].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                            r = !1;
                            break
                        }
                    n = !1, l && (u ? u.length && d(u.shift()) : r ? l = [] : p.disable())
                },
                p = {
                    add: function() {
                        if (l) {
                            var e = l.length;
                            ! function i(e) {
                                ut.each(e, function(e, n) {
                                    var r = ut.type(n);
                                    "function" === r ? t.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n)
                                })
                            }(arguments), n ? a = l.length : r && (c = e, d(r))
                        }
                        return this
                    },
                    remove: function() {
                        return l && ut.each(arguments, function(t, e) {
                            for (var i;
                                 (i = ut.inArray(e, l, i)) > -1;) l.splice(i, 1), n && (a >= i && a--, s >= i && s--)
                        }), this
                    },
                    has: function(t) {
                        return t ? ut.inArray(t, l) > -1 : !(!l || !l.length)
                    },
                    empty: function() {
                        return l = [], a = 0, this
                    },
                    disable: function() {
                        return l = u = r = e, this
                    },
                    disabled: function() {
                        return !l
                    },
                    lock: function() {
                        return u = e, r || p.disable(), this
                    },
                    locked: function() {
                        return !u
                    },
                    fireWith: function(t, e) {
                        return !l || o && !u || (e = e || [], e = [t, e.slice ? e.slice() : e], n ? u.push(e) : d(e)), this
                    },
                    fire: function() {
                        return p.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!o
                    }
                };
            return p
        }, ut.extend({
            Deferred: function(t) {
                var e = [
                        ["resolve", "done", ut.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ut.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ut.Callbacks("memory")]
                    ],
                    n = "pending",
                    i = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return r.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var t = arguments;
                            return ut.Deferred(function(n) {
                                ut.each(e, function(e, o) {
                                    var a = o[0],
                                        s = ut.isFunction(t[e]) && t[e];
                                    r[o[1]](function() {
                                        var t = s && s.apply(this, arguments);
                                        t && ut.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === i ? n.promise() : this, s ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? ut.extend(t, i) : i
                        }
                    },
                    r = {};
                return i.pipe = i.then, ut.each(e, function(t, o) {
                    var a = o[2],
                        s = o[3];
                    i[o[1]] = a.add, s && a.add(function() {
                        n = s
                    }, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function() {
                        return r[o[0] + "With"](this === r ? i : this, arguments), this
                    }, r[o[0] + "With"] = a.fireWith
                }), i.promise(r), t && t.call(r, r), r
            },
            when: function(t) {
                var e, n, i, r = 0,
                    o = ot.call(arguments),
                    a = o.length,
                    s = 1 !== a || t && ut.isFunction(t.promise) ? a : 0,
                    c = 1 === s ? t : ut.Deferred(),
                    l = function(t, n, i) {
                        return function(r) {
                            n[t] = this, i[t] = arguments.length > 1 ? ot.call(arguments) : r, i === e ? c.notifyWith(n, i) : --s || c.resolveWith(n, i)
                        }
                    };
                if (a > 1)
                    for (e = Array(a), n = Array(a), i = Array(a); a > r; r++) o[r] && ut.isFunction(o[r].promise) ? o[r].promise().done(l(r, i, o)).fail(c.reject).progress(l(r, n, e)) : --s;
                return s || c.resolveWith(i, o), c.promise()
            }
        }), ut.support = function(e) {
            var n, i, r, o, a, s, c, l, u, d = V.createElement("div");
            if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], i = d.getElementsByTagName("a")[0], !i || !i.style || !n.length) return e;
            o = V.createElement("select"), s = o.appendChild(V.createElement("option")), r = d.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", e.getSetAttribute = "t" !== d.className, e.leadingWhitespace = 3 === d.firstChild.nodeType, e.tbody = !d.getElementsByTagName("tbody").length, e.htmlSerialize = !!d.getElementsByTagName("link").length, e.style = /top/.test(i.getAttribute("style")), e.hrefNormalized = "/a" === i.getAttribute("href"), e.opacity = /^0.5/.test(i.style.opacity), e.cssFloat = !!i.style.cssFloat, e.checkOn = !!r.value, e.optSelected = s.selected, e.enctype = !!V.createElement("form").enctype, e.html5Clone = "<:nav></:nav>" !== V.createElement("nav").cloneNode(!0).outerHTML, e.inlineBlockNeedsLayout = !1, e.shrinkWrapBlocks = !1, e.pixelPosition = !1, e.deleteExpando = !0, e.noCloneEvent = !0, e.reliableMarginRight = !0, e.boxSizingReliable = !0, r.checked = !0, e.noCloneChecked = r.cloneNode(!0).checked, o.disabled = !0, e.optDisabled = !s.disabled;
            try {
                delete d.test
            } catch (p) {
                e.deleteExpando = !1
            }
            r = V.createElement("input"), r.setAttribute("value", ""), e.input = "" === r.getAttribute("value"), r.value = "t", r.setAttribute("type", "radio"), e.radioValue = "t" === r.value, r.setAttribute("checked", "t"), r.setAttribute("name", "t"), a = V.createDocumentFragment(), a.appendChild(r), e.appendChecked = r.checked, e.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() {
                e.noCloneEvent = !1
            }), d.cloneNode(!0).click());
            for (u in {
                submit: !0,
                change: !0,
                focusin: !0
            }) d.setAttribute(c = "on" + u, "t"), e[u + "Bubbles"] = c in t || d.attributes[c].expando === !1;
            d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", e.clearCloneStyle = "content-box" === d.style.backgroundClip;
            for (u in ut(e)) break;
            return e.ownLast = "0" !== u, ut(function() {
                var n, i, r, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    a = V.getElementsByTagName("body")[0];
                a && (n = V.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = d.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", e.reliableHiddenOffsets = l && 0 === r[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ut.swap(a, null != a.style.zoom ? {
                    zoom: 1
                } : {}, function() {
                    e.boxSizing = 4 === d.offsetWidth
                }), t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(d, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(d, null) || {
                    width: "4px"
                }).width, i = d.appendChild(V.createElement("div")), i.style.cssText = d.style.cssText = o, i.style.marginRight = i.style.width = "0", d.style.width = "1px", e.reliableMarginRight = !parseFloat((t.getComputedStyle(i, null) || {}).marginRight)), typeof d.style.zoom !== J && (d.innerHTML = "", d.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", e.shrinkWrapBlocks = 3 !== d.offsetWidth, e.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = d = r = i = null)
            }), n = o = a = s = i = r = null, e
        }({});
        var St = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            Dt = /([A-Z])/g;
        ut.extend({
            cache: {},
            noData: {
                applet: !0,
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(t) {
                return t = t.nodeType ? ut.cache[t[ut.expando]] : t[ut.expando], !!t && !s(t)
            },
            data: function(t, e, n) {
                return r(t, e, n)
            },
            removeData: function(t, e) {
                return o(t, e)
            },
            _data: function(t, e, n) {
                return r(t, e, n, !0)
            },
            _removeData: function(t, e) {
                return o(t, e, !0)
            },
            acceptData: function(t) {
                if (t.nodeType && 1 !== t.nodeType && 9 !== t.nodeType) return !1;
                var e = t.nodeName && ut.noData[t.nodeName.toLowerCase()];
                return !e || e !== !0 && t.getAttribute("classid") === e
            }
        }), ut.fn.extend({
            data: function(t, n) {
                var i, r, o = null,
                    s = 0,
                    c = this[0];
                if (t === e) {
                    if (this.length && (o = ut.data(c), 1 === c.nodeType && !ut._data(c, "parsedAttrs"))) {
                        for (i = c.attributes; i.length > s; s++) r = i[s].name, 0 === r.indexOf("data-") && (r = ut.camelCase(r.slice(5)), a(c, r, o[r]));
                        ut._data(c, "parsedAttrs", !0)
                    }
                    return o
                }
                return "object" == typeof t ? this.each(function() {
                    ut.data(this, t)
                }) : arguments.length > 1 ? this.each(function() {
                    ut.data(this, t, n)
                }) : c ? a(c, t, ut.data(c, t)) : null
            },
            removeData: function(t) {
                return this.each(function() {
                    ut.removeData(this, t)
                })
            }
        }), ut.extend({
            queue: function(t, n, i) {
                var r;
                return t ? (n = (n || "fx") + "queue", r = ut._data(t, n), i && (!r || ut.isArray(i) ? r = ut._data(t, n, ut.makeArray(i)) : r.push(i)), r || []) : e
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var n = ut.queue(t, e),
                    i = n.length,
                    r = n.shift(),
                    o = ut._queueHooks(t, e),
                    a = function() {
                        ut.dequeue(t, e)
                    };
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, a, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function(t, e) {
                var n = e + "queueHooks";
                return ut._data(t, n) || ut._data(t, n, {
                        empty: ut.Callbacks("once memory").add(function() {
                            ut._removeData(t, e + "queue"), ut._removeData(t, n)
                        })
                    })
            }
        }), ut.fn.extend({
            queue: function(t, n) {
                var i = 2;
                return "string" != typeof t && (n = t, t = "fx", i--), i > arguments.length ? ut.queue(this[0], t) : n === e ? this : this.each(function() {
                    var e = ut.queue(this, t, n);
                    ut._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && ut.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    ut.dequeue(this, t)
                })
            },
            delay: function(t, e) {
                return t = ut.fx ? ut.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                    var i = setTimeout(e, t);
                    n.stop = function() {
                        clearTimeout(i)
                    }
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, n) {
                var i, r = 1,
                    o = ut.Deferred(),
                    a = this,
                    s = this.length,
                    c = function() {
                        --r || o.resolveWith(a, [a])
                    };
                for ("string" != typeof t && (n = t, t = e), t = t || "fx"; s--;) i = ut._data(a[s], t + "queueHooks"), i && i.empty && (r++, i.empty.add(c));
                return c(), o.promise(n)
            }
        });
        var Et, At, $t = /[\t\r\n\f]/g,
            Nt = /\r/g,
            Mt = /^(?:input|select|textarea|button|object)$/i,
            jt = /^(?:a|area)$/i,
            It = /^(?:checked|selected)$/i,
            Ot = ut.support.getSetAttribute,
            Pt = ut.support.input;
        ut.fn.extend({
            attr: function(t, e) {
                return ut.access(this, ut.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    ut.removeAttr(this, t)
                })
            },
            prop: function(t, e) {
                return ut.access(this, ut.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return t = ut.propFix[t] || t, this.each(function() {
                    try {
                        this[t] = e, delete this[t]
                    } catch (n) {}
                })
            },
            addClass: function(t) {
                var e, n, i, r, o, a = 0,
                    s = this.length,
                    c = "string" == typeof t && t;
                if (ut.isFunction(t)) return this.each(function(e) {
                    ut(this).addClass(t.call(this, e, this.className))
                });
                if (c)
                    for (e = (t || "").match(pt) || []; s > a; a++)
                        if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace($t, " ") : " ")) {
                            for (o = 0; r = e[o++];) 0 > i.indexOf(" " + r + " ") && (i += r + " ");
                            n.className = ut.trim(i)
                        }
                return this
            },
            removeClass: function(t) {
                var e, n, i, r, o, a = 0,
                    s = this.length,
                    c = 0 === arguments.length || "string" == typeof t && t;
                if (ut.isFunction(t)) return this.each(function(e) {
                    ut(this).removeClass(t.call(this, e, this.className))
                });
                if (c)
                    for (e = (t || "").match(pt) || []; s > a; a++)
                        if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace($t, " ") : "")) {
                            for (o = 0; r = e[o++];)
                                for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                            n.className = t ? ut.trim(i) : ""
                        }
                return this
            },
            toggleClass: function(t, e) {
                var n = typeof t;
                return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : this.each(ut.isFunction(t) ? function(n) {
                    ut(this).toggleClass(t.call(this, n, this.className, e), e)
                } : function() {
                    if ("string" === n)
                        for (var e, i = 0, r = ut(this), o = t.match(pt) || []; e = o[i++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                    else(n === J || "boolean" === n) && (this.className && ut._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : ut._data(this, "__className__") || "")
                })
            },
            hasClass: function(t) {
                for (var e = " " + t + " ", n = 0, i = this.length; i > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace($t, " ").indexOf(e) >= 0) return !0;
                return !1
            },
            val: function(t) {
                var n, i, r, o = this[0];
                return arguments.length ? (r = ut.isFunction(t), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (o = r ? t.call(this, n, ut(this).val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : ut.isArray(o) && (o = ut.map(o, function(t) {
                        return null == t ? "" : t + ""
                    })), i = ut.valHooks[this.type] || ut.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, o, "value") !== e || (this.value = o))
                })) : o ? (i = ut.valHooks[o.type] || ut.valHooks[o.nodeName.toLowerCase()], i && "get" in i && (n = i.get(o, "value")) !== e ? n : (n = o.value, "string" == typeof n ? n.replace(Nt, "") : null == n ? "" : n)) : void 0
            }
        }), ut.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = ut.find.attr(t, "value");
                        return null != e ? e : t.text
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, n, i = t.options, r = t.selectedIndex, o = "select-one" === t.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, c = 0 > r ? s : o ? r : 0; s > c; c++)
                            if (n = i[c], !(!n.selected && c !== r || (ut.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ut.nodeName(n.parentNode, "optgroup"))) {
                                if (e = ut(n).val(), o) return e;
                                a.push(e)
                            }
                        return a
                    },
                    set: function(t, e) {
                        for (var n, i, r = t.options, o = ut.makeArray(e), a = r.length; a--;) i = r[a], (i.selected = ut.inArray(ut(i).val(), o) >= 0) && (n = !0);
                        return n || (t.selectedIndex = -1), o
                    }
                }
            },
            attr: function(t, n, i) {
                var r, o, a = t.nodeType;
                return t && 3 !== a && 8 !== a && 2 !== a ? typeof t.getAttribute === J ? ut.prop(t, n, i) : (1 === a && ut.isXMLDoc(t) || (n = n.toLowerCase(), r = ut.attrHooks[n] || (ut.expr.match.bool.test(n) ? At : Et)), i === e ? r && "get" in r && null !== (o = r.get(t, n)) ? o : (o = ut.find.attr(t, n), null == o ? e : o) : null !== i ? r && "set" in r && (o = r.set(t, i, n)) !== e ? o : (t.setAttribute(n, i + ""), i) : (ut.removeAttr(t, n), e)) : void 0
            },
            removeAttr: function(t, e) {
                var n, i, r = 0,
                    o = e && e.match(pt);
                if (o && 1 === t.nodeType)
                    for (; n = o[r++];) i = ut.propFix[n] || n, ut.expr.match.bool.test(n) ? Pt && Ot || !It.test(n) ? t[i] = !1 : t[ut.camelCase("default-" + n)] = t[i] = !1 : ut.attr(t, n, ""), t.removeAttribute(Ot ? n : i)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!ut.support.radioValue && "radio" === e && ut.nodeName(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e
                        }
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(t, n, i) {
                var r, o, a, s = t.nodeType;
                return t && 3 !== s && 8 !== s && 2 !== s ? (a = 1 !== s || !ut.isXMLDoc(t), a && (n = ut.propFix[n] || n, o = ut.propHooks[n]), i !== e ? o && "set" in o && (r = o.set(t, i, n)) !== e ? r : t[n] = i : o && "get" in o && null !== (r = o.get(t, n)) ? r : t[n]) : void 0
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = ut.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : Mt.test(t.nodeName) || jt.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            }
        }), At = {
            set: function(t, e, n) {
                return e === !1 ? ut.removeAttr(t, n) : Pt && Ot || !It.test(n) ? t.setAttribute(!Ot && ut.propFix[n] || n, n) : t[ut.camelCase("default-" + n)] = t[n] = !0, n
            }
        }, ut.each(ut.expr.match.bool.source.match(/\w+/g), function(t, n) {
            var i = ut.expr.attrHandle[n] || ut.find.attr;
            ut.expr.attrHandle[n] = Pt && Ot || !It.test(n) ? function(t, n, r) {
                var o = ut.expr.attrHandle[n],
                    a = r ? e : (ut.expr.attrHandle[n] = e) != i(t, n, r) ? n.toLowerCase() : null;
                return ut.expr.attrHandle[n] = o, a
            } : function(t, n, i) {
                return i ? e : t[ut.camelCase("default-" + n)] ? n.toLowerCase() : null
            }
        }), Pt && Ot || (ut.attrHooks.value = {
            set: function(t, n, i) {
                return ut.nodeName(t, "input") ? (t.defaultValue = n, e) : Et && Et.set(t, n, i)
            }
        }), Ot || (Et = {
            set: function(t, n, i) {
                var r = t.getAttributeNode(i);
                return r || t.setAttributeNode(r = t.ownerDocument.createAttribute(i)), r.value = n += "", "value" === i || n === t.getAttribute(i) ? n : e
            }
        }, ut.expr.attrHandle.id = ut.expr.attrHandle.name = ut.expr.attrHandle.coords = function(t, n, i) {
            var r;
            return i ? e : (r = t.getAttributeNode(n)) && "" !== r.value ? r.value : null
        }, ut.valHooks.button = {
            get: function(t, n) {
                var i = t.getAttributeNode(n);
                return i && i.specified ? i.value : e
            },
            set: Et.set
        }, ut.attrHooks.contenteditable = {
            set: function(t, e, n) {
                Et.set(t, "" === e ? !1 : e, n)
            }
        }, ut.each(["width", "height"], function(t, n) {
            ut.attrHooks[n] = {
                set: function(t, i) {
                    return "" === i ? (t.setAttribute(n, "auto"), i) : e
                }
            }
        })), ut.support.hrefNormalized || ut.each(["href", "src"], function(t, e) {
            ut.propHooks[e] = {
                get: function(t) {
                    return t.getAttribute(e, 4)
                }
            }
        }), ut.support.style || (ut.attrHooks.style = {
            get: function(t) {
                return t.style.cssText || e
            },
            set: function(t, e) {
                return t.style.cssText = e + ""
            }
        }), ut.support.optSelected || (ut.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
            }
        }), ut.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ut.propFix[this.toLowerCase()] = this
        }), ut.support.enctype || (ut.propFix.enctype = "encoding"), ut.each(["radio", "checkbox"], function() {
            ut.valHooks[this] = {
                set: function(t, n) {
                    return ut.isArray(n) ? t.checked = ut.inArray(ut(t).val(), n) >= 0 : e
                }
            }, ut.support.checkOn || (ut.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var Bt = /^(?:input|select|textarea)$/i,
            Lt = /^key/,
            Rt = /^(?:mouse|contextmenu)|click/,
            Ft = /^(?:focusinfocus|focusoutblur)$/,
            qt = /^([^.]*)(?:\.(.+)|)$/;
        ut.event = {
            global: {},
            add: function(t, n, i, r, o) {
                var a, s, c, l, u, d, p, f, h, m, g, v = ut._data(t);
                if (v) {
                    for (i.handler && (l = i, i = l.handler, o = l.selector), i.guid || (i.guid = ut.guid++), (s = v.events) || (s = v.events = {}), (d = v.handle) || (d = v.handle = function(t) {
                        return typeof ut === J || t && ut.event.triggered === t.type ? e : ut.event.dispatch.apply(d.elem, arguments)
                    }, d.elem = t), n = (n || "").match(pt) || [""], c = n.length; c--;) a = qt.exec(n[c]) || [], h = g = a[1], m = (a[2] || "").split(".").sort(), h && (u = ut.event.special[h] || {}, h = (o ? u.delegateType : u.bindType) || h, u = ut.event.special[h] || {}, p = ut.extend({
                        type: h,
                        origType: g,
                        data: r,
                        handler: i,
                        guid: i.guid,
                        selector: o,
                        needsContext: o && ut.expr.match.needsContext.test(o),
                        namespace: m.join(".")
                    }, l), (f = s[h]) || (f = s[h] = [], f.delegateCount = 0, u.setup && u.setup.call(t, r, m, d) !== !1 || (t.addEventListener ? t.addEventListener(h, d, !1) : t.attachEvent && t.attachEvent("on" + h, d))), u.add && (u.add.call(t, p), p.handler.guid || (p.handler.guid = i.guid)), o ? f.splice(f.delegateCount++, 0, p) : f.push(p), ut.event.global[h] = !0);
                    t = null
                }
            },
            remove: function(t, e, n, i, r) {
                var o, a, s, c, l, u, d, p, f, h, m, g = ut.hasData(t) && ut._data(t);
                if (g && (u = g.events)) {
                    for (e = (e || "").match(pt) || [""], l = e.length; l--;)
                        if (s = qt.exec(e[l]) || [], f = m = s[1], h = (s[2] || "").split(".").sort(), f) {
                            for (d = ut.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, p = u[f] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), c = o = p.length; o--;) a = p[o], !r && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, d.remove && d.remove.call(t, a));
                            c && !p.length && (d.teardown && d.teardown.call(t, h, g.handle) !== !1 || ut.removeEvent(t, f, g.handle), delete u[f])
                        } else
                            for (f in u) ut.event.remove(t, f + e[l], n, i, !0);
                    ut.isEmptyObject(u) && (delete g.handle, ut._removeData(t, "events"))
                }
            },
            trigger: function(n, i, r, o) {
                var a, s, c, l, u, d, p, f = [r || V],
                    h = ct.call(n, "type") ? n.type : n,
                    m = ct.call(n, "namespace") ? n.namespace.split(".") : [];
                if (c = d = r = r || V, 3 !== r.nodeType && 8 !== r.nodeType && !Ft.test(h + ut.event.triggered) && (h.indexOf(".") >= 0 && (m = h.split("."), h = m.shift(), m.sort()), s = 0 > h.indexOf(":") && "on" + h, n = n[ut.expando] ? n : new ut.Event(h, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = e, n.target || (n.target = r), i = null == i ? [n] : ut.makeArray(i, [n]), u = ut.event.special[h] || {}, o || !u.trigger || u.trigger.apply(r, i) !== !1)) {
                    if (!o && !u.noBubble && !ut.isWindow(r)) {
                        for (l = u.delegateType || h, Ft.test(l + h) || (c = c.parentNode); c; c = c.parentNode) f.push(c), d = c;
                        d === (r.ownerDocument || V) && f.push(d.defaultView || d.parentWindow || t)
                    }
                    for (p = 0;
                         (c = f[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? l : u.bindType || h, a = (ut._data(c, "events") || {})[n.type] && ut._data(c, "handle"), a && a.apply(c, i), a = s && c[s], a && ut.acceptData(c) && a.apply && a.apply(c, i) === !1 && n.preventDefault();
                    if (n.type = h, !o && !n.isDefaultPrevented() && (!u._default || u._default.apply(f.pop(), i) === !1) && ut.acceptData(r) && s && r[h] && !ut.isWindow(r)) {
                        d = r[s], d && (r[s] = null), ut.event.triggered = h;
                        try {
                            r[h]()
                        } catch (g) {}
                        ut.event.triggered = e, d && (r[s] = d)
                    }
                    return n.result
                }
            },
            dispatch: function(t) {
                t = ut.event.fix(t);
                var n, i, r, o, a, s = [],
                    c = ot.call(arguments),
                    l = (ut._data(this, "events") || {})[t.type] || [],
                    u = ut.event.special[t.type] || {};
                if (c[0] = t, t.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, t) !== !1) {
                    for (s = ut.event.handlers.call(this, t, l), n = 0;
                         (o = s[n++]) && !t.isPropagationStopped();)
                        for (t.currentTarget = o.elem, a = 0;
                             (r = o.handlers[a++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(r.namespace)) && (t.handleObj = r, t.data = r.data, i = ((ut.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, c), i !== e && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, t), t.result
                }
            },
            handlers: function(t, n) {
                var i, r, o, a, s = [],
                    c = n.delegateCount,
                    l = t.target;
                if (c && l.nodeType && (!t.button || "click" !== t.type))
                    for (; l != this; l = l.parentNode || this)
                        if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                            for (o = [], a = 0; c > a; a++) r = n[a], i = r.selector + " ", o[i] === e && (o[i] = r.needsContext ? ut(i, this).index(l) >= 0 : ut.find(i, this, null, [l]).length), o[i] && o.push(r);
                            o.length && s.push({
                                elem: l,
                                handlers: o
                            })
                        }
                return n.length > c && s.push({
                    elem: this,
                    handlers: n.slice(c)
                }), s
            },
            fix: function(t) {
                if (t[ut.expando]) return t;
                var e, n, i, r = t.type,
                    o = t,
                    a = this.fixHooks[r];
                for (a || (this.fixHooks[r] = a = Rt.test(r) ? this.mouseHooks : Lt.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, t = new ut.Event(o), e = i.length; e--;) n = i[e], t[n] = o[n];
                return t.target || (t.target = o.srcElement || V), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, a.filter ? a.filter(t, o) : t
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode),
                        t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(t, n) {
                    var i, r, o, a = n.button,
                        s = n.fromElement;
                    return null == t.pageX && null != n.clientX && (r = t.target.ownerDocument || V, o = r.documentElement, i = r.body, t.pageX = n.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), t.pageY = n.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !t.relatedTarget && s && (t.relatedTarget = s === t.target ? n.toElement : s), t.which || a === e || (t.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), t
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== u() && this.focus) try {
                            return this.focus(), !1
                        } catch (t) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === u() && this.blur ? (this.blur(), !1) : e
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return ut.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : e
                    },
                    _default: function(t) {
                        return ut.nodeName(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        t.result !== e && (t.originalEvent.returnValue = t.result)
                    }
                }
            },
            simulate: function(t, e, n, i) {
                var r = ut.extend(new ut.Event, n, {
                    type: t,
                    isSimulated: !0,
                    originalEvent: {}
                });
                i ? ut.event.trigger(r, null, e) : ut.event.dispatch.call(e, r), r.isDefaultPrevented() && n.preventDefault()
            }
        }, ut.removeEvent = V.removeEventListener ? function(t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n, !1)
        } : function(t, e, n) {
            var i = "on" + e;
            t.detachEvent && (typeof t[i] === J && (t[i] = null), t.detachEvent(i, n))
        }, ut.Event = function(t, n) {
            return this instanceof ut.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault() ? c : l) : this.type = t, n && ut.extend(this, n), this.timeStamp = t && t.timeStamp || ut.now(), this[ut.expando] = !0, e) : new ut.Event(t, n)
        }, ut.Event.prototype = {
            isDefaultPrevented: l,
            isPropagationStopped: l,
            isImmediatePropagationStopped: l,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = c, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = c, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = c, this.stopPropagation()
            }
        }, ut.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(t, e) {
            ut.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var n, i = this,
                        r = t.relatedTarget,
                        o = t.handleObj;
                    return (!r || r !== i && !ut.contains(i, r)) && (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), ut.support.submitBubbles || (ut.event.special.submit = {
            setup: function() {
                return ut.nodeName(this, "form") ? !1 : (ut.event.add(this, "click._submit keypress._submit", function(t) {
                    var n = t.target,
                        i = ut.nodeName(n, "input") || ut.nodeName(n, "button") ? n.form : e;
                    i && !ut._data(i, "submitBubbles") && (ut.event.add(i, "submit._submit", function(t) {
                        t._submit_bubble = !0
                    }), ut._data(i, "submitBubbles", !0))
                }), e)
            },
            postDispatch: function(t) {
                t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && ut.event.simulate("submit", this.parentNode, t, !0))
            },
            teardown: function() {
                return ut.nodeName(this, "form") ? !1 : (ut.event.remove(this, "._submit"), e)
            }
        }), ut.support.changeBubbles || (ut.event.special.change = {
            setup: function() {
                return Bt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ut.event.add(this, "propertychange._change", function(t) {
                    "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                }), ut.event.add(this, "click._change", function(t) {
                    this._just_changed && !t.isTrigger && (this._just_changed = !1), ut.event.simulate("change", this, t, !0)
                })), !1) : (ut.event.add(this, "beforeactivate._change", function(t) {
                    var e = t.target;
                    Bt.test(e.nodeName) && !ut._data(e, "changeBubbles") && (ut.event.add(e, "change._change", function(t) {
                        !this.parentNode || t.isSimulated || t.isTrigger || ut.event.simulate("change", this.parentNode, t, !0)
                    }), ut._data(e, "changeBubbles", !0))
                }), e)
            },
            handle: function(t) {
                var n = t.target;
                return this !== n || t.isSimulated || t.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? t.handleObj.handler.apply(this, arguments) : e
            },
            teardown: function() {
                return ut.event.remove(this, "._change"), !Bt.test(this.nodeName)
            }
        }), ut.support.focusinBubbles || ut.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var n = 0,
                i = function(t) {
                    ut.event.simulate(e, t.target, ut.event.fix(t), !0)
                };
            ut.event.special[e] = {
                setup: function() {
                    0 === n++ && V.addEventListener(t, i, !0)
                },
                teardown: function() {
                    0 === --n && V.removeEventListener(t, i, !0)
                }
            }
        }), ut.fn.extend({
            on: function(t, n, i, r, o) {
                var a, s;
                if ("object" == typeof t) {
                    "string" != typeof n && (i = i || n, n = e);
                    for (a in t) this.on(a, n, i, t[a], o);
                    return this
                }
                if (null == i && null == r ? (r = n, i = n = e) : null == r && ("string" == typeof n ? (r = i, i = e) : (r = i, i = n, n = e)), r === !1) r = l;
                else if (!r) return this;
                return 1 === o && (s = r, r = function(t) {
                    return ut().off(t), s.apply(this, arguments)
                }, r.guid = s.guid || (s.guid = ut.guid++)), this.each(function() {
                    ut.event.add(this, t, r, i, n)
                })
            },
            one: function(t, e, n, i) {
                return this.on(t, e, n, i, 1)
            },
            off: function(t, n, i) {
                var r, o;
                if (t && t.preventDefault && t.handleObj) return r = t.handleObj, ut(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof t) {
                    for (o in t) this.off(o, n, t[o]);
                    return this
                }
                return (n === !1 || "function" == typeof n) && (i = n, n = e), i === !1 && (i = l), this.each(function() {
                    ut.event.remove(this, t, i, n)
                })
            },
            trigger: function(t, e) {
                return this.each(function() {
                    ut.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, n) {
                var i = this[0];
                return i ? ut.event.trigger(t, n, i, !0) : e
            }
        });
        var Ht = /^.[^:#\[\.,]*$/,
            Ut = /^(?:parents|prev(?:Until|All))/,
            Yt = ut.expr.match.needsContext,
            zt = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ut.fn.extend({
            find: function(t) {
                var e, n = [],
                    i = this,
                    r = i.length;
                if ("string" != typeof t) return this.pushStack(ut(t).filter(function() {
                    for (e = 0; r > e; e++)
                        if (ut.contains(i[e], this)) return !0
                }));
                for (e = 0; r > e; e++) ut.find(t, i[e], n);
                return n = this.pushStack(r > 1 ? ut.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
            },
            has: function(t) {
                var e, n = ut(t, this),
                    i = n.length;
                return this.filter(function() {
                    for (e = 0; i > e; e++)
                        if (ut.contains(this, n[e])) return !0
                })
            },
            not: function(t) {
                return this.pushStack(p(this, t || [], !0))
            },
            filter: function(t) {
                return this.pushStack(p(this, t || [], !1))
            },
            is: function(t) {
                return !!p(this, "string" == typeof t && Yt.test(t) ? ut(t) : t || [], !1).length
            },
            closest: function(t, e) {
                for (var n, i = 0, r = this.length, o = [], a = Yt.test(t) || "string" != typeof t ? ut(t, e || this.context) : 0; r > i; i++)
                    for (n = this[i]; n && n !== e; n = n.parentNode)
                        if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && ut.find.matchesSelector(n, t))) {
                            n = o.push(n);
                            break
                        }
                return this.pushStack(o.length > 1 ? ut.unique(o) : o)
            },
            index: function(t) {
                return t ? "string" == typeof t ? ut.inArray(this[0], ut(t)) : ut.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                var n = "string" == typeof t ? ut(t, e) : ut.makeArray(t && t.nodeType ? [t] : t),
                    i = ut.merge(this.get(), n);
                return this.pushStack(ut.unique(i))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), ut.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return ut.dir(t, "parentNode")
            },
            parentsUntil: function(t, e, n) {
                return ut.dir(t, "parentNode", n)
            },
            next: function(t) {
                return d(t, "nextSibling")
            },
            prev: function(t) {
                return d(t, "previousSibling")
            },
            nextAll: function(t) {
                return ut.dir(t, "nextSibling")
            },
            prevAll: function(t) {
                return ut.dir(t, "previousSibling")
            },
            nextUntil: function(t, e, n) {
                return ut.dir(t, "nextSibling", n)
            },
            prevUntil: function(t, e, n) {
                return ut.dir(t, "previousSibling", n)
            },
            siblings: function(t) {
                return ut.sibling((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return ut.sibling(t.firstChild)
            },
            contents: function(t) {
                return ut.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ut.merge([], t.childNodes)
            }
        }, function(t, e) {
            ut.fn[t] = function(n, i) {
                var r = ut.map(this, e, n);
                return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = ut.filter(i, r)), this.length > 1 && (zt[t] || (r = ut.unique(r)), Ut.test(t) && (r = r.reverse())), this.pushStack(r)
            }
        }), ut.extend({
            filter: function(t, e, n) {
                var i = e[0];
                return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? ut.find.matchesSelector(i, t) ? [i] : [] : ut.find.matches(t, ut.grep(e, function(t) {
                    return 1 === t.nodeType
                }))
            },
            dir: function(t, n, i) {
                for (var r = [], o = t[n]; o && 9 !== o.nodeType && (i === e || 1 !== o.nodeType || !ut(o).is(i));) 1 === o.nodeType && r.push(o), o = o[n];
                return r
            },
            sibling: function(t, e) {
                for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                return n
            }
        });
        var Wt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Xt = / jQuery\d+="(?:null|\d+)"/g,
            Jt = RegExp("<(?:" + Wt + ")[\\s/>]", "i"),
            Gt = /^\s+/,
            Vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Qt = /<([\w:]+)/,
            Zt = /<tbody/i,
            Kt = /<|&#?\w+;/,
            te = /<(?:script|style|link)/i,
            ee = /^(?:checkbox|radio)$/i,
            ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ie = /^$|\/(?:java|ecma)script/i,
            re = /^true\/(.*)/,
            oe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            ae = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: ut.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            se = f(V),
            ce = se.appendChild(V.createElement("div"));
        ae.optgroup = ae.option, ae.tbody = ae.tfoot = ae.colgroup = ae.caption = ae.thead, ae.th = ae.td, ut.fn.extend({
            text: function(t) {
                return ut.access(this, function(t) {
                    return t === e ? ut.text(this) : this.empty().append((this[0] && this[0].ownerDocument || V).createTextNode(t))
                }, null, t, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = h(this, t);
                        e.appendChild(t)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = h(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            remove: function(t, e) {
                for (var n, i = t ? ut.filter(t, this) : this, r = 0; null != (n = i[r]); r++) e || 1 !== n.nodeType || ut.cleanData(w(n)), n.parentNode && (e && ut.contains(n.ownerDocument, n) && v(w(n, "script")), n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) {
                    for (1 === t.nodeType && ut.cleanData(w(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                    t.options && ut.nodeName(t, "select") && (t.options.length = 0)
                }
                return this
            },
            clone: function(t, e) {
                return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                    return ut.clone(this, t, e)
                })
            },
            html: function(t) {
                return ut.access(this, function(t) {
                    var n = this[0] || {},
                        i = 0,
                        r = this.length;
                    if (t === e) return 1 === n.nodeType ? n.innerHTML.replace(Xt, "") : e;
                    if (!("string" != typeof t || te.test(t) || !ut.support.htmlSerialize && Jt.test(t) || !ut.support.leadingWhitespace && Gt.test(t) || ae[(Qt.exec(t) || ["", ""])[1].toLowerCase()])) {
                        t = t.replace(Vt, "<$1></$2>");
                        try {
                            for (; r > i; i++) n = this[i] || {}, 1 === n.nodeType && (ut.cleanData(w(n, !1)), n.innerHTML = t);
                            n = 0
                        } catch (o) {}
                    }
                    n && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = ut.map(this, function(t) {
                        return [t.nextSibling, t.parentNode]
                    }),
                    e = 0;
                return this.domManip(arguments, function(n) {
                    var i = t[e++],
                        r = t[e++];
                    r && (i && i.parentNode !== r && (i = this.nextSibling), ut(this).remove(), r.insertBefore(n, i))
                }, !0), e ? this : this.remove()
            },
            detach: function(t) {
                return this.remove(t, !0)
            },
            domManip: function(t, e, n) {
                t = it.apply([], t);
                var i, r, o, a, s, c, l = 0,
                    u = this.length,
                    d = this,
                    p = u - 1,
                    f = t[0],
                    h = ut.isFunction(f);
                if (h || !(1 >= u || "string" != typeof f || ut.support.checkClone) && ne.test(f)) return this.each(function(i) {
                    var r = d.eq(i);
                    h && (t[0] = f.call(this, i, r.html())), r.domManip(t, e, n)
                });
                if (u && (c = ut.buildFragment(t, this[0].ownerDocument, !1, !n && this), i = c.firstChild, 1 === c.childNodes.length && (c = i), i)) {
                    for (a = ut.map(w(c, "script"), m), o = a.length; u > l; l++) r = c, l !== p && (r = ut.clone(r, !0, !0), o && ut.merge(a, w(r, "script"))), e.call(this[l], r, l);
                    if (o)
                        for (s = a[a.length - 1].ownerDocument, ut.map(a, g), l = 0; o > l; l++) r = a[l], ie.test(r.type || "") && !ut._data(r, "globalEval") && ut.contains(s, r) && (r.src ? ut._evalUrl(r.src) : ut.globalEval((r.text || r.textContent || r.innerHTML || "").replace(oe, "")));
                    c = i = null
                }
                return this
            }
        }), ut.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            ut.fn[t] = function(t) {
                for (var n, i = 0, r = [], o = ut(t), a = o.length - 1; a >= i; i++) n = i === a ? this : this.clone(!0), ut(o[i])[e](n), rt.apply(r, n.get());
                return this.pushStack(r)
            }
        }), ut.extend({
            clone: function(t, e, n) {
                var i, r, o, a, s, c = ut.contains(t.ownerDocument, t);
                if (ut.support.html5Clone || ut.isXMLDoc(t) || !Jt.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (ce.innerHTML = t.outerHTML, ce.removeChild(o = ce.firstChild)), !(ut.support.noCloneEvent && ut.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ut.isXMLDoc(t)))
                    for (i = w(o), s = w(t), a = 0; null != (r = s[a]); ++a) i[a] && b(r, i[a]);
                if (e)
                    if (n)
                        for (s = s || w(t), i = i || w(o), a = 0; null != (r = s[a]); a++) y(r, i[a]);
                    else y(t, o);
                return i = w(o, "script"), i.length > 0 && v(i, !c && w(t, "script")), i = s = r = null, o
            },
            buildFragment: function(t, e, n, i) {
                for (var r, o, a, s, c, l, u, d = t.length, p = f(e), h = [], m = 0; d > m; m++)
                    if (o = t[m], o || 0 === o)
                        if ("object" === ut.type(o)) ut.merge(h, o.nodeType ? [o] : o);
                        else if (Kt.test(o)) {
                            for (s = s || p.appendChild(e.createElement("div")), c = (Qt.exec(o) || ["", ""])[1].toLowerCase(), u = ae[c] || ae._default, s.innerHTML = u[1] + o.replace(Vt, "<$1></$2>") + u[2], r = u[0]; r--;) s = s.lastChild;
                            if (!ut.support.leadingWhitespace && Gt.test(o) && h.push(e.createTextNode(Gt.exec(o)[0])), !ut.support.tbody)
                                for (o = "table" !== c || Zt.test(o) ? "<table>" !== u[1] || Zt.test(o) ? 0 : s : s.firstChild, r = o && o.childNodes.length; r--;) ut.nodeName(l = o.childNodes[r], "tbody") && !l.childNodes.length && o.removeChild(l);
                            for (ut.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                            s = p.lastChild
                        } else h.push(e.createTextNode(o));
                for (s && p.removeChild(s), ut.support.appendChecked || ut.grep(w(h, "input"), x), m = 0; o = h[m++];)
                    if ((!i || -1 === ut.inArray(o, i)) && (a = ut.contains(o.ownerDocument, o), s = w(p.appendChild(o), "script"), a && v(s), n))
                        for (r = 0; o = s[r++];) ie.test(o.type || "") && n.push(o);
                return s = null, p
            },
            cleanData: function(t, e) {
                for (var n, i, r, o, a = 0, s = ut.expando, c = ut.cache, l = ut.support.deleteExpando, u = ut.event.special; null != (n = t[a]); a++)
                    if ((e || ut.acceptData(n)) && (r = n[s], o = r && c[r])) {
                        if (o.events)
                            for (i in o.events) u[i] ? ut.event.remove(n, i) : ut.removeEvent(n, i, o.handle);
                        c[r] && (delete c[r], l ? delete n[s] : typeof n.removeAttribute !== J ? n.removeAttribute(s) : n[s] = null, et.push(r))
                    }
            },
            _evalUrl: function(t) {
                return ut.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }
        }), ut.fn.extend({
            wrapAll: function(t) {
                if (ut.isFunction(t)) return this.each(function(e) {
                    ut(this).wrapAll(t.call(this, e))
                });
                if (this[0]) {
                    var e = ut(t, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                        for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                        return t
                    }).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                return this.each(ut.isFunction(t) ? function(e) {
                    ut(this).wrapInner(t.call(this, e))
                } : function() {
                    var e = ut(this),
                        n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = ut.isFunction(t);
                return this.each(function(n) {
                    ut(this).wrapAll(e ? t.call(this, n) : t)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    ut.nodeName(this, "body") || ut(this).replaceWith(this.childNodes)
                }).end()
            }
        });
        var le, ue, de, pe = /alpha\([^)]*\)/i,
            fe = /opacity\s*=\s*([^)]*)/,
            he = /^(top|right|bottom|left)$/,
            me = /^(none|table(?!-c[ea]).+)/,
            ge = /^margin/,
            ve = RegExp("^(" + dt + ")(.*)$", "i"),
            ye = RegExp("^(" + dt + ")(?!px)[a-z%]+$", "i"),
            be = RegExp("^([+-])=(" + dt + ")", "i"),
            we = {
                BODY: "block"
            },
            xe = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            _e = {
                letterSpacing: 0,
                fontWeight: 400
            },
            ke = ["Top", "Right", "Bottom", "Left"],
            Te = ["Webkit", "O", "Moz", "ms"];
        ut.fn.extend({
            css: function(t, n) {
                return ut.access(this, function(t, n, i) {
                    var r, o, a = {},
                        s = 0;
                    if (ut.isArray(n)) {
                        for (o = ue(t), r = n.length; r > s; s++) a[n[s]] = ut.css(t, n[s], !1, o);
                        return a
                    }
                    return i !== e ? ut.style(t, n, i) : ut.css(t, n)
                }, t, n, arguments.length > 1)
            },
            show: function() {
                return T(this, !0)
            },
            hide: function() {
                return T(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    k(this) ? ut(this).show() : ut(this).hide()
                })
            }
        }), ut.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var n = de(t, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": ut.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(t, n, i, r) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var o, a, s, c = ut.camelCase(n),
                        l = t.style;
                    if (n = ut.cssProps[c] || (ut.cssProps[c] = _(l, c)), s = ut.cssHooks[n] || ut.cssHooks[c], i === e) return s && "get" in s && (o = s.get(t, !1, r)) !== e ? o : l[n];
                    if (a = typeof i, "string" === a && (o = be.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(ut.css(t, n)), a = "number"), !(null == i || "number" === a && isNaN(i) || ("number" !== a || ut.cssNumber[c] || (i += "px"), ut.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (i = s.set(t, i, r)) === e))) try {
                        l[n] = i
                    } catch (u) {}
                }
            },
            css: function(t, n, i, r) {
                var o, a, s, c = ut.camelCase(n);
                return n = ut.cssProps[c] || (ut.cssProps[c] = _(t.style, c)), s = ut.cssHooks[n] || ut.cssHooks[c], s && "get" in s && (a = s.get(t, !0, i)), a === e && (a = de(t, n, r)), "normal" === a && n in _e && (a = _e[n]), "" === i || i ? (o = parseFloat(a), i === !0 || ut.isNumeric(o) ? o || 0 : a) : a
            }
        }), t.getComputedStyle ? (ue = function(e) {
            return t.getComputedStyle(e, null)
        }, de = function(t, n, i) {
            var r, o, a, s = i || ue(t),
                c = s ? s.getPropertyValue(n) || s[n] : e,
                l = t.style;
            return s && ("" !== c || ut.contains(t.ownerDocument, t) || (c = ut.style(t, n)), ye.test(c) && ge.test(n) && (r = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = c, c = s.width, l.width = r, l.minWidth = o, l.maxWidth = a)), c
        }) : V.documentElement.currentStyle && (ue = function(t) {
            return t.currentStyle
        }, de = function(t, n, i) {
            var r, o, a, s = i || ue(t),
                c = s ? s[n] : e,
                l = t.style;
            return null == c && l && l[n] && (c = l[n]), ye.test(c) && !he.test(n) && (r = l.left, o = t.runtimeStyle, a = o && o.left, a && (o.left = t.currentStyle.left), l.left = "fontSize" === n ? "1em" : c, c = l.pixelLeft + "px", l.left = r, a && (o.left = a)), "" === c ? "auto" : c
        }), ut.each(["height", "width"], function(t, n) {
            ut.cssHooks[n] = {
                get: function(t, i, r) {
                    return i ? 0 === t.offsetWidth && me.test(ut.css(t, "display")) ? ut.swap(t, xe, function() {
                        return D(t, n, r)
                    }) : D(t, n, r) : e
                },
                set: function(t, e, i) {
                    var r = i && ue(t);
                    return C(t, e, i ? S(t, n, i, ut.support.boxSizing && "border-box" === ut.css(t, "boxSizing", !1, r), r) : 0)
                }
            }
        }), ut.support.opacity || (ut.cssHooks.opacity = {
            get: function(t, e) {
                return fe.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
            },
            set: function(t, e) {
                var n = t.style,
                    i = t.currentStyle,
                    r = ut.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                    o = i && i.filter || n.filter || "";
                n.zoom = 1, (e >= 1 || "" === e) && "" === ut.trim(o.replace(pe, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = pe.test(o) ? o.replace(pe, r) : o + " " + r)
            }
        }), ut(function() {
            ut.support.reliableMarginRight || (ut.cssHooks.marginRight = {
                get: function(t, n) {
                    return n ? ut.swap(t, {
                        display: "inline-block"
                    }, de, [t, "marginRight"]) : e
                }
            }), !ut.support.pixelPosition && ut.fn.position && ut.each(["top", "left"], function(t, n) {
                ut.cssHooks[n] = {
                    get: function(t, i) {
                        return i ? (i = de(t, n), ye.test(i) ? ut(t).position()[n] + "px" : i) : e
                    }
                }
            })
        }), ut.expr && ut.expr.filters && (ut.expr.filters.hidden = function(t) {
            return 0 >= t.offsetWidth && 0 >= t.offsetHeight || !ut.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || ut.css(t, "display"))
        }, ut.expr.filters.visible = function(t) {
            return !ut.expr.filters.hidden(t)
        }), ut.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            ut.cssHooks[t + e] = {
                expand: function(n) {
                    for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[t + ke[i] + e] = o[i] || o[i - 2] || o[0];
                    return r
                }
            }, ge.test(t) || (ut.cssHooks[t + e].set = C)
        });
        var Ce = /%20/g,
            Se = /\[\]$/,
            De = /\r?\n/g,
            Ee = /^(?:submit|button|image|reset|file)$/i,
            Ae = /^(?:input|select|textarea|keygen)/i;
        ut.fn.extend({
            serialize: function() {
                return ut.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = ut.prop(this, "elements");
                    return t ? ut.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !ut(this).is(":disabled") && Ae.test(this.nodeName) && !Ee.test(t) && (this.checked || !ee.test(t))
                }).map(function(t, e) {
                    var n = ut(this).val();
                    return null == n ? null : ut.isArray(n) ? ut.map(n, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(De, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: n.replace(De, "\r\n")
                    }
                }).get()
            }
        }), ut.param = function(t, n) {
            var i, r = [],
                o = function(t, e) {
                    e = ut.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (n === e && (n = ut.ajaxSettings && ut.ajaxSettings.traditional), ut.isArray(t) || t.jquery && !ut.isPlainObject(t)) ut.each(t, function() {
                o(this.name, this.value)
            });
            else
                for (i in t) $(i, t[i], n, o);
            return r.join("&").replace(Ce, "+")
        }, ut.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            ut.fn[e] = function(t, n) {
                return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }
        }), ut.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            },
            bind: function(t, e, n) {
                return this.on(t, null, e, n)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, n, i) {
                return this.on(e, t, n, i)
            },
            undelegate: function(t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
            }
        });
        var $e, Ne, Me = ut.now(),
            je = /\?/,
            Ie = /#.*$/,
            Oe = /([?&])_=[^&]*/,
            Pe = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Be = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Le = /^(?:GET|HEAD)$/,
            Re = /^\/\//,
            Fe = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            qe = ut.fn.load,
            He = {},
            Ue = {},
            Ye = "*/".concat("*");
        try {
            Ne = G.href
        } catch (ze) {
            Ne = V.createElement("a"), Ne.href = "", Ne = Ne.href
        }
        $e = Fe.exec(Ne.toLowerCase()) || [], ut.fn.load = function(t, n, i) {
            if ("string" != typeof t && qe) return qe.apply(this, arguments);
            var r, o, a, s = this,
                c = t.indexOf(" ");
            return c >= 0 && (r = t.slice(c, t.length), t = t.slice(0, c)), ut.isFunction(n) ? (i = n, n = e) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ut.ajax({
                url: t,
                type: a,
                dataType: "html",
                data: n
            }).done(function(t) {
                o = arguments, s.html(r ? ut("<div>").append(ut.parseHTML(t)).find(r) : t)
            }).complete(i && function(t, e) {
                s.each(i, o || [t.responseText, e, t])
            }), this
        }, ut.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            ut.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), ut.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Ne,
                type: "GET",
                isLocal: Be.test($e[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ye,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ut.parseJSON,
                    "text xml": ut.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? j(j(t, ut.ajaxSettings), e) : j(ut.ajaxSettings, t)
            },
            ajaxPrefilter: N(He),
            ajaxTransport: N(Ue),
            ajax: function(t, n) {
                function i(t, n, i, r) {
                    var o, d, y, b, x, k = n;
                    2 !== w && (w = 2, c && clearTimeout(c), u = e, s = r || "", _.readyState = t > 0 ? 4 : 0, o = t >= 200 && 300 > t || 304 === t, i && (b = I(p, _, i)), b = O(p, b, _, o), o ? (p.ifModified && (x = _.getResponseHeader("Last-Modified"), x && (ut.lastModified[a] = x), x = _.getResponseHeader("etag"), x && (ut.etag[a] = x)), 204 === t || "HEAD" === p.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = b.state, d = b.data, y = b.error, o = !y)) : (y = k, (t || !k) && (k = "error", 0 > t && (t = 0))), _.status = t, _.statusText = (n || k) + "", o ? m.resolveWith(f, [d, k, _]) : m.rejectWith(f, [_, k, y]), _.statusCode(v), v = e, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [_, p, o ? d : y]), g.fireWith(f, [_, k]), l && (h.trigger("ajaxComplete", [_, p]), --ut.active || ut.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (n = t, t = e), n = n || {};
                var r, o, a, s, c, l, u, d, p = ut.ajaxSetup({}, n),
                    f = p.context || p,
                    h = p.context && (f.nodeType || f.jquery) ? ut(f) : ut.event,
                    m = ut.Deferred(),
                    g = ut.Callbacks("once memory"),
                    v = p.statusCode || {},
                    y = {},
                    b = {},
                    w = 0,
                    x = "canceled",
                    _ = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (2 === w) {
                                if (!d)
                                    for (d = {}; e = Pe.exec(s);) d[e[1].toLowerCase()] = e[2];
                                e = d[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return 2 === w ? s : null
                        },
                        setRequestHeader: function(t, e) {
                            var n = t.toLowerCase();
                            return w || (t = b[n] = b[n] || t, y[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return w || (p.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (2 > w)
                                    for (e in t) v[e] = [v[e], t[e]];
                                else _.always(t[_.status]);
                            return this
                        },
                        abort: function(t) {
                            var e = t || x;
                            return u && u.abort(e), i(0, e), this
                        }
                    };
                if (m.promise(_).complete = g.add, _.success = _.done, _.error = _.fail, p.url = ((t || p.url || Ne) + "").replace(Ie, "").replace(Re, $e[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ut.trim(p.dataType || "*").toLowerCase().match(pt) || [""], null == p.crossDomain && (r = Fe.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === $e[1] && r[2] === $e[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === ($e[3] || ("http:" === $e[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = ut.param(p.data, p.traditional)), M(He, p, n, _), 2 === w) return _;
                l = p.global, l && 0 === ut.active++ && ut.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Le.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (je.test(a) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = Oe.test(a) ? a.replace(Oe, "$1_=" + Me++) : a + (je.test(a) ? "&" : "?") + "_=" + Me++)), p.ifModified && (ut.lastModified[a] && _.setRequestHeader("If-Modified-Since", ut.lastModified[a]), ut.etag[a] && _.setRequestHeader("If-None-Match", ut.etag[a])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && _.setRequestHeader("Content-Type", p.contentType), _.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Ye + "; q=0.01" : "") : p.accepts["*"]);
                for (o in p.headers) _.setRequestHeader(o, p.headers[o]);
                if (p.beforeSend && (p.beforeSend.call(f, _, p) === !1 || 2 === w)) return _.abort();
                x = "abort";
                for (o in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) _[o](p[o]);
                if (u = M(Ue, p, n, _)) {
                    _.readyState = 1, l && h.trigger("ajaxSend", [_, p]), p.async && p.timeout > 0 && (c = setTimeout(function() {
                        _.abort("timeout")
                    }, p.timeout));
                    try {
                        w = 1, u.send(y, i)
                    } catch (k) {
                        if (!(2 > w)) throw k;
                        i(-1, k)
                    }
                } else i(-1, "No Transport");
                return _
            },
            getJSON: function(t, e, n) {
                return ut.get(t, e, n, "json")
            },
            getScript: function(t, n) {
                return ut.get(t, e, n, "script")
            }
        }), ut.each(["get", "post"], function(t, n) {
            ut[n] = function(t, i, r, o) {
                return ut.isFunction(i) && (o = o || r, r = i, i = e), ut.ajax({
                    url: t,
                    type: n,
                    dataType: o,
                    data: i,
                    success: r
                })
            }
        }), ut.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(t) {
                    return ut.globalEval(t), t
                }
            }
        }), ut.ajaxPrefilter("script", function(t) {
            t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
        }), ut.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var n, i = V.head || ut("head")[0] || V.documentElement;
                return {
                    send: function(e, r) {
                        n = V.createElement("script"), n.async = !0, t.scriptCharset && (n.charset = t.scriptCharset), n.src = t.url, n.onload = n.onreadystatechange = function(t, e) {
                            (e || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, e || r(200, "success"))
                        }, i.insertBefore(n, i.firstChild)
                    },
                    abort: function() {
                        n && n.onload(e, !0)
                    }
                }
            }
        });
        var We = [],
            Xe = /(=)\?(?=&|$)|\?\?/;
        ut.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = We.pop() || ut.expando + "_" + Me++;
                return this[t] = !0, t
            }
        }), ut.ajaxPrefilter("json jsonp", function(n, i, r) {
            var o, a, s, c = n.jsonp !== !1 && (Xe.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Xe.test(n.data) && "data");
            return c || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ut.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, c ? n[c] = n[c].replace(Xe, "$1" + o) : n.jsonp !== !1 && (n.url += (je.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
                return s || ut.error(o + " was not called"), s[0]
            }, n.dataTypes[0] = "json", a = t[o], t[o] = function() {
                s = arguments
            }, r.always(function() {
                t[o] = a, n[o] && (n.jsonpCallback = i.jsonpCallback, We.push(o)), s && ut.isFunction(a) && a(s[0]), s = a = e
            }), "script") : e
        });
        var Je, Ge, Ve = 0,
            Qe = t.ActiveXObject && function() {
                    var t;
                    for (t in Je) Je[t](e, !0)
                };
        ut.ajaxSettings.xhr = t.ActiveXObject ? function() {
            return !this.isLocal && P() || B()
        } : P, Ge = ut.ajaxSettings.xhr(), ut.support.cors = !!Ge && "withCredentials" in Ge, Ge = ut.support.ajax = !!Ge, Ge && ut.ajaxTransport(function(n) {
            if (!n.crossDomain || ut.support.cors) {
                var i;
                return {
                    send: function(r, o) {
                        var a, s, c = n.xhr();
                        if (n.username ? c.open(n.type, n.url, n.async, n.username, n.password) : c.open(n.type, n.url, n.async), n.xhrFields)
                            for (s in n.xhrFields) c[s] = n.xhrFields[s];
                        n.mimeType && c.overrideMimeType && c.overrideMimeType(n.mimeType), n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (s in r) c.setRequestHeader(s, r[s])
                        } catch (l) {}
                        c.send(n.hasContent && n.data || null), i = function(t, r) {
                            var s, l, u, d;
                            try {
                                if (i && (r || 4 === c.readyState))
                                    if (i = e, a && (c.onreadystatechange = ut.noop, Qe && delete Je[a]), r) 4 !== c.readyState && c.abort();
                                    else {
                                        d = {}, s = c.status, l = c.getAllResponseHeaders(), "string" == typeof c.responseText && (d.text = c.responseText);
                                        try {
                                            u = c.statusText
                                        } catch (p) {
                                            u = ""
                                        }
                                        s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
                                    }
                            } catch (f) {
                                r || o(-1, f)
                            }
                            d && o(s, u, d, l)
                        }, n.async ? 4 === c.readyState ? setTimeout(i) : (a = ++Ve, Qe && (Je || (Je = {}, ut(t).unload(Qe)), Je[a] = i), c.onreadystatechange = i) : i()
                    },
                    abort: function() {
                        i && i(e, !0)
                    }
                }
            }
        });
        var Ze, Ke, tn = /^(?:toggle|show|hide)$/,
            en = RegExp("^(?:([+-])=|)(" + dt + ")([a-z%]*)$", "i"),
            nn = /queueHooks$/,
            rn = [H],
            on = {
                "*": [function(t, e) {
                    var n = this.createTween(t, e),
                        i = n.cur(),
                        r = en.exec(e),
                        o = r && r[3] || (ut.cssNumber[t] ? "" : "px"),
                        a = (ut.cssNumber[t] || "px" !== o && +i) && en.exec(ut.css(n.elem, t)),
                        s = 1,
                        c = 20;
                    if (a && a[3] !== o) {
                        o = o || a[3], r = r || [], a = +i || 1;
                        do s = s || ".5", a /= s, ut.style(n.elem, t, a + o); while (s !== (s = n.cur() / i) && 1 !== s && --c)
                    }
                    return r && (a = n.start = +a || +i || 0, n.unit = o, n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), n
                }]
            };
        ut.Animation = ut.extend(F, {
            tweener: function(t, e) {
                ut.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var n, i = 0, r = t.length; r > i; i++) n = t[i], on[n] = on[n] || [], on[n].unshift(e)
            },
            prefilter: function(t, e) {
                e ? rn.unshift(t) : rn.push(t)
            }
        }), ut.Tween = U, U.prototype = {
            constructor: U,
            init: function(t, e, n, i, r, o) {
                this.elem = t, this.prop = n, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (ut.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var t = U.propHooks[this.prop];
                return t && t.get ? t.get(this) : U.propHooks._default.get(this)
            },
            run: function(t) {
                var e, n = U.propHooks[this.prop];
                return this.pos = e = this.options.duration ? ut.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : U.propHooks._default.set(this), this
            }
        }, U.prototype.init.prototype = U.prototype, U.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = ut.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                },
                set: function(t) {
                    ut.fx.step[t.prop] ? ut.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[ut.cssProps[t.prop]] || ut.cssHooks[t.prop]) ? ut.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                }
            }
        }, U.propHooks.scrollTop = U.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, ut.each(["toggle", "show", "hide"], function(t, e) {
            var n = ut.fn[e];
            ut.fn[e] = function(t, i, r) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(Y(e, !0), t, i, r)
            }
        }), ut.fn.extend({
            fadeTo: function(t, e, n, i) {
                return this.filter(k).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, n, i)
            },
            animate: function(t, e, n, i) {
                var r = ut.isEmptyObject(t),
                    o = ut.speed(e, n, i),
                    a = function() {
                        var e = F(this, ut.extend({}, t), o);
                        (r || ut._data(this, "finish")) && e.stop(!0)
                    };
                return a.finish = a,
                    r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(t, n, i) {
                var r = function(t) {
                    var e = t.stop;
                    delete t.stop, e(i)
                };
                return "string" != typeof t && (i = n, n = t, t = e), n && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        n = null != t && t + "queueHooks",
                        o = ut.timers,
                        a = ut._data(this);
                    if (n) a[n] && a[n].stop && r(a[n]);
                    else
                        for (n in a) a[n] && a[n].stop && nn.test(n) && r(a[n]);
                    for (n = o.length; n--;) o[n].elem !== this || null != t && o[n].queue !== t || (o[n].anim.stop(i), e = !1, o.splice(n, 1));
                    (e || !i) && ut.dequeue(this, t)
                })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"), this.each(function() {
                    var e, n = ut._data(this),
                        i = n[t + "queue"],
                        r = n[t + "queueHooks"],
                        o = ut.timers,
                        a = i ? i.length : 0;
                    for (n.finish = !0, ut.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                    for (e = 0; a > e; e++) i[e] && i[e].finish && i[e].finish.call(this);
                    delete n.finish
                })
            }
        }), ut.each({
            slideDown: Y("show"),
            slideUp: Y("hide"),
            slideToggle: Y("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            ut.fn[t] = function(t, n, i) {
                return this.animate(e, t, n, i)
            }
        }), ut.speed = function(t, e, n) {
            var i = t && "object" == typeof t ? ut.extend({}, t) : {
                complete: n || !n && e || ut.isFunction(t) && t,
                duration: t,
                easing: n && e || e && !ut.isFunction(e) && e
            };
            return i.duration = ut.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ut.fx.speeds ? ut.fx.speeds[i.duration] : ut.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                ut.isFunction(i.old) && i.old.call(this), i.queue && ut.dequeue(this, i.queue)
            }, i
        }, ut.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }
        }, ut.timers = [], ut.fx = U.prototype.init, ut.fx.tick = function() {
            var t, n = ut.timers,
                i = 0;
            for (Ze = ut.now(); n.length > i; i++) t = n[i], t() || n[i] !== t || n.splice(i--, 1);
            n.length || ut.fx.stop(), Ze = e
        }, ut.fx.timer = function(t) {
            t() && ut.timers.push(t) && ut.fx.start()
        }, ut.fx.interval = 13, ut.fx.start = function() {
            Ke || (Ke = setInterval(ut.fx.tick, ut.fx.interval))
        }, ut.fx.stop = function() {
            clearInterval(Ke), Ke = null
        }, ut.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ut.fx.step = {}, ut.expr && ut.expr.filters && (ut.expr.filters.animated = function(t) {
            return ut.grep(ut.timers, function(e) {
                return t === e.elem
            }).length
        }), ut.fn.offset = function(t) {
            if (arguments.length) return t === e ? this : this.each(function(e) {
                ut.offset.setOffset(this, t, e)
            });
            var n, i, r = {
                    top: 0,
                    left: 0
                },
                o = this[0],
                a = o && o.ownerDocument;
            return a ? (n = a.documentElement, ut.contains(n, o) ? (typeof o.getBoundingClientRect !== J && (r = o.getBoundingClientRect()), i = z(a), {
                top: r.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                left: r.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
            }) : r) : void 0
        }, ut.offset = {
            setOffset: function(t, e, n) {
                var i = ut.css(t, "position");
                "static" === i && (t.style.position = "relative");
                var r, o, a = ut(t),
                    s = a.offset(),
                    c = ut.css(t, "top"),
                    l = ut.css(t, "left"),
                    u = ("absolute" === i || "fixed" === i) && ut.inArray("auto", [c, l]) > -1,
                    d = {},
                    p = {};
                u ? (p = a.position(), r = p.top, o = p.left) : (r = parseFloat(c) || 0, o = parseFloat(l) || 0), ut.isFunction(e) && (e = e.call(t, n, s)), null != e.top && (d.top = e.top - s.top + r), null != e.left && (d.left = e.left - s.left + o), "using" in e ? e.using.call(t, d) : a.css(d)
            }
        }, ut.fn.extend({
            position: function() {
                if (this[0]) {
                    var t, e, n = {
                            top: 0,
                            left: 0
                        },
                        i = this[0];
                    return "fixed" === ut.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ut.nodeName(t[0], "html") || (n = t.offset()), n.top += ut.css(t[0], "borderTopWidth", !0), n.left += ut.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - n.top - ut.css(i, "marginTop", !0),
                        left: e.left - n.left - ut.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || Q; t && !ut.nodeName(t, "html") && "static" === ut.css(t, "position");) t = t.offsetParent;
                    return t || Q
                })
            }
        }), ut.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, n) {
            var i = /Y/.test(n);
            ut.fn[t] = function(r) {
                return ut.access(this, function(t, r, o) {
                    var a = z(t);
                    return o === e ? a ? n in a ? a[n] : a.document.documentElement[r] : t[r] : (a ? a.scrollTo(i ? ut(a).scrollLeft() : o, i ? o : ut(a).scrollTop()) : t[r] = o, e)
                }, t, r, arguments.length, null)
            }
        }), ut.each({
            Height: "height",
            Width: "width"
        }, function(t, n) {
            ut.each({
                padding: "inner" + t,
                content: n,
                "": "outer" + t
            }, function(i, r) {
                ut.fn[r] = function(r, o) {
                    var a = arguments.length && (i || "boolean" != typeof r),
                        s = i || (r === !0 || o === !0 ? "margin" : "border");
                    return ut.access(this, function(n, i, r) {
                        var o;
                        return ut.isWindow(n) ? n.document.documentElement["client" + t] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + t], o["scroll" + t], n.body["offset" + t], o["offset" + t], o["client" + t])) : r === e ? ut.css(n, i, s) : ut.style(n, i, r, s)
                    }, n, a ? r : e, a, null)
                }
            })
        }), ut.fn.size = function() {
            return this.length
        }, ut.fn.andSelf = ut.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ut : (t.jQuery = t.$ = ut, "function" == typeof define && define.amd && define("jquery", [], function() {
            return ut
        }))
    }(window), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in e)
            if (void 0 !== t.style[n]) return {
                end: e[n]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var n = !1,
            i = this;
        t(this).one("bsTransitionEnd", function() {
            n = !0
        });
        var r = function() {
            n || t(i).trigger(t.support.transition.end)
        };
        return setTimeout(r, e), this
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.alert");
            r || n.data("bs.alert", r = new i(this)), "string" == typeof e && r[e].call(n)
        })
    }
    var n = '[data-dismiss="alert"]',
        i = function(e) {
            t(e).on("click", n, this.close)
        };
    i.VERSION = "3.3.5", i.TRANSITION_DURATION = 150, i.prototype.close = function(e) {
        function n() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var r = t(this),
            o = r.attr("data-target");
        o || (o = r.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(o);
        e && e.preventDefault(), a.length || (a = r.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    };
    var r = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
        return t.fn.alert = r, this
    }, t(document).on("click.bs.alert.data-api", n, i.prototype.close)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.button"),
                o = "object" == typeof e && e;
            r || i.data("bs.button", r = new n(this, o)), "toggle" == e ? r.toggle() : e && r.setState(e)
        })
    }
    var n = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.isLoading = !1
    };
    n.VERSION = "3.3.5", n.DEFAULTS = {
        loadingText: "loading..."
    }, n.prototype.setState = function(e) {
        var n = "disabled",
            i = this.$element,
            r = i.is("input") ? "val" : "html",
            o = i.data();
        e += "Text", null == o.resetText && i.data("resetText", i[r]()), setTimeout(t.proxy(function() {
            i[r](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, i.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading = !1, i.removeClass(n).removeAttr(n))
        }, this), 0)
    }, n.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = n, t.fn.button.noConflict = function() {
        return t.fn.button = i, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var i = t(n.target);
        i.hasClass("btn") || (i = i.closest(".btn")), e.call(i, "toggle"), t(n.target).is('input[type="radio"]') || t(n.target).is('input[type="checkbox"]') || n.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.carousel"),
                o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : o.slide;
            r || i.data("bs.carousel", r = new n(this, o)), "number" == typeof e ? r.to(e) : a ? r[a]() : o.interval && r.pause().cycle()
        })
    }
    var n = function(e, n) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.5", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, n.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, n.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, n.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, n.prototype.getItemForDirection = function(t, e) {
        var n = this.getItemIndex(e),
            i = "prev" == t && 0 === n || "next" == t && n == this.$items.length - 1;
        if (i && !this.options.wrap) return e;
        var r = "prev" == t ? -1 : 1,
            o = (n + r) % this.$items.length;
        return this.$items.eq(o)
    }, n.prototype.to = function(t) {
        var e = this,
            n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }, n.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, n.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, n.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, n.prototype.slide = function(e, i) {
        var r = this.$element.find(".item.active"),
            o = i || this.getItemForDirection(e, r),
            a = this.interval,
            s = "next" == e ? "left" : "right",
            c = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var l = o[0],
            u = t.Event("slide.bs.carousel", {
                relatedTarget: l,
                direction: s
            });
        if (this.$element.trigger(u), !u.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var d = t(this.$indicators.children()[this.getItemIndex(o)]);
                d && d.addClass("active")
            }
            var p = t.Event("slid.bs.carousel", {
                relatedTarget: l,
                direction: s
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, r.addClass(s), o.addClass(s), r.one("bsTransitionEnd", function() {
                o.removeClass([e, s].join(" ")).addClass("active"), r.removeClass(["active", s].join(" ")), c.sliding = !1, setTimeout(function() {
                    c.$element.trigger(p)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (r.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(p)), a && this.cycle(), this
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i, this
    };
    var r = function(n) {
        var i, r = t(this),
            o = t(r.attr("data-target") || (i = r.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var a = t.extend({}, o.data(), r.data()),
                s = r.attr("data-slide-to");
            s && (a.interval = !1), e.call(o, a), s && o.data("bs.carousel").to(s), n.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var n = t(this);
            e.call(n, n.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var n, i = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return t(i)
    }

    function n(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.collapse"),
                o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            !r && o.toggle && /show|hide/.test(e) && (o.toggle = !1), r || n.data("bs.collapse", r = new i(this, o)), "string" == typeof e && r[e]()
        })
    }
    var i = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.5", i.TRANSITION_DURATION = 350, i.DEFAULTS = {
        toggle: !0
    }, i.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, i.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(r && r.length && (e = r.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    r && r.length && (n.call(r, "hide"), e || r.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var s = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return s.call(this);
                    var c = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[a](this.$element[0][c])
                }
            }
        }
    }, i.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var r = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : r.call(this)
            }
        }
    }, i.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, i.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(n, i) {
            var r = t(i);
            this.addAriaAndCollapsedClass(e(r), r)
        }, this)).end()
    }, i.prototype.addAriaAndCollapsedClass = function(t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var r = t.fn.collapse;
    t.fn.collapse = n, t.fn.collapse.Constructor = i, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = r, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(i) {
        var r = t(this);
        r.attr("data-target") || i.preventDefault();
        var o = e(r),
            a = o.data("bs.collapse"),
            s = a ? "toggle" : r.data();
        n.call(o, s)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var n = e.attr("data-target");
        n || (n = e.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && t(n);
        return i && i.length ? i : e.parent()
    }

    function n(n) {
        n && 3 === n.which || (t(r).remove(), t(o).each(function() {
            var i = t(this),
                r = e(i),
                o = {
                    relatedTarget: this
                };
            r.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && t.contains(r[0], n.target) || (r.trigger(n = t.Event("hide.bs.dropdown", o)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), r.removeClass("open").trigger("hidden.bs.dropdown", o))))
        }))
    }

    function i(e) {
        return this.each(function() {
            var n = t(this),
                i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new a(this)), "string" == typeof e && i[e].call(n)
        })
    }
    var r = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        a = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    a.VERSION = "3.3.5", a.prototype.toggle = function(i) {
        var r = t(this);
        if (!r.is(".disabled, :disabled")) {
            var o = e(r),
                a = o.hasClass("open");
            if (n(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", n);
                var s = {
                    relatedTarget: this
                };
                if (o.trigger(i = t.Event("show.bs.dropdown", s)), i.isDefaultPrevented()) return;
                r.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger("shown.bs.dropdown", s)
            }
            return !1
        }
    }, a.prototype.keydown = function(n) {
        if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
            var i = t(this);
            if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                var r = e(i),
                    a = r.hasClass("open");
                if (!a && 27 != n.which || a && 27 == n.which) return 27 == n.which && r.find(o).trigger("focus"), i.trigger("click");
                var s = " li:not(.disabled):visible a",
                    c = r.find(".dropdown-menu" + s);
                if (c.length) {
                    var l = c.index(n.target);
                    38 == n.which && l > 0 && l--, 40 == n.which && l < c.length - 1 && l++, ~l || (l = 0), c.eq(l).trigger("focus")
                }
            }
        }
    };
    var s = t.fn.dropdown;
    t.fn.dropdown = i, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = s, this
    }, t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery), + function(t) {
    "use strict";

    function e(e, i) {
        return this.each(function() {
            var r = t(this),
                o = r.data("bs.modal"),
                a = t.extend({}, n.DEFAULTS, r.data(), "object" == typeof e && e);
            o || r.data("bs.modal", o = new n(this, a)), "string" == typeof e ? o[e](i) : a.show && o.show(i)
        })
    }
    var n = function(e, n) {
        this.options = n, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.5", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, n.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, n.prototype.show = function(e) {
        var i = this,
            r = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(r), this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            i.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var r = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), r && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            r ? i.$dialog.one("bsTransitionEnd", function() {
                i.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(o)
        }))
    }, n.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }, n.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, n.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, n.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, n.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, n.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, n.prototype.backdrop = function(e) {
        var i = this,
            r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && r;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + r).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                i.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, n.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, n.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, n.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, n.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, n.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, n.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, n.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var i = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = n, t.fn.modal.noConflict = function() {
        return t.fn.modal = i, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
        var i = t(this),
            r = i.attr("href"),
            o = t(i.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            a = o.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(r) && r
            }, o.data(), i.data());
        i.is("a") && n.preventDefault(), o.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                i.is(":visible") && i.trigger("focus")
            })
        }), e.call(o, a, this)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.tooltip"),
                o = "object" == typeof e && e;
            (r || !/destroy|hide/.test(e)) && (r || i.data("bs.tooltip", r = new n(this, o)), "string" == typeof e && r[e]())
        })
    }
    var n = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    n.VERSION = "3.3.5", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, n.prototype.init = function(e, n, i) {
        if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var r = this.options.trigger.split(" "), o = r.length; o--;) {
            var a = r[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var s = "hover" == a ? "mouseenter" : "focusin",
                    c = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(c + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }, n.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, n.prototype.getDelegateOptions = function() {
        var e = {},
            n = this.getDefaults();
        return this._options && t.each(this._options, function(t, i) {
            n[t] != i && (e[t] = i)
        }), e
    }, n.prototype.enter = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState ? void(n.hoverState = "in") : (clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }, n.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, n.prototype.leave = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1), n.isInStateTrue() ? void 0 : (clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide())
    }, n.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i) return;
            var r = this,
                o = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
            var s = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                c = /\s?auto?\s?/i,
                l = c.test(s);
            l && (s = s.replace(c, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(s).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var u = this.getPosition(),
                d = o[0].offsetWidth,
                p = o[0].offsetHeight;
            if (l) {
                var f = s,
                    h = this.getPosition(this.$viewport);
                s = "bottom" == s && u.bottom + p > h.bottom ? "top" : "top" == s && u.top - p < h.top ? "bottom" : "right" == s && u.right + d > h.width ? "left" : "left" == s && u.left - d < h.left ? "right" : s, o.removeClass(f).addClass(s)
            }
            var m = this.getCalculatedOffset(s, u, d, p);
            this.applyPlacement(m, s);
            var g = function() {
                var t = r.hoverState;
                r.$element.trigger("shown.bs." + r.type), r.hoverState = null, "out" == t && r.leave(r)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", g).emulateTransitionEnd(n.TRANSITION_DURATION) : g()
        }
    }, n.prototype.applyPlacement = function(e, n) {
        var i = this.tip(),
            r = i[0].offsetWidth,
            o = i[0].offsetHeight,
            a = parseInt(i.css("margin-top"), 10),
            s = parseInt(i.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top += a, e.left += s, t.offset.setOffset(i[0], t.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), i.addClass("in");
        var c = i[0].offsetWidth,
            l = i[0].offsetHeight;
        "top" == n && l != o && (e.top = e.top + o - l);
        var u = this.getViewportAdjustedDelta(n, e, c, l);
        u.left ? e.left += u.left : e.top += u.top;
        var d = /top|bottom/.test(n),
            p = d ? 2 * u.left - r + c : 2 * u.top - o + l,
            f = d ? "offsetWidth" : "offsetHeight";
        i.offset(e), this.replaceArrow(p, i[0][f], d)
    }, n.prototype.replaceArrow = function(t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }, n.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, n.prototype.hide = function(e) {
        function i() {
            "in" != r.hoverState && o.detach(), r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), e && e()
        }
        var r = this,
            o = t(this.$tip),
            a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(), this.hoverState = null, this)
    }, n.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, n.prototype.hasContent = function() {
        return this.getTitle()
    }, n.prototype.getPosition = function(e) {
        e = e || this.$element;
        var n = e[0],
            i = "BODY" == n.tagName,
            r = n.getBoundingClientRect();
        null == r.width && (r = t.extend({}, r, {
            width: r.right - r.left,
            height: r.bottom - r.top
        }));
        var o = i ? {
                top: 0,
                left: 0
            } : e.offset(),
            a = {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            s = i ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, r, a, s, o)
    }, n.prototype.getCalculatedOffset = function(t, e, n, i) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - i,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - i / 2,
            left: e.left - n
        } : {
            top: e.top + e.height / 2 - i / 2,
            left: e.left + e.width
        }
    }, n.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
        var r = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return r;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var s = e.top - o - a.scroll,
                c = e.top + o - a.scroll + i;
            s < a.top ? r.top = a.top - s : c > a.top + a.height && (r.top = a.top + a.height - c)
        } else {
            var l = e.left - o,
                u = e.left + o + n;
            l < a.left ? r.left = a.left - l : u > a.right && (r.left = a.left + a.width - u)
        }
        return r
    }, n.prototype.getTitle = function() {
        var t, e = this.$element,
            n = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title);

    }, n.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, n.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, n.prototype.enable = function() {
        this.enabled = !0
    }, n.prototype.disable = function() {
        this.enabled = !1
    }, n.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, n.prototype.toggle = function(e) {
        var n = this;
        e && (n = t(e.currentTarget).data("bs." + this.type), n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), e ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, n.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.popover"),
                o = "object" == typeof e && e;
            (r || !/destroy|hide/.test(e)) && (r || i.data("bs.popover", r = new n(this, o)), "string" == typeof e && r[e]())
        })
    }
    var n = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    n.VERSION = "3.3.5", n.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), n.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }, n.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, n.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, n.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = n, t.fn.popover.noConflict = function() {
        return t.fn.popover = i, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(n, i) {
        this.$body = t(document.body), this.$scrollElement = t(t(n).is(document.body) ? window : n), this.options = t.extend({}, e.DEFAULTS, i), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function n(n) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.scrollspy"),
                o = "object" == typeof n && n;
            r || i.data("bs.scrollspy", r = new e(this, o)), "string" == typeof n && r[n]()
        })
    }
    e.VERSION = "3.3.5", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = this,
            n = "offset",
            i = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (n = "position", i = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                r = e.data("target") || e.attr("href"),
                o = /^#./.test(r) && t(r);
            return o && o.length && o.is(":visible") && [
                    [o[n]().top + i, r]
                ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            n = this.getScrollHeight(),
            i = this.options.offset + n - this.$scrollElement.height(),
            r = this.offsets,
            o = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), e >= i) return a != (t = o[o.length - 1]) && this.activate(t);
        if (a && e < r[0]) return this.activeTarget = null, this.clear();
        for (t = r.length; t--;) a != o[t] && e >= r[t] && (void 0 === r[t + 1] || e < r[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            i = t(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = n, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            n.call(e, e.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.tab");
            r || i.data("bs.tab", r = new n(this)), "string" == typeof e && r[e]()
        })
    }
    var n = function(e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.5", n.TRANSITION_DURATION = 150, n.prototype.show = function() {
        var e = this.element,
            n = e.closest("ul:not(.dropdown-menu)"),
            i = e.data("target");
        if (i || (i = e.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var r = n.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                a = t.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            if (r.trigger(o), e.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var s = t(i);
                this.activate(e.closest("li"), n), this.activate(s, s.parent(), function() {
                    r.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function(e, i, r) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), r && r()
        }
        var a = i.find("> .active"),
            s = r && t.support.transition && (a.length && a.hasClass("fade") || !!i.find("> .fade").length);
        a.length && s ? a.one("bsTransitionEnd", o).emulateTransitionEnd(n.TRANSITION_DURATION) : o(), a.removeClass("in")
    };
    var i = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function() {
        return t.fn.tab = i, this
    };
    var r = function(n) {
        n.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.affix"),
                o = "object" == typeof e && e;
            r || i.data("bs.affix", r = new n(this, o)), "string" == typeof e && r[e]()
        })
    }
    var n = function(e, i) {
        this.options = t.extend({}, n.DEFAULTS, i), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    n.VERSION = "3.3.5", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
        offset: 0,
        target: window
    }, n.prototype.getState = function(t, e, n, i) {
        var r = this.$target.scrollTop(),
            o = this.$element.offset(),
            a = this.$target.height();
        if (null != n && "top" == this.affixed) return n > r ? "top" : !1;
        if ("bottom" == this.affixed) return null != n ? r + this.unpin <= o.top ? !1 : "bottom" : t - i >= r + a ? !1 : "bottom";
        var s = null == this.affixed,
            c = s ? r : o.top,
            l = s ? a : e;
        return null != n && n >= r ? "top" : null != i && c + l >= t - i ? "bottom" : !1
    }, n.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, n.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, n.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                i = this.options.offset,
                r = i.top,
                o = i.bottom,
                a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof i && (o = r = i), "function" == typeof r && (r = i.top(this.$element)), "function" == typeof o && (o = i.bottom(this.$element));
            var s = this.getState(a, e, r, o);
            if (this.affixed != s) {
                null != this.unpin && this.$element.css("top", "");
                var c = "affix" + (s ? "-" + s : ""),
                    l = t.Event(c + ".bs.affix");
                if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                this.affixed = s, this.unpin = "bottom" == s ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(c).trigger(c.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == s && this.$element.offset({
                top: a - e - o
            })
        }
    };
    var i = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function() {
        return t.fn.affix = i, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var n = t(this),
                i = n.data();
            i.offset = i.offset || {}, null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), null != i.offsetTop && (i.offset.top = i.offsetTop), e.call(n, i)
        })
    })
}(jQuery);
var pJS = function(t, e) {
    var n = document.querySelector("#" + t + " > .particles-js-canvas-el");
    this.pJS = {
        canvas: {
            el: n,
            w: n.offsetWidth,
            h: n.offsetHeight
        },
        particles: {
            number: {
                value: 400,
                density: {
                    enable: !0,
                    value_area: 800
                }
            },
            color: {
                value: "#fff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#ff0000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 1,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 2,
                    opacity_min: 0,
                    sync: !1
                }
            },
            size: {
                value: 20,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 20,
                    size_min: 0,
                    sync: !1
                }
            },
            line_linked: {
                enable: !0,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1
            },
            move: {
                enable: !0,
                speed: 2,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {
                    enable: !1,
                    rotateX: 3e3,
                    rotateY: 3e3
                }
            },
            array: []
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !0,
                    mode: "grab"
                },
                onclick: {
                    enable: !0,
                    mode: "push"
                },
                resize: !0
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 200,
                    size: 80,
                    duration: .4
                },
                repulse: {
                    distance: 200,
                    duration: .4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            },
            mouse: {}
        },
        retina_detect: !1,
        fn: {
            interact: {},
            modes: {},
            vendors: {}
        },
        tmp: {}
    };
    var i = this.pJS;
    e && Object.deepExtend(i, e), i.tmp.obj = {
        size_value: i.particles.size.value,
        size_anim_speed: i.particles.size.anim.speed,
        move_speed: i.particles.move.speed,
        line_linked_distance: i.particles.line_linked.distance,
        line_linked_width: i.particles.line_linked.width,
        mode_grab_distance: i.interactivity.modes.grab.distance,
        mode_bubble_distance: i.interactivity.modes.bubble.distance,
        mode_bubble_size: i.interactivity.modes.bubble.size,
        mode_repulse_distance: i.interactivity.modes.repulse.distance
    }, i.fn.retinaInit = function() {
        i.retina_detect && window.devicePixelRatio > 1 ? (i.canvas.pxratio = window.devicePixelRatio, i.tmp.retina = !0) : (i.canvas.pxratio = 1, i.tmp.retina = !1), i.canvas.w = i.canvas.el.offsetWidth * i.canvas.pxratio, i.canvas.h = i.canvas.el.offsetHeight * i.canvas.pxratio, i.particles.size.value = i.tmp.obj.size_value * i.canvas.pxratio, i.particles.size.anim.speed = i.tmp.obj.size_anim_speed * i.canvas.pxratio, i.particles.move.speed = i.tmp.obj.move_speed * i.canvas.pxratio, i.particles.line_linked.distance = i.tmp.obj.line_linked_distance * i.canvas.pxratio, i.interactivity.modes.grab.distance = i.tmp.obj.mode_grab_distance * i.canvas.pxratio, i.interactivity.modes.bubble.distance = i.tmp.obj.mode_bubble_distance * i.canvas.pxratio, i.particles.line_linked.width = i.tmp.obj.line_linked_width * i.canvas.pxratio, i.interactivity.modes.bubble.size = i.tmp.obj.mode_bubble_size * i.canvas.pxratio, i.interactivity.modes.repulse.distance = i.tmp.obj.mode_repulse_distance * i.canvas.pxratio
    }, i.fn.canvasInit = function() {
        i.canvas.ctx = i.canvas.el.getContext("2d")
    }, i.fn.canvasSize = function() {
        i.canvas.el.width = i.canvas.w, i.canvas.el.height = i.canvas.h, i && i.interactivity.events.resize && window.addEventListener("resize", function() {
            i.canvas.w = i.canvas.el.offsetWidth, i.canvas.h = i.canvas.el.offsetHeight, i.tmp.retina && (i.canvas.w *= i.canvas.pxratio, i.canvas.h *= i.canvas.pxratio), i.canvas.el.width = i.canvas.w, i.canvas.el.height = i.canvas.h, i.particles.move.enable || (i.fn.particlesEmpty(), i.fn.particlesCreate(), i.fn.particlesDraw(), i.fn.vendors.densityAutoParticles()), i.fn.vendors.densityAutoParticles()
        })
    }, i.fn.canvasPaint = function() {
        i.canvas.ctx.fillRect(0, 0, i.canvas.w, i.canvas.h)
    }, i.fn.canvasClear = function() {
        i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h)
    }, i.fn.particle = function(t, e, n) {
        if (this.radius = (i.particles.size.random ? Math.random() : 1) * i.particles.size.value, i.particles.size.anim.enable && (this.size_status = !1, this.vs = i.particles.size.anim.speed / 100, i.particles.size.anim.sync || (this.vs = this.vs * Math.random())), this.x = n ? n.x : Math.random() * i.canvas.w, this.y = n ? n.y : Math.random() * i.canvas.h, this.x > i.canvas.w - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius), this.y > i.canvas.h - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius), i.particles.move.bounce && i.fn.vendors.checkOverlap(this, n), this.color = {}, "object" == typeof t.value)
            if (t.value instanceof Array) {
                var r = t.value[Math.floor(Math.random() * i.particles.color.value.length)];
                this.color.rgb = hexToRgb(r)
            } else void 0 != t.value.r && void 0 != t.value.g && void 0 != t.value.b && (this.color.rgb = {
                r: t.value.r,
                g: t.value.g,
                b: t.value.b
            }), void 0 != t.value.h && void 0 != t.value.s && void 0 != t.value.l && (this.color.hsl = {
                h: t.value.h,
                s: t.value.s,
                l: t.value.l
            });
        else "random" == t.value ? this.color.rgb = {
            r: Math.floor(256 * Math.random()) + 0,
            g: Math.floor(256 * Math.random()) + 0,
            b: Math.floor(256 * Math.random()) + 0
        } : "string" == typeof t.value && (this.color = t, this.color.rgb = hexToRgb(this.color.value));
        this.opacity = (i.particles.opacity.random ? Math.random() : 1) * i.particles.opacity.value, i.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = i.particles.opacity.anim.speed / 100, i.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
        var o = {};
        switch (i.particles.move.direction) {
            case "top":
                o = {
                    x: 0,
                    y: -1
                };
                break;
            case "top-right":
                o = {
                    x: .5,
                    y: -.5
                };
                break;
            case "right":
                o = {
                    x: 1,
                    y: -0
                };
                break;
            case "bottom-right":
                o = {
                    x: .5,
                    y: .5
                };
                break;
            case "bottom":
                o = {
                    x: 0,
                    y: 1
                };
                break;
            case "bottom-left":
                o = {
                    x: -.5,
                    y: 1
                };
                break;
            case "left":
                o = {
                    x: -1,
                    y: 0
                };
                break;
            case "top-left":
                o = {
                    x: -.5,
                    y: -.5
                };
                break;
            default:
                o = {
                    x: 0,
                    y: 0
                }
        }
        i.particles.move.straight ? (this.vx = o.x, this.vy = o.y, i.particles.move.random && (this.vx = this.vx * Math.random(), this.vy = this.vy * Math.random())) : (this.vx = o.x + Math.random() - .5, this.vy = o.y + Math.random() - .5), this.vx_i = this.vx, this.vy_i = this.vy;
        var a = i.particles.shape.type;
        if ("object" == typeof a) {
            if (a instanceof Array) {
                var s = a[Math.floor(Math.random() * a.length)];
                this.shape = s
            }
        } else this.shape = a;
        if ("image" == this.shape) {
            var c = i.particles.shape;
            this.img = {
                src: c.image.src,
                ratio: c.image.width / c.image.height
            }, this.img.ratio || (this.img.ratio = 1), "svg" == i.tmp.img_type && void 0 != i.tmp.source_svg && (i.fn.vendors.createSvgImg(this), i.tmp.pushing && (this.img.loaded = !1))
        }
    }, i.fn.particle.prototype.draw = function() {
        function t() {
            i.canvas.ctx.drawImage(a, e.x - n, e.y - n, 2 * n, 2 * n / e.img.ratio)
        }
        var e = this;
        if (void 0 != e.radius_bubble) var n = e.radius_bubble;
        else var n = e.radius;
        if (void 0 != e.opacity_bubble) var r = e.opacity_bubble;
        else var r = e.opacity;
        if (e.color.rgb) var o = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + r + ")";
        else var o = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + r + ")";
        switch (i.canvas.ctx.fillStyle = o, i.canvas.ctx.beginPath(), e.shape) {
            case "circle":
                i.canvas.ctx.arc(e.x, e.y, n, 0, 2 * Math.PI, !1);
                break;
            case "edge":
                i.canvas.ctx.rect(e.x - n, e.y - n, 2 * n, 2 * n);
                break;
            case "triangle":
                i.fn.vendors.drawShape(i.canvas.ctx, e.x - n, e.y + n / 1.66, 2 * n, 3, 2);
                break;
            case "polygon":
                i.fn.vendors.drawShape(i.canvas.ctx, e.x - n / (i.particles.shape.polygon.nb_sides / 3.5), e.y - n / .76, 2.66 * n / (i.particles.shape.polygon.nb_sides / 3), i.particles.shape.polygon.nb_sides, 1);
                break;
            case "star":
                i.fn.vendors.drawShape(i.canvas.ctx, e.x - 2 * n / (i.particles.shape.polygon.nb_sides / 4), e.y - n / 1.52, 2 * n * 2.66 / (i.particles.shape.polygon.nb_sides / 3), i.particles.shape.polygon.nb_sides, 2);
                break;
            case "image":
                if ("svg" == i.tmp.img_type) var a = e.img.obj;
                else var a = i.tmp.img_obj;
                a && t()
        }
        i.canvas.ctx.closePath(), i.particles.shape.stroke.width > 0 && (i.canvas.ctx.strokeStyle = i.particles.shape.stroke.color, i.canvas.ctx.lineWidth = i.particles.shape.stroke.width, i.canvas.ctx.stroke()), i.canvas.ctx.fill()
    }, i.fn.particlesCreate = function() {
        for (var t = 0; t < i.particles.number.value; t++) i.particles.array.push(new i.fn.particle(i.particles.color, i.particles.opacity.value))
    }, i.fn.particlesUpdate = function() {
        for (var t = 0; t < i.particles.array.length; t++) {
            var e = i.particles.array[t];
            if (i.particles.move.enable) {
                var n = i.particles.move.speed / 2;
                e.x += e.vx * n, e.y += e.vy * n
            }
            if (i.particles.opacity.anim.enable && (1 == e.opacity_status ? (e.opacity >= i.particles.opacity.value && (e.opacity_status = !1), e.opacity += e.vo) : (e.opacity <= i.particles.opacity.anim.opacity_min && (e.opacity_status = !0), e.opacity -= e.vo), e.opacity < 0 && (e.opacity = 0)), i.particles.size.anim.enable && (1 == e.size_status ? (e.radius >= i.particles.size.value && (e.size_status = !1), e.radius += e.vs) : (e.radius <= i.particles.size.anim.size_min && (e.size_status = !0), e.radius -= e.vs), e.radius < 0 && (e.radius = 0)), "bounce" == i.particles.move.out_mode) var r = {
                x_left: e.radius,
                x_right: i.canvas.w,
                y_top: e.radius,
                y_bottom: i.canvas.h
            };
            else var r = {
                x_left: -e.radius,
                x_right: i.canvas.w + e.radius,
                y_top: -e.radius,
                y_bottom: i.canvas.h + e.radius
            };
            switch (e.x - e.radius > i.canvas.w ? (e.x = r.x_left, e.y = Math.random() * i.canvas.h) : e.x + e.radius < 0 && (e.x = r.x_right, e.y = Math.random() * i.canvas.h), e.y - e.radius > i.canvas.h ? (e.y = r.y_top, e.x = Math.random() * i.canvas.w) : e.y + e.radius < 0 && (e.y = r.y_bottom, e.x = Math.random() * i.canvas.w), i.particles.move.out_mode) {
                case "bounce":
                    e.x + e.radius > i.canvas.w ? e.vx = -e.vx : e.x - e.radius < 0 && (e.vx = -e.vx), e.y + e.radius > i.canvas.h ? e.vy = -e.vy : e.y - e.radius < 0 && (e.vy = -e.vy)
            }
            if (isInArray("grab", i.interactivity.events.onhover.mode) && i.fn.modes.grabParticle(e), (isInArray("bubble", i.interactivity.events.onhover.mode) || isInArray("bubble", i.interactivity.events.onclick.mode)) && i.fn.modes.bubbleParticle(e), (isInArray("repulse", i.interactivity.events.onhover.mode) || isInArray("repulse", i.interactivity.events.onclick.mode)) && i.fn.modes.repulseParticle(e), i.particles.line_linked.enable || i.particles.move.attract.enable)
                for (var o = t + 1; o < i.particles.array.length; o++) {
                    var a = i.particles.array[o];
                    i.particles.line_linked.enable && i.fn.interact.linkParticles(e, a), i.particles.move.attract.enable && i.fn.interact.attractParticles(e, a), i.particles.move.bounce && i.fn.interact.bounceParticles(e, a)
                }
        }
    }, i.fn.particlesDraw = function() {
        i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h), i.fn.particlesUpdate();
        for (var t = 0; t < i.particles.array.length; t++) {
            var e = i.particles.array[t];
            e.draw()
        }
    }, i.fn.particlesEmpty = function() {
        i.particles.array = []
    }, i.fn.particlesRefresh = function() {
        cancelRequestAnimFrame(i.fn.checkAnimFrame), cancelRequestAnimFrame(i.fn.drawAnimFrame), i.tmp.source_svg = void 0, i.tmp.img_obj = void 0, i.tmp.count_svg = 0, i.fn.particlesEmpty(), i.fn.canvasClear(), i.fn.vendors.start()
    }, i.fn.interact.linkParticles = function(t, e) {
        var n = t.x - e.x,
            r = t.y - e.y,
            o = Math.sqrt(n * n + r * r);
        if (o <= i.particles.line_linked.distance) {
            var a = i.particles.line_linked.opacity - o / (1 / i.particles.line_linked.opacity) / i.particles.line_linked.distance;
            if (a > 0) {
                var s = i.particles.line_linked.color_rgb_line;
                i.canvas.ctx.strokeStyle = "rgba(" + s.r + "," + s.g + "," + s.b + "," + a + ")", i.canvas.ctx.lineWidth = i.particles.line_linked.width, i.canvas.ctx.beginPath(), i.canvas.ctx.moveTo(t.x, t.y), i.canvas.ctx.lineTo(e.x, e.y), i.canvas.ctx.stroke(), i.canvas.ctx.closePath()
            }
        }
    }, i.fn.interact.attractParticles = function(t, e) {
        var n = t.x - e.x,
            r = t.y - e.y,
            o = Math.sqrt(n * n + r * r);
        if (o <= i.particles.line_linked.distance) {
            var a = n / (1e3 * i.particles.move.attract.rotateX),
                s = r / (1e3 * i.particles.move.attract.rotateY);
            t.vx -= a, t.vy -= s, e.vx += a, e.vy += s
        }
    }, i.fn.interact.bounceParticles = function(t, e) {
        var n = t.x - e.x,
            i = t.y - e.y,
            r = Math.sqrt(n * n + i * i),
            o = t.radius + e.radius;
        o >= r && (t.vx = -t.vx, t.vy = -t.vy, e.vx = -e.vx, e.vy = -e.vy)
    }, i.fn.modes.pushParticles = function(t, e) {
        i.tmp.pushing = !0;
        for (var n = 0; t > n; n++) i.particles.array.push(new i.fn.particle(i.particles.color, i.particles.opacity.value, {
            x: e ? e.pos_x : Math.random() * i.canvas.w,
            y: e ? e.pos_y : Math.random() * i.canvas.h
        })), n == t - 1 && (i.particles.move.enable || i.fn.particlesDraw(), i.tmp.pushing = !1)
    }, i.fn.modes.removeParticles = function(t) {
        i.particles.array.splice(0, t), i.particles.move.enable || i.fn.particlesDraw()
    }, i.fn.modes.bubbleParticle = function(t) {
        function e() {
            t.opacity_bubble = t.opacity, t.radius_bubble = t.radius
        }

        function n(e, n, r, o, s) {
            if (e != n)
                if (i.tmp.bubble_duration_end) {
                    if (void 0 != r) {
                        var c = o - d * (o - e) / i.interactivity.modes.bubble.duration,
                            l = e - c;
                        p = e + l, "size" == s && (t.radius_bubble = p), "opacity" == s && (t.opacity_bubble = p)
                    }
                } else if (a <= i.interactivity.modes.bubble.distance) {
                    if (void 0 != r) var u = r;
                    else var u = o;
                    if (u != e) {
                        var p = o - d * (o - e) / i.interactivity.modes.bubble.duration;
                        "size" == s && (t.radius_bubble = p), "opacity" == s && (t.opacity_bubble = p)
                    }
                } else "size" == s && (t.radius_bubble = void 0), "opacity" == s && (t.opacity_bubble = void 0)
        }
        if (i.interactivity.events.onhover.enable && isInArray("bubble", i.interactivity.events.onhover.mode)) {
            var r = t.x - i.interactivity.mouse.pos_x,
                o = t.y - i.interactivity.mouse.pos_y,
                a = Math.sqrt(r * r + o * o),
                s = 1 - a / i.interactivity.modes.bubble.distance;
            if (a <= i.interactivity.modes.bubble.distance) {
                if (s >= 0 && "mousemove" == i.interactivity.status) {
                    if (i.interactivity.modes.bubble.size != i.particles.size.value)
                        if (i.interactivity.modes.bubble.size > i.particles.size.value) {
                            var c = t.radius + i.interactivity.modes.bubble.size * s;
                            c >= 0 && (t.radius_bubble = c)
                        } else {
                            var l = t.radius - i.interactivity.modes.bubble.size,
                                c = t.radius - l * s;
                            t.radius_bubble = c > 0 ? c : 0
                        }
                    if (i.interactivity.modes.bubble.opacity != i.particles.opacity.value)
                        if (i.interactivity.modes.bubble.opacity > i.particles.opacity.value) {
                            var u = i.interactivity.modes.bubble.opacity * s;
                            u > t.opacity && u <= i.interactivity.modes.bubble.opacity && (t.opacity_bubble = u)
                        } else {
                            var u = t.opacity - (i.particles.opacity.value - i.interactivity.modes.bubble.opacity) * s;
                            u < t.opacity && u >= i.interactivity.modes.bubble.opacity && (t.opacity_bubble = u)
                        }
                }
            } else e();
            "mouseleave" == i.interactivity.status && e()
        } else if (i.interactivity.events.onclick.enable && isInArray("bubble", i.interactivity.events.onclick.mode)) {
            if (i.tmp.bubble_clicking) {
                var r = t.x - i.interactivity.mouse.click_pos_x,
                    o = t.y - i.interactivity.mouse.click_pos_y,
                    a = Math.sqrt(r * r + o * o),
                    d = ((new Date).getTime() - i.interactivity.mouse.click_time) / 1e3;
                d > i.interactivity.modes.bubble.duration && (i.tmp.bubble_duration_end = !0), d > 2 * i.interactivity.modes.bubble.duration && (i.tmp.bubble_clicking = !1, i.tmp.bubble_duration_end = !1)
            }
            i.tmp.bubble_clicking && (n(i.interactivity.modes.bubble.size, i.particles.size.value, t.radius_bubble, t.radius, "size"), n(i.interactivity.modes.bubble.opacity, i.particles.opacity.value, t.opacity_bubble, t.opacity, "opacity"))
        }
    }, i.fn.modes.repulseParticle = function(t) {
        function e() {
            var e = Math.atan2(p, d);
            if (t.vx = h * Math.cos(e), t.vy = h * Math.sin(e), "bounce" == i.particles.move.out_mode) {
                var n = {
                    x: t.x + t.vx,
                    y: t.y + t.vy
                };
                n.x + t.radius > i.canvas.w ? t.vx = -t.vx : n.x - t.radius < 0 && (t.vx = -t.vx), n.y + t.radius > i.canvas.h ? t.vy = -t.vy : n.y - t.radius < 0 && (t.vy = -t.vy)
            }
        }
        if (i.interactivity.events.onhover.enable && isInArray("repulse", i.interactivity.events.onhover.mode) && "mousemove" == i.interactivity.status) {
            var n = t.x - i.interactivity.mouse.pos_x,
                r = t.y - i.interactivity.mouse.pos_y,
                o = Math.sqrt(n * n + r * r),
                a = {
                    x: n / o,
                    y: r / o
                },
                s = i.interactivity.modes.repulse.distance,
                c = 100,
                l = clamp(1 / s * (-1 * Math.pow(o / s, 2) + 1) * s * c, 0, 50),
                u = {
                    x: t.x + a.x * l,
                    y: t.y + a.y * l
                };
            "bounce" == i.particles.move.out_mode ? (u.x - t.radius > 0 && u.x + t.radius < i.canvas.w && (t.x = u.x), u.y - t.radius > 0 && u.y + t.radius < i.canvas.h && (t.y = u.y)) : (t.x = u.x, t.y = u.y)
        } else if (i.interactivity.events.onclick.enable && isInArray("repulse", i.interactivity.events.onclick.mode))
            if (i.tmp.repulse_finish || (i.tmp.repulse_count++, i.tmp.repulse_count == i.particles.array.length && (i.tmp.repulse_finish = !0)), i.tmp.repulse_clicking) {
                var s = Math.pow(i.interactivity.modes.repulse.distance / 6, 3),
                    d = i.interactivity.mouse.click_pos_x - t.x,
                    p = i.interactivity.mouse.click_pos_y - t.y,
                    f = d * d + p * p,
                    h = -s / f * 1;
                s >= f && e()
            } else 0 == i.tmp.repulse_clicking && (t.vx = t.vx_i, t.vy = t.vy_i)
    }, i.fn.modes.grabParticle = function(t) {
        if (i.interactivity.events.onhover.enable && "mousemove" == i.interactivity.status) {
            var e = t.x - i.interactivity.mouse.pos_x,
                n = t.y - i.interactivity.mouse.pos_y,
                r = Math.sqrt(e * e + n * n);
            if (r <= i.interactivity.modes.grab.distance) {
                var o = i.interactivity.modes.grab.line_linked.opacity - r / (1 / i.interactivity.modes.grab.line_linked.opacity) / i.interactivity.modes.grab.distance;
                if (o > 0) {
                    var a = i.particles.line_linked.color_rgb_line;
                    i.canvas.ctx.strokeStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + o + ")", i.canvas.ctx.lineWidth = i.particles.line_linked.width, i.canvas.ctx.beginPath(), i.canvas.ctx.moveTo(t.x, t.y), i.canvas.ctx.lineTo(i.interactivity.mouse.pos_x, i.interactivity.mouse.pos_y), i.canvas.ctx.stroke(), i.canvas.ctx.closePath()
                }
            }
        }
    }, i.fn.vendors.eventsListeners = function() {
        i.interactivity.el = "window" == i.interactivity.detect_on ? window : i.canvas.el, (i.interactivity.events.onhover.enable || i.interactivity.events.onclick.enable) && (i.interactivity.el.addEventListener("mousemove", function(t) {
            if (i.interactivity.el == window) var e = t.clientX,
                n = t.clientY;
            else var e = t.offsetX || t.clientX,
                n = t.offsetY || t.clientY;
            i.interactivity.mouse.pos_x = e, i.interactivity.mouse.pos_y = n, i.tmp.retina && (i.interactivity.mouse.pos_x *= i.canvas.pxratio, i.interactivity.mouse.pos_y *= i.canvas.pxratio), i.interactivity.status = "mousemove"
        }), i.interactivity.el.addEventListener("mouseleave", function(t) {
            i.interactivity.mouse.pos_x = null, i.interactivity.mouse.pos_y = null, i.interactivity.status = "mouseleave"
        })), i.interactivity.events.onclick.enable && i.interactivity.el.addEventListener("click", function() {
            if (i.interactivity.mouse.click_pos_x = i.interactivity.mouse.pos_x, i.interactivity.mouse.click_pos_y = i.interactivity.mouse.pos_y, i.interactivity.mouse.click_time = (new Date).getTime(), i.interactivity.events.onclick.enable) switch (i.interactivity.events.onclick.mode) {
                case "push":
                    i.particles.move.enable ? i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb, i.interactivity.mouse) : 1 == i.interactivity.modes.push.particles_nb ? i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb, i.interactivity.mouse) : i.interactivity.modes.push.particles_nb > 1 && i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb);
                    break;
                case "remove":
                    i.fn.modes.removeParticles(i.interactivity.modes.remove.particles_nb);
                    break;
                case "bubble":
                    i.tmp.bubble_clicking = !0;
                    break;
                case "repulse":
                    i.tmp.repulse_clicking = !0, i.tmp.repulse_count = 0, i.tmp.repulse_finish = !1, setTimeout(function() {
                        i.tmp.repulse_clicking = !1
                    }, 1e3 * i.interactivity.modes.repulse.duration)
            }
        })
    }, i.fn.vendors.densityAutoParticles = function() {
        if (i.particles.number.density.enable) {
            var t = i.canvas.el.width * i.canvas.el.height / 1e3;
            i.tmp.retina && (t /= 2 * i.canvas.pxratio);
            var e = t * i.particles.number.value / i.particles.number.density.value_area,
                n = i.particles.array.length - e;
            0 > n ? i.fn.modes.pushParticles(Math.abs(n)) : i.fn.modes.removeParticles(n)
        }
    }, i.fn.vendors.checkOverlap = function(t, e) {
        for (var n = 0; n < i.particles.array.length; n++) {
            var r = i.particles.array[n],
                o = t.x - r.x,
                a = t.y - r.y,
                s = Math.sqrt(o * o + a * a);
            s <= t.radius + r.radius && (t.x = e ? e.x : Math.random() * i.canvas.w, t.y = e ? e.y : Math.random() * i.canvas.h, i.fn.vendors.checkOverlap(t))
        }
    }, i.fn.vendors.createSvgImg = function(t) {
        var e = i.tmp.source_svg,
            n = /#([0-9A-F]{3,6})/gi,
            r = e.replace(n, function(e, n, i, r) {
                if (t.color.rgb) var o = "rgba(" + t.color.rgb.r + "," + t.color.rgb.g + "," + t.color.rgb.b + "," + t.opacity + ")";
                else var o = "hsla(" + t.color.hsl.h + "," + t.color.hsl.s + "%," + t.color.hsl.l + "%," + t.opacity + ")";
                return o
            }),
            o = new Blob([r], {
                type: "image/svg+xml;charset=utf-8"
            }),
            a = window.URL || window.webkitURL || window,
            s = a.createObjectURL(o),
            c = new Image;
        c.addEventListener("load", function() {
            t.img.obj = c, t.img.loaded = !0, a.revokeObjectURL(s), i.tmp.count_svg++
        }), c.src = s
    }, i.fn.vendors.destroypJS = function() {
        cancelAnimationFrame(i.fn.drawAnimFrame), n.remove(), pJSDom = null
    }, i.fn.vendors.drawShape = function(t, e, n, i, r, o) {
        var a = r * o,
            s = r / o,
            c = 180 * (s - 2) / s,
            l = Math.PI - Math.PI * c / 180;
        t.save(), t.beginPath(), t.translate(e, n), t.moveTo(0, 0);
        for (var u = 0; a > u; u++) t.lineTo(i, 0), t.translate(i, 0), t.rotate(l);
        t.fill(), t.restore()
    }, i.fn.vendors.exportImg = function() {
        window.open(i.canvas.el.toDataURL("image/png"), "_blank")
    }, i.fn.vendors.loadImg = function(t) {
        if (i.tmp.img_error = void 0, "" != i.particles.shape.image.src)
            if ("svg" == t) {
                var e = new XMLHttpRequest;
                e.open("GET", i.particles.shape.image.src), e.onreadystatechange = function(t) {
                    4 == e.readyState && (200 == e.status ? (i.tmp.source_svg = t.currentTarget.response, i.fn.vendors.checkBeforeDraw()) : (console.log("Error pJS - Image not found"), i.tmp.img_error = !0))
                }, e.send()
            } else {
                var n = new Image;
                n.addEventListener("load", function() {
                    i.tmp.img_obj = n, i.fn.vendors.checkBeforeDraw()
                }), n.src = i.particles.shape.image.src
            } else console.log("Error pJS - No image.src"), i.tmp.img_error = !0
    }, i.fn.vendors.draw = function() {
        "image" == i.particles.shape.type ? "svg" == i.tmp.img_type ? i.tmp.count_svg >= i.particles.number.value ? (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame)) : i.tmp.img_error || (i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw)) : void 0 != i.tmp.img_obj ? (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame)) : i.tmp.img_error || (i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw)) : (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame))
    }, i.fn.vendors.checkBeforeDraw = function() {
        "image" == i.particles.shape.type ? "svg" == i.tmp.img_type && void 0 == i.tmp.source_svg ? i.tmp.checkAnimFrame = requestAnimFrame(check) : (cancelRequestAnimFrame(i.tmp.checkAnimFrame), i.tmp.img_error || (i.fn.vendors.init(), i.fn.vendors.draw())) : (i.fn.vendors.init(), i.fn.vendors.draw())
    }, i.fn.vendors.init = function() {
        i.fn.retinaInit(), i.fn.canvasInit(), i.fn.canvasSize(), i.fn.canvasPaint(), i.fn.particlesCreate(), i.fn.vendors.densityAutoParticles(), i.particles.line_linked.color_rgb_line = hexToRgb(i.particles.line_linked.color)
    }, i.fn.vendors.start = function() {
        isInArray("image", i.particles.shape.type) ? (i.tmp.img_type = i.particles.shape.image.src.substr(i.particles.shape.image.src.length - 3), i.fn.vendors.loadImg(i.tmp.img_type)) : i.fn.vendors.checkBeforeDraw()
    }, i.fn.vendors.eventsListeners(), i.fn.vendors.start()
};
Object.deepExtend = function(t, e) {
    for (var n in e) e[n] && e[n].constructor && e[n].constructor === Object ? (t[n] = t[n] || {}, arguments.callee(t[n], e[n])) : t[n] = e[n];
    return t
}, window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            window.setTimeout(t, 1e3 / 60)
        }
}(), window.cancelRequestAnimFrame = function() {
    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
}(), window.pJSDom = [], window.particlesJS = function(t, e) {
    "string" != typeof t && (e = t, t = "particles-js"), t || (t = "particles-js");
    var n = document.getElementById(t),
        i = "particles-js-canvas-el",
        r = n.getElementsByClassName(i);
    if (r.length)
        for (; r.length > 0;) n.removeChild(r[0]);
    var o = document.createElement("canvas");
    o.className = i, o.style.width = "100%", o.style.height = "100%";
    var a = document.getElementById(t).appendChild(o);
    null != a && pJSDom.push(new pJS(t, e))
}, window.particlesJS.load = function(t, e, n) {
    var i = new XMLHttpRequest;
    i.open("GET", e), i.onreadystatechange = function(e) {
        if (4 == i.readyState)
            if (200 == i.status) {
                var r = JSON.parse(e.currentTarget.response);
                window.particlesJS(t, r), n && n()
            } else console.log("Error pJS - XMLHttpRequest status: " + i.status),
                console.log("Error pJS - File config not found")
    }, i.send()
},
    function(t, e) {
        function n(t, e, n) {
            var i = u[e.type] || {};
            return null == t ? n || !e.def ? null : e.def : (t = i.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : i.mod ? (t + i.mod) % i.mod : 0 > t ? 0 : i.max < t ? i.max : t)
        }

        function i(e) {
            var n = c(),
                i = n._rgba = [];
            return e = e.toLowerCase(), f(s, function(t, r) {
                var o, a = r.re.exec(e);
                return o = a && r.parse(a), a = r.space || "rgba", o ? (o = n[a](o), n[l[a].cache] = o[l[a].cache], i = n._rgba = o._rgba, !1) : void 0
            }), i.length ? ("0,0,0,0" === i.join() && t.extend(i, o.transparent), n) : o[e]
        }

        function r(t, e, n) {
            return n = (n + 1) % 1, 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t
        }
        var o, a = /^([\-+])=\s*(\d+\.?\d*)/,
            s = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(t) {
                    return [t[1], t[2], t[3], t[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(t) {
                    return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function(t) {
                    return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function(t) {
                    return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function(t) {
                    return [t[1], t[2] / 100, t[3] / 100, t[4]]
                }
            }],
            c = t.Color = function(e, n, i, r) {
                return new t.Color.fn.parse(e, n, i, r)
            },
            l = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            u = {
                "byte": {
                    floor: !0,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: !0
                }
            },
            d = c.support = {},
            p = t("<p>")[0],
            f = t.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = -1 < p.style.backgroundColor.indexOf("rgba"), f(l, function(t, e) {
            e.cache = "_" + t, e.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }), c.fn = t.extend(c.prototype, {
            parse: function(r, a, s, u) {
                if (r === e) return this._rgba = [null, null, null, null], this;
                (r.jquery || r.nodeType) && (r = t(r).css(a), a = e);
                var d = this,
                    p = t.type(r),
                    h = this._rgba = [];
                return a !== e && (r = [r, a, s, u], p = "array"), "string" === p ? this.parse(i(r) || o._default) : "array" === p ? (f(l.rgba.props, function(t, e) {
                    h[e.idx] = n(r[e.idx], e)
                }), this) : "object" === p ? (r instanceof c ? f(l, function(t, e) {
                    r[e.cache] && (d[e.cache] = r[e.cache].slice())
                }) : f(l, function(e, i) {
                    var o = i.cache;
                    f(i.props, function(t, e) {
                        if (!d[o] && i.to) {
                            if ("alpha" === t || null == r[t]) return;
                            d[o] = i.to(d._rgba)
                        }
                        d[o][e.idx] = n(r[t], e, !0)
                    }), d[o] && 0 > t.inArray(null, d[o].slice(0, 3)) && (d[o][3] = 1, i.from && (d._rgba = i.from(d[o])))
                }), this) : void 0
            },
            is: function(t) {
                var e = c(t),
                    n = !0,
                    i = this;
                return f(l, function(t, r) {
                    var o, a = e[r.cache];
                    return a && (o = i[r.cache] || r.to && r.to(i._rgba) || [], f(r.props, function(t, e) {
                        return null != a[e.idx] ? n = a[e.idx] === o[e.idx] : void 0
                    })), n
                }), n
            },
            _space: function() {
                var t = [],
                    e = this;
                return f(l, function(n, i) {
                    e[i.cache] && t.push(n)
                }), t.pop()
            },
            transition: function(t, e) {
                var i = c(t),
                    r = i._space(),
                    o = l[r],
                    a = 0 === this.alpha() ? c("transparent") : this,
                    s = a[o.cache] || o.to(a._rgba),
                    d = s.slice(),
                    i = i[o.cache];
                return f(o.props, function(t, r) {
                    var o = r.idx,
                        a = s[o],
                        c = i[o],
                        l = u[r.type] || {};
                    null !== c && (null === a ? d[o] = c : (l.mod && (c - a > l.mod / 2 ? a += l.mod : a - c > l.mod / 2 && (a -= l.mod)), d[o] = n((c - a) * e + a, r)))
                }), this[r](d)
            },
            blend: function(e) {
                if (1 === this._rgba[3]) return this;
                var n = this._rgba.slice(),
                    i = n.pop(),
                    r = c(e)._rgba;
                return c(t.map(n, function(t, e) {
                    return (1 - i) * r[e] + i * t
                }))
            },
            toRgbaString: function() {
                var e = "rgba(",
                    n = t.map(this._rgba, function(t, e) {
                        return null == t ? e > 2 ? 1 : 0 : t
                    });
                return 1 === n[3] && (n.pop(), e = "rgb("), e + n.join() + ")"
            },
            toHslaString: function() {
                var e = "hsla(",
                    n = t.map(this.hsla(), function(t, e) {
                        return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                    });
                return 1 === n[3] && (n.pop(), e = "hsl("), e + n.join() + ")"
            },
            toHexString: function(e) {
                var n = this._rgba.slice(),
                    i = n.pop();
                return e && n.push(~~(255 * i)), "#" + t.map(n, function(t) {
                    return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), c.fn.parse.prototype = c.fn, l.hsla.to = function(t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
            var e = t[0] / 255,
                n = t[1] / 255,
                i = t[2] / 255;
            t = t[3];
            var r = Math.max(e, n, i),
                o = Math.min(e, n, i),
                a = r - o,
                s = r + o,
                c = .5 * s,
                s = 0 === a ? 0 : .5 >= c ? a / s : a / (2 - s);
            return [Math.round(o === r ? 0 : e === r ? 60 * (n - i) / a + 360 : n === r ? 60 * (i - e) / a + 120 : 60 * (e - n) / a + 240) % 360, s, c, null == t ? 1 : t]
        }, l.hsla.from = function(t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
            var e = t[0] / 360,
                n = t[1],
                i = t[2];
            return t = t[3], n = .5 >= i ? i * (1 + n) : i + n - i * n, i = 2 * i - n, [Math.round(255 * r(i, n, e + 1 / 3)), Math.round(255 * r(i, n, e)), Math.round(255 * r(i, n, e - 1 / 3)), t]
        }, f(l, function(i, r) {
            var o = r.props,
                s = r.cache,
                l = r.to,
                u = r.from;
            c.fn[i] = function(i) {
                if (l && !this[s] && (this[s] = l(this._rgba)), i === e) return this[s].slice();
                var r, a = t.type(i),
                    d = "array" === a || "object" === a ? i : arguments,
                    p = this[s].slice();
                return f(o, function(t, e) {
                    var i = d["object" === a ? t : e.idx];
                    null == i && (i = p[e.idx]), p[e.idx] = n(i, e)
                }), u ? (r = c(u(p)), r[s] = p, r) : c(p)
            }, f(o, function(e, n) {
                c.fn[e] || (c.fn[e] = function(r) {
                    var o = t.type(r),
                        s = "alpha" === e ? this._hsla ? "hsla" : "rgba" : i,
                        c = this[s](),
                        l = c[n.idx];
                    return "undefined" === o ? l : ("function" === o && (r = r.call(this, l), o = t.type(r)), null == r && n.empty ? this : ("string" === o && (o = a.exec(r)) && (r = l + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1)), c[n.idx] = r, this[s](c)))
                })
            })
        }), c.hook = function(e) {
            e = e.split(" "), f(e, function(e, n) {
                t.cssHooks[n] = {
                    set: function(e, r) {
                        var o, a = "";
                        if ("transparent" !== r && ("string" !== t.type(r) || (o = i(r)))) {
                            if (r = c(o || r), !d.rgba && 1 !== r._rgba[3]) {
                                for (o = "backgroundColor" === n ? e.parentNode : e;
                                     ("" === a || "transparent" === a) && o && o.style;) try {
                                    a = t.css(o, "backgroundColor"), o = o.parentNode
                                } catch (s) {}
                                r = r.blend(a && "transparent" !== a ? a : "_default")
                            }
                            r = r.toRgbaString()
                        }
                        try {
                            e.style[n] = r
                        } catch (l) {}
                    }
                }, t.fx.step[n] = function(e) {
                    e.colorInit || (e.start = c(e.elem, n), e.end = c(e.end), e.colorInit = !0), t.cssHooks[n].set(e.elem, e.start.transition(e.end, e.pos))
                }
            })
        }, c.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"), t.cssHooks.borderColor = {
            expand: function(t) {
                var e = {};
                return f(["Top", "Right", "Bottom", "Left"], function(n, i) {
                    e["border" + i + "Color"] = t
                }), e
            }
        }, o = t.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(jQuery), ! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.io = t()
    }
}(function() {
    var t;
    return function e(t, n, i) {
        function r(a, s) {
            if (!n[a]) {
                if (!t[a]) {
                    var c = "function" == typeof require && require;
                    if (!s && c) return c(a, !0);
                    if (o) return o(a, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
                var l = n[a] = {
                    exports: {}
                };
                t[a][0].call(l.exports, function(e) {
                    var n = t[a][1][e];
                    return r(n ? n : e)
                }, l, l.exports, e, t, n, i)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
        return r
    }({
        1: [function(t, e, n) {
            e.exports = t("./lib/")
        }, {
            "./lib/": 2
        }],
        2: [function(t, e, n) {
            function i(t, e) {
                "object" == typeof t && (e = t, t = void 0), e = e || {};
                var n, i = r(t),
                    o = i.source,
                    l = i.id;
                return e.forceNew || e["force new connection"] || !1 === e.multiplex ? (s("ignoring socket cache for %s", o), n = a(o, e)) : (c[l] || (s("new io instance for %s", o), c[l] = a(o, e)), n = c[l]), n.socket(i.path)
            }
            var r = t("./url"),
                o = t("socket.io-parser"),
                a = t("./manager"),
                s = t("debug")("socket.io-client");
            e.exports = n = i;
            var c = n.managers = {};
            n.protocol = o.protocol, n.connect = i, n.Manager = t("./manager"), n.Socket = t("./socket")
        }, {
            "./manager": 3,
            "./socket": 5,
            "./url": 6,
            debug: 10,
            "socket.io-parser": 46
        }],
        3: [function(t, e, n) {
            function i(t, e) {
                return this instanceof i ? (t && "object" == typeof t && (e = t, t = void 0), e = e || {}, e.path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new p({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connected = [], this.encoding = !1, this.packetBuffer = [], this.encoder = new s.Encoder, this.decoder = new s.Decoder, this.autoConnect = e.autoConnect !== !1, void(this.autoConnect && this.open())) : new i(t, e)
            }
            var r = (t("./url"), t("engine.io-client")),
                o = t("./socket"),
                a = t("component-emitter"),
                s = t("socket.io-parser"),
                c = t("./on"),
                l = t("component-bind"),
                u = (t("object-component"), t("debug")("socket.io-client:manager")),
                d = t("indexof"),
                p = t("backo2");
            e.exports = i, i.prototype.emitAll = function() {
                this.emit.apply(this, arguments);
                for (var t in this.nsps) this.nsps[t].emit.apply(this.nsps[t], arguments)
            }, i.prototype.updateSocketIds = function() {
                for (var t in this.nsps) this.nsps[t].id = this.engine.id
            }, a(i.prototype), i.prototype.reconnection = function(t) {
                return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
            }, i.prototype.reconnectionAttempts = function(t) {
                return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
            }, i.prototype.reconnectionDelay = function(t) {
                return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
            }, i.prototype.randomizationFactor = function(t) {
                return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor
            }, i.prototype.reconnectionDelayMax = function(t) {
                return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax
            }, i.prototype.timeout = function(t) {
                return arguments.length ? (this._timeout = t, this) : this._timeout
            }, i.prototype.maybeReconnectOnOpen = function() {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            }, i.prototype.open = i.prototype.connect = function(t) {
                if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                u("opening %s", this.uri), this.engine = r(this.uri, this.opts);
                var e = this.engine,
                    n = this;
                this.readyState = "opening", this.skipReconnect = !1;
                var i = c(e, "open", function() {
                        n.onopen(), t && t()
                    }),
                    o = c(e, "error", function(e) {
                        if (u("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", e), t) {
                            var i = new Error("Connection error");
                            i.data = e, t(i)
                        } else n.maybeReconnectOnOpen()
                    });
                if (!1 !== this._timeout) {
                    var a = this._timeout;
                    u("connect attempt will timeout after %d", a);
                    var s = setTimeout(function() {
                        u("connect attempt timed out after %d", a), i.destroy(), e.close(), e.emit("error", "timeout"), n.emitAll("connect_timeout", a)
                    }, a);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(s)
                        }
                    })
                }
                return this.subs.push(i), this.subs.push(o), this
            }, i.prototype.onopen = function() {
                u("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                var t = this.engine;
                this.subs.push(c(t, "data", l(this, "ondata"))), this.subs.push(c(this.decoder, "decoded", l(this, "ondecoded"))), this.subs.push(c(t, "error", l(this, "onerror"))), this.subs.push(c(t, "close", l(this, "onclose")))
            }, i.prototype.ondata = function(t) {
                this.decoder.add(t)
            }, i.prototype.ondecoded = function(t) {
                this.emit("packet", t)
            }, i.prototype.onerror = function(t) {
                u("error", t), this.emitAll("error", t)
            }, i.prototype.socket = function(t) {
                var e = this.nsps[t];
                if (!e) {
                    e = new o(this, t), this.nsps[t] = e;
                    var n = this;
                    e.on("connect", function() {
                        e.id = n.engine.id, ~d(n.connected, e) || n.connected.push(e)
                    })
                }
                return e
            }, i.prototype.destroy = function(t) {
                var e = d(this.connected, t);
                ~e && this.connected.splice(e, 1), this.connected.length || this.close()
            }, i.prototype.packet = function(t) {
                u("writing packet %j", t);
                var e = this;
                e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, this.encoder.encode(t, function(t) {
                    for (var n = 0; n < t.length; n++) e.engine.write(t[n]);
                    e.encoding = !1, e.processPacketQueue()
                }))
            }, i.prototype.processPacketQueue = function() {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var t = this.packetBuffer.shift();
                    this.packet(t)
                }
            }, i.prototype.cleanup = function() {
                for (var t; t = this.subs.shift();) t.destroy();
                this.packetBuffer = [], this.encoding = !1, this.decoder.destroy()
            }, i.prototype.close = i.prototype.disconnect = function() {
                this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
            }, i.prototype.onclose = function(t) {
                u("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect()
            }, i.prototype.reconnect = function() {
                if (this.reconnecting || this.skipReconnect) return this;
                var t = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
                else {
                    var e = this.backoff.duration();
                    u("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
                    var n = setTimeout(function() {
                        t.skipReconnect || (u("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function(e) {
                            e ? (u("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (u("reconnect success"), t.onreconnect())
                        }))
                    }, e);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(n)
                        }
                    })
                }
            }, i.prototype.onreconnect = function() {
                var t = this.backoff.attempts;
                this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
            }
        }, {
            "./on": 4,
            "./socket": 5,
            "./url": 6,
            backo2: 7,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "engine.io-client": 11,
            indexof: 42,
            "object-component": 43,
            "socket.io-parser": 46
        }],
        4: [function(t, e, n) {
            function i(t, e, n) {
                return t.on(e, n), {
                    destroy: function() {
                        t.removeListener(e, n)
                    }
                }
            }
            e.exports = i
        }, {}],
        5: [function(t, e, n) {
            function i(t, e) {
                this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.io.autoConnect && this.open(), this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0
            }
            var r = t("socket.io-parser"),
                o = t("component-emitter"),
                a = t("to-array"),
                s = t("./on"),
                c = t("component-bind"),
                l = t("debug")("socket.io-client:socket"),
                u = t("has-binary");
            e.exports = n = i;
            var d = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1
                },
                p = o.prototype.emit;
            o(i.prototype), i.prototype.subEvents = function() {
                if (!this.subs) {
                    var t = this.io;
                    this.subs = [s(t, "open", c(this, "onopen")), s(t, "packet", c(this, "onpacket")), s(t, "close", c(this, "onclose"))]
                }
            }, i.prototype.open = i.prototype.connect = function() {
                return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this)
            }, i.prototype.send = function() {
                var t = a(arguments);
                return t.unshift("message"), this.emit.apply(this, t), this
            }, i.prototype.emit = function(t) {
                if (d.hasOwnProperty(t)) return p.apply(this, arguments), this;
                var e = a(arguments),
                    n = r.EVENT;
                u(e) && (n = r.BINARY_EVENT);
                var i = {
                    type: n,
                    data: e
                };
                return "function" == typeof e[e.length - 1] && (l("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), i.id = this.ids++), this.connected ? this.packet(i) : this.sendBuffer.push(i), this
            }, i.prototype.packet = function(t) {
                t.nsp = this.nsp, this.io.packet(t)
            }, i.prototype.onopen = function() {
                l("transport is open - connecting"), "/" != this.nsp && this.packet({
                    type: r.CONNECT
                })
            }, i.prototype.onclose = function(t) {
                l("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
            }, i.prototype.onpacket = function(t) {
                if (t.nsp == this.nsp) switch (t.type) {
                    case r.CONNECT:
                        this.onconnect();
                        break;
                    case r.EVENT:
                        this.onevent(t);
                        break;
                    case r.BINARY_EVENT:
                        this.onevent(t);
                        break;
                    case r.ACK:
                        this.onack(t);
                        break;
                    case r.BINARY_ACK:
                        this.onack(t);
                        break;
                    case r.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case r.ERROR:
                        this.emit("error", t.data)
                }
            }, i.prototype.onevent = function(t) {
                var e = t.data || [];
                l("emitting event %j", e), null != t.id && (l("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? p.apply(this, e) : this.receiveBuffer.push(e)
            }, i.prototype.ack = function(t) {
                var e = this,
                    n = !1;
                return function() {
                    if (!n) {
                        n = !0;
                        var i = a(arguments);
                        l("sending ack %j", i);
                        var o = u(i) ? r.BINARY_ACK : r.ACK;
                        e.packet({
                            type: o,
                            id: t,
                            data: i
                        })
                    }
                }
            }, i.prototype.onack = function(t) {
                l("calling ack %s with %j", t.id, t.data);
                var e = this.acks[t.id];
                e.apply(this, t.data), delete this.acks[t.id]
            }, i.prototype.onconnect = function() {
                this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
            }, i.prototype.emitBuffered = function() {
                var t;
                for (t = 0; t < this.receiveBuffer.length; t++) p.apply(this, this.receiveBuffer[t]);
                for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
                this.sendBuffer = []
            }, i.prototype.ondisconnect = function() {
                l("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
            }, i.prototype.destroy = function() {
                if (this.subs) {
                    for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            }, i.prototype.close = i.prototype.disconnect = function() {
                return this.connected && (l("performing disconnect (%s)", this.nsp), this.packet({
                    type: r.DISCONNECT
                })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
            }
        }, {
            "./on": 4,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "has-binary": 38,
            "socket.io-parser": 46,
            "to-array": 50
        }],
        6: [function(t, e, n) {
            (function(n) {
                function i(t, e) {
                    var i = t,
                        e = e || n.location;
                    return null == t && (t = e.protocol + "//" + e.host), "string" == typeof t && ("/" == t.charAt(0) && (t = "/" == t.charAt(1) ? e.protocol + t : e.hostname + t), /^(https?|wss?):\/\//.test(t) || (o("protocol-less url %s", t), t = "undefined" != typeof e ? e.protocol + "//" + t : "https://" + t), o("parse %s", t), i = r(t)), i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port = "443")), i.path = i.path || "/", i.id = i.protocol + "://" + i.host + ":" + i.port, i.href = i.protocol + "://" + i.host + (e && e.port == i.port ? "" : ":" + i.port), i
                }
                var r = t("parseuri"),
                    o = t("debug")("socket.io-client:url");
                e.exports = i
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            debug: 10,
            parseuri: 44
        }],
        7: [function(t, e, n) {
            function i(t) {
                t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
            }
            e.exports = i, i.prototype.duration = function() {
                var t = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var e = Math.random(),
                        n = Math.floor(e * this.jitter * t);
                    t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n
                }
                return 0 | Math.min(t, this.max)
            }, i.prototype.reset = function() {
                this.attempts = 0
            }, i.prototype.setMin = function(t) {
                this.ms = t
            }, i.prototype.setMax = function(t) {
                this.max = t
            }, i.prototype.setJitter = function(t) {
                this.jitter = t
            }
        }, {}],
        8: [function(t, e, n) {
            var i = [].slice;
            e.exports = function(t, e) {
                if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
                var n = i.call(arguments, 2);
                return function() {
                    return e.apply(t, n.concat(i.call(arguments)))
                }
            }
        }, {}],
        9: [function(t, e, n) {
            function i(t) {
                return t ? r(t) : void 0
            }

            function r(t) {
                for (var e in i.prototype) t[e] = i.prototype[e];
                return t
            }
            e.exports = i, i.prototype.on = i.prototype.addEventListener = function(t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
            }, i.prototype.once = function(t, e) {
                function n() {
                    i.off(t, n), e.apply(this, arguments)
                }
                var i = this;
                return this._callbacks = this._callbacks || {}, n.fn = e, this.on(t, n), this
            }, i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = i.prototype.removeEventListener = function(t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var n = this._callbacks[t];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks[t], this;
                for (var i, r = 0; r < n.length; r++)
                    if (i = n[r], i === e || i.fn === e) {
                        n.splice(r, 1);
                        break
                    }
                return this
            }, i.prototype.emit = function(t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1),
                    n = this._callbacks[t];
                if (n) {
                    n = n.slice(0);
                    for (var i = 0, r = n.length; r > i; ++i) n[i].apply(this, e)
                }
                return this
            }, i.prototype.listeners = function(t) {
                return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
            }, i.prototype.hasListeners = function(t) {
                return !!this.listeners(t).length
            }
        }, {}],
        10: [function(t, e, n) {
            function i(t) {
                return i.enabled(t) ? function(e) {
                    e = r(e);
                    var n = new Date,
                        o = n - (i[t] || n);
                    i[t] = n, e = t + " " + e + " +" + i.humanize(o), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                } : function() {}
            }

            function r(t) {
                return t instanceof Error ? t.stack || t.message : t
            }
            e.exports = i, i.names = [], i.skips = [], i.enable = function(t) {
                try {
                    localStorage.debug = t
                } catch (e) {}
                for (var n = (t || "").split(/[\s,]+/), r = n.length, o = 0; r > o; o++) t = n[o].replace("*", ".*?"), "-" === t[0] ? i.skips.push(new RegExp("^" + t.substr(1) + "$")) : i.names.push(new RegExp("^" + t + "$"))
            }, i.disable = function() {
                i.enable("")
            }, i.humanize = function(t) {
                var e = 1e3,
                    n = 6e4,
                    i = 60 * n;
                return t >= i ? (t / i).toFixed(1) + "h" : t >= n ? (t / n).toFixed(1) + "m" : t >= e ? (t / e | 0) + "s" : t + "ms"
            }, i.enabled = function(t) {
                for (var e = 0, n = i.skips.length; n > e; e++)
                    if (i.skips[e].test(t)) return !1;
                for (var e = 0, n = i.names.length; n > e; e++)
                    if (i.names[e].test(t)) return !0;
                return !1
            };
            try {
                window.localStorage && i.enable(localStorage.debug)
            } catch (o) {}
        }, {}],
        11: [function(t, e, n) {
            e.exports = t("./lib/")
        }, {
            "./lib/": 12
        }],
        12: [function(t, e, n) {
            e.exports = t("./socket"), e.exports.parser = t("engine.io-parser")
        }, {
            "./socket": 13,
            "engine.io-parser": 25
        }],
        13: [function(t, e, n) {
            (function(n) {
                function i(t, e) {
                    if (!(this instanceof i)) return new i(t, e);
                    if (e = e || {}, t && "object" == typeof t && (e = t, t = null), t && (t = u(t), e.host = t.host, e.secure = "https" == t.protocol || "wss" == t.protocol, e.port = t.port, t.query && (e.query = t.query)), this.secure = null != e.secure ? e.secure : n.location && "https:" == location.protocol, e.host) {
                        var r = e.host.split(":");
                        e.hostname = r.shift(), r.length ? e.port = r.pop() : e.port || (e.port = this.secure ? "443" : "80")
                    }
                    this.agent = e.agent || !1, this.hostname = e.hostname || (n.location ? location.hostname : "localhost"), this.port = e.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, "string" == typeof this.query && (this.query = p.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = e.rejectUnauthorized || null, this.open()
                }

                function r(t) {
                    var e = {};
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                    return e
                }
                var o = t("./transports"),
                    a = t("component-emitter"),
                    s = t("debug")("engine.io-client:socket"),
                    c = t("indexof"),
                    l = t("engine.io-parser"),
                    u = t("parseuri"),
                    d = t("parsejson"),
                    p = t("parseqs");
                e.exports = i, i.priorWebsocketSuccess = !1, a(i.prototype), i.protocol = l.protocol, i.Socket = i, i.Transport = t("./transport"), i.transports = t("./transports"), i.parser = t("engine.io-parser"), i.prototype.createTransport = function(t) {
                    s('creating transport "%s"', t);
                    var e = r(this.query);
                    e.EIO = l.protocol, e.transport = t, this.id && (e.sid = this.id);
                    var n = new o[t]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: e,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized
                    });
                    return n
                }, i.prototype.open = function() {
                    var t;
                    if (this.rememberUpgrade && i.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) t = "websocket";
                    else {
                        if (0 == this.transports.length) {
                            var e = this;
                            return void setTimeout(function() {
                                e.emit("error", "No transports available")
                            }, 0)
                        }
                        t = this.transports[0]
                    }
                    this.readyState = "opening";
                    var t;
                    try {
                        t = this.createTransport(t)
                    } catch (n) {
                        return this.transports.shift(), void this.open()
                    }
                    t.open(), this.setTransport(t)
                }, i.prototype.setTransport = function(t) {
                    s("setting transport %s", t.name);
                    var e = this;
                    this.transport && (s("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function() {
                        e.onDrain()
                    }).on("packet", function(t) {
                        e.onPacket(t)
                    }).on("error", function(t) {
                        e.onError(t)
                    }).on("close", function() {
                        e.onClose("transport close")
                    })
                }, i.prototype.probe = function(t) {
                    function e() {
                        if (p.onlyBinaryUpgrades) {
                            var e = !this.supportsBinary && p.transport.supportsBinary;
                            d = d || e
                        }
                        d || (s('probe transport "%s" opened', t), u.send([{
                            type: "ping",
                            data: "probe"
                        }]), u.once("packet", function(e) {
                            if (!d)
                                if ("pong" == e.type && "probe" == e.data) {
                                    if (s('probe transport "%s" pong', t), p.upgrading = !0, p.emit("upgrading", u), !u) return;
                                    i.priorWebsocketSuccess = "websocket" == u.name, s('pausing current transport "%s"', p.transport.name), p.transport.pause(function() {
                                        d || "closed" != p.readyState && (s("changing transport and sending upgrade packet"), l(), p.setTransport(u), u.send([{
                                            type: "upgrade"
                                        }]), p.emit("upgrade", u), u = null, p.upgrading = !1, p.flush())
                                    })
                                } else {
                                    s('probe transport "%s" failed', t);
                                    var n = new Error("probe error");
                                    n.transport = u.name, p.emit("upgradeError", n)
                                }
                        }))
                    }

                    function n() {
                        d || (d = !0, l(), u.close(), u = null)
                    }

                    function r(e) {
                        var i = new Error("probe error: " + e);
                        i.transport = u.name, n(), s('probe transport "%s" failed because of error: %s', t, e), p.emit("upgradeError", i)
                    }

                    function o() {
                        r("transport closed")
                    }

                    function a() {
                        r("socket closed")
                    }

                    function c(t) {
                        u && t.name != u.name && (s('"%s" works - aborting "%s"', t.name, u.name), n())
                    }

                    function l() {
                        u.removeListener("open", e), u.removeListener("error", r), u.removeListener("close", o), p.removeListener("close", a), p.removeListener("upgrading", c)
                    }
                    s('probing transport "%s"', t);
                    var u = this.createTransport(t, {
                            probe: 1
                        }),
                        d = !1,
                        p = this;
                    i.priorWebsocketSuccess = !1, u.once("open", e), u.once("error", r), u.once("close", o), this.once("close", a), this.once("upgrading", c), u.open()
                }, i.prototype.onOpen = function() {
                    if (s("socket open"), this.readyState = "open", i.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                        s("starting upgrade probes");
                        for (var t = 0, e = this.upgrades.length; e > t; t++) this.probe(this.upgrades[t])
                    }
                }, i.prototype.onPacket = function(t) {
                    if ("opening" == this.readyState || "open" == this.readyState) switch (s('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
                        case "open":
                            this.onHandshake(d(t.data));
                            break;
                        case "pong":
                            this.setPing();
                            break;
                        case "error":
                            var e = new Error("server error");
                            e.code = t.data, this.emit("error", e);
                            break;
                        case "message":
                            this.emit("data", t.data), this.emit("message", t.data)
                    } else s('packet received with socket readyState "%s"', this.readyState)
                }, i.prototype.onHandshake = function(t) {
                    this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                }, i.prototype.onHeartbeat = function(t) {
                    clearTimeout(this.pingTimeoutTimer);
                    var e = this;
                    e.pingTimeoutTimer = setTimeout(function() {
                        "closed" != e.readyState && e.onClose("ping timeout")
                    }, t || e.pingInterval + e.pingTimeout)
                }, i.prototype.setPing = function() {
                    var t = this;
                    clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                        s("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
                    }, t.pingInterval)
                }, i.prototype.ping = function() {
                    this.sendPacket("ping")
                }, i.prototype.onDrain = function() {
                    for (var t = 0; t < this.prevBufferLen; t++) this.callbackBuffer[t] && this.callbackBuffer[t]();
                    this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 == this.writeBuffer.length ? this.emit("drain") : this.flush()
                }, i.prototype.flush = function() {
                    "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (s("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                }, i.prototype.write = i.prototype.send = function(t, e) {
                    return this.sendPacket("message", t, e), this
                }, i.prototype.sendPacket = function(t, e, n) {
                    if ("closing" != this.readyState && "closed" != this.readyState) {
                        var i = {
                            type: t,
                            data: e
                        };
                        this.emit("packetCreate", i), this.writeBuffer.push(i), this.callbackBuffer.push(n), this.flush()
                    }
                }, i.prototype.close = function() {
                    function t() {
                        i.onClose("forced close"), s("socket closing - telling transport to close"), i.transport.close()
                    }

                    function e() {
                        i.removeListener("upgrade", e), i.removeListener("upgradeError", e), t()
                    }

                    function n() {
                        i.once("upgrade", e), i.once("upgradeError", e)
                    }
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var i = this;
                        this.writeBuffer.length ? this.once("drain", function() {
                            this.upgrading ? n() : t()
                        }) : this.upgrading ? n() : t()
                    }
                    return this
                }, i.prototype.onError = function(t) {
                    s("socket error %j", t), i.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
                }, i.prototype.onClose = function(t, e) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        s('socket close with reason: "%s"', t);
                        var n = this;
                        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(function() {
                            n.writeBuffer = [], n.callbackBuffer = [], n.prevBufferLen = 0
                        }, 0), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e)
                    }
                }, i.prototype.filterUpgrades = function(t) {
                    for (var e = [], n = 0, i = t.length; i > n; n++) ~c(this.transports, t[n]) && e.push(t[n]);
                    return e
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./transport": 14,
            "./transports": 15,
            "component-emitter": 9,
            debug: 22,
            "engine.io-parser": 25,
            indexof: 42,
            parsejson: 34,
            parseqs: 35,
            parseuri: 36
        }],
        14: [function(t, e, n) {
            function i(t) {
                this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized
            }
            var r = t("engine.io-parser"),
                o = t("component-emitter");
            e.exports = i, o(i.prototype), i.timestamps = 0, i.prototype.onError = function(t, e) {
                var n = new Error(t);
                return n.type = "TransportError", n.description = e, this.emit("error", n), this
            }, i.prototype.open = function() {
                return ("closed" == this.readyState || "" == this.readyState) && (this.readyState = "opening", this.doOpen()), this
            }, i.prototype.close = function() {
                return ("opening" == this.readyState || "open" == this.readyState) && (this.doClose(), this.onClose()), this
            }, i.prototype.send = function(t) {
                if ("open" != this.readyState) throw new Error("Transport not open");
                this.write(t)
            }, i.prototype.onOpen = function() {
                this.readyState = "open", this.writable = !0, this.emit("open")
            }, i.prototype.onData = function(t) {
                var e = r.decodePacket(t, this.socket.binaryType);
                this.onPacket(e)
            }, i.prototype.onPacket = function(t) {
                this.emit("packet", t)
            }, i.prototype.onClose = function() {
                this.readyState = "closed", this.emit("close")
            }
        }, {
            "component-emitter": 9,
            "engine.io-parser": 25
        }],
        15: [function(t, e, n) {
            (function(e) {
                function i(t) {
                    var n, i = !1,
                        s = !1,
                        c = !1 !== t.jsonp;
                    if (e.location) {
                        var l = "https:" == location.protocol,
                            u = location.port;
                        u || (u = l ? 443 : 80), i = t.hostname != location.hostname || u != t.port, s = t.secure != l
                    }
                    if (t.xdomain = i, t.xscheme = s, n = new r(t), "open" in n && !t.forceJSONP) return new o(t);
                    if (!c) throw new Error("JSONP disabled");
                    return new a(t)
                }
                var r = t("xmlhttprequest"),
                    o = t("./polling-xhr"),
                    a = t("./polling-jsonp"),
                    s = t("./websocket");

                n.polling = i, n.websocket = s
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling-jsonp": 16,
            "./polling-xhr": 17,
            "./websocket": 19,
            xmlhttprequest: 20
        }],
        16: [function(t, e, n) {
            (function(n) {
                function i() {}

                function r(t) {
                    o.call(this, t), this.query = this.query || {}, s || (n.___eio || (n.___eio = []), s = n.___eio), this.index = s.length;
                    var e = this;
                    s.push(function(t) {
                        e.onData(t)
                    }), this.query.j = this.index, n.document && n.addEventListener && n.addEventListener("beforeunload", function() {
                        e.script && (e.script.onerror = i)
                    }, !1)
                }
                var o = t("./polling"),
                    a = t("component-inherit");
                e.exports = r;
                var s, c = /\n/g,
                    l = /\\n/g;
                a(r, o), r.prototype.supportsBinary = !1, r.prototype.doClose = function() {
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o.prototype.doClose.call(this)
                }, r.prototype.doPoll = function() {
                    var t = this,
                        e = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src = this.uri(), e.onerror = function(e) {
                        t.onError("jsonp poll error", e)
                    };
                    var n = document.getElementsByTagName("script")[0];
                    n.parentNode.insertBefore(e, n), this.script = e;
                    var i = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    i && setTimeout(function() {
                        var t = document.createElement("iframe");
                        document.body.appendChild(t), document.body.removeChild(t)
                    }, 100)
                }, r.prototype.doWrite = function(t, e) {
                    function n() {
                        i(), e()
                    }

                    function i() {
                        if (r.iframe) try {
                            r.form.removeChild(r.iframe)
                        } catch (t) {
                            r.onError("jsonp polling iframe removal error", t)
                        }
                        try {
                            var e = '<iframe src="javascript:0" name="' + r.iframeId + '">';
                            o = document.createElement(e)
                        } catch (t) {
                            o = document.createElement("iframe"), o.name = r.iframeId, o.src = "javascript:0"
                        }
                        o.id = r.iframeId, r.form.appendChild(o), r.iframe = o
                    }
                    var r = this;
                    if (!this.form) {
                        var o, a = document.createElement("form"),
                            s = document.createElement("textarea"),
                            u = this.iframeId = "eio_iframe_" + this.index;
                        a.className = "socketio", a.style.position = "absolute", a.style.top = "-1000px", a.style.left = "-1000px", a.target = u, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), s.name = "d", a.appendChild(s), document.body.appendChild(a), this.form = a, this.area = s
                    }
                    this.form.action = this.uri(), i(), t = t.replace(l, "\\\n"), this.area.value = t.replace(c, "\\n");
                    try {
                        this.form.submit()
                    } catch (d) {}
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                        "complete" == r.iframe.readyState && n()
                    } : this.iframe.onload = n
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling": 18,
            "component-inherit": 21
        }],
        17: [function(t, e, n) {
            (function(n) {
                function i() {}

                function r(t) {
                    if (c.call(this, t), n.location) {
                        var e = "https:" == location.protocol,
                            i = location.port;
                        i || (i = e ? 443 : 80), this.xd = t.hostname != n.location.hostname || i != t.port, this.xs = t.secure != e
                    }
                }

                function o(t) {
                    this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = void 0 != t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.create()
                }

                function a() {
                    for (var t in o.requests) o.requests.hasOwnProperty(t) && o.requests[t].abort()
                }
                var s = t("xmlhttprequest"),
                    c = t("./polling"),
                    l = t("component-emitter"),
                    u = t("component-inherit"),
                    d = t("debug")("engine.io-client:polling-xhr");
                e.exports = r, e.exports.Request = o, u(r, c), r.prototype.supportsBinary = !0, r.prototype.request = function(t) {
                    return t = t || {}, t.uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, new o(t)
                }, r.prototype.doWrite = function(t, e) {
                    var n = "string" != typeof t && void 0 !== t,
                        i = this.request({
                            method: "POST",
                            data: t,
                            isBinary: n
                        }),
                        r = this;
                    i.on("success", e), i.on("error", function(t) {
                        r.onError("xhr post error", t)
                    }), this.sendXhr = i
                }, r.prototype.doPoll = function() {
                    d("xhr poll");
                    var t = this.request(),
                        e = this;
                    t.on("data", function(t) {
                        e.onData(t)
                    }), t.on("error", function(t) {
                        e.onError("xhr poll error", t)
                    }), this.pollXhr = t
                }, l(o.prototype), o.prototype.create = function() {
                    var t = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
                    var e = this.xhr = new s(t),
                        i = this;
                    try {
                        if (d("xhr open %s: %s", this.method, this.uri), e.open(this.method, this.uri, this.async), this.supportsBinary && (e.responseType = "arraybuffer"), "POST" == this.method) try {
                            this.isBinary ? e.setRequestHeader("Content-type", "application/octet-stream") : e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                        } catch (r) {}
                        "withCredentials" in e && (e.withCredentials = !0), this.hasXDR() ? (e.onload = function() {
                            i.onLoad()
                        }, e.onerror = function() {
                            i.onError(e.responseText)
                        }) : e.onreadystatechange = function() {
                            4 == e.readyState && (200 == e.status || 1223 == e.status ? i.onLoad() : setTimeout(function() {
                                i.onError(e.status)
                            }, 0))
                        }, d("xhr data %s", this.data), e.send(this.data)
                    } catch (r) {
                        return void setTimeout(function() {
                            i.onError(r)
                        }, 0)
                    }
                    n.document && (this.index = o.requestsCount++, o.requests[this.index] = this)
                }, o.prototype.onSuccess = function() {
                    this.emit("success"), this.cleanup()
                }, o.prototype.onData = function(t) {
                    this.emit("data", t), this.onSuccess()
                }, o.prototype.onError = function(t) {
                    this.emit("error", t), this.cleanup(!0)
                }, o.prototype.cleanup = function(t) {
                    if ("undefined" != typeof this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = i : this.xhr.onreadystatechange = i, t) try {
                            this.xhr.abort()
                        } catch (e) {}
                        n.document && delete o.requests[this.index], this.xhr = null
                    }
                }, o.prototype.onLoad = function() {
                    var t;
                    try {
                        var e;
                        try {
                            e = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch (n) {}
                        t = "application/octet-stream" === e ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText
                    } catch (n) {
                        this.onError(n)
                    }
                    null != t && this.onData(t)
                }, o.prototype.hasXDR = function() {
                    return "undefined" != typeof n.XDomainRequest && !this.xs && this.enablesXDR
                }, o.prototype.abort = function() {
                    this.cleanup()
                }, n.document && (o.requestsCount = 0, o.requests = {}, n.attachEvent ? n.attachEvent("onunload", a) : n.addEventListener && n.addEventListener("beforeunload", a, !1))
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling": 18,
            "component-emitter": 9,
            "component-inherit": 21,
            debug: 22,
            xmlhttprequest: 20
        }],
        18: [function(t, e, n) {
            function i(t) {
                var e = t && t.forceBase64;
                (!l || e) && (this.supportsBinary = !1), r.call(this, t)
            }
            var r = t("../transport"),
                o = t("parseqs"),
                a = t("engine.io-parser"),
                s = t("component-inherit"),
                c = t("debug")("engine.io-client:polling");
            e.exports = i;
            var l = function() {
                var e = t("xmlhttprequest"),
                    n = new e({
                        xdomain: !1
                    });
                return null != n.responseType
            }();
            s(i, r), i.prototype.name = "polling", i.prototype.doOpen = function() {
                this.poll()
            }, i.prototype.pause = function(t) {
                function e() {
                    c("paused"), n.readyState = "paused", t()
                }
                var n = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var i = 0;
                    this.polling && (c("we are currently polling - waiting to pause"), i++, this.once("pollComplete", function() {
                        c("pre-pause polling complete"), --i || e()
                    })), this.writable || (c("we are currently writing - waiting to pause"), i++, this.once("drain", function() {
                        c("pre-pause writing complete"), --i || e()
                    }))
                } else e()
            }, i.prototype.poll = function() {
                c("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
            }, i.prototype.onData = function(t) {
                var e = this;
                c("polling got data %s", t);
                var n = function(t, n, i) {
                    return "opening" == e.readyState && e.onOpen(), "close" == t.type ? (e.onClose(), !1) : void e.onPacket(t)
                };
                a.decodePayload(t, this.socket.binaryType, n), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState))
            }, i.prototype.doClose = function() {
                function t() {
                    c("writing close packet"), e.write([{
                        type: "close"
                    }])
                }
                var e = this;
                "open" == this.readyState ? (c("transport open - closing"), t()) : (c("transport not open - deferring close"), this.once("open", t))
            }, i.prototype.write = function(t) {
                var e = this;
                this.writable = !1;
                var n = function() {
                        e.writable = !0, e.emit("drain")
                    },
                    e = this;
                a.encodePayload(t, this.supportsBinary, function(t) {
                    e.doWrite(t, n)
                })
            }, i.prototype.uri = function() {
                var t = this.query || {},
                    e = this.secure ? "https" : "http",
                    n = "";
                return !1 !== this.timestampRequests && (t[this.timestampParam] = +new Date + "-" + r.timestamps++), this.supportsBinary || t.sid || (t.b64 = 1), t = o.encode(t), this.port && ("https" == e && 443 != this.port || "http" == e && 80 != this.port) && (n = ":" + this.port), t.length && (t = "?" + t), e + "://" + this.hostname + n + this.path + t
            }
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 35,
            xmlhttprequest: 20
        }],
        19: [function(t, e, n) {
            function i(t) {
                var e = t && t.forceBase64;
                e && (this.supportsBinary = !1), r.call(this, t)
            }
            var r = t("../transport"),
                o = t("engine.io-parser"),
                a = t("parseqs"),
                s = t("component-inherit"),
                c = t("debug")("engine.io-client:websocket"),
                l = t("ws");
            e.exports = i, s(i, r), i.prototype.name = "websocket", i.prototype.supportsBinary = !0, i.prototype.doOpen = function() {
                if (this.check()) {
                    var t = this.uri(),
                        e = void 0,
                        n = {
                            agent: this.agent
                        };
                    n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.ws = new l(t, e, n), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.binaryType = "arraybuffer", this.addEventListeners()
                }
            }, i.prototype.addEventListeners = function() {
                var t = this;
                this.ws.onopen = function() {
                    t.onOpen()
                }, this.ws.onclose = function() {
                    t.onClose()
                }, this.ws.onmessage = function(e) {
                    t.onData(e.data)
                }, this.ws.onerror = function(e) {
                    t.onError("websocket error", e)
                }
            }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (i.prototype.onData = function(t) {
                var e = this;
                setTimeout(function() {
                    r.prototype.onData.call(e, t)
                }, 0)
            }), i.prototype.write = function(t) {
                function e() {
                    n.writable = !0, n.emit("drain")
                }
                var n = this;
                this.writable = !1;
                for (var i = 0, r = t.length; r > i; i++) o.encodePacket(t[i], this.supportsBinary, function(t) {
                    try {
                        n.ws.send(t)
                    } catch (e) {
                        c("websocket closed before onclose event")
                    }
                });
                setTimeout(e, 0)
            }, i.prototype.onClose = function() {
                r.prototype.onClose.call(this)
            }, i.prototype.doClose = function() {
                "undefined" != typeof this.ws && this.ws.close()
            }, i.prototype.uri = function() {
                var t = this.query || {},
                    e = this.secure ? "wss" : "ws",
                    n = "";
                return this.port && ("wss" == e && 443 != this.port || "ws" == e && 80 != this.port) && (n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = +new Date), this.supportsBinary || (t.b64 = 1), t = a.encode(t), t.length && (t = "?" + t), e + "://" + this.hostname + n + this.path + t
            }, i.prototype.check = function() {
                return !(!l || "__initialize" in l && this.name === i.prototype.name)
            }
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 35,
            ws: 37
        }],
        20: [function(t, e, n) {
            var i = t("has-cors");
            e.exports = function(t) {
                var e = t.xdomain,
                    n = t.xscheme,
                    r = t.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!e || i)) return new XMLHttpRequest
                } catch (o) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !n && r) return new XDomainRequest
                } catch (o) {}
                if (!e) try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (o) {}
            }
        }, {
            "has-cors": 40
        }],
        21: [function(t, e, n) {
            e.exports = function(t, e) {
                var n = function() {};
                n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
            }
        }, {}],
        22: [function(t, e, n) {
            function i() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function r() {
                var t = arguments,
                    e = this.useColors;
                if (t[0] = (e ? "%c" : "") + this.namespace + (e ? " %c" : " ") + t[0] + (e ? "%c " : " ") + "+" + n.humanize(this.diff), !e) return t;
                var i = "color: " + this.color;
                t = [t[0], i, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
                var r = 0,
                    o = 0;
                return t[0].replace(/%[a-z%]/g, function(t) {
                    "%" !== t && (r++, "%c" === t && (o = r))
                }), t.splice(o, 0, i), t
            }

            function o() {
                return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function a(t) {
                try {
                    null == t ? localStorage.removeItem("debug") : localStorage.debug = t
                } catch (e) {}
            }

            function s() {
                var t;
                try {
                    t = localStorage.debug
                } catch (e) {}
                return t
            }
            n = e.exports = t("./debug"), n.log = o, n.formatArgs = r, n.save = a, n.load = s, n.useColors = i, n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function(t) {
                return JSON.stringify(t)
            }, n.enable(s())
        }, {
            "./debug": 23
        }],
        23: [function(t, e, n) {
            function i() {
                return n.colors[u++ % n.colors.length]
            }

            function r(t) {
                function e() {}

                function r() {
                    var t = r,
                        e = +new Date,
                        o = e - (l || e);
                    t.diff = o, t.prev = l, t.curr = e, l = e, null == t.useColors && (t.useColors = n.useColors()), null == t.color && t.useColors && (t.color = i());
                    var a = Array.prototype.slice.call(arguments);
                    a[0] = n.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
                    var s = 0;
                    a[0] = a[0].replace(/%([a-z%])/g, function(e, i) {
                        if ("%" === e) return e;
                        s++;
                        var r = n.formatters[i];
                        if ("function" == typeof r) {
                            var o = a[s];
                            e = r.call(t, o), a.splice(s, 1), s--
                        }
                        return e
                    }), "function" == typeof n.formatArgs && (a = n.formatArgs.apply(t, a));
                    var c = r.log || n.log || console.log.bind(console);
                    c.apply(t, a)
                }
                e.enabled = !1, r.enabled = !0;
                var o = n.enabled(t) ? r : e;
                return o.namespace = t, o
            }

            function o(t) {
                n.save(t);
                for (var e = (t || "").split(/[\s,]+/), i = e.length, r = 0; i > r; r++) e[r] && (t = e[r].replace(/\*/g, ".*?"), "-" === t[0] ? n.skips.push(new RegExp("^" + t.substr(1) + "$")) : n.names.push(new RegExp("^" + t + "$")))
            }

            function a() {
                n.enable("")
            }

            function s(t) {
                var e, i;
                for (e = 0, i = n.skips.length; i > e; e++)
                    if (n.skips[e].test(t)) return !1;
                for (e = 0, i = n.names.length; i > e; e++)
                    if (n.names[e].test(t)) return !0;
                return !1
            }

            function c(t) {
                return t instanceof Error ? t.stack || t.message : t
            }
            n = e.exports = r, n.coerce = c, n.disable = a, n.enable = o, n.enabled = s, n.humanize = t("ms"), n.names = [], n.skips = [], n.formatters = {};
            var l, u = 0
        }, {
            ms: 24
        }],
        24: [function(t, e, n) {
            function i(t) {
                var e = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(t);
                if (e) {
                    var n = parseFloat(e[1]),
                        i = (e[2] || "ms").toLowerCase();
                    switch (i) {
                        case "years":
                        case "year":
                        case "y":
                            return n * d;
                        case "days":
                        case "day":
                        case "d":
                            return n * u;
                        case "hours":
                        case "hour":
                        case "h":
                            return n * l;
                        case "minutes":
                        case "minute":
                        case "m":
                            return n * c;
                        case "seconds":
                        case "second":
                        case "s":
                            return n * s;
                        case "ms":
                            return n
                    }
                }
            }

            function r(t) {
                return t >= u ? Math.round(t / u) + "d" : t >= l ? Math.round(t / l) + "h" : t >= c ? Math.round(t / c) + "m" : t >= s ? Math.round(t / s) + "s" : t + "ms"
            }

            function o(t) {
                return a(t, u, "day") || a(t, l, "hour") || a(t, c, "minute") || a(t, s, "second") || t + " ms"
            }

            function a(t, e, n) {
                return e > t ? void 0 : 1.5 * e > t ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
            }
            var s = 1e3,
                c = 60 * s,
                l = 60 * c,
                u = 24 * l,
                d = 365.25 * u;
            e.exports = function(t, e) {
                return e = e || {}, "string" == typeof t ? i(t) : e["long"] ? o(t) : r(t)
            }
        }, {}],
        25: [function(t, e, n) {
            (function(e) {
                function i(t, e) {
                    var i = "b" + n.packets[t.type] + t.data.data;
                    return e(i)
                }

                function r(t, e, i) {
                    if (!e) return n.encodeBase64Packet(t, i);
                    var r = t.data,
                        o = new Uint8Array(r),
                        a = new Uint8Array(1 + r.byteLength);
                    a[0] = v[t.type];
                    for (var s = 0; s < o.length; s++) a[s + 1] = o[s];
                    return i(a.buffer)
                }

                function o(t, e, i) {
                    if (!e) return n.encodeBase64Packet(t, i);
                    var r = new FileReader;
                    return r.onload = function() {
                        t.data = r.result, n.encodePacket(t, e, !0, i)
                    }, r.readAsArrayBuffer(t.data)
                }

                function a(t, e, i) {
                    if (!e) return n.encodeBase64Packet(t, i);
                    if (g) return o(t, e, i);
                    var r = new Uint8Array(1);
                    r[0] = v[t.type];
                    var a = new w([r.buffer, t.data]);
                    return i(a)
                }

                function s(t, e, n) {
                    for (var i = new Array(t.length), r = p(t.length, n), o = function(t, n, r) {
                        e(n, function(e, n) {
                            i[t] = n, r(e, i)
                        })
                    }, a = 0; a < t.length; a++) o(a, t[a], r)
                }
                var c = t("./keys"),
                    l = t("has-binary"),
                    u = t("arraybuffer.slice"),
                    d = t("base64-arraybuffer"),
                    p = t("after"),
                    f = t("utf8"),
                    h = navigator.userAgent.match(/Android/i),
                    m = /PhantomJS/i.test(navigator.userAgent),
                    g = h || m;
                n.protocol = 3;
                var v = n.packets = {
                        open: 0,
                        close: 1,
                        ping: 2,
                        pong: 3,
                        message: 4,
                        upgrade: 5,
                        noop: 6
                    },
                    y = c(v),
                    b = {
                        type: "error",
                        data: "parser error"
                    },
                    w = t("blob");
                n.encodePacket = function(t, n, o, s) {
                    "function" == typeof n && (s = n, n = !1), "function" == typeof o && (s = o, o = null);
                    var c = void 0 === t.data ? void 0 : t.data.buffer || t.data;
                    if (e.ArrayBuffer && c instanceof ArrayBuffer) return r(t, n, s);
                    if (w && c instanceof e.Blob) return a(t, n, s);
                    if (c && c.base64) return i(t, s);
                    var l = v[t.type];
                    return void 0 !== t.data && (l += o ? f.encode(String(t.data)) : String(t.data)), s("" + l)
                }, n.encodeBase64Packet = function(t, i) {
                    var r = "b" + n.packets[t.type];
                    if (w && t.data instanceof w) {
                        var o = new FileReader;
                        return o.onload = function() {
                            var t = o.result.split(",")[1];
                            i(r + t)
                        }, o.readAsDataURL(t.data)
                    }
                    var a;
                    try {
                        a = String.fromCharCode.apply(null, new Uint8Array(t.data))
                    } catch (s) {
                        for (var c = new Uint8Array(t.data), l = new Array(c.length), u = 0; u < c.length; u++) l[u] = c[u];
                        a = String.fromCharCode.apply(null, l)
                    }
                    return r += e.btoa(a), i(r)
                }, n.decodePacket = function(t, e, i) {
                    if ("string" == typeof t || void 0 === t) {
                        if ("b" == t.charAt(0)) return n.decodeBase64Packet(t.substr(1), e);
                        if (i) try {
                            t = f.decode(t)
                        } catch (r) {
                            return b
                        }
                        var o = t.charAt(0);
                        return Number(o) == o && y[o] ? t.length > 1 ? {
                            type: y[o],
                            data: t.substring(1)
                        } : {
                            type: y[o]
                        } : b
                    }
                    var a = new Uint8Array(t),
                        o = a[0],
                        s = u(t, 1);
                    return w && "blob" === e && (s = new w([s])), {
                        type: y[o],
                        data: s
                    }
                }, n.decodeBase64Packet = function(t, n) {
                    var i = y[t.charAt(0)];
                    if (!e.ArrayBuffer) return {
                        type: i,
                        data: {
                            base64: !0,
                            data: t.substr(1)
                        }
                    };
                    var r = d.decode(t.substr(1));
                    return "blob" === n && w && (r = new w([r])), {
                        type: i,
                        data: r
                    }
                }, n.encodePayload = function(t, e, i) {
                    function r(t) {
                        return t.length + ":" + t
                    }

                    function o(t, i) {
                        n.encodePacket(t, a ? e : !1, !0, function(t) {
                            i(null, r(t))
                        })
                    }
                    "function" == typeof e && (i = e, e = null);
                    var a = l(t);
                    return e && a ? w && !g ? n.encodePayloadAsBlob(t, i) : n.encodePayloadAsArrayBuffer(t, i) : t.length ? void s(t, o, function(t, e) {
                        return i(e.join(""))
                    }) : i("0:")
                }, n.decodePayload = function(t, e, i) {
                    if ("string" != typeof t) return n.decodePayloadAsBinary(t, e, i);
                    "function" == typeof e && (i = e, e = null);
                    var r;
                    if ("" == t) return i(b, 0, 1);
                    for (var o, a, s = "", c = 0, l = t.length; l > c; c++) {
                        var u = t.charAt(c);
                        if (":" != u) s += u;
                        else {
                            if ("" == s || s != (o = Number(s))) return i(b, 0, 1);
                            if (a = t.substr(c + 1, o), s != a.length) return i(b, 0, 1);
                            if (a.length) {
                                if (r = n.decodePacket(a, e, !0), b.type == r.type && b.data == r.data) return i(b, 0, 1);
                                var d = i(r, c + o, l);
                                if (!1 === d) return
                            }
                            c += o, s = ""
                        }
                    }
                    return "" != s ? i(b, 0, 1) : void 0
                }, n.encodePayloadAsArrayBuffer = function(t, e) {
                    function i(t, e) {
                        n.encodePacket(t, !0, !0, function(t) {
                            return e(null, t)
                        })
                    }
                    return t.length ? void s(t, i, function(t, n) {
                        var i = n.reduce(function(t, e) {
                                var n;
                                return n = "string" == typeof e ? e.length : e.byteLength, t + n.toString().length + n + 2
                            }, 0),
                            r = new Uint8Array(i),
                            o = 0;
                        return n.forEach(function(t) {
                            var e = "string" == typeof t,
                                n = t;
                            if (e) {
                                for (var i = new Uint8Array(t.length), a = 0; a < t.length; a++) i[a] = t.charCodeAt(a);
                                n = i.buffer
                            }
                            r[o++] = e ? 0 : 1;
                            for (var s = n.byteLength.toString(), a = 0; a < s.length; a++) r[o++] = parseInt(s[a]);
                            r[o++] = 255;
                            for (var i = new Uint8Array(n), a = 0; a < i.length; a++) r[o++] = i[a]
                        }), e(r.buffer)
                    }) : e(new ArrayBuffer(0))
                }, n.encodePayloadAsBlob = function(t, e) {
                    function i(t, e) {
                        n.encodePacket(t, !0, !0, function(t) {
                            var n = new Uint8Array(1);
                            if (n[0] = 1, "string" == typeof t) {
                                for (var i = new Uint8Array(t.length), r = 0; r < t.length; r++) i[r] = t.charCodeAt(r);
                                t = i.buffer, n[0] = 0
                            }
                            for (var o = t instanceof ArrayBuffer ? t.byteLength : t.size, a = o.toString(), s = new Uint8Array(a.length + 1), r = 0; r < a.length; r++) s[r] = parseInt(a[r]);
                            if (s[a.length] = 255, w) {
                                var c = new w([n.buffer, s.buffer, t]);
                                e(null, c)
                            }
                        })
                    }
                    s(t, i, function(t, n) {
                        return e(new w(n))
                    })
                }, n.decodePayloadAsBinary = function(t, e, i) {
                    "function" == typeof e && (i = e, e = null);
                    for (var r = t, o = [], a = !1; r.byteLength > 0;) {
                        for (var s = new Uint8Array(r), c = 0 === s[0], l = "", d = 1; 255 != s[d]; d++) {
                            if (l.length > 310) {
                                a = !0;
                                break
                            }
                            l += s[d]
                        }
                        if (a) return i(b, 0, 1);
                        r = u(r, 2 + l.length), l = parseInt(l);
                        var p = u(r, 0, l);
                        if (c) try {
                            p = String.fromCharCode.apply(null, new Uint8Array(p))
                        } catch (f) {
                            var h = new Uint8Array(p);
                            p = "";
                            for (var d = 0; d < h.length; d++) p += String.fromCharCode(h[d])
                        }
                        o.push(p), r = u(r, l)
                    }
                    var m = o.length;
                    o.forEach(function(t, r) {
                        i(n.decodePacket(t, e, !0), r, m)
                    })
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./keys": 26,
            after: 27,
            "arraybuffer.slice": 28,
            "base64-arraybuffer": 29,
            blob: 30,
            "has-binary": 31,
            utf8: 33
        }],
        26: [function(t, e, n) {
            e.exports = Object.keys || function(t) {
                var e = [],
                    n = Object.prototype.hasOwnProperty;
                for (var i in t) n.call(t, i) && e.push(i);
                return e
            }
        }, {}],
        27: [function(t, e, n) {
            function i(t, e, n) {
                function i(t, r) {
                    if (i.count <= 0) throw new Error("after called too many times");
                    --i.count, t ? (o = !0, e(t), e = n) : 0 !== i.count || o || e(null, r)
                }
                var o = !1;
                return n = n || r, i.count = t, 0 === t ? e() : i
            }

            function r() {}
            e.exports = i
        }, {}],
        28: [function(t, e, n) {
            e.exports = function(t, e, n) {
                var i = t.byteLength;
                if (e = e || 0, n = n || i, t.slice) return t.slice(e, n);
                if (0 > e && (e += i), 0 > n && (n += i), n > i && (n = i), e >= i || e >= n || 0 === i) return new ArrayBuffer(0);
                for (var r = new Uint8Array(t), o = new Uint8Array(n - e), a = e, s = 0; n > a; a++, s++) o[s] = r[a];
                return o.buffer
            }
        }, {}],
        29: [function(t, e, n) {
            ! function(t) {
                "use strict";
                n.encode = function(e) {
                    var n, i = new Uint8Array(e),
                        r = i.length,
                        o = "";
                    for (n = 0; r > n; n += 3) o += t[i[n] >> 2], o += t[(3 & i[n]) << 4 | i[n + 1] >> 4], o += t[(15 & i[n + 1]) << 2 | i[n + 2] >> 6], o += t[63 & i[n + 2]];
                    return r % 3 === 2 ? o = o.substring(0, o.length - 1) + "=" : r % 3 === 1 && (o = o.substring(0, o.length - 2) + "=="), o
                }, n.decode = function(e) {
                    var n, i, r, o, a, s = .75 * e.length,
                        c = e.length,
                        l = 0;
                    "=" === e[e.length - 1] && (s--, "=" === e[e.length - 2] && s--);
                    var u = new ArrayBuffer(s),
                        d = new Uint8Array(u);
                    for (n = 0; c > n; n += 4) i = t.indexOf(e[n]), r = t.indexOf(e[n + 1]), o = t.indexOf(e[n + 2]), a = t.indexOf(e[n + 3]), d[l++] = i << 2 | r >> 4, d[l++] = (15 & r) << 4 | o >> 2, d[l++] = (3 & o) << 6 | 63 & a;
                    return u
                }
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
        }, {}],
        30: [function(t, e, n) {
            (function(t) {
                function n(t, e) {
                    e = e || {};
                    for (var n = new i, r = 0; r < t.length; r++) n.append(t[r]);
                    return e.type ? n.getBlob(e.type) : n.getBlob()
                }
                var i = t.BlobBuilder || t.WebKitBlobBuilder || t.MSBlobBuilder || t.MozBlobBuilder,
                    r = function() {
                        try {
                            var t = new Blob(["hi"]);
                            return 2 == t.size
                        } catch (e) {
                            return !1
                        }
                    }(),
                    o = i && i.prototype.append && i.prototype.getBlob;
                e.exports = function() {
                    return r ? t.Blob : o ? n : void 0
                }()
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        31: [function(t, e, n) {
            (function(n) {
                function i(t) {
                    function e(t) {
                        if (!t) return !1;
                        if (n.Buffer && n.Buffer.isBuffer(t) || n.ArrayBuffer && t instanceof ArrayBuffer || n.Blob && t instanceof Blob || n.File && t instanceof File) return !0;
                        if (r(t)) {
                            for (var i = 0; i < t.length; i++)
                                if (e(t[i])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && (t = t.toJSON());
                            for (var o in t)
                                if (t.hasOwnProperty(o) && e(t[o])) return !0
                        }
                        return !1
                    }
                    return e(t)
                }
                var r = t("isarray");
                e.exports = i
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            isarray: 32
        }],
        32: [function(t, e, n) {
            e.exports = Array.isArray || function(t) {
                return "[object Array]" == Object.prototype.toString.call(t)
            }
        }, {}],
        33: [function(e, n, i) {
            (function(e) {
                ! function(r) {
                    function o(t) {
                        for (var e, n, i = [], r = 0, o = t.length; o > r;) e = t.charCodeAt(r++), e >= 55296 && 56319 >= e && o > r ? (n = t.charCodeAt(r++), 56320 == (64512 & n) ? i.push(((1023 & e) << 10) + (1023 & n) + 65536) : (i.push(e), r--)) : i.push(e);
                        return i
                    }

                    function a(t) {
                        for (var e, n = t.length, i = -1, r = ""; ++i < n;) e = t[i], e > 65535 && (e -= 65536, r += b(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), r += b(e);
                        return r
                    }

                    function s(t, e) {
                        return b(t >> e & 63 | 128)
                    }

                    function c(t) {
                        if (0 == (4294967168 & t)) return b(t);
                        var e = "";
                        return 0 == (4294965248 & t) ? e = b(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (e = b(t >> 12 & 15 | 224), e += s(t, 6)) : 0 == (4292870144 & t) && (e = b(t >> 18 & 7 | 240), e += s(t, 12), e += s(t, 6)), e += b(63 & t | 128)
                    }

                    function l(t) {
                        for (var e, n = o(t), i = n.length, r = -1, a = ""; ++r < i;) e = n[r], a += c(e);
                        return a
                    }

                    function u() {
                        if (y >= v) throw Error("Invalid byte index");
                        var t = 255 & g[y];
                        if (y++, 128 == (192 & t)) return 63 & t;
                        throw Error("Invalid continuation byte")
                    }

                    function d() {
                        var t, e, n, i, r;
                        if (y > v) throw Error("Invalid byte index");
                        if (y == v) return !1;
                        if (t = 255 & g[y], y++, 0 == (128 & t)) return t;
                        if (192 == (224 & t)) {
                            var e = u();
                            if (r = (31 & t) << 6 | e, r >= 128) return r;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & t)) {
                            if (e = u(), n = u(), r = (15 & t) << 12 | e << 6 | n, r >= 2048) return r;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & t) && (e = u(), n = u(), i = u(), r = (15 & t) << 18 | e << 12 | n << 6 | i, r >= 65536 && 1114111 >= r)) return r;
                        throw Error("Invalid UTF-8 detected")
                    }

                    function p(t) {
                        g = o(t), v = g.length, y = 0;
                        for (var e, n = [];
                             (e = d()) !== !1;) n.push(e);
                        return a(n)
                    }
                    var f = "object" == typeof i && i,
                        h = "object" == typeof n && n && n.exports == f && n,
                        m = "object" == typeof e && e;
                    (m.global === m || m.window === m) && (r = m);
                    var g, v, y, b = String.fromCharCode,
                        w = {
                            version: "2.0.0",
                            encode: l,
                            decode: p
                        };
                    if ("function" == typeof t && "object" == typeof t.amd && t.amd) t(function() {
                        return w
                    });
                    else if (f && !f.nodeType)
                        if (h) h.exports = w;
                        else {
                            var x = {},
                                _ = x.hasOwnProperty;
                            for (var k in w) _.call(w, k) && (f[k] = w[k])
                        } else r.utf8 = w
                }(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        34: [function(t, e, n) {
            (function(t) {
                var n = /^[\],:{}\s]*$/,
                    i = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    r = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    o = /(?:^|:|,)(?:\s*\[)+/g,
                    a = /^\s+/,
                    s = /\s+$/;
                e.exports = function(e) {
                    return "string" == typeof e && e ? (e = e.replace(a, "").replace(s, ""), t.JSON && JSON.parse ? JSON.parse(e) : n.test(e.replace(i, "@").replace(r, "]").replace(o, "")) ? new Function("return " + e)() : void 0) : null
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        35: [function(t, e, n) {
            n.encode = function(t) {
                var e = "";
                for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                return e
            }, n.decode = function(t) {
                for (var e = {}, n = t.split("&"), i = 0, r = n.length; r > i; i++) {
                    var o = n[i].split("=");
                    e[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
                }
                return e
            }
        }, {}],
        36: [function(t, e, n) {
            var i = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            e.exports = function(t) {
                var e = t,
                    n = t.indexOf("["),
                    o = t.indexOf("]"); - 1 != n && -1 != o && (t = t.substring(0, n) + t.substring(n, o).replace(/:/g, ";") + t.substring(o, t.length));
                for (var a = i.exec(t || ""), s = {}, c = 14; c--;) s[r[c]] = a[c] || "";
                return -1 != n && -1 != o && (s.source = e, s.host = s.host.substring(1, s.host.length - 1).replace(/;/g, ":"), s.authority = s.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), s.ipv6uri = !0), s
            }
        }, {}],
        37: [function(t, e, n) {
            function i(t, e, n) {
                var i;
                return i = e ? new o(t, e) : new o(t)
            }
            var r = function() {
                    return this
                }(),
                o = r.WebSocket || r.MozWebSocket;
            e.exports = o ? i : null, o && (i.prototype = o.prototype)
        }, {}],
        38: [function(t, e, n) {
            (function(n) {
                function i(t) {
                    function e(t) {
                        if (!t) return !1;
                        if (n.Buffer && n.Buffer.isBuffer(t) || n.ArrayBuffer && t instanceof ArrayBuffer || n.Blob && t instanceof Blob || n.File && t instanceof File) return !0;
                        if (r(t)) {
                            for (var i = 0; i < t.length; i++)
                                if (e(t[i])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && (t = t.toJSON());
                            for (var o in t)
                                if (Object.prototype.hasOwnProperty.call(t, o) && e(t[o])) return !0
                        }
                        return !1
                    }
                    return e(t)
                }
                var r = t("isarray");
                e.exports = i
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            isarray: 39
        }],
        39: [function(t, e, n) {
            e.exports = t(32)
        }, {}],
        40: [function(t, e, n) {
            var i = t("global");
            try {
                e.exports = "XMLHttpRequest" in i && "withCredentials" in new i.XMLHttpRequest
            } catch (r) {
                e.exports = !1
            }
        }, {
            global: 41
        }],
        41: [function(t, e, n) {
            e.exports = function() {
                return this
            }()
        }, {}],
        42: [function(t, e, n) {
            var i = [].indexOf;
            e.exports = function(t, e) {
                if (i) return t.indexOf(e);
                for (var n = 0; n < t.length; ++n)
                    if (t[n] === e) return n;
                return -1
            }
        }, {}],
        43: [function(t, e, n) {
            var i = Object.prototype.hasOwnProperty;
            n.keys = Object.keys || function(t) {
                var e = [];
                for (var n in t) i.call(t, n) && e.push(n);
                return e
            }, n.values = function(t) {
                var e = [];
                for (var n in t) i.call(t, n) && e.push(t[n]);
                return e
            }, n.merge = function(t, e) {
                for (var n in e) i.call(e, n) && (t[n] = e[n]);
                return t
            }, n.length = function(t) {
                return n.keys(t).length
            }, n.isEmpty = function(t) {
                return 0 == n.length(t)
            }
        }, {}],
        44: [function(t, e, n) {
            var i = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            e.exports = function(t) {
                for (var e = i.exec(t || ""), n = {}, o = 14; o--;) n[r[o]] = e[o] || "";
                return n
            }
        }, {}],
        45: [function(t, e, n) {
            (function(e) {
                var i = t("isarray"),
                    r = t("./is-buffer");
                n.deconstructPacket = function(t) {
                    function e(t) {
                        if (!t) return t;
                        if (r(t)) {
                            var o = {
                                _placeholder: !0,
                                num: n.length
                            };
                            return n.push(t), o
                        }
                        if (i(t)) {
                            for (var a = new Array(t.length), s = 0; s < t.length; s++) a[s] = e(t[s]);
                            return a
                        }
                        if ("object" == typeof t && !(t instanceof Date)) {
                            var a = {};
                            for (var c in t) a[c] = e(t[c]);
                            return a
                        }
                        return t
                    }
                    var n = [],
                        o = t.data,
                        a = t;
                    return a.data = e(o), a.attachments = n.length, {
                        packet: a,
                        buffers: n
                    }
                }, n.reconstructPacket = function(t, e) {
                    function n(t) {
                        if (t && t._placeholder) {
                            var r = e[t.num];
                            return r
                        }
                        if (i(t)) {
                            for (var o = 0; o < t.length; o++) t[o] = n(t[o]);
                            return t
                        }
                        if (t && "object" == typeof t) {
                            for (var a in t) t[a] = n(t[a]);
                            return t
                        }
                        return t
                    }
                    return t.data = n(t.data), t.attachments = void 0, t
                }, n.removeBlobs = function(t, n) {
                    function o(t, c, l) {
                        if (!t) return t;
                        if (e.Blob && t instanceof Blob || e.File && t instanceof File) {
                            a++;
                            var u = new FileReader;
                            u.onload = function() {
                                l ? l[c] = this.result : s = this.result, --a || n(s)
                            }, u.readAsArrayBuffer(t)
                        } else if (i(t))
                            for (var d = 0; d < t.length; d++) o(t[d], d, t);
                        else if (t && "object" == typeof t && !r(t))
                            for (var p in t) o(t[p], p, t)
                    }
                    var a = 0,
                        s = t;
                    o(s), a || n(s)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./is-buffer": 47,
            isarray: 48
        }],
        46: [function(t, e, n) {
            function i() {}

            function r(t) {
                var e = "",
                    i = !1;
                return e += t.type, (n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) && (e += t.attachments, e += "-"), t.nsp && "/" != t.nsp && (i = !0, e += t.nsp), null != t.id && (i && (e += ",", i = !1), e += t.id), null != t.data && (i && (e += ","), e += d.stringify(t.data)), u("encoded %j as %s", t, e), e
            }

            function o(t, e) {
                function n(t) {
                    var n = f.deconstructPacket(t),
                        i = r(n.packet),
                        o = n.buffers;
                    o.unshift(i), e(o)
                }
                f.removeBlobs(t, n)
            }

            function a() {
                this.reconstructor = null
            }

            function s(t) {
                var e = {},
                    i = 0;
                if (e.type = Number(t.charAt(0)), null == n.types[e.type]) return l();
                if (n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type) {
                    for (var r = "";
                         "-" != t.charAt(++i) && (r += t.charAt(i), i != t.length););
                    if (r != Number(r) || "-" != t.charAt(i)) throw new Error("Illegal attachments");
                    e.attachments = Number(r)
                }
                if ("/" == t.charAt(i + 1))
                    for (e.nsp = ""; ++i;) {
                        var o = t.charAt(i);
                        if ("," == o) break;
                        if (e.nsp += o, i == t.length) break
                    } else e.nsp = "/";
                var a = t.charAt(i + 1);
                if ("" !== a && Number(a) == a) {
                    for (e.id = ""; ++i;) {
                        var o = t.charAt(i);
                        if (null == o || Number(o) != o) {
                            --i;
                            break
                        }
                        if (e.id += t.charAt(i), i == t.length) break
                    }
                    e.id = Number(e.id)
                }
                if (t.charAt(++i)) try {
                    e.data = d.parse(t.substr(i))
                } catch (s) {
                    return l()
                }
                return u("decoded %s as %j", t, e), e
            }

            function c(t) {
                this.reconPack = t, this.buffers = []
            }

            function l(t) {
                return {
                    type: n.ERROR,
                    data: "parser error"
                }
            }
            var u = t("debug")("socket.io-parser"),
                d = t("json3"),
                p = (t("isarray"), t("component-emitter")),
                f = t("./binary"),
                h = t("./is-buffer");
            n.protocol = 4, n.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], n.CONNECT = 0, n.DISCONNECT = 1, n.EVENT = 2, n.ACK = 3, n.ERROR = 4, n.BINARY_EVENT = 5, n.BINARY_ACK = 6, n.Encoder = i, n.Decoder = a, i.prototype.encode = function(t, e) {
                if (u("encoding packet %j", t), n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) o(t, e);
                else {
                    var i = r(t);
                    e([i])
                }
            }, p(a.prototype), a.prototype.add = function(t) {
                var e;
                if ("string" == typeof t) e = s(t), n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type ? (this.reconstructor = new c(e), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", e)) : this.emit("decoded", e);
                else {
                    if (!h(t) && !t.base64) throw new Error("Unknown type: " + t);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    e = this.reconstructor.takeBinaryData(t), e && (this.reconstructor = null, this.emit("decoded", e))
                }
            }, a.prototype.destroy = function() {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }, c.prototype.takeBinaryData = function(t) {
                if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {
                    var e = f.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), e
                }
                return null
            }, c.prototype.finishedReconstruction = function() {
                this.reconPack = null, this.buffers = []
            }
        }, {
            "./binary": 45,
            "./is-buffer": 47,
            "component-emitter": 9,
            debug: 10,
            isarray: 48,
            json3: 49
        }],
        47: [function(t, e, n) {
            (function(t) {
                function n(e) {
                    return t.Buffer && t.Buffer.isBuffer(e) || t.ArrayBuffer && e instanceof ArrayBuffer;

                }
                e.exports = n
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        48: [function(t, e, n) {
            e.exports = t(32)
        }, {}],
        49: [function(e, n, i) {
            ! function(e) {
                function n(t) {
                    if (n[t] !== a) return n[t];
                    var e;
                    if ("bug-string-char-index" == t) e = "a" != "a" [0];
                    else if ("json" == t) e = n("json-stringify") && n("json-parse");
                    else {
                        var i, r = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                        if ("json-stringify" == t) {
                            var o = u.stringify,
                                c = "function" == typeof o && d;
                            if (c) {
                                (i = function() {
                                    return 1
                                }).toJSON = i;
                                try {
                                    c = "0" === o(0) && "0" === o(new Number) && '""' == o(new String) && o(s) === a && o(a) === a && o() === a && "1" === o(i) && "[1]" == o([i]) && "[null]" == o([a]) && "null" == o(null) && "[null,null,null]" == o([a, s, null]) && o({
                                        a: [i, !0, !1, null, "\x00\b\n\f\r	"]
                                    }) == r && "1" === o(null, i) && "[\n 1,\n 2\n]" == o([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == o(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == o(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == o(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == o(new Date(-1))
                                } catch (l) {
                                    c = !1
                                }
                            }
                            e = c
                        }
                        if ("json-parse" == t) {
                            var p = u.parse;
                            if ("function" == typeof p) try {
                                if (0 === p("0") && !p(!1)) {
                                    i = p(r);
                                    var f = 5 == i.a.length && 1 === i.a[0];
                                    if (f) {
                                        try {
                                            f = !p('"	"')
                                        } catch (l) {}
                                        if (f) try {
                                            f = 1 !== p("01")
                                        } catch (l) {}
                                        if (f) try {
                                            f = 1 !== p("1.")
                                        } catch (l) {}
                                    }
                                }
                            } catch (l) {
                                f = !1
                            }
                            e = f
                        }
                    }
                    return n[t] = !!e
                }
                var r, o, a, s = {}.toString,
                    c = "function" == typeof t && t.amd,
                    l = "object" == typeof JSON && JSON,
                    u = "object" == typeof i && i && !i.nodeType && i;
                u && l ? (u.stringify = l.stringify, u.parse = l.parse) : u = e.JSON = l || {};
                var d = new Date(-0xc782b5b800cec);
                try {
                    d = -109252 == d.getUTCFullYear() && 0 === d.getUTCMonth() && 1 === d.getUTCDate() && 10 == d.getUTCHours() && 37 == d.getUTCMinutes() && 6 == d.getUTCSeconds() && 708 == d.getUTCMilliseconds()
                } catch (p) {}
                if (!n("json")) {
                    var f = "[object Function]",
                        h = "[object Date]",
                        m = "[object Number]",
                        g = "[object String]",
                        v = "[object Array]",
                        y = "[object Boolean]",
                        b = n("bug-string-char-index");
                    if (!d) var w = Math.floor,
                        x = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                        _ = function(t, e) {
                            return x[e] + 365 * (t - 1970) + w((t - 1969 + (e = +(e > 1))) / 4) - w((t - 1901 + e) / 100) + w((t - 1601 + e) / 400)
                        };
                    (r = {}.hasOwnProperty) || (r = function(t) {
                        var e, n = {};
                        return (n.__proto__ = null, n.__proto__ = {
                            toString: 1
                        }, n).toString != s ? r = function(t) {
                            var e = this.__proto__,
                                n = t in (this.__proto__ = null, this);
                            return this.__proto__ = e, n
                        } : (e = n.constructor, r = function(t) {
                            var n = (this.constructor || e).prototype;
                            return t in this && !(t in n && this[t] === n[t])
                        }), n = null, r.call(this, t)
                    });
                    var k = {
                            "boolean": 1,
                            number: 1,
                            string: 1,
                            undefined: 1
                        },
                        T = function(t, e) {
                            var n = typeof t[e];
                            return "object" == n ? !!t[e] : !k[n]
                        };
                    if (o = function(t, e) {
                            var n, i, a, c = 0;
                            (n = function() {
                                this.valueOf = 0
                            }).prototype.valueOf = 0, i = new n;
                            for (a in i) r.call(i, a) && c++;
                            return n = i = null, c ? o = 2 == c ? function(t, e) {
                                var n, i = {},
                                    o = s.call(t) == f;
                                for (n in t) o && "prototype" == n || r.call(i, n) || !(i[n] = 1) || !r.call(t, n) || e(n)
                            } : function(t, e) {
                                var n, i, o = s.call(t) == f;
                                for (n in t) o && "prototype" == n || !r.call(t, n) || (i = "constructor" === n) || e(n);
                                (i || r.call(t, n = "constructor")) && e(n)
                            } : (i = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], o = function(t, e) {
                                var n, o, a = s.call(t) == f,
                                    c = !a && "function" != typeof t.constructor && T(t, "hasOwnProperty") ? t.hasOwnProperty : r;
                                for (n in t) a && "prototype" == n || !c.call(t, n) || e(n);
                                for (o = i.length; n = i[--o]; c.call(t, n) && e(n));
                            }), o(t, e)
                        }, !n("json-stringify")) {
                        var C = {
                                92: "\\\\",
                                34: '\\"',
                                8: "\\b",
                                12: "\\f",
                                10: "\\n",
                                13: "\\r",
                                9: "\\t"
                            },
                            S = "000000",
                            D = function(t, e) {
                                return (S + (e || 0)).slice(-t)
                            },
                            E = "\\u00",
                            A = function(t) {
                                var e, n = '"',
                                    i = 0,
                                    r = t.length,
                                    o = r > 10 && b;
                                for (o && (e = t.split("")); r > i; i++) {
                                    var a = t.charCodeAt(i);
                                    switch (a) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            n += C[a];
                                            break;
                                        default:
                                            if (32 > a) {
                                                n += E + D(2, a.toString(16));
                                                break
                                            }
                                            n += o ? e[i] : b ? t.charAt(i) : t[i]
                                    }
                                }
                                return n + '"'
                            },
                            $ = function(t, e, n, i, c, l, u) {
                                var d, p, f, b, x, k, T, C, S, E, N, M, j, I, O, P;
                                try {
                                    d = e[t]
                                } catch (B) {}
                                if ("object" == typeof d && d)
                                    if (p = s.call(d), p != h || r.call(d, "toJSON")) "function" == typeof d.toJSON && (p != m && p != g && p != v || r.call(d, "toJSON")) && (d = d.toJSON(t));
                                    else if (d > -1 / 0 && 1 / 0 > d) {
                                        if (_) {
                                            for (x = w(d / 864e5), f = w(x / 365.2425) + 1970 - 1; _(f + 1, 0) <= x; f++);
                                            for (b = w((x - _(f, 0)) / 30.42); _(f, b + 1) <= x; b++);
                                            x = 1 + x - _(f, b), k = (d % 864e5 + 864e5) % 864e5, T = w(k / 36e5) % 24, C = w(k / 6e4) % 60, S = w(k / 1e3) % 60, E = k % 1e3
                                        } else f = d.getUTCFullYear(), b = d.getUTCMonth(), x = d.getUTCDate(), T = d.getUTCHours(), C = d.getUTCMinutes(), S = d.getUTCSeconds(), E = d.getUTCMilliseconds();
                                        d = (0 >= f || f >= 1e4 ? (0 > f ? "-" : "+") + D(6, 0 > f ? -f : f) : D(4, f)) + "-" + D(2, b + 1) + "-" + D(2, x) + "T" + D(2, T) + ":" + D(2, C) + ":" + D(2, S) + "." + D(3, E) + "Z"
                                    } else d = null;
                                if (n && (d = n.call(e, t, d)), null === d) return "null";
                                if (p = s.call(d), p == y) return "" + d;
                                if (p == m) return d > -1 / 0 && 1 / 0 > d ? "" + d : "null";
                                if (p == g) return A("" + d);
                                if ("object" == typeof d) {
                                    for (I = u.length; I--;)
                                        if (u[I] === d) throw TypeError();
                                    if (u.push(d), N = [], O = l, l += c, p == v) {
                                        for (j = 0, I = d.length; I > j; j++) M = $(j, d, n, i, c, l, u), N.push(M === a ? "null" : M);
                                        P = N.length ? c ? "[\n" + l + N.join(",\n" + l) + "\n" + O + "]" : "[" + N.join(",") + "]" : "[]"
                                    } else o(i || d, function(t) {
                                        var e = $(t, d, n, i, c, l, u);
                                        e !== a && N.push(A(t) + ":" + (c ? " " : "") + e)
                                    }), P = N.length ? c ? "{\n" + l + N.join(",\n" + l) + "\n" + O + "}" : "{" + N.join(",") + "}" : "{}";
                                    return u.pop(), P
                                }
                            };
                        u.stringify = function(t, e, n) {
                            var i, r, o, a;
                            if ("function" == typeof e || "object" == typeof e && e)
                                if ((a = s.call(e)) == f) r = e;
                                else if (a == v) {
                                    o = {};
                                    for (var c, l = 0, u = e.length; u > l; c = e[l++], a = s.call(c), (a == g || a == m) && (o[c] = 1));
                                }
                            if (n)
                                if ((a = s.call(n)) == m) {
                                    if ((n -= n % 1) > 0)
                                        for (i = "", n > 10 && (n = 10); i.length < n; i += " ");
                                } else a == g && (i = n.length <= 10 ? n : n.slice(0, 10));
                            return $("", (c = {}, c[""] = t, c), r, o, i, "", [])
                        }
                    }
                    if (!n("json-parse")) {
                        var N, M, j = String.fromCharCode,
                            I = {
                                92: "\\",
                                34: '"',
                                47: "/",
                                98: "\b",
                                116: "	",
                                110: "\n",
                                102: "\f",
                                114: "\r"
                            },
                            O = function() {
                                throw N = M = null, SyntaxError()
                            },
                            P = function() {
                                for (var t, e, n, i, r, o = M, a = o.length; a > N;) switch (r = o.charCodeAt(N)) {
                                    case 9:
                                    case 10:
                                    case 13:
                                    case 32:
                                        N++;
                                        break;
                                    case 123:
                                    case 125:
                                    case 91:
                                    case 93:
                                    case 58:
                                    case 44:
                                        return t = b ? o.charAt(N) : o[N], N++, t;
                                    case 34:
                                        for (t = "@", N++; a > N;)
                                            if (r = o.charCodeAt(N), 32 > r) O();
                                            else if (92 == r) switch (r = o.charCodeAt(++N)) {
                                                case 92:
                                                case 34:
                                                case 47:
                                                case 98:
                                                case 116:
                                                case 110:
                                                case 102:
                                                case 114:
                                                    t += I[r], N++;
                                                    break;
                                                case 117:
                                                    for (e = ++N, n = N + 4; n > N; N++) r = o.charCodeAt(N), r >= 48 && 57 >= r || r >= 97 && 102 >= r || r >= 65 && 70 >= r || O();
                                                    t += j("0x" + o.slice(e, N));
                                                    break;
                                                default:
                                                    O()
                                            } else {
                                                if (34 == r) break;
                                                for (r = o.charCodeAt(N), e = N; r >= 32 && 92 != r && 34 != r;) r = o.charCodeAt(++N);
                                                t += o.slice(e, N)
                                            }
                                        if (34 == o.charCodeAt(N)) return N++, t;
                                        O();
                                    default:
                                        if (e = N, 45 == r && (i = !0, r = o.charCodeAt(++N)), r >= 48 && 57 >= r) {
                                            for (48 == r && (r = o.charCodeAt(N + 1), r >= 48 && 57 >= r) && O(), i = !1; a > N && (r = o.charCodeAt(N), r >= 48 && 57 >= r); N++);
                                            if (46 == o.charCodeAt(N)) {
                                                for (n = ++N; a > n && (r = o.charCodeAt(n), r >= 48 && 57 >= r); n++);
                                                n == N && O(), N = n
                                            }
                                            if (r = o.charCodeAt(N), 101 == r || 69 == r) {
                                                for (r = o.charCodeAt(++N), (43 == r || 45 == r) && N++, n = N; a > n && (r = o.charCodeAt(n), r >= 48 && 57 >= r); n++);
                                                n == N && O(), N = n
                                            }
                                            return +o.slice(e, N)
                                        }
                                        if (i && O(), "true" == o.slice(N, N + 4)) return N += 4, !0;
                                        if ("false" == o.slice(N, N + 5)) return N += 5, !1;
                                        if ("null" == o.slice(N, N + 4)) return N += 4, null;
                                        O()
                                }
                                return "$"
                            },
                            B = function(t) {
                                var e, n;
                                if ("$" == t && O(), "string" == typeof t) {
                                    if ("@" == (b ? t.charAt(0) : t[0])) return t.slice(1);
                                    if ("[" == t) {
                                        for (e = []; t = P(), "]" != t; n || (n = !0)) n && ("," == t ? (t = P(), "]" == t && O()) : O()), "," == t && O(), e.push(B(t));
                                        return e
                                    }
                                    if ("{" == t) {
                                        for (e = {}; t = P(), "}" != t; n || (n = !0)) n && ("," == t ? (t = P(), "}" == t && O()) : O()), ("," == t || "string" != typeof t || "@" != (b ? t.charAt(0) : t[0]) || ":" != P()) && O(), e[t.slice(1)] = B(P());
                                        return e
                                    }
                                    O()
                                }
                                return t
                            },
                            L = function(t, e, n) {
                                var i = R(t, e, n);
                                i === a ? delete t[e] : t[e] = i
                            },
                            R = function(t, e, n) {
                                var i, r = t[e];
                                if ("object" == typeof r && r)
                                    if (s.call(r) == v)
                                        for (i = r.length; i--;) L(r, i, n);
                                    else o(r, function(t) {
                                        L(r, t, n)
                                    });
                                return n.call(t, e, r)
                            };
                        u.parse = function(t, e) {
                            var n, i;
                            return N = 0, M = "" + t, n = B(P()), "$" != P() && O(), N = M = null, e && s.call(e) == f ? R((i = {}, i[""] = n, i), "", e) : n
                        }
                    }
                }
                c && t(function() {
                    return u
                })
            }(this)
        }, {}],
        50: [function(t, e, n) {
            function i(t, e) {
                var n = [];
                e = e || 0;
                for (var i = e || 0; i < t.length; i++) n[i - e] = t[i];
                return n
            }
            e.exports = i
        }, {}]
    }, {}, [1])(1)
}),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.moment = e()
    }(this, function() {
        "use strict";

        function t() {
            return $n.apply(null, arguments)
        }

        function e(t) {
            $n = t
        }

        function n(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function i(t) {
            return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
        }

        function r(t, e) {
            var n, i = [];
            for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
            return i
        }

        function o(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }

        function a(t, e) {
            for (var n in e) o(e, n) && (t[n] = e[n]);
            return o(e, "toString") && (t.toString = e.toString), o(e, "valueOf") && (t.valueOf = e.valueOf), t
        }

        function s(t, e, n, i) {
            return Ct(t, e, n, i, !0).utc()
        }

        function c() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1
            }
        }

        function l(t) {
            return null == t._pf && (t._pf = c()), t._pf
        }

        function u(t) {
            if (null == t._isValid) {
                var e = l(t);
                t._isValid = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.nullInput && !e.invalidFormat && !e.userInvalidated, t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour)
            }
            return t._isValid
        }

        function d(t) {
            var e = s(0 / 0);
            return null != t ? a(l(e), t) : l(e).userInvalidated = !0, e
        }

        function p(t, e) {
            var n, i, r;
            if ("undefined" != typeof e._isAMomentObject && (t._isAMomentObject = e._isAMomentObject), "undefined" != typeof e._i && (t._i = e._i), "undefined" != typeof e._f && (t._f = e._f), "undefined" != typeof e._l && (t._l = e._l), "undefined" != typeof e._strict && (t._strict = e._strict), "undefined" != typeof e._tzm && (t._tzm = e._tzm), "undefined" != typeof e._isUTC && (t._isUTC = e._isUTC), "undefined" != typeof e._offset && (t._offset = e._offset), "undefined" != typeof e._pf && (t._pf = l(e)), "undefined" != typeof e._locale && (t._locale = e._locale), Mn.length > 0)
                for (n in Mn) i = Mn[n], r = e[i], "undefined" != typeof r && (t[i] = r);
            return t
        }

        function f(e) {
            p(this, e), this._d = new Date(+e._d), jn === !1 && (jn = !0, t.updateOffset(this), jn = !1)
        }

        function h(t) {
            return t instanceof f || null != t && null != t._isAMomentObject
        }

        function m(t) {
            var e = +t,
                n = 0;
            return 0 !== e && isFinite(e) && (n = e >= 0 ? Math.floor(e) : Math.ceil(e)), n
        }

        function g(t, e, n) {
            var i, r = Math.min(t.length, e.length),
                o = Math.abs(t.length - e.length),
                a = 0;
            for (i = 0; r > i; i++)(n && t[i] !== e[i] || !n && m(t[i]) !== m(e[i])) && a++;
            return a + o
        }

        function v() {}

        function y(t) {
            return t ? t.toLowerCase().replace("_", "-") : t
        }

        function b(t) {
            for (var e, n, i, r, o = 0; o < t.length;) {
                for (r = y(t[o]).split("-"), e = r.length, n = y(t[o + 1]), n = n ? n.split("-") : null; e > 0;) {
                    if (i = w(r.slice(0, e).join("-"))) return i;
                    if (n && n.length >= e && g(r, n, !0) >= e - 1) break;
                    e--
                }
                o++
            }
            return null
        }

        function w(t) {
            var e = null;
            if (!In[t] && "undefined" != typeof module && module && module.exports) try {
                e = Nn._abbr, require("./locale/" + t), x(e)
            } catch (n) {}
            return In[t]
        }

        function x(t, e) {
            var n;
            return t && (n = "undefined" == typeof e ? k(t) : _(t, e), n && (Nn = n)), Nn._abbr
        }

        function _(t, e) {
            return null !== e ? (e.abbr = t, In[t] || (In[t] = new v), In[t].set(e), x(t), In[t]) : (delete In[t], null)
        }

        function k(t) {
            var e;
            if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Nn;
            if (!n(t)) {
                if (e = w(t)) return e;
                t = [t]
            }
            return b(t)
        }

        function T(t, e) {
            var n = t.toLowerCase();
            On[n] = On[n + "s"] = On[e] = t
        }

        function C(t) {
            return "string" == typeof t ? On[t] || On[t.toLowerCase()] : void 0
        }

        function S(t) {
            var e, n, i = {};
            for (n in t) o(t, n) && (e = C(n), e && (i[e] = t[n]));
            return i
        }

        function D(e, n) {
            return function(i) {
                return null != i ? (A(this, e, i), t.updateOffset(this, n), this) : E(this, e)
            }
        }

        function E(t, e) {
            return t._d["get" + (t._isUTC ? "UTC" : "") + e]()
        }

        function A(t, e, n) {
            return t._d["set" + (t._isUTC ? "UTC" : "") + e](n)
        }

        function $(t, e) {
            var n;
            if ("object" == typeof t)
                for (n in t) this.set(n, t[n]);
            else if (t = C(t), "function" == typeof this[t]) return this[t](e);
            return this
        }

        function N(t, e, n) {
            for (var i = "" + Math.abs(t), r = t >= 0; i.length < e;) i = "0" + i;
            return (r ? n ? "+" : "" : "-") + i
        }

        function M(t, e, n, i) {
            var r = i;
            "string" == typeof i && (r = function() {
                return this[i]()
            }), t && (Rn[t] = r), e && (Rn[e[0]] = function() {
                return N(r.apply(this, arguments), e[1], e[2])
            }), n && (Rn[n] = function() {
                return this.localeData().ordinal(r.apply(this, arguments), t)
            })
        }

        function j(t) {
            return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
        }

        function I(t) {
            var e, n, i = t.match(Pn);
            for (e = 0, n = i.length; n > e; e++) i[e] = Rn[i[e]] ? Rn[i[e]] : j(i[e]);
            return function(r) {
                var o = "";
                for (e = 0; n > e; e++) o += i[e] instanceof Function ? i[e].call(r, t) : i[e];
                return o
            }
        }

        function O(t, e) {
            return t.isValid() ? (e = P(e, t.localeData()), Ln[e] || (Ln[e] = I(e)), Ln[e](t)) : t.localeData().invalidDate()
        }

        function P(t, e) {
            function n(t) {
                return e.longDateFormat(t) || t
            }
            var i = 5;
            for (Bn.lastIndex = 0; i >= 0 && Bn.test(t);) t = t.replace(Bn, n), Bn.lastIndex = 0, i -= 1;
            return t
        }

        function B(t, e, n) {
            ti[t] = "function" == typeof e ? e : function(t) {
                return t && n ? n : e
            }
        }

        function L(t, e) {
            return o(ti, t) ? ti[t](e._strict, e._locale) : new RegExp(R(t))
        }

        function R(t) {
            return t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, n, i, r) {
                return e || n || i || r
            }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function F(t, e) {
            var n, i = e;
            for ("string" == typeof t && (t = [t]), "number" == typeof e && (i = function(t, n) {
                n[e] = m(t)
            }), n = 0; n < t.length; n++) ei[t[n]] = i
        }

        function q(t, e) {
            F(t, function(t, n, i, r) {
                i._w = i._w || {}, e(t, i._w, i, r)
            })
        }

        function H(t, e, n) {
            null != e && o(ei, t) && ei[t](e, n._a, n, t)
        }

        function U(t, e) {
            return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
        }

        function Y(t) {
            return this._months[t.month()]
        }

        function z(t) {
            return this._monthsShort[t.month()]
        }

        function W(t, e, n) {
            var i, r, o;
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; 12 > i; i++) {
                if (r = s([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (o = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[i] = new RegExp(o.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
                if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
                if (!n && this._monthsParse[i].test(t)) return i
            }
        }

        function X(t, e) {
            var n;
            return "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (n = Math.min(t.date(), U(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t)
        }

        function J(e) {
            return null != e ? (X(this, e), t.updateOffset(this, !0), this) : E(this, "Month")
        }

        function G() {
            return U(this.year(), this.month())
        }

        function V(t) {
            var e, n = t._a;
            return n && -2 === l(t).overflow && (e = n[ii] < 0 || n[ii] > 11 ? ii : n[ri] < 1 || n[ri] > U(n[ni], n[ii]) ? ri : n[oi] < 0 || n[oi] > 24 || 24 === n[oi] && (0 !== n[ai] || 0 !== n[si] || 0 !== n[ci]) ? oi : n[ai] < 0 || n[ai] > 59 ? ai : n[si] < 0 || n[si] > 59 ? si : n[ci] < 0 || n[ci] > 999 ? ci : -1, l(t)._overflowDayOfYear && (ni > e || e > ri) && (e = ri), l(t).overflow = e), t
        }

        function Q(e) {
            t.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
        }

        function Z(t, e) {
            var n = !0,
                i = t + "\n" + (new Error).stack;
            return a(function() {
                return n && (Q(i), n = !1), e.apply(this, arguments)
            }, e)
        }

        function K(t, e) {
            di[t] || (Q(e), di[t] = !0)
        }

        function tt(t) {
            var e, n, i = t._i,
                r = pi.exec(i);
            if (r) {
                for (l(t).iso = !0, e = 0, n = fi.length; n > e; e++)
                    if (fi[e][1].exec(i)) {
                        t._f = fi[e][0] + (r[6] || " ");
                        break
                    }
                for (e = 0, n = hi.length; n > e; e++)
                    if (hi[e][1].exec(i)) {
                        t._f += hi[e][0];
                        break
                    }
                i.match(Qn) && (t._f += "Z"), bt(t)
            } else t._isValid = !1
        }

        function et(e) {
            var n = mi.exec(e._i);
            return null !== n ? void(e._d = new Date(+n[1])) : (tt(e), void(e._isValid === !1 && (delete e._isValid, t.createFromInputFallback(e))))
        }

        function nt(t, e, n, i, r, o, a) {
            var s = new Date(t, e, n, i, r, o, a);
            return 1970 > t && s.setFullYear(t), s
        }

        function it(t) {
            var e = new Date(Date.UTC.apply(null, arguments));
            return 1970 > t && e.setUTCFullYear(t), e
        }

        function rt(t) {
            return ot(t) ? 366 : 365
        }

        function ot(t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        }

        function at() {
            return ot(this.year())
        }

        function st(t, e, n) {
            var i, r = n - e,
                o = n - t.day();
            return o > r && (o -= 7), r - 7 > o && (o += 7), i = St(t).add(o, "d"), {
                week: Math.ceil(i.dayOfYear() / 7),
                year: i.year()
            }
        }

        function ct(t) {
            return st(t, this._week.dow, this._week.doy).week
        }

        function lt() {
            return this._week.dow
        }

        function ut() {
            return this._week.doy
        }

        function dt(t) {
            var e = this.localeData().week(this);
            return null == t ? e : this.add(7 * (t - e), "d")
        }

        function pt(t) {
            var e = st(this, 1, 4).week;
            return null == t ? e : this.add(7 * (t - e), "d")
        }

        function ft(t, e, n, i, r) {
            var o, a, s = it(t, 0, 1).getUTCDay();
            return s = 0 === s ? 7 : s, n = null != n ? n : r, o = r - s + (s > i ? 7 : 0) - (r > s ? 7 : 0), a = 7 * (e - 1) + (n - r) + o + 1, {
                year: a > 0 ? t : t - 1,
                dayOfYear: a > 0 ? a : rt(t - 1) + a
            }
        }

        function ht(t) {
            var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == t ? e : this.add(t - e, "d")
        }

        function mt(t, e, n) {
            return null != t ? t : null != e ? e : n
        }

        function gt(t) {
            var e = new Date;
            return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
        }

        function vt(t) {
            var e, n, i, r, o = [];
            if (!t._d) {
                for (i = gt(t), t._w && null == t._a[ri] && null == t._a[ii] && yt(t), t._dayOfYear && (r = mt(t._a[ni], i[ni]), t._dayOfYear > rt(r) && (l(t)._overflowDayOfYear = !0), n = it(r, 0, t._dayOfYear), t._a[ii] = n.getUTCMonth(), t._a[ri] = n.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = o[e] = i[e];
                for (; 7 > e; e++) t._a[e] = o[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                24 === t._a[oi] && 0 === t._a[ai] && 0 === t._a[si] && 0 === t._a[ci] && (t._nextDay = !0, t._a[oi] = 0), t._d = (t._useUTC ? it : nt).apply(null, o), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[oi] = 24)
            }
        }

        function yt(t) {
            var e, n, i, r, o, a, s;
            e = t._w, null != e.GG || null != e.W || null != e.E ? (o = 1, a = 4, n = mt(e.GG, t._a[ni], st(St(), 1, 4).year), i = mt(e.W, 1), r = mt(e.E, 1)) : (o = t._locale._week.dow, a = t._locale._week.doy, n = mt(e.gg, t._a[ni], st(St(), o, a).year), i = mt(e.w, 1), null != e.d ? (r = e.d, o > r && ++i) : r = null != e.e ? e.e + o : o), s = ft(n, i, r, a, o), t._a[ni] = s.year, t._dayOfYear = s.dayOfYear
        }

        function bt(e) {
            if (e._f === t.ISO_8601) return void tt(e);
            e._a = [], l(e).empty = !0;
            var n, i, r, o, a, s = "" + e._i,
                c = s.length,
                u = 0;
            for (r = P(e._f, e._locale).match(Pn) || [], n = 0; n < r.length; n++) o = r[n], i = (s.match(L(o, e)) || [])[0], i && (a = s.substr(0, s.indexOf(i)), a.length > 0 && l(e).unusedInput.push(a), s = s.slice(s.indexOf(i) + i.length), u += i.length), Rn[o] ? (i ? l(e).empty = !1 : l(e).unusedTokens.push(o), H(o, i, e)) : e._strict && !i && l(e).unusedTokens.push(o);
            l(e).charsLeftOver = c - u, s.length > 0 && l(e).unusedInput.push(s), l(e).bigHour === !0 && e._a[oi] <= 12 && e._a[oi] > 0 && (l(e).bigHour = void 0), e._a[oi] = wt(e._locale, e._a[oi], e._meridiem), vt(e), V(e)
        }

        function wt(t, e, n) {
            var i;
            return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (i = t.isPM(n), i && 12 > e && (e += 12), i || 12 !== e || (e = 0), e) : e
        }

        function xt(t) {
            var e, n, i, r, o;
            if (0 === t._f.length) return l(t).invalidFormat = !0, void(t._d = new Date(0 / 0));
            for (r = 0; r < t._f.length; r++) o = 0, e = p({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[r], bt(e), u(e) && (o += l(e).charsLeftOver, o += 10 * l(e).unusedTokens.length, l(e).score = o, (null == i || i > o) && (i = o, n = e));
            a(t, n || e)
        }

        function _t(t) {
            if (!t._d) {
                var e = S(t._i);
                t._a = [e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], vt(t)
            }
        }

        function kt(t) {
            var e, r = t._i,
                o = t._f;
            return t._locale = t._locale || k(t._l), null === r || void 0 === o && "" === r ? d({
                nullInput: !0
            }) : ("string" == typeof r && (t._i = r = t._locale.preparse(r)), h(r) ? new f(V(r)) : (n(o) ? xt(t) : o ? bt(t) : i(r) ? t._d = r : Tt(t), e = new f(V(t)), e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e))
        }

        function Tt(e) {
            var o = e._i;
            void 0 === o ? e._d = new Date : i(o) ? e._d = new Date(+o) : "string" == typeof o ? et(e) : n(o) ? (e._a = r(o.slice(0), function(t) {
                return parseInt(t, 10)
            }), vt(e)) : "object" == typeof o ? _t(e) : "number" == typeof o ? e._d = new Date(o) : t.createFromInputFallback(e)
        }

        function Ct(t, e, n, i, r) {
            var o = {};
            return "boolean" == typeof n && (i = n, n = void 0), o._isAMomentObject = !0, o._useUTC = o._isUTC = r, o._l = n, o._i = t, o._f = e, o._strict = i, kt(o)
        }

        function St(t, e, n, i) {
            return Ct(t, e, n, i, !1)
        }

        function Dt(t, e) {
            var i, r;
            if (1 === e.length && n(e[0]) && (e = e[0]), !e.length) return St();
            for (i = e[0], r = 1; r < e.length; ++r) e[r][t](i) && (i = e[r]);
            return i
        }

        function Et() {
            var t = [].slice.call(arguments, 0);
            return Dt("isBefore", t)
        }

        function At() {
            var t = [].slice.call(arguments, 0);
            return Dt("isAfter", t)
        }

        function $t(t) {
            var e = S(t),
                n = e.year || 0,
                i = e.quarter || 0,
                r = e.month || 0,
                o = e.week || 0,
                a = e.day || 0,
                s = e.hour || 0,
                c = e.minute || 0,
                l = e.second || 0,
                u = e.millisecond || 0;
            this._milliseconds = +u + 1e3 * l + 6e4 * c + 36e5 * s, this._days = +a + 7 * o, this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = k(), this._bubble()
        }

        function Nt(t) {
            return t instanceof $t
        }

        function Mt(t, e) {
            M(t, 0, 0, function() {
                var t = this.utcOffset(),
                    n = "+";
                return 0 > t && (t = -t, n = "-"), n + N(~~(t / 60), 2) + e + N(~~t % 60, 2)
            })
        }

        function jt(t) {
            var e = (t || "").match(Qn) || [],
                n = e[e.length - 1] || [],
                i = (n + "").match(wi) || ["-", 0, 0],
                r = +(60 * i[1]) + m(i[2]);
            return "+" === i[0] ? r : -r
        }

        function It(e, n) {
            var r, o;
            return n._isUTC ? (r = n.clone(), o = (h(e) || i(e) ? +e : +St(e)) - +r, r._d.setTime(+r._d + o), t.updateOffset(r, !1), r) : St(e).local()
        }

        function Ot(t) {
            return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
        }

        function Pt(e, n) {
            var i, r = this._offset || 0;
            return null != e ? ("string" == typeof e && (e = jt(e)), Math.abs(e) < 16 && (e = 60 * e), !this._isUTC && n && (i = Ot(this)), this._offset = e, this._isUTC = !0, null != i && this.add(i, "m"), r !== e && (!n || this._changeInProgress ? Zt(this, Xt(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? r : Ot(this)
        }

        function Bt(t, e) {
            return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
        }

        function Lt(t) {
            return this.utcOffset(0, t)
        }

        function Rt(t) {
            return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Ot(this), "m")), this
        }

        function Ft() {
            return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(jt(this._i)), this
        }

        function qt(t) {
            return t = t ? St(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0
        }

        function Ht() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }

        function Ut() {
            if (this._a) {
                var t = this._isUTC ? s(this._a) : St(this._a);
                return this.isValid() && g(this._a, t.toArray()) > 0
            }
            return !1
        }

        function Yt() {
            return !this._isUTC
        }

        function zt() {
            return this._isUTC
        }

        function Wt() {
            return this._isUTC && 0 === this._offset
        }

        function Xt(t, e) {
            var n, i, r, a = t,
                s = null;
            return Nt(t) ? a = {
                ms: t._milliseconds,
                d: t._days,
                M: t._months
            } : "number" == typeof t ? (a = {}, e ? a[e] = t : a.milliseconds = t) : (s = xi.exec(t)) ? (n = "-" === s[1] ? -1 : 1, a = {
                y: 0,
                d: m(s[ri]) * n,
                h: m(s[oi]) * n,
                m: m(s[ai]) * n,
                s: m(s[si]) * n,
                ms: m(s[ci]) * n
            }) : (s = _i.exec(t)) ? (n = "-" === s[1] ? -1 : 1, a = {
                y: Jt(s[2], n),
                M: Jt(s[3], n),
                d: Jt(s[4], n),
                h: Jt(s[5], n),
                m: Jt(s[6], n),
                s: Jt(s[7], n),
                w: Jt(s[8], n)
            }) : null == a ? a = {} : "object" == typeof a && ("from" in a || "to" in a) && (r = Vt(St(a.from), St(a.to)), a = {}, a.ms = r.milliseconds, a.M = r.months), i = new $t(a), Nt(t) && o(t, "_locale") && (i._locale = t._locale), i
        }

        function Jt(t, e) {
            var n = t && parseFloat(t.replace(",", "."));
            return (isNaN(n) ? 0 : n) * e
        }

        function Gt(t, e) {
            var n = {
                milliseconds: 0,
                months: 0
            };
            return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, "M"), n
        }

        function Vt(t, e) {
            var n;
            return e = It(e, t), t.isBefore(e) ? n = Gt(t, e) : (n = Gt(e, t), n.milliseconds = -n.milliseconds, n.months = -n.months), n
        }

        function Qt(t, e) {
            return function(n, i) {
                var r, o;
                return null === i || isNaN(+i) || (K(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), o = n, n = i, i = o), n = "string" == typeof n ? +n : n, r = Xt(n, i), Zt(this, r, t), this
            }
        }

        function Zt(e, n, i, r) {
            var o = n._milliseconds,
                a = n._days,
                s = n._months;
            r = null == r ? !0 : r, o && e._d.setTime(+e._d + o * i), a && A(e, "Date", E(e, "Date") + a * i), s && X(e, E(e, "Month") + s * i), r && t.updateOffset(e, a || s)
        }

        function Kt(t) {
            var e = t || St(),
                n = It(e, this).startOf("day"),
                i = this.diff(n, "days", !0),
                r = -6 > i ? "sameElse" : -1 > i ? "lastWeek" : 0 > i ? "lastDay" : 1 > i ? "sameDay" : 2 > i ? "nextDay" : 7 > i ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(r, this, St(e)))
        }

        function te() {
            return new f(this)
        }

        function ee(t, e) {
            var n;
            return e = C("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = h(t) ? t : St(t), +this > +t) : (n = h(t) ? +t : +St(t), n < +this.clone().startOf(e))
        }

        function ne(t, e) {
            var n;
            return e = C("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = h(t) ? t : St(t), +t > +this) : (n = h(t) ? +t : +St(t), +this.clone().endOf(e) < n)
        }

        function ie(t, e, n) {
            return this.isAfter(t, n) && this.isBefore(e, n)
        }

        function re(t, e) {
            var n;
            return e = C(e || "millisecond"), "millisecond" === e ? (t = h(t) ? t : St(t), +this === +t) : (n = +St(t), +this.clone().startOf(e) <= n && n <= +this.clone().endOf(e))
        }

        function oe(t) {
            return 0 > t ? Math.ceil(t) : Math.floor(t)
        }

        function ae(t, e, n) {
            var i, r, o = It(t, this),
                a = 6e4 * (o.utcOffset() - this.utcOffset());
            return e = C(e), "year" === e || "month" === e || "quarter" === e ? (r = se(this, o), "quarter" === e ? r /= 3 : "year" === e && (r /= 12)) : (i = this - o, r = "second" === e ? i / 1e3 : "minute" === e ? i / 6e4 : "hour" === e ? i / 36e5 : "day" === e ? (i - a) / 864e5 : "week" === e ? (i - a) / 6048e5 : i), n ? r : oe(r)
        }

        function se(t, e) {
            var n, i, r = 12 * (e.year() - t.year()) + (e.month() - t.month()),
                o = t.clone().add(r, "months");
            return 0 > e - o ? (n = t.clone().add(r - 1, "months"), i = (e - o) / (o - n)) : (n = t.clone().add(r + 1, "months"), i = (e - o) / (n - o)), -(r + i)
        }

        function ce() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }

        function le() {
            var t = this.clone().utc();
            return 0 < t.year() && t.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : O(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : O(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }

        function ue(e) {
            var n = O(this, e || t.defaultFormat);
            return this.localeData().postformat(n)
        }

        function de(t, e) {
            return this.isValid() ? Xt({
                to: this,
                from: t
            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
        }

        function pe(t) {
            return this.from(St(), t)
        }

        function fe(t, e) {
            return this.isValid() ? Xt({
                from: this,
                to: t
            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
        }

        function he(t) {
            return this.to(St(), t)
        }

        function me(t) {
            var e;
            return void 0 === t ? this._locale._abbr : (e = k(t), null != e && (this._locale = e), this)
        }

        function ge() {
            return this._locale
        }

        function ve(t) {
            switch (t = C(t)) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
        }

        function ye(t) {
            return t = C(t), void 0 === t || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")
        }

        function be() {
            return +this._d - 6e4 * (this._offset || 0)
        }

        function we() {
            return Math.floor(+this / 1e3)
        }

        function xe() {
            return this._offset ? new Date(+this) : this._d
        }

        function _e() {
            var t = this;
            return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
        }

        function ke() {
            return u(this)
        }

        function Te() {
            return a({}, l(this))
        }

        function Ce() {
            return l(this).overflow
        }

        function Se(t, e) {
            M(0, [t, t.length], 0, e)
        }

        function De(t, e, n) {
            return st(St([t, 11, 31 + e - n]), e, n).week
        }

        function Ee(t) {
            var e = st(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return null == t ? e : this.add(t - e, "y")
        }

        function Ae(t) {
            var e = st(this, 1, 4).year;
            return null == t ? e : this.add(t - e, "y")
        }

        function $e() {
            return De(this.year(), 1, 4)
        }

        function Ne() {
            var t = this.localeData()._week;
            return De(this.year(), t.dow, t.doy)
        }

        function Me(t) {
            return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
        }

        function je(t, e) {
            if ("string" == typeof t)
                if (isNaN(t)) {
                    if (t = e.weekdaysParse(t), "number" != typeof t) return null
                } else t = parseInt(t, 10);
            return t
        }

        function Ie(t) {
            return this._weekdays[t.day()]
        }

        function Oe(t) {
            return this._weekdaysShort[t.day()]
        }

        function Pe(t) {
            return this._weekdaysMin[t.day()]
        }

        function Be(t) {
            var e, n, i;
            for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)
                if (this._weekdaysParse[e] || (n = St([2e3, 1]).day(e), i = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[e] = new RegExp(i.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e
        }

        function Le(t) {
            var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != t ? (t = je(t, this.localeData()), this.add(t - e, "d")) : e
        }

        function Re(t) {
            var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == t ? e : this.add(t - e, "d")
        }

        function Fe(t) {
            return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
        }

        function qe(t, e) {
            M(t, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), e)
            })
        }

        function He(t, e) {
            return e._meridiemParse
        }

        function Ue(t) {
            return "p" === (t + "").toLowerCase().charAt(0)
        }

        function Ye(t, e, n) {
            return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        }

        function ze(t) {
            M(0, [t, 3], 0, "millisecond")
        }

        function We() {
            return this._isUTC ? "UTC" : ""
        }

        function Xe() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }

        function Je(t) {
            return St(1e3 * t)
        }

        function Ge() {
            return St.apply(null, arguments).parseZone()
        }

        function Ve(t, e, n) {
            var i = this._calendar[t];
            return "function" == typeof i ? i.call(e, n) : i
        }

        function Qe(t) {
            var e = this._longDateFormat[t];
            return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(t) {
                return t.slice(1)
            }), this._longDateFormat[t] = e), e
        }

        function Ze() {
            return this._invalidDate
        }

        function Ke(t) {
            return this._ordinal.replace("%d", t)
        }

        function tn(t) {
            return t
        }

        function en(t, e, n, i) {
            var r = this._relativeTime[n];
            return "function" == typeof r ? r(t, e, n, i) : r.replace(/%d/i, t)
        }

        function nn(t, e) {
            var n = this._relativeTime[t > 0 ? "future" : "past"];
            return "function" == typeof n ? n(e) : n.replace(/%s/i, e)
        }

        function rn(t) {
            var e, n;
            for (n in t) e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e;
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        }

        function on(t, e, n, i) {
            var r = k(),
                o = s().set(i, e);
            return r[n](o, t)
        }

        function an(t, e, n, i, r) {
            if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return on(t, e, n, r);
            var o, a = [];
            for (o = 0; i > o; o++) a[o] = on(t, o, n, r);
            return a
        }

        function sn(t, e) {
            return an(t, e, "months", 12, "month")
        }

        function cn(t, e) {
            return an(t, e, "monthsShort", 12, "month")
        }

        function ln(t, e) {
            return an(t, e, "weekdays", 7, "day")
        }

        function un(t, e) {
            return an(t, e, "weekdaysShort", 7, "day")
        }

        function dn(t, e) {
            return an(t, e, "weekdaysMin", 7, "day")
        }

        function pn() {
            var t = this._data;
            return this._milliseconds = Yi(this._milliseconds), this._days = Yi(this._days), this._months = Yi(this._months), t.milliseconds = Yi(t.milliseconds), t.seconds = Yi(t.seconds), t.minutes = Yi(t.minutes), t.hours = Yi(t.hours), t.months = Yi(t.months), t.years = Yi(t.years), this
        }

        function fn(t, e, n, i) {
            var r = Xt(e, n);
            return t._milliseconds += i * r._milliseconds, t._days += i * r._days, t._months += i * r._months, t._bubble()
        }

        function hn(t, e) {
            return fn(this, t, e, 1)
        }

        function mn(t, e) {
            return fn(this, t, e, -1)
        }

        function gn() {
            var t, e, n, i = this._milliseconds,
                r = this._days,
                o = this._months,
                a = this._data,
                s = 0;
            return a.milliseconds = i % 1e3, t = oe(i / 1e3), a.seconds = t % 60, e = oe(t / 60), a.minutes = e % 60, n = oe(e / 60), a.hours = n % 24, r += oe(n / 24), s = oe(vn(r)), r -= oe(yn(s)), o += oe(r / 30), r %= 30, s += oe(o / 12), o %= 12, a.days = r, a.months = o, a.years = s, this
        }

        function vn(t) {
            return 400 * t / 146097
        }

        function yn(t) {
            return 146097 * t / 400
        }

        function bn(t) {
            var e, n, i = this._milliseconds;
            if (t = C(t), "month" === t || "year" === t) return e = this._days + i / 864e5, n = this._months + 12 * vn(e), "month" === t ? n : n / 12;
            switch (e = this._days + Math.round(yn(this._months / 12)), t) {
                case "week":
                    return e / 7 + i / 6048e5;
                case "day":
                    return e + i / 864e5;
                case "hour":
                    return 24 * e + i / 36e5;
                case "minute":
                    return 1440 * e + i / 6e4;
                case "second":
                    return 86400 * e + i / 1e3;
                case "millisecond":
                    return Math.floor(864e5 * e) + i;
                default:
                    throw new Error("Unknown unit " + t)
            }
        }

        function wn() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * m(this._months / 12)
        }

        function xn(t) {
            return function() {
                return this.as(t)
            }
        }

        function _n(t) {
            return t = C(t), this[t + "s"]()
        }

        function kn(t) {
            return function() {
                return this._data[t]
            }
        }

        function Tn() {
            return oe(this.days() / 7)
        }

        function Cn(t, e, n, i, r) {
            return r.relativeTime(e || 1, !!n, t, i)
        }

        function Sn(t, e, n) {
            var i = Xt(t).abs(),
                r = ar(i.as("s")),
                o = ar(i.as("m")),
                a = ar(i.as("h")),
                s = ar(i.as("d")),
                c = ar(i.as("M")),
                l = ar(i.as("y")),
                u = r < sr.s && ["s", r] || 1 === o && ["m"] || o < sr.m && ["mm", o] || 1 === a && ["h"] || a < sr.h && ["hh", a] || 1 === s && ["d"] || s < sr.d && ["dd", s] || 1 === c && ["M"] || c < sr.M && ["MM", c] || 1 === l && ["y"] || ["yy", l];
            return u[2] = e, u[3] = +t > 0, u[4] = n, Cn.apply(null, u)
        }

        function Dn(t, e) {
            return void 0 === sr[t] ? !1 : void 0 === e ? sr[t] : (sr[t] = e, !0)
        }

        function En(t) {
            var e = this.localeData(),
                n = Sn(this, !t, e);
            return t && (n = e.pastFuture(+this, n)), e.postformat(n)
        }

        function An() {
            var t = cr(this.years()),
                e = cr(this.months()),
                n = cr(this.days()),
                i = cr(this.hours()),
                r = cr(this.minutes()),
                o = cr(this.seconds() + this.milliseconds() / 1e3),
                a = this.asSeconds();
            return a ? (0 > a ? "-" : "") + "P" + (t ? t + "Y" : "") + (e ? e + "M" : "") + (n ? n + "D" : "") + (i || r || o ? "T" : "") + (i ? i + "H" : "") + (r ? r + "M" : "") + (o ? o + "S" : "") : "P0D"
        }
        var $n, Nn, Mn = t.momentProperties = [],
            jn = !1,
            In = {},
            On = {},
            Pn = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
            Bn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            Ln = {},
            Rn = {},
            Fn = /\d/,
            qn = /\d\d/,
            Hn = /\d{3}/,
            Un = /\d{4}/,
            Yn = /[+-]?\d{6}/,
            zn = /\d\d?/,
            Wn = /\d{1,3}/,
            Xn = /\d{1,4}/,
            Jn = /[+-]?\d{1,6}/,
            Gn = /\d+/,
            Vn = /[+-]?\d+/,
            Qn = /Z|[+-]\d\d:?\d\d/gi,
            Zn = /[+-]?\d+(\.\d{1,3})?/,
            Kn = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            ti = {},
            ei = {},
            ni = 0,
            ii = 1,
            ri = 2,
            oi = 3,
            ai = 4,
            si = 5,
            ci = 6;

        M("M", ["MM", 2], "Mo", function() {
            return this.month() + 1
        }), M("MMM", 0, 0, function(t) {
            return this.localeData().monthsShort(this, t)
        }), M("MMMM", 0, 0, function(t) {
            return this.localeData().months(this, t)
        }), T("month", "M"), B("M", zn), B("MM", zn, qn), B("MMM", Kn), B("MMMM", Kn), F(["M", "MM"], function(t, e) {
            e[ii] = m(t) - 1
        }), F(["MMM", "MMMM"], function(t, e, n, i) {
            var r = n._locale.monthsParse(t, i, n._strict);
            null != r ? e[ii] = r : l(n).invalidMonth = t
        });
        var li = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            ui = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            di = {};
        t.suppressDeprecationWarnings = !1;
        var pi = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            fi = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                ["YYYY-DDD", /\d{4}-\d{3}/]
            ],
            hi = [
                ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                ["HH:mm", /(T| )\d\d:\d\d/],
                ["HH", /(T| )\d\d/]
            ],
            mi = /^\/?Date\((\-?\d+)/i;
        t.createFromInputFallback = Z("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(t) {
            t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
        }), M(0, ["YY", 2], 0, function() {
            return this.year() % 100
        }), M(0, ["YYYY", 4], 0, "year"), M(0, ["YYYYY", 5], 0, "year"), M(0, ["YYYYYY", 6, !0], 0, "year"), T("year", "y"), B("Y", Vn), B("YY", zn, qn), B("YYYY", Xn, Un), B("YYYYY", Jn, Yn), B("YYYYYY", Jn, Yn), F(["YYYY", "YYYYY", "YYYYYY"], ni), F("YY", function(e, n) {
            n[ni] = t.parseTwoDigitYear(e)
        }), t.parseTwoDigitYear = function(t) {
            return m(t) + (m(t) > 68 ? 1900 : 2e3)
        };
        var gi = D("FullYear", !1);
        M("w", ["ww", 2], "wo", "week"), M("W", ["WW", 2], "Wo", "isoWeek"), T("week", "w"), T("isoWeek", "W"), B("w", zn), B("ww", zn, qn), B("W", zn), B("WW", zn, qn), q(["w", "ww", "W", "WW"], function(t, e, n, i) {
            e[i.substr(0, 1)] = m(t)
        });
        var vi = {
            dow: 0,
            doy: 6
        };
        M("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), T("dayOfYear", "DDD"), B("DDD", Wn), B("DDDD", Hn), F(["DDD", "DDDD"], function(t, e, n) {
            n._dayOfYear = m(t)
        }), t.ISO_8601 = function() {};
        var yi = Z("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
                var t = St.apply(null, arguments);
                return this > t ? this : t
            }),
            bi = Z("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
                var t = St.apply(null, arguments);
                return t > this ? this : t
            });
        Mt("Z", ":"), Mt("ZZ", ""), B("Z", Qn), B("ZZ", Qn), F(["Z", "ZZ"], function(t, e, n) {
            n._useUTC = !0, n._tzm = jt(t)
        });
        var wi = /([\+\-]|\d\d)/gi;
        t.updateOffset = function() {};
        var xi = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
            _i = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
        Xt.fn = $t.prototype;
        var ki = Qt(1, "add"),
            Ti = Qt(-1, "subtract");
        t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        var Ci = Z("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
            return void 0 === t ? this.localeData() : this.locale(t)
        });
        M(0, ["gg", 2], 0, function() {
            return this.weekYear() % 100
        }), M(0, ["GG", 2], 0, function() {
            return this.isoWeekYear() % 100
        }), Se("gggg", "weekYear"), Se("ggggg", "weekYear"), Se("GGGG", "isoWeekYear"), Se("GGGGG", "isoWeekYear"), T("weekYear", "gg"), T("isoWeekYear", "GG"), B("G", Vn), B("g", Vn), B("GG", zn, qn), B("gg", zn, qn), B("GGGG", Xn, Un), B("gggg", Xn, Un), B("GGGGG", Jn, Yn), B("ggggg", Jn, Yn), q(["gggg", "ggggg", "GGGG", "GGGGG"], function(t, e, n, i) {
            e[i.substr(0, 2)] = m(t)
        }), q(["gg", "GG"], function(e, n, i, r) {
            n[r] = t.parseTwoDigitYear(e)
        }), M("Q", 0, 0, "quarter"), T("quarter", "Q"), B("Q", Fn), F("Q", function(t, e) {
            e[ii] = 3 * (m(t) - 1)
        }), M("D", ["DD", 2], "Do", "date"), T("date", "D"), B("D", zn), B("DD", zn, qn), B("Do", function(t, e) {
            return t ? e._ordinalParse : e._ordinalParseLenient
        }), F(["D", "DD"], ri), F("Do", function(t, e) {
            e[ri] = m(t.match(zn)[0], 10)
        });
        var Si = D("Date", !0);
        M("d", 0, "do", "day"), M("dd", 0, 0, function(t) {
            return this.localeData().weekdaysMin(this, t)
        }), M("ddd", 0, 0, function(t) {
            return this.localeData().weekdaysShort(this, t)
        }), M("dddd", 0, 0, function(t) {
            return this.localeData().weekdays(this, t)
        }), M("e", 0, 0, "weekday"), M("E", 0, 0, "isoWeekday"), T("day", "d"), T("weekday", "e"), T("isoWeekday", "E"), B("d", zn), B("e", zn), B("E", zn), B("dd", Kn), B("ddd", Kn), B("dddd", Kn), q(["dd", "ddd", "dddd"], function(t, e, n) {
            var i = n._locale.weekdaysParse(t);
            null != i ? e.d = i : l(n).invalidWeekday = t
        }), q(["d", "e", "E"], function(t, e, n, i) {
            e[i] = m(t)
        });
        var Di = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            Ei = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            Ai = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
        M("H", ["HH", 2], 0, "hour"), M("h", ["hh", 2], 0, function() {
            return this.hours() % 12 || 12
        }), qe("a", !0), qe("A", !1), T("hour", "h"), B("a", He), B("A", He), B("H", zn), B("h", zn), B("HH", zn, qn), B("hh", zn, qn), F(["H", "HH"], oi), F(["a", "A"], function(t, e, n) {
            n._isPm = n._locale.isPM(t), n._meridiem = t
        }), F(["h", "hh"], function(t, e, n) {
            e[oi] = m(t), l(n).bigHour = !0
        });
        var $i = /[ap]\.?m?\.?/i,
            Ni = D("Hours", !0);
        M("m", ["mm", 2], 0, "minute"), T("minute", "m"), B("m", zn), B("mm", zn, qn), F(["m", "mm"], ai);
        var Mi = D("Minutes", !1);
        M("s", ["ss", 2], 0, "second"), T("second", "s"), B("s", zn), B("ss", zn, qn), F(["s", "ss"], si);
        var ji = D("Seconds", !1);
        M("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }), M(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        }), ze("SSS"), ze("SSSS"), T("millisecond", "ms"), B("S", Wn, Fn), B("SS", Wn, qn), B("SSS", Wn, Hn), B("SSSS", Gn), F(["S", "SS", "SSS", "SSSS"], function(t, e) {
            e[ci] = m(1e3 * ("0." + t))
        });
        var Ii = D("Milliseconds", !1);
        M("z", 0, 0, "zoneAbbr"), M("zz", 0, 0, "zoneName");
        var Oi = f.prototype;
        Oi.add = ki, Oi.calendar = Kt, Oi.clone = te, Oi.diff = ae, Oi.endOf = ye, Oi.format = ue, Oi.from = de, Oi.fromNow = pe, Oi.to = fe, Oi.toNow = he, Oi.get = $, Oi.invalidAt = Ce, Oi.isAfter = ee, Oi.isBefore = ne, Oi.isBetween = ie, Oi.isSame = re, Oi.isValid = ke, Oi.lang = Ci, Oi.locale = me, Oi.localeData = ge, Oi.max = bi, Oi.min = yi, Oi.parsingFlags = Te, Oi.set = $, Oi.startOf = ve, Oi.subtract = Ti, Oi.toArray = _e, Oi.toDate = xe, Oi.toISOString = le, Oi.toJSON = le, Oi.toString = ce, Oi.unix = we, Oi.valueOf = be, Oi.year = gi, Oi.isLeapYear = at, Oi.weekYear = Ee, Oi.isoWeekYear = Ae, Oi.quarter = Oi.quarters = Me, Oi.month = J, Oi.daysInMonth = G, Oi.week = Oi.weeks = dt, Oi.isoWeek = Oi.isoWeeks = pt, Oi.weeksInYear = Ne, Oi.isoWeeksInYear = $e, Oi.date = Si, Oi.day = Oi.days = Le, Oi.weekday = Re, Oi.isoWeekday = Fe, Oi.dayOfYear = ht, Oi.hour = Oi.hours = Ni, Oi.minute = Oi.minutes = Mi, Oi.second = Oi.seconds = ji, Oi.millisecond = Oi.milliseconds = Ii, Oi.utcOffset = Pt, Oi.utc = Lt, Oi.local = Rt, Oi.parseZone = Ft, Oi.hasAlignedHourOffset = qt, Oi.isDST = Ht, Oi.isDSTShifted = Ut, Oi.isLocal = Yt, Oi.isUtcOffset = zt, Oi.isUtc = Wt, Oi.isUTC = Wt, Oi.zoneAbbr = We, Oi.zoneName = Xe, Oi.dates = Z("dates accessor is deprecated. Use date instead.", Si), Oi.months = Z("months accessor is deprecated. Use month instead", J), Oi.years = Z("years accessor is deprecated. Use year instead", gi), Oi.zone = Z("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Bt);
        var Pi = Oi,
            Bi = {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            Li = {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY LT",
                LLLL: "dddd, MMMM D, YYYY LT"
            },
            Ri = "Invalid date",
            Fi = "%d",
            qi = /\d{1,2}/,
            Hi = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            Ui = v.prototype;
        Ui._calendar = Bi, Ui.calendar = Ve, Ui._longDateFormat = Li, Ui.longDateFormat = Qe, Ui._invalidDate = Ri, Ui.invalidDate = Ze, Ui._ordinal = Fi, Ui.ordinal = Ke, Ui._ordinalParse = qi, Ui.preparse = tn, Ui.postformat = tn, Ui._relativeTime = Hi, Ui.relativeTime = en, Ui.pastFuture = nn, Ui.set = rn, Ui.months = Y, Ui._months = li, Ui.monthsShort = z, Ui._monthsShort = ui, Ui.monthsParse = W, Ui.week = ct, Ui._week = vi, Ui.firstDayOfYear = ut, Ui.firstDayOfWeek = lt, Ui.weekdays = Ie, Ui._weekdays = Di, Ui.weekdaysMin = Pe, Ui._weekdaysMin = Ai, Ui.weekdaysShort = Oe, Ui._weekdaysShort = Ei, Ui.weekdaysParse = Be, Ui.isPM = Ue, Ui._meridiemParse = $i, Ui.meridiem = Ye, x("en", {
            ordinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(t) {
                var e = t % 10,
                    n = 1 === m(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
                return t + n
            }
        }), t.lang = Z("moment.lang is deprecated. Use moment.locale instead.", x), t.langData = Z("moment.langData is deprecated. Use moment.localeData instead.", k);
        var Yi = Math.abs,
            zi = xn("ms"),
            Wi = xn("s"),
            Xi = xn("m"),
            Ji = xn("h"),
            Gi = xn("d"),
            Vi = xn("w"),
            Qi = xn("M"),
            Zi = xn("y"),
            Ki = kn("milliseconds"),
            tr = kn("seconds"),
            er = kn("minutes"),
            nr = kn("hours"),
            ir = kn("days"),
            rr = kn("months"),
            or = kn("years"),
            ar = Math.round,
            sr = {
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            },
            cr = Math.abs,
            lr = $t.prototype;
        lr.abs = pn, lr.add = hn, lr.subtract = mn, lr.as = bn, lr.asMilliseconds = zi, lr.asSeconds = Wi, lr.asMinutes = Xi, lr.asHours = Ji, lr.asDays = Gi, lr.asWeeks = Vi, lr.asMonths = Qi, lr.asYears = Zi, lr.valueOf = wn, lr._bubble = gn, lr.get = _n, lr.milliseconds = Ki, lr.seconds = tr, lr.minutes = er, lr.hours = nr, lr.days = ir, lr.weeks = Tn, lr.months = rr, lr.years = or, lr.humanize = En, lr.toISOString = An, lr.toString = An, lr.toJSON = An, lr.locale = me, lr.localeData = ge, lr.toIsoString = Z("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", An), lr.lang = Ci, M("X", 0, 0, "unix"), M("x", 0, 0, "valueOf"), B("x", Vn), B("X", Zn), F("X", function(t, e, n) {
            n._d = new Date(1e3 * parseFloat(t, 10))
        }), F("x", function(t, e, n) {
            n._d = new Date(m(t))
        }), t.version = "2.10.3", e(St), t.fn = Pi, t.min = Et, t.max = At, t.utc = s, t.unix = Je, t.months = sn, t.isDate = i, t.locale = x, t.invalid = d, t.duration = Xt, t.isMoment = h, t.weekdays = ln, t.parseZone = Ge, t.localeData = k, t.isDuration = Nt, t.monthsShort = cn, t.weekdaysMin = dn, t.defineLocale = _, t.weekdaysShort = un, t.normalizeUnits = C, t.relativeTimeThreshold = Dn;
        var ur = t;
        return ur
    }),
    function(t, e) {
        var n = 1e3,
            i = !1,
            r = t([]),
            o = function(n, i) {
                var o = n.data("livestampdata");
                "number" == typeof i && (i *= 1e3), n.removeAttr("data-livestamp").removeData("livestamp"), i = e(i), e.isMoment(i) && !isNaN(+i) && (o = t.extend({}, {
                    original: n.contents()
                }, o), o.moment = e(i), n.data("livestampdata", o).empty(), r.push(n[0]))
            },
            a = function() {
                i || (s.update(), setTimeout(a, n))
            },
            s = {
                update: function() {
                    t("[data-livestamp]").each(function() {
                        var e = t(this);
                        o(e, e.data("livestamp"))
                    });
                    var n = [];
                    r.each(function() {
                        var i = t(this),
                            r = i.data("livestampdata");
                        if (void 0 === r) n.push(this);
                        else if (e.isMoment(r.moment)) {
                            var o = i.html(),
                                r = r.moment.fromNow();
                            if (o != r) {
                                var a = t.Event("change.livestamp");
                                i.trigger(a, [o, r]), a.isDefaultPrevented() || i.html(r)
                            }
                        }
                    }), r = r.not(n)
                },
                pause: function() {
                    i = !0
                },
                resume: function() {
                    i = !1, a()
                },
                interval: function(t) {
                    return void 0 === t ? n : void(n = t)
                }
            },
            c = {
                add: function(n, i) {
                    return "number" == typeof i && (i *= 1e3), i = e(i), e.isMoment(i) && !isNaN(+i) && (n.each(function() {
                        o(t(this), i)
                    }), s.update()), n
                },
                destroy: function(e) {
                    return r = r.not(e), e.each(function() {
                        var n = t(this),
                            i = n.data("livestampdata");
                        return void 0 === i ? e : void n.html(i.original ? i.original : "").removeData("livestampdata")
                    }), e
                },
                isLivestamp: function(t) {
                    return void 0 !== t.data("livestampdata")
                }
            };
        t.livestamp = s, t(function() {
            s.resume()
        }), t.fn.livestamp = function(t, e) {
            return c[t] || (e = t, t = "add"), c[t](this, e)
        }
    }(jQuery, moment), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.tab");
            r || i.data("bs.tab", r = new n(this)), "string" == typeof e && r[e]()
        })
    }
    var n = function(e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 150, n.prototype.show = function() {
        var e = this.element,
            n = e.closest("ul:not(.dropdown-menu)"),
            i = e.data("target");
        if (i || (i = e.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var r = n.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                a = t.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            if (r.trigger(o), e.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var s = t(i);
                this.activate(e.closest("li"), n), this.activate(s, s.parent(), function() {
                    r.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function(e, i, r) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), r && r()
        }
        var a = i.find("> .active"),
            s = r && t.support.transition && (a.length && a.hasClass("fade") || !!i.find("> .fade").length);
        a.length && s ? a.one("bsTransitionEnd", o).emulateTransitionEnd(n.TRANSITION_DURATION) : o(), a.removeClass("in")
    };
    var i = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function() {
        return t.fn.tab = i, this
    };
    var r = function(n) {
        n.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery),
    function(t, e, n, i) {
        function r(e, n) {
            this.element = e, this.settings = t.extend({}, a, n), this._defaults = a, this._name = o, this.init()
        }
        var o = "numerator",
            a = {
                easing: "swing",
                duration: 500,
                delimiter: i,
                rounding: 0,
                toValue: i,
                fromValue: i,
                queue: !1,
                onStart: function() {},
                onStep: function() {},
                onProgress: function() {},
                onComplete: function() {}
            };
        r.prototype = {
            init: function() {
                this.parseElement(), this.setValue()
            },
            parseElement: function() {
                var e = t.trim(t(this.element).text());
                this.settings.fromValue = this.format(e)
            },
            setValue: function() {
                var e = this;
                t({
                    value: e.settings.fromValue
                }).animate({
                    value: e.settings.toValue
                }, {
                    duration: parseInt(e.settings.duration),
                    easing: e.settings.easing,
                    start: e.settings.onStart,
                    step: function(n, i) {
                        t(e.element).text(e.format(n)), e.settings.onStep(n, i)
                    },
                    progress: e.settings.onProgress,
                    complete: e.settings.onComplete
                })
            },
            format: function(t) {
                var e = this;
                return t = parseInt(this.settings.rounding) < 1 ? parseInt(t) : parseFloat(t).toFixed(parseInt(this.settings.rounding)), e.settings.delimiter ? this.delimit(t) : t
            },
            delimit: function(t) {
                var e = this;
                if (t = t.toString(), e.settings.rounding && parseInt(e.settings.rounding) > 0) {
                    var n = t.substring(t.length - (e.settings.rounding + 1), t.length),
                        i = t.substring(0, t.length - (e.settings.rounding + 1));
                    return e.addCommas(i) + n
                }
                return e.addCommas(t)
            },
            addCommas: function(t) {
                return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.settings.delimiter)
            }
        }, t.fn[o] = function(e) {
            return this.each(function() {
                t.data(this, "plugin_" + o) && t.data(this, "plugin_" + o, null), t.data(this, "plugin_" + o, new r(this, e))
            })
        }
    }(jQuery, window, document);
var Roulette = function() {
    function t(t) {
        return document.getElementById(t)
    }

    function e(t, e) {
        e.forEach(function(e) {
            t.appendChild(e)
        })
    }

    function n(e, n, r) {
        n.entries.forEach(function(t, e) {
            var i = {
                steamid: t.userinfo.steamid,
                personaname: t.userinfo.personaname,
                avatarfull: t.userinfo.avatarfull,
                sectorAngle: t.traderesponse.total / n.total * 360
            };
            m.push(i), i.steamid === n.winner && (m.winner = m.length - 1)
        }), m.pot = n.total, i(e, m), t("roulette").style.display = "inline-block", setTimeout(function() {
            t("roulette").style.opacity = .9
        }, 10), setTimeout(function() {
            o(r, n)
        }, 200)
    }

    function i(t, n) {
        function i(t) {
            var e = "rlt_c1",
                i = "rlt_c2",
                r = "rlt_c3",
                o = t % 3;
            return 0 === o ? t === n.length - 1 ? e : r : 2 === o ? i : e
        }
        var o = function(t) {
                this.x = t[0], this.y = t[1], this.substrVec = function(t) {
                    return this.x -= t[0], this.y -= t[1], this
                }, this.substrVal = function(t) {
                    this.y < 0 && (t = -t);
                    var e = this.x / this.y,
                        n = t / Math.pow(Math.pow(e, 2) + 1, .5),
                        i = e * n;
                    return this.substrVec([i, n])
                }
            },
            a = [{
                id: "rlt_sectors"
            }, {
                id: "rlt_center"
            }];
        a.forEach(function(t) {
            var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            e.setAttribute("id", t.id), e.setAttribute("width", "rlt_center" === t.id ? "60%" : "100%"), e.setAttribute("height", "rlt_center" === t.id ? "60%" : "100%"), e.setAttribute("viewBox", "0 0 400 400"), e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), t.el = e
        }), c = a[0].el, l = a[1].el, s = document.createElement("div"), s.id = "roulette_wrapp", u = document.createElement("div"), u.id = "roulette", p = document.createElement("span"), p.id = "rlt_name", d = document.createElement("div"), d.id = "rlt_cape", f = document.createElement("span"), f.id = "rlt_won", h = document.createElement("div"), h.id = "rlt_arrow", e(u, [c, l, d, p, f, h]), s.appendChild(u), t.appendChild(s);
        for (var m = 0, g = 0, v = 195, y = 200, b = 0; 360 > b; b += 10) {
            m = g, g += 10;
            var w, x, _, k, T, C;
            w = parseInt(Math.round(v * Math.cos(Math.PI * m / 180))), _ = parseInt(Math.round(v * Math.sin(Math.PI * m / 180))), x = parseInt(Math.round(v * Math.cos(Math.PI * g / 180))), k = parseInt(Math.round(v * Math.sin(Math.PI * g / 180)));
            var S = "M0,0  L" + w + "," + _ + "  A" + v + "," + v + " 0 " + (g - m > 180 ? 1 : 0) + ",1 " + x + "," + k + " z",
                D = i(b),
                E = r("path", {
                    d: S,
                    "class": D,
                    transform: "translate(" + y + "," + y + ")"
                });
            l.appendChild(E)
        }
        m = g = 0;
        for (var b = 0; b < n.length; b++) {
            m = n[b].startAngle = g, g = n[b].endAngle = m + n[b].sectorAngle, midAngle = (m + g) / 2;
            var w, x, _, k, T, C;
            w = parseInt(Math.round(v * Math.cos(Math.PI * m / 180))), _ = parseInt(Math.round(v * Math.sin(Math.PI * m / 180))), x = parseInt(Math.round(v * Math.cos(Math.PI * g / 180))), k = parseInt(Math.round(v * Math.sin(Math.PI * g / 180))), T = parseInt(Math.round(v * Math.cos(Math.PI * midAngle / 180))), C = parseInt(Math.round(v * Math.sin(Math.PI * midAngle / 180)));
            var S = "M0,0  L" + w + "," + _ + "  A" + v + "," + v + " 0 " + (g - m > 180 ? 1 : 0) + ",1 " + x + "," + k + " z",
                D = i(b),
                E = r("path", {
                    d: S,
                    "class": D,
                    id: "rlt_" + b,
                    transform: "translate(" + y + "," + y + ")"
                });
            c.appendChild(E);
            var A = new o([T, C]),
                $ = 60;
            A.substrVal($ / 2 + 10), console.log(A), T = A.x, C = A.y;
            var N = y - $ / 2,
                M = r("clipPath", {
                    id: "clipSector" + b
                }),
                j = r("path", {
                    d: S,
                    transform: "translate(" + y + "," + y + ") "
                });
            M.appendChild(j);
            var I = r("clipPath", {
                    id: "clipCircle" + b
                }),
                O = r("circle", {
                    r: $ / 2,
                    cx: T + $ / 2,
                    cy: C + $ / 2
                });
            I.appendChild(O);
            var P = T + $ / 2,
                B = C + $ / 2;
            midAngle += 90;
            var L = r("g", {
                    "clip-path": "url(#clipSector" + b + ")"
                }),
                R = r("image", {
                    height: $,
                    width: $,
                    x: T,
                    y: C,
                    transform: "translate(" + N + "," + N + "), rotate(" + midAngle + "," + P + "," + B + ")",
                    "clip-path": "url(#clipCircle" + b + ")"
                });
            R.setAttributeNS("http://www.w3.org/1999/xlink", "href", n[b].avatarfull), L.appendChild(R), c.appendChild(M), c.appendChild(I), c.appendChild(L)
        }
    }

    function r(t, e, n) {
        var i = document.createElementNS("http://www.w3.org/2000/svg", t);
        for (var r in e) e.hasOwnProperty(r) && i.setAttribute(r, e[r]);
        return void 0 !== n && (i.innerHTML = n), i
    }

    function o(e, n) {
        function i(t, e) {
            t.style.transform = e
        }

        function r() {
            i(u, "rotate(" + y + "deg)");
            var e = 360 - (y + 90) % 360;
            m.forEach(function(n, i) {
                var r = t("rlt_" + i);
                if (e < n.endAngle && e > n.startAngle) {
                    d.style.backgroundImage = "url(" + n.avatarfull + ")";
                    var o = r.getAttribute("class");
                    "rlt_accent" !== o && (n["class"] = r.getAttribute("class"), r.setAttribute("class", "rlt_accent"))
                } else n["class"] && t("rlt_" + i).setAttribute("class", n["class"])
            });
            var s = new Date,
                h = (s - _) / 16;
            if (3 > h && (h = 1), _ = s, a > b && (b += .05 * h, b > a && (b = a)), x > y) y += b * h;
            else {
                var g = o();
                if ("done" === g) return l.style.opacity = .1, c.style.opacity = .1, d.style.borderRadius = 0, d.style.borderWidth = 0, d.style.backgroundImage = "url(" + m[m.winner].avatarfull + ")", d.className = "rlt_shadow", p.style.opacity = 1, p.innerHTML = m[m.winner].personaname, f.style.opacity = 1, f.innerHTML = "won $" + m.pot + " with a " + parseFloat(n.winnerpercentage).toFixed(2) + "% chance", "1" === getCookie("sounds") && document.getElementById(winnerSounds[Math.floor(Math.random() * winnerSounds.length)]).play(), void setTimeout(function() {
                    rouletteIsOver()
                }, 5e3);
                y = g, w += h
            }
            setTimeout(r, 16)
        }

        function o() {
            return w >= k ? "done" : T * (Math.pow(w / k - 1, 3) + 1) + C
        }
        var a = 10,
            s = 8,
            u = c,
            h = Math.random();.1 > h && (h = .1);
        var g = m[m.winner].sectorAngle * h,
            v = 270 - m[m.winner].startAngle - g;
        0 > v && (v = 360 + v), v += 360 * s;
        var y = 0,
            b = 0,
            w = 0,
            x = v - (360 + 740 * Math.random()),
            _ = new Date;
        r();
        var k = (v - x) / a * 3,
            T = v - x,
            C = x
    }

    function a(t) {
        s && (s.style.opacity = 0, setTimeout(function() {
            s.parentElement.removeChild(s), m = [], s = c = l = u = d = p = f = h = null, t && t()
        }, 420))
    }
    var s, c, l, u, d, p, f, h, m = [],
        g = {
            start: n,
            over: a
        };
    return g
}();
$("footer").append('<img src="images/bg5.jpg" style="height: 0px; position: absolute;"/><img src="images/bg5.jpg" style="height: 0px;position: absolute;"/><img src="images/bg1.jpg" style="height: 0px;position: absolute;"/>');
var isMobile = !1;
(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (isMobile = !0), isMobile || particlesJS("particle", {
    particles: {
        number: {
            value: 40,
            density: {
                enable: !0,
                value_area: 900
            }
        },
        color: {
            value: "#444"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#444"
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: .3,
            random: !1,
            anim: {
                enable: !1,
                speed: 1,
                opacity_min: .1,
                sync: !1
            }
        },
        size: {
            value: 3,
            random: !0,
            anim: {
                enable: !1,
                speed: 40,
                size_min: .1,
                sync: !1
            }
        },
        line_linked: {
            enable: !0,
            distance: 150,
            color: "#fff",
            opacity: .5,
            width: 1
        },
        move: {
            enable: !0,
            speed: 3,
            direction: "none",
            random: !1,
            straight: !1,
            out_mode: "out",
            bounce: !1,
            attract: {
                enable: !1,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: !0,
                mode: "grab"
            },
            onclick: {
                enable: !0,
                mode: "push"
            },
            resize: !0
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: .4
            },
            push: {
                particles_nb: 2
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: !0
});
var winnersLoaded = !1,
    depositsLoaded = !1;
$("#menu-toggle").click(function(t) {
    t.preventDefault(), $("#wrapper").toggleClass("toggled"), $("#wrapper").toggleClass("untoggled"), $(".toggler").fadeToggle(500)
});
var mq = window.matchMedia("all and (max-width: 996px)");
mq.matches && $("#menu-toggle").click(), getCookie("theme").length > 0 && ("0" === getCookie("theme") || ($("#toggleTheme > a > i").toggleClass("fa-sun-o"), $("#toggleTheme > a > i").toggleClass("fa-moon-o"), $("html").toggleClass("bro"))), 0 === getCookie("sounds").length ? document.cookie = "sounds=1" : "0" == getCookie("sounds") && ($("#toggleSound > a > i").toggleClass("fa-volume-off"), $("#toggleSound > a > i").toggleClass("fa-volume-up")), $("#toggleSound").click(function() {
    $("#toggleSound > a > i").toggleClass("fa-volume-off"), $("#toggleSound > a > i").toggleClass("fa-volume-up"), document.cookie = getCookie("sounds").length > 0 && "0" === getCookie("sounds") ? "sounds=1" : "sounds=0"
}), $("#toggleTheme").click(function() {
    $("html").toggleClass("bro"), $("#toggleTheme > a > i").toggleClass("fa-sun-o"), $("#toggleTheme > a > i").toggleClass("fa-moon-o"), setTimeout(function() {
        $(".count").animate({
            color: $(".amount").css("color")
        }, 500), $(".total").animate({
            color: $(".amount").css("color")
        }, 500)
    }, 1), document.cookie = getCookie("theme").length > 0 ? "0" === getCookie("theme") ? "theme=1" : "theme=0" : "theme=1"
}), $("#sidebar-wrapper").addClass("animated fadeInLeftBig"), $(".jackpot-container").addClass("animated fadeInDownBig"), $(".history").addClass("animated fadeIn"), setTimeout(function() {
    $(".tab-content").addClass("fill-animation")
}, 1500);
var labelID;
$("label").click(function() {
    labelID = $(this).attr("for"), $("#" + labelID).trigger("click")
}), $("li > a").mouseup(function() {
    $(this).blur()
});
var stop = !1;
$("#chat").hover(function() {
    stop = !0
}, function() {
    stop = !1, $("#chat").animate({
        scrollTop: $("#chat")[0].scrollHeight + 20
    }, 1e3)
});
var dep_counter = 0,
    win_counter = 0;
document.getElementById("cock").volume = .25, document.getElementById("fire").volume = .15, document.getElementById("monsterkill").volume = .25, document.getElementById("biggamehunter").volume = .25, document.getElementById("eradication").volume = .25, document.getElementById("maniac").volume = .25, document.getElementById("pancake").volume = .25, document.getElementById("shaftmaster").volume = .25, document.getElementById("vehicularmanslaughter").volume = .25, document.getElementById("biohazard").volume = .25, document.getElementById("comboking").volume = .25, document.getElementById("roadrage").volume = .25, document.getElementById("blazeofglory").volume = .25, document.getElementById("massacre").volume = .25, document.getElementById("extermination").volume = .25, document.getElementById("headhunter").volume = .25;
var winnerSounds = ["biggamehunter", "eradication", "headhunter", "maniac", "monsterkill", "pancake", "shaftmaster", "vehicularmanslaughter", "biohazard", "comboking", "massacre", "roadrage", "blazeofglory", "extermination"],
    lastWinner = "",
    winnerArray = [],
    currentlySpinning = !1,
    winner_counter = 0,
    winnersLoadedd = !1,
    defaultJackpot = "Small",
    total = 0,
    itemsSelected = [];
$(".current-jackpot").text(defaultJackpot), $(document).on("click", ".inventory .item", function() {
    if ($(this).toggleClass("selected"), $(this).hasClass("selected")) total += parseInt($(this).children(".price").text()), countTotal(total), console.log(total), itemsSelected.push($(this).attr("id")), console.log(itemsSelected);
    else {
        total -= parseInt($(this).children(".price").text()), countTotal(total), console.log(total);
        var t = itemsSelected.indexOf($(this).attr("id"));
        t > -1 && (itemsSelected.splice(t, 1), console.log(itemsSelected))
    }
});
for (var decimal_places = 2, decimal_factor = 0 === decimal_places ? 1 : 10 * decimal_places, itemId = 0, i = 0; 10 > i; i++) depositIntoInventory("http://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5-OOqhNQhmfzvBE7lNSPQ2-AH2DCMN6st2Uei6_rwOPRLqs4fAZ7AuZtFFH8iFW6WCMg79v01ugfVUe8TcpSm93irqOzhZW0W_5Ctaz47Tq0ek", "Name of item could be long", "5.00");
var smallCount = 0,
    regularCount = 0,
    largeCount = 0;
pushNotification("30", "Version 2 of CSGOBIG is coming soon; get ready.");
var socket = io("http://csgobig.com/"),
    jp_filter = "small",
    jp;
socket.on("disconnect", function() {
    winner_counter = 0, winnersLoaded = !1
}), socket.on("updateOnlineUsers", function(t) {
    $("#online > a > span").text(t)
}), socket.emit("jp_deposit"), socket.on("jp_depositResponse", function(t) {
    t.response === !1 ? ($("#tradeUrl").find("a").attr("href", "http://steamcommunity.com/profiles/" + t.steamid + "/tradeoffers/privacy"), $("#tradeUrl").modal("show"), $("#tradeUrl").addClass("show"), $("#tradeUrl").removeClass("fade")) : ($("#tradeUrl").removeClass("show"), $("#tradeUrl").addClass("fade"), $("#tradeUrl").modal("hide"))
}), $(".resetTrade").click(function() {
    resetTrade()
}), $("#tradeUrl").find("#send_tradeurl").click(function() {
    var t = $("#tradeUrl").find("#user_tradeurl").val();
    socket.emit("saveTradeurl", t)
}), socket.on("re-auth", function() {
    window.location.replace("/logout")
}), socket.on("updateProfile", function(t) {
    console.log(t), $("#account-tab").find("#acc_deposits").html(t.depositcount), $("#account-tab").find("#acc_wins").html(t.wins), $("#account-tab").find("#acc_losses").html(t.losses), $("#account-tab").find("#acc_profit").html("$" + t.profit.toFixed(2))
}), $(document).ready(function() {
    socket.emit("getJackpot_filter", "small"), ga("send", "pageview", "#small")
}), socket.on("percentage", function(t) {
    $("#jp_chance_percent").html(parseFloat(t).toFixed(2) + "%")
}), socket.on("getJackpot_res_filter", function(t) {
    if (t.name == jp_filter) {
        jp = t, 0 === jp.total_jackpot && $("#jp_chance_percent").html("0%");
        var e = 0;
        e = null !== jp.item_list[0] ? jp.item_list.length : 0, updateJPDOM(e, jp.item_max, jp.min_bet, jp.max_bet, jp.total_jackpot, jp.item_list, jp.trade_url)
    }
}), socket.on("getJackpot_res", function(t) {
    t.name == jp_filter && (jp = t, updateJPDOM(jp.item_list.length, jp.item_max, jp.min_bet, jp.max_bet, jp.total_jackpot, jp.item_list, jp.trade_url))
}), document.getElementById("large").addEventListener("click", function() {
    $("#splash").addClass("large").removeClass("smaller").removeClass("regular"), jp_filter = "large", $("#jp_chance_percent").html("0%"), socket.emit("getJackpot_filter", "large"), resetTabNotification("large"), ga("send", "pageview", "/#large"), $("#jackpot-items").show(), $("#roulette-cont").hide(), $(".large-tbody").show(), $(".small-tbody, .regular-tbody").hide()
}), document.getElementById("regular").addEventListener("click", function() {
    $("#splash").addClass("regular").removeClass("smaller").removeClass("large"), jp_filter = "regular", $("#jp_chance_percent").html("0%"), socket.emit("getJackpot_filter", "regular"), resetTabNotification("regular"), ga("send", "pageview", "/#regular"), $("#jackpot-items").show(), $("#roulette-cont").hide(), $(".regular-tbody").show(), $(".small-tbody, .large-tbody").hide()
}), document.getElementById("small").addEventListener("click", function() {
    $("#splash").addClass("smaller").removeClass("regular").removeClass("large"), jp_filter = "small", $("#jp_chance_percent").html("0%"), socket.emit("getJackpot_filter", "small"), resetTabNotification("small"), ga("send", "pageview", "/#small"), $("#jackpot-items").show(), $("#roulette-cont").hide(), $(".small-tbody").show(), $(".large-tbody, .regular-tbody").hide()
}), document.getElementById("largeM").addEventListener("click", function() {
    $("#large").click()
}), document.getElementById("regularM").addEventListener("click", function() {
    $("#regular").click()
}), document.getElementById("smallM").addEventListener("click", function() {
    $("#small").click()
}), socket.on("feedDeposit", function(t) {
    addDeposit(t.userinfo.personaname, t.botid, t.traderesponse.total, t.traderesponse.itemlist, t.date)
}), socket.on("feedWinner", function(t) {
    $("#jp_chance_percent").html("0%"), resetTabNotification(t.botid), addWinner(t.winnername, t.botid, "$" + t.total, t.id, t.winnerpercentage.toFixed(2), t.date), jp_filter == t.botid && winner(t)
}), $("#contact").find("#send_contact").click(function() {
    var t = {
        name: $("#contact").find("#contact_name").val(),
        email: $("#contact").find("#contact_email").val(),
        message: $("#contact").find("#contact_message").val()
    };
    socket.emit("sendMail", t), $("#contact").find("#contact_name").val(""), $("#contact").find("#contact_email").val(""), $("#contact").find("#contact_message").val("")
}), socket.on("contactResponse", function(t) {
    $("#contact").find(".row").html("<center><b>" + t + "</b></center>")
}), $(document).on("click", ".name", function(t) {
    t.preventDefault(), t.stopPropagation(), socket.emit("getprofile", $(this).data("steam64"), function(t) {
        $("#profile").find("img").attr("src", t.avatarfull), $("#profile").find(".modal-title").text(t.personaname), $("#profile").find("#mod_personaname").text(t.personaname), $("#profile").find("#mod_steam64").text(t.steamid), $("#profile").find("#mod_deposits").text(t.depositcount), $("#profile").find("#mod_wins").text(t.wins), $("#profile").find("#mod_losses").text(t.losses), $("#profile").find("#mod_profit").text("$" + t.profit.toFixed(2)), $("#profile").modal("show")
    })
}), $("#chattext").keydown(function(t) {
    13 == t.keyCode && $("#submitmsg").click()
}), $("#chattext").keyup(function(t) {
    13 == t.keyCode && $("#chattext").val("")
}), $("#submitmsg").click(function() {
    return console.log("Send Message Event"), ga("send", "event", "Sent Message", "Chat"), socket.emit("chat message", $("#chattext").val()), $("#chattext").val(""), !1
}), socket.on("chat message", function(t) {
    addMessage(t.personaname, t.chatMsg, t.avatarfull, t.timestamp, t.steam64, t.level), updateChatNotification()
});
var num = 0;
$("#account-tab_").click(function() {
    num = 0, $("#chatnotification").html(0)
}),
    function(t, e, n, i, r, o, a) {
        t.GoogleAnalyticsObject = r, t[r] = t[r] || function() {
            (t[r].q = t[r].q || []).push(arguments)
        }, t[r].l = 1 * new Date, o = e.createElement(n), a = e.getElementsByTagName(n)[0], o.async = 1, o.src = i, a.parentNode.insertBefore(o, a)
    }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-64431417-1", "auto"), ga("send", "pageview", "/#small"), document.getElementById("deposit").addEventListener("click", function() {
    ga("send", "event", "Click", "Deposit Button")
})
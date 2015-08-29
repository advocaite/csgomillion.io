//var http = require('http');
var requestify = require('requestify');

function Fetch() {
    if (false === (this instanceof Fetch))
        return new Fetch();
};

Fetch.prototype.go = function(fetch, callback) {

    var request = requestify.request(fetch.host, {
        method : fetch.method,
        params : fetch.params,
        dataType: fetch.dataType
    });

    request.then(function(response) {

        console.log(response.getHeaders());

        if (response.getCode() !== 200)
            callback(null, null);

        if (response.getCode() === 200)
            callback(null, response.getBody());

    });

};

module.exports = Fetch;
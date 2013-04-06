"use strict";

var GeoIP = function() {
    var geoUri = 'http://freegeoip.net/json/';
    var ipQueue = [];
    var ipCache = {};
    var intervalID;
    var callback;

    var init = function() {
        // Don't make too many requests per second to freegeoip by
        // maintaining a simple queue we pop at 1000ms intervals
        intervalID = setInterval(unQueue, 1000);
        return {
            'queue': ipQueue
        }
    };

    var xhrCallback = function(data) {
        // FIXME: error handling
        var data = JSON.parse(this.responseText);
        dispatchGeoEvent(data);
        data.cached = true;
        ipCache[data.ip] = data;        
    };

    var dispatchGeoEvent = function(data) {
        var e = new CustomEvent('geoip');
        e.data = data;
        document.dispatchEvent(e);
    };

    var unQueue = function() {
        var ip, xhr;

        ip = ipQueue.pop();

        if (!ip || ip == '127.0.0.1') {
            return;
        }

        if (ipCache[ip]) {
            // Directly dispatch geo event if we found the ip in the cache
            dispatchGeoEvent(ipCache[ip]);
        }

        xhr = new XMLHttpRequest();
        xhr.onload = xhrCallback;
        xhr.open("get", geoUri + ip, true);
        xhr.send();
    };

    return init();
};
"use strict";

(function() {

    function init() {
        var blockChain, geoIP, ui, globe, values = {}, message, data, globe, container, valueAdjuster;

        // Display a warning and quit if browser doesn't support webgl
        if (System.support.webgl === false) {
            message = document.createElement('div');
            message.className = 'error';
            message.innerHTML = 'Either your graphics card or your browser does not support WebGL :(<br /><a href="http://www.khronos.org/webgl/wiki_1_15/index.php/Getting_a_WebGL_Implementation">View a list</a> of WebGL compatible browsers.';
            document.body.appendChild(message);
            // force background to remove loading image
            document.body.style.background = '#000';
            return;
        }

        valueAdjuster = 500;
        ui = new UI();
        blockChain = new BlockChain();
        geoIP = new GeoIP();
        container = document.getElementById('container');
        globe = new DAT.Globe(container);
        globe.addData([], {format: 'magnitude', name: 'bitcoin', animated: false});
        globe.createPoints();
        globe.animate();

        var animate = function(){
            requestAnimationFrame(animate);
        }

        animate();

        document.addEventListener('geoip', function(e) {
            var pointData;

            if (!e.data['cached']) {
                ui.write(JSON.stringify(e.data), "message", "geo");
            }
            
            pointData = [e.data['latitude'], e.data['longitude'], values[e.data['ip']] / valueAdjuster];
            globe.addData(pointData, {format: 'magnitude', name: 'bitcoin', animated: false});
            globe.createPoints();
        });

        ui.disconnect_button.addEventListener('click', function(e) {
            blockChain.ws.close();
            e.preventDefault();
        });

        blockChain.ws.addEventListener('open', function(e) {
            ui.write("CONNECTED");
            ui.disconnect_button.disabled = false;
        });

        blockChain.ws.addEventListener('close', function(e) {
            ui.disconnect_button.disabled = true;
            ui.write("DISCONNECTED");
        });

        blockChain.ws.addEventListener('message', function(e) {
            var ip;
            var message;
            var data = JSON.parse(e.data);
            var value = 0.00;
            var i;

            if (data['x'] && data['x']['relayed_by'] && data['x']['out']) {
                ip = data['x']['relayed_by'];
                for (i in data['x']['out']) {
                    // value in bitcoins
                    value += data['x']['out'][i]['value'] / 100000000;
                }

                if (ip && value) {
                    if (!values[ip]) {
                        values[ip] = 0;
                    }
                    values[ip] += value;
                    geoIP.queue.push(ip);
                }
            }
            var message = JSON.stringify(data, null, " ");
            ui.write(message, "message");
        });

        blockChain.ws.addEventListener('sentmessage', function(e) {
            var message = JSON.parse(e.data);
            message = JSON.stringify(message, null, " ");
            ui.write(message, "sentmessage");
        });

        blockChain.ws.addEventListener('error', function(e) {
            ui.write(e.data, "error");
        });

        blockChain.ws.addEventListener('open', function(e) {
            blockChain.start();
        });

        // debugging
        window.getValues = function() {
            return values;
        }
    };

    window.addEventListener("load", init, false);
})();
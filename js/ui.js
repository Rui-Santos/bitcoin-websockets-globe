"use strict";

var UI = (function() {
    var disconnect_button;
    var ws_output;
    var geo_output;
    var panel;

    var init = function(b, g) {
        ws_output = document.getElementById('ws_output');
        geo_output = document.getElementById('geo_output');
        panel = document.getElementById('panel');
        disconnect_button = document.getElementById('disconnect');

        geo_output.dataset.count = 0;
        ws_output.dataset.count = 0;

        panel.addEventListener('mouseover', function() {
            panel.classList.add('visible');
        });

        panel.addEventListener('mouseout', function() {
            panel.classList.remove('visible');
        });

        return {
            'disconnect_button': disconnect_button,
            'write': write
        };
    };

    var write = function(message, style, type) {
        var append = function(src, elm) {
            // remove old messages when there are too many present - avoid 
            // consuming too much memory...
            if (++src.dataset.count > 20) {
                src.removeChild(src.children[0]);
                src.dataset.count--;
            }
            src.appendChild(elm);
        }

        var p = document.createElement("p");
        if (style) {
            p.className = style;
        }
        p.textContent = message;
        if (type == 'geo') {
            append(geo_output, p);
        } else {
            append(ws_output, p);
        }
    };

    return init();
});
"use strict";

var UI = (function() {
    var disconnect_button, toggleui_link, ws_output, geo_output, panel;

    var init = function(b, g) {
        ws_output = document.getElementById('ws_output');
        geo_output = document.getElementById('geo_output');
        panel = document.getElementById('panel');
        disconnect_button = document.getElementById('disconnect');
        toggleui_link = document.querySelector('#toggleui a');

        geo_output.dataset.count = 0;
        ws_output.dataset.count = 0;

        panel.addEventListener('mouseover', function() {
            panel.classList.add('visible');
        });

        panel.addEventListener('mouseout', function() {
            panel.classList.remove('visible');
        });

        toggleui_link.addEventListener('click', function(e) {
            var elms = [].slice.call(document.querySelectorAll('.ui'), 0);
            elms.forEach(function(item) {
                item.classList.toggle('hidden');
            });
            e.preventDefault();
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
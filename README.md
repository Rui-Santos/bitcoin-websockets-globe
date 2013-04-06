Bitcoin WebSockets Globe Visualizer
===================================

Description
-----------

Bitcoin WebSockets Globe Visualizer is a simple visualization tool that displays
bitcoin transactions in realtime on a world globe. It's built using modern web
technologies (WebGL, WebSockets, etc) and thefore will only work with a recent
browser.

Demo : http://diox.github.io/bitcoin-websockets-globe/ (Leave it open a few 
minutes to enjoy the full effect)

Data and libraries used
-----------------------

- [WebGL Globe][WebGL Globe] was made by the Google Data Arts Team
- Transaction data is courtesy of [blockchain.info WebSocket API][blockchain.info WebSocket API]
- Geolocation of IP addresses is provided by [freegeoip.net API][freegeoip.net API]

[WebGL Globe]: https://code.google.com/p/webgl-globe/
[blockchain.info WebSocket API]: http://blockchain.info/api/api_websocket
[freegeoip.net API]: http://freegeoip.net/

Inspiration and usefulness
--------------------------

Before you ask, yes, I fully realize the IPs you get in blockchain.info's API 
are IPs of relaying nodes and nothing more. And yes, that makes the whole thing
completely pointless.

I originally built it to experiment with WebSockets and because I thought WebGL
Globe was a cool visualization tool. It just so happens that many websites in 
the bitcoin community provide a WebSocket API, so I thought it would be 
interesting to combine those.

If you are looking for more interesting uses of WebGL Globe, I suggest you check
out [The Chrome Experiments page][The WebGL Globe]. If you are looking for more
interesting uses of bitcoin transactions data, I suggest you check out 
[Listen To Bitcoin][Listen To Bitcoin].

[The WebGL Globe]: http://www.chromeexperiments.com/globe
[Listen To Bitcoin]: http://www.listentobitcoin.com/
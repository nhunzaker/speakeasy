var speak = require("./index.js");


setInterval(function() {
    var a = speak.sentiment.analyze("I hate youre guts wooo!");
}, 1000);
var fs = require('fs');

// -------------------------------------------------- //
// -------------------------------------------------- //

var neg = require("./negative-words.js"),
    pos = require("./positive-words.js");

// -------------------------------------------------- //
// -------------------------------------------------- //


// Calculates the negative sentiment of a sentence
// -------------------------------------------------- //

function negativity (phrase) {
    
    // Cache it
    var tokens = phrase.toLowerCase().split(" "),
        hits   = 0,
        words  = [];

    tokens.forEach(function(t) {
        if (neg.indexOf(t) > -1) {
            hits++;
            words.push(t);
        }
    });

    return { 
        score       : hits,
        comparative : hits / tokens.length,
        words       : words
    };

};


// Calculates the positive sentiment  of a sentence
// -------------------------------------------------- //

function positivity (phrase) {

    // Cache it
    var tokens = phrase.toLowerCase().split(" "),
        hits   = 0,
        words  = [];

    tokens.forEach(function(t) {
        if (pos.indexOf(t) > -1) {
            hits++;
            words.push(t);
        }
    });

    return { 
        score : hits,
        comparative : hits / tokens.length,
        words : words
    };

};


// Calculates overall sentiment
// -------------------------------------------------- //

function analyze (phrase) {

    var pos = positivity(phrase),
        neg = negativity(phrase);

    return {
        score       : pos.score - neg.score,
        comparative : pos.comparative - neg.comparative,
        positive    : pos,
        negative    : neg
    };
}


module.exports = {
    analyze    : analyze,
    negativity : negativity,
    positivity : positivity
};
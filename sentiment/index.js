var _  = require("underscore"),
    fs = require('fs');

// Calculates the negative sentiment of a sentence
// -------------------------------------------------- //

function negativity (phrase) {

    var tokens = phrase.toLowerCase().split(" "),
        neg  = fs.readFileSync(__dirname + "/negative-words.txt", "UTF-8").split("\n"),
        hits = _.intersection(neg, tokens);
    
    return { 
        score : hits.length / tokens.length,
        words : hits
    };

};


// Calculates the positive sentiment  of a sentence
// -------------------------------------------------- //

function positivity (phrase) {

    var tokens = phrase.toLowerCase().split(" "),
        pos  = fs.readFileSync(__dirname + "/positive-words.txt", "UTF-8").split("\n"),
        hits = _.intersection(pos, tokens);
    
    return { 
        score : hits.length / tokens.length,      
        words : hits
    };

};


// Calculates overall sentiment
// -------------------------------------------------- //

function analyze (phrase) {

    var pos = positivity(phrase),
        neg = negativity(phrase);

    return {

        score     : pos.score - neg.score,

        positive  : {
            score : pos.score,
            words : pos.words
        },

        negative  : {
            score : neg.score,
            words : neg.words
        }
    };
}


module.exports = {
    analyze    : analyze,
    negativity : negativity,
    positivity : positivity
};
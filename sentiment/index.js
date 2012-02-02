var _  = require("underscore"),
    fs = require('fs');

// Calculates the negative sentiment of a sentence
// -------------------------------------------------- //

function negativity (phrase) {
    
    // Cache it
    this.neg = this.neg || fs.readFileSync(__dirname + "/negative-words.txt", "UTF-8").split("\n");

    var tokens = phrase.toLowerCase().split(" "),
        hits = _.intersection(this.neg, tokens);
    
    return { 
        score : hits.length / tokens.length,
        words : hits
    };

};


// Calculates the positive sentiment  of a sentence
// -------------------------------------------------- //

function positivity (phrase) {

    // Cache it
    this.pos = this.pos || fs.readFileSync(__dirname + "/positive-words.txt", "UTF-8").split("\n");

    var tokens = phrase.toLowerCase().split(" "),
        hits = _.intersection(this.pos, tokens);
    
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
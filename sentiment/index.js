var _ = require("underscore"),
    fs = require('fs');


// Calculates the negative sentiment of a sentence
// -------------------------------------------------- //

function negativity (phrase) {

    var neg  = fs.readFileSync("./negative-words.txt", "UTF-8").split("\n"),
        hits = _.intersection(neg, phrase.toLowerCase().split(" "));
    
    return { 
        score : hits.length,
        words : hits
    };

};


// Calculates the positive sentiment  of a sentence
// -------------------------------------------------- //

function positivity (phrase) {

    var pos  = fs.readFileSync("./positive-words.txt", "UTF-8").split("\n"),
        hits = _.intersection(pos, phrase.toLowerCase().split(" "));
    
    return { 
        score : hits.length,
        words : hits
    };

};


// Calculates overall sentiment
// -------------------------------------------------- //

function sentiment (phrase) {
    return positivity(phrase).score - negativity(phrase).score;
}


// Tests
// -------------------------------------------------- //

var statement = process.argv.slice(2).join(" ");
var a = sentiment(statement);

console.log("Score:", a);
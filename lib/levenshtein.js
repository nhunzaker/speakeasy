// Closest
//
// Finds the closest match between a statement
// and a body of words using Levenshtein
// Distance

var lev    = require("levenshtein");

module.exports = function(string, words) {

    var shortest = words.toString().length
    ,   bestFit  = "";

    if (typeof words === 'string') {
        words = lexer.lex(words);
    }

    words.forEach(function(word) {

        var distance = lev(string, word);

        if (distance < shortest) {
            bestFit  = word;
            shortest = distance;
        }

    });

    return bestFit;
}

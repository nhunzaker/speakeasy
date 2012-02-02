var sentiment = require("../index.js").sentiment,
    vows      = require('vows'),
    assert    = require('assert');


// -------------------------------------------------- //


vows.describe("Sentiment").addBatch({

    'It should calculate negativity' : {
        
        topic: sentiment.negativity("I hate your guts"),

        "there should be one negative word, 'hate'": function(neg) {
            assert.equal(neg.words.length, 1);
        },
        
        "the negativity should be roughly 25%": function(neg) {
            assert.equal(~~(neg.score * 100), 25);
        }

    },

    'It should calculate positivity' : {
        
        topic: sentiment.positivity("I love you"),

        "there should be one positive word, 'love'": function(pos) {
            assert.equal(pos.words.length, 1);
        },
        
        "the negativity should be roughly 33%": function(pos) {
            assert.equal(~~(pos.score * 100), 33);
        }

    },

    'It should calculate sentiment' : {
        
        topic: sentiment.analyze("I love you, but you smell something aweful"),

        "there should be one positive word, 'love'": function(sent) {
            assert.equal(sent.positive.words.length, 1);
        },

        "there should be two negative words, 'love, and aweful'": function(sent) {
            assert.equal(sent.negative.words.length, 2);
        },

        "the positivity score should be roughly 12%": function(sent) {
            assert.equal(~~(sent.positive.score * 100), 12);
        },

        "the negativity score should be roughly 25%": function(sent) {
            assert.equal(~~(sent.negative.score * 100), 25);
        },

        "the score should be roughly -12%": function(sent) {
            assert.equal(~~(sent.score * 100), -12);
        }

    }

}).export(module);
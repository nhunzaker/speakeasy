var sentiment = require("../sentiment"),
    vows      = require('vows'),
    assert    = require('assert');


// -------------------------------------------------- //


vows.describe("Sentiment").addBatch({

    'It should calculate negativity' : {
        
        topic: sentiment.negativity("I hate you"),

        "there should be one negative word, 'hate'": function(neg) {
            assert.equal(neg.words.length, 1);
        },
        
        "the negativity should be roughly 33%": function(neg) {
            assert.equal(~~(neg.score * 100), 33);
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
        
        topic: sentiment.sentiment("I love you, but smell something aweful"),

        "there should be one positive word, 'love'": function(sent) {
            assert.equal(sent.positive.words.length, 1);
        },

        "there should be two negative words, 'love, and aweful'": function(sent) {
            assert.equal(sent.negative.words.length, 2);
        },
        
        "the score should be roughly -14%": function(sent) {
            assert.equal(~~(sent.score * 100), -14);
        }

    }

}).export(module);
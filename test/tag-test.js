var tagger = require("../index").classify,
    vows = require('vows'),
    assert = require('assert');


// -------------------------------------------------- //


vows.describe("Tagger Helper Functions").addBatch({

    'It should calculate the best fit for a word within a group' : {
        
        topic: tagger.closest("valid", ["who", "what", "when", "validate"]),

        "the best fit should be 'validate'": function(closest) {
            assert.equal(closest, "validate");
        }

    },

    'It should determine if a word is a file' : {
        
        topic: tagger.isFile("/public/application.js"),

        "it should be a file": function(isFile) {
            assert.equal(isFile, true);
        }

    },

    'It should be able to tag a word' : {
        
        topic: tagger.getType("kittens"),

        "it should be within the noun tag namespace": function(word) {
            assert.equal(word.slice(0,2), "NN");
        }

    },

    'It should be able to sift between words of particular types' : {
        
        topic: tagger.getBetween(["I", "like", "to", "eat", "cheese"], "VB", "NN").join(" "),

        "it should find 'cheese'": function(between) {
            assert.equal(between, "cheese");
        }

    }

}).export(module);
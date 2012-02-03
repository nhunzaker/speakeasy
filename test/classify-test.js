var closest = require("../index").closest,
    vows    = require('vows'),
    assert  = require('assert');


// -------------------------------------------------- //


vows.describe("Classifier Functions").addBatch({

    'It should calculate the best fit for a word within a group' : {
        
        topic: closest("valid", ["who", "what", "when", "validate"]),

        "the best fit should be 'validate'": function(closest) {
            assert.equal(closest, "validate");
        }

    }

}).export(module);
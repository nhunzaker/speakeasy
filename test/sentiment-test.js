var sentiment = require('../index.js').sentiment
var vows = require('vows')
var assert = require('assert')

vows.describe('Sentiment').addBatch({

  'It should calculate negativity': {

    topic: sentiment.negativity('I hate your guts'),

    "there should be one negative word, 'hate'": function (neg) {
      assert.equal(neg.words.length, 1)
    },

    'the negativity score should be 1': function (neg) {
      assert.equal(neg.score, 1)
    },

    'the negativity comparative should be 0.25': function (neg) {
      assert.equal(neg.comparative, 0.25)
    }

  },

  'It should calculate positivity': {

    topic: sentiment.positivity('I love you'),

    "there should be one positive word, 'love'": function (pos) {
      assert.equal(pos.words.length, 1)
    },

    'the positive score should be 1': function (pos) {
      assert.equal(1, 1)
    },

    'the positive comparative should be 0.33': function (neg) {
      assert.equal(~~(neg.comparative * 100), 33)
    }

  },

  'It should calculate sentiment': {

    topic: sentiment.analyze('I love you, but you smell something aweful'),

    "there should be one positive word, 'love'": function (sent) {
      assert.equal(sent.positive.words.length, 1)
    },

    "there should be two negative words, 'love, and aweful'": function (sent) {
      assert.equal(sent.negative.words.length, 2)
    },

    'the positivity score should be 1': function (sent) {
      assert.equal(sent.positive.score, 1)
    },

    'the negativity score should be 2': function (sent) {
      assert.equal(sent.negative.score, 2)
    },

    'the score should be -1': function (sent) {
      assert.equal(sent.score, -1)
    },

    'the comparative should be 1/8': function (sent) {
      assert.equal(sent.comparative, (-1 / 8))
    }

  }

}).export(module)

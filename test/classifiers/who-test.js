var tagger = require('../../index')
var vows = require('vows')
var assert = require('assert')

vows.describe('Who').addBatch({

  'When asked, "Who is the king of France?"': {

    topic: tagger.classify('Who is the king of France?'),

    'it should correctly identify the action': function (topic) {
      assert.equal(topic.action, 'who')
    },

    'it should correctly determine ownership': function (topic) {
      assert.equal(topic.owner, 'France')
    },

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'king')
    }

  },

  'When asked, "Who am I?"': {

    topic: tagger.classify('Who am I?'),

    'the action should be "who"': function (topic) {
      assert.equal(topic.action, 'who')
    },

    'the ownership should belong to "speaker"': function (topic) {
      assert.equal(topic.owner, 'speaker')
    },

    'the subject should be the speaker': function (topic) {
      assert.equal(topic.subject, 'I')
    }

  }

}).export(module)

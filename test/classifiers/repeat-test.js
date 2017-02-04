var tagger = require('../../index')
var vows = require('vows')
var assert = require('assert')

vows.describe('Repeat').addBatch({

  'When asked, "Repeat that last statement"': {

    topic: tagger.classify('Repeat that last statement'),

    'the action should be "repeat"': function (topic) {
      assert.equal(topic.action, 'repeat')
    },

    'there should be no object': function (topic) {
      assert.equal(topic.owner, undefined)
    },

    'the subject should be last statement': function (topic) {
      assert.equal(topic.subject, 'last statement')
    }

  }

}).export(module)

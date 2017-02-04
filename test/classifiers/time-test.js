var tagger = require('../../index')
var vows = require('vows')
var assert = require('assert')

vows.describe('Classifier Functions').addBatch({

  'When asked, "What time is it?"': {

    topic: tagger.classify('What time is it?'),

    'it should correctly determine the owner': function (topic) {
      assert.equal(topic.owner, 'it')
    },

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'time')
    }

  }

}).export(module)

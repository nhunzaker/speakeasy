var tagger = require('../../index')
var vows = require('vows')
var assert = require('assert')

vows.describe('Dog vs I').addBatch({

  'When asked, "I am a dog"': {

    topic: tagger.classify('I am a dog'),

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'I')
    }

  }

}).export(module)

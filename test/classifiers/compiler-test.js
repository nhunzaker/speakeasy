var tagger = require('../../index')
var vows = require('vows')
var assert = require('assert')

vows.describe('Text Formatting').addBatch({

  'When asked "Compile all javascript as application.min.js': {

    topic: tagger.classify('Compile all javascript as application.min.js'),

    'The action should be compile': function (topic) {
      assert.equal(topic.action, 'compile')
    },

    'The subject should be javascript': function (topic) {
      assert.equal(topic.subject, 'javascript')
    },

    'The owner should be application.min.js': function (topic) {
      assert.equal(topic.owner, 'application.min.js')
    }

  },

  'When asked "Compile all javascript in ./directory': {

    topic: tagger.classify('Compile all javascript in ./directory'),

    'The action should be compile': function (topic) {
      assert.equal(topic.action, 'compile')
    },

    'The subject should be javascript': function (topic) {
      assert.equal(topic.subject, 'javascript')
    },

    'The owner should be ./directory': function (topic) {
      assert.equal(topic.owner, './directory')
    }

  },

  'When asked "Compile all javascript in ./': {

    topic: tagger.classify('Compile all javascript in ./'),

    'The action should be compile': function (topic) {
      assert.equal(topic.action, 'compile')
    },

    'The subject should be javascript': function (topic) {
      assert.equal(topic.subject, 'javascript')
    },

    'The owner should be ./directory': function (topic) {
      assert.equal(topic.owner, './')
    }

  }

}).export(module)

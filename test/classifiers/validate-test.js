var tagger = require('../../index')
var vows = require('vows')
var assert = require('assert')

vows.describe('Validate').addBatch({

  'When asked, "Validate application.js"': {

    topic: tagger.classify('validate application.js'),

    'the subject should be "application.js"': function (topic) {
      assert.equal(topic.subject, 'application.js')
    },

    'the action should be "validate"': function (topic) {
      assert.equal(topic.action, 'validate')
    }

  },

  'When asked, "Is application.js valid?"': {

    topic: tagger.classify('Is application.js valid?'),

    'the subject should be "application.js"': function (topic) {
      assert.equal(topic.subject, 'application.js')
    },

    'the action should be "valid"': function (topic) {
      assert.equal(topic.action, 'valid')
    }

  },

  'When asked, "Is there anything wrong with application.js?"': {

    topic: tagger.classify('Is there anything wrong with application.js?'),

    'the action should be "wrong"': function (topic) {
      assert.equal(topic.action, 'wrong')
    },

    'the subject should be "application.js"': function (topic) {
      assert.equal(topic.subject, 'application.js')
    }

  },
  'When asked, "Is there anything wrong with http://www.google.com?"': {

    topic: tagger.classify('Is there anything wrong with  http://www.google.com?'),

    'the action should be "wrong"': function (topic) {
      assert.equal(topic.action, 'wrong')
    },

    'the subject should be " http://www.google.com"': function (topic) {
      assert.equal(topic.subject, 'http://www.google.com')
    }

  },

  'When asked, "Validate http://www.google.com"': {

    topic: tagger.classify('Validate http://www.google.com'),

    'the action should be "validate"': function (topic) {
      assert.equal(topic.action, 'validate')
    },

    'the subject should be " http://www.google.com"': function (topic) {
      assert.equal(topic.subject, 'http://www.google.com')
    }

  },

  'When asked, "Is there anything wrong with http://localhost:4000?"': {

    topic: tagger.classify('Is there anything wrong with http://localhost.dev:4000?'),

    'the action should be "wrong"': function (topic) {
      assert.equal(topic.action, 'wrong')
    },

    'the subject should be "http://localhost.dev:4000?': function (topic) {
      assert.equal(topic.subject, 'http://localhost.dev:4000')
    }

  },

  'When asked, "Validate http://localhost.dev:4000?"': {

    topic: tagger.classify('Validate http://localhost.dev:4000?'),

    'the action should be "validate"': function (topic) {
      assert.equal(topic.action, 'validate')
    },

    'the subject should be "http://localhost.dev:4000?"': function (topic) {
      assert.equal(topic.subject, 'http://localhost.dev:4000')
    }

  }

}).export(module)

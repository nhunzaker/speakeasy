var tagger = require('../../index')
var vows = require('vows')
var assert = require('assert')

vows.describe('How').addBatch({

  'When asked, "How much memory do I have?"': {

    topic: tagger.classify('How much memory do I have?'),

    'the action should be "how"': function (topic) {
      assert.equal(topic.action, 'how')
    },

    'the owner should be the speaker': function (topic) {
      assert.equal(topic.owner, 'speaker')
    },

    'the subject should be memory': function (topic) {
      assert.equal(topic.subject, 'memory')
    }

  },

  'When asked, "How many processors do I have?"': {

    topic: tagger.classify('How many processors do I have?'),

    'the action should be "how"': function (topic) {
      assert.equal(topic.action, 'how')
    },

    'the owner should be the speaker': function (topic) {
      assert.equal(topic.owner, 'speaker')
    },

    'the subject should be "processors"': function (topic) {
      assert.equal(topic.subject, 'processors')
    }

  },

  'When asked, "How do you fly?"': {

    topic: tagger.classify('How do you fly?'),

    'the action should be "how"': function (topic) {
      assert.equal(topic.action, 'how')
    },

    'the owner should be "you"': function (topic) {
      assert.equal(topic.owner, 'listener')
    },

    'the subject should be fly': function (topic) {
      assert.equal(topic.subject, 'fly')
    }

  },

  'When asked, "Do you know how to fly?"': {

    topic: tagger.classify('Do you know how to fly?'),

    'the action should be "how"': function (topic) {
      assert.equal(topic.action, 'how')
    },

    'the owner should be the listener': function (topic) {
      assert.equal(topic.owner, 'listener')
    },

    'the subject should be fly': function (topic) {
      assert.equal(topic.subject, 'fly')
    }

  }

}).export(module)

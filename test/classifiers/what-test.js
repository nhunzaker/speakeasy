var tagger = require('../../index')
var vows = require('vows')
var assert = require('assert')

vows.describe('What').addBatch({

  'When asked, "What is nodebot.js?"': {

    topic: tagger.classify('What is nodebot.js?'),

    'it should correctly determine the owner': function (topic) {
      assert.equal(topic.owner, undefined)
    },

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'nodebot.js')
    }

  },

  'When asked, "What is your name?"': {

    topic: tagger.classify('What is your name?'),

    'it should correctly determine the owner': function (topic) {
      assert.equal(topic.owner, 'listener')
    },

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'name')
    }

  },

  'When asked, "What is the regular expression for email"': {

    topic: tagger.classify('What is the regular expression for email?'),

    'it should correctly determine the owner': function (topic) {
      assert.equal(topic.owner, 'email')
    },
    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'regular expression')
    },
    'it should correctly determine the action': function (topic) {
      assert.equal(topic.action, 'what')
    }

  },

  'When asked, "What is the current directory?"': {

    topic: tagger.classify('What is the current directory?'),

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'current directory')
    }

  },

  'When asked, "What is my ip address?"': {

    topic: tagger.classify('What is my ip address?'),

    'it should correctly identify the action': function (topic) {
      assert.equal(topic.action, 'what')
    },

    'it should correctly determine ownership': function (topic) {
      assert.equal(topic.owner, 'speaker')
    },

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'ip address')
    }

  },

  'When asked, "Do you know what my ip address is?"': {

    topic: tagger.classify('Do you know what my ip address is?'),

    'it should correctly identify the action': function (topic) {
      assert.equal(topic.action, 'what')
    },

    'it should correctly determine ownership': function (topic) {
      assert.equal(topic.owner, 'speaker')
    },

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'ip address')
    }

  },

  'When asked, "What is an ip address?"': {

    topic: tagger.classify('What is an ip address?'),

    'it should correctly identify the action': function (topic) {
      assert.equal(topic.action, 'what')
    },

    'it should correctly determine ownership': function (topic) {
      assert.equal(topic.owner, 'ip address')
    },

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'ip address')
    }

  },

  'When asked, "What is funnel cake?"': {

    topic: tagger.classify('What is funnel cake?'),

    'it should correctly identify the action': function (topic) {
      assert.equal(topic.action, 'what')
    },

    'it should correctly determine ownership': function (topic) {
      assert.equal(topic.owner, 'funnel cake')
    },

    'it should correctly determine the subject': function (topic) {
      assert.equal(topic.subject, 'funnel cake')
    }

  },

  'When asked, "Do you know what the current directory is?"': {

    topic: tagger.classify('Do you know what the current directory is?'),

    'the action should be "what"': function (topic) {
      assert.equal(topic.action, 'what')
    },

    'the owner should be "current directory"': function (topic) {
      assert.equal(topic.owner, 'current directory')
    },

    'the subject should be "current directory"': function (topic) {
      assert.equal(topic.subject, 'current directory')
    }

  },

  'When asked, "What is it?"': {

    topic: tagger.classify('What is it?'),

    'the action should be "what"': function (topic) {
      assert.equal(topic.action, 'what')
    },

    'the subject should be the it': function (topic) {
      assert.equal(topic.subject, 'it')
    }

  }

}).export(module)

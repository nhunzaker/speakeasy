var negativeWords = require('./negative-words.js')
var positiveWords = require('./positive-words.js')

// Calculates the negative sentiment of a sentence
// -------------------------------------------------- //

function negativity (phrase) {
  // Cache it
  var tokens = phrase.toLowerCase().split(' ')
  var hits = 0
  var words = []

  tokens.forEach(function (t) {
    if (negativeWords.indexOf(t) > -1) {
      hits++
      words.push(t)
    }
  })

  return {
    score: hits,
    comparative: hits / tokens.length,
    words: words
  }
};

// Calculates the positive sentiment  of a sentence
// -------------------------------------------------- //

function positivity (phrase) {
  // Cache it
  var tokens = phrase.toLowerCase().split(' ')
  var hits = 0
  var words = []

  tokens.forEach(function (t) {
    if (positiveWords.indexOf(t) > -1) {
      hits++
      words.push(t)
    }
  })

  return {
    score: hits,
    comparative: hits / tokens.length,
    words: words
  }
};

// Calculates overall sentiment
// -------------------------------------------------- //

function analyze (phrase) {
  var pos = positivity(phrase)
  var neg = negativity(phrase)

  return {
    score: pos.score - neg.score,
    comparative: pos.comparative - neg.comparative,
    positive: pos,
    negative: neg
  }
}

module.exports = {
  analyze: analyze,
  negativity: negativity,
  positivity: positivity
}

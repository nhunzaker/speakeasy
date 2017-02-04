/**
 *
 * Breaks up speech into components and assists with classifying things such
 * as the subject, ownership, and action for a statement.
 *
 * I am not a linguist, this is the result of writing whatever logic it takes
 * to get the tests to work.
 *
 * Please help me make this better:
 * https://github.com/nhunzaker/speakeasy
 */

var pos = require('./pos')
var lexer = new pos.Lexer()
var tagger = new pos.Tagger()
var dirEx = /((\.|)\/(.+|))+$/ig

// Returns the part of speech for a particular word
function getType (string) {
  if (string) {
    return tagger.tag(lexer.lex(string))[0][1]
  } else {
    return undefined
  }
};

// Strips all words of specific type(s) from an array of words
function stripTypes (words, types) {
  types = (typeof types === 'string') ? [types] : types

  words = words.filter(function (w) {
    return types.indexOf(getType(w)) < 0
  })

  return words
}

// Finds all words between the last of the first and last
// of two types
function getBetween (lex, type1, type2, form) {
  var tagged = tagger.tag(lex)
  var filter1 = []
  var filter2 = []
  var start = []
  var end = []

  form = form || 'outside'

  type1 = (typeof type1 === 'string') ? [type1] : type1
  type2 = (typeof type2 === 'string') ? [type2] : type2

  filter1 = tagged.filter(function (i) { return type1.indexOf(i[1]) !== -1 }) || []
  filter2 = tagged.filter(function (i) { return type2.indexOf(i[1]) !== -1 }) || []

  if (form === 'outside') {
    start = (filter1[0]) ? filter1[0][0] : undefined
  } else {
    start = (filter1.slice(-1)[0]) ? filter1.slice(-1)[0][0] : undefined
  }

  end = (filter2.slice(-1)[0]) ? filter2.slice(-1)[0][0] : undefined

  return (start || end) ? lex.slice(lex.indexOf(start) + 1, lex.indexOf(end) + 1) : []
};

// Classifies all words in an array
function getTypes (array, string, strict) {
  // Is the array lexical?
  if (typeof array[0] !== 'object') {
    array = tagger.tag(array)
  }

  var type = array.filter(function (word) {
    if (strict) {
      return (word[1] === string)
    } else {
      return (word[1].slice(0, string.length) === string)
    }
  }).map(function (w) { return w[0] })

  return type
};

module.exports = function classify (speech, debug) {
  var text = speech || process.argv.slice(2).join(' ')
  var words = lexer.lex(text)
  var tagged = []
  var action = null
  var subject = null
  var owner = null

  // PREPROCESSING
  // -------------------------------------------------- //

  // Auto correct for missing punctuation
  if (getType(words.slice(-1)[0]) !== '.') {
    words.push('.')
  }

  // Classify!
  // -------------------------------------------------- //

  tagged = tagger.tag(words)

  if (debug) console.log(words)
  if (debug) console.log(tagged)

  var verbs = getTypes(tagged, 'VB')
  var nouns = getTypes(tagged, 'NN')
  var pronouns = getTypes(tagged, 'PRP') // finds all posessive pronouns
  var actions = getTypes(tagged, 'W')
  var adjectives = getTypes(tagged, 'JJ')
  var preps = getTypes(tagged, 'IN')
  var determiners = getTypes(tagged, 'DT')
  var to = getTypes(tagged, 'TO')

  // ACTION
  // Answers : "What should the nodebot do after given a
  // command"
  // -------------------------------------------------- //

  // Are there known action words present?
  if (actions.length > 0) {
    action = actions[0]
    // Are there base verbs present? Then it's probably
    // the first verb
  } else if (getTypes(tagged, 'VB', true).length > 0) {
    action = getTypes(tagged, 'VB', true)[0]
    // If there are nouns and prepositions then the action
    // is the first noun
    // ex: Repeat that last action
  } else if (nouns.length > 0 && preps.length > 0) {
    action = nouns[0]
    // Are there at least any adjectives that might work?
  } else if (adjectives.length > 0) {
    action = adjectives[0]
  }

  // Lowercase the action if we find one
  action = (action) ? action.toLowerCase() : action

  // OWNERSHIP
  // Answers : "Who is associated with the target of the
  // action?"
  // -------------------------------------------------- //

  // If there is posessive pronouns and we have an action, then
  // the owner is the last posessive word
  if (pronouns.length > 0 && action) {
    // The answer must begin where the action starts
    // ex: "Do you know [What time it is?]
    var answer = words.slice(words.indexOf(action))
    var lastPro = pronouns.slice(-1)[0]
    if (answer.indexOf(lastPro) > 0 || getTypes(answer, 'VB').length === 0) {
      owner = lastPro
    } else {
      owner = getBetween(answer, ['DT', 'TO'], '.')
      owner = stripTypes(owner, ['.', 'VB', 'VBZ']).join(' ')
    }
    // No ? Let's try between a preposition and
    // determiners/nouns
    // Example: "Compile all javascript as application.js"
  } else if (determiners.length > 0 && preps.length > 0) {
    var prepIndex = words.indexOf(preps[0])

    owner = words.slice(prepIndex + 1, -1).join(' ')
    // Hmm, now let's try between the action and the word "to"
  } else if (to.length > 0) {
    owner = getBetween(words, 'VB', 'TO').slice(0, -1).join(' ')
    // At this point, we can really only guess that
    // the owner is between the verb and the end of the
    // statement
  } else if (verbs.length > 0) {
    var self = nouns.filter(function (word) {
      return word.match(/^i$/i)
    })

    if (self.length) {
      owner = self.slice(0)
    } else {
      owner = getBetween(words, ['VBZ', 'VBP'], ['.']).slice(0, -1)
    }

    // Do we have the word "I" in here?
    if (owner.indexOf('I') === 0) {
      owner = owner.slice(0, 1)
    }

    // Strip accidental determinates and punctuation
    owner = stripTypes(owner, ['DT', '.']).join(' ')
  }

  // SUBJECT
  // Answers : "What is this statement about?"
  // -------------------------------------------------- //
  if (getType(words[0]) === 'VBZ' && words.indexOf(action) === words.length - 2) {
    subject = words.slice(1, -2).join(' ').trim()
  } else if (determiners.length === 0 && preps.length === 0 && getType(action) === 'VB') {
    subject = words.slice(1, -1).join(' ')
    // If ownership and there are prepositions, scan for words bteween
    // determinates and posessive words, and prepositions
  } else if (preps.length > 0) {
    if (preps.length > 1 || determiners.length > 0) {
      subject = getBetween(words, ['DT', 'PRP$'], ['IN'])
    } else {
      subject = getBetween(words, ['IN'], ['.'])
    }

    // Strip punctuaction, prepositions, and owners
    subject = stripTypes(subject, ['.', 'IN']).join(' ')

    // Is the owner "I" and the verb after the owner is present tense?
    // Helps with "How much memory do I have?"
  } else if (owner === 'I' && getType(words[words.indexOf(owner) + 1]) === 'VBP') {
    answer = words.slice(0, words.indexOf(owner))

    subject = getBetween(answer, ['JJ'], ['VBP']).slice(0, -1).join(' ')

    // If there *is* ownership, and there are no prepositions
    // then the subject is inside the owner/determinate/verb and the last noun
    // (*phew...*)
  } else if (owner && preps.length === 0) {
    subject = getBetween(words, ['TO', 'DT', 'VBP', 'PRP$'], ['NN', 'RB', 'CD'], 'inside')

    subject = subject.filter(function (s) {
      s = s.toLowerCase()
      return s !== action && getType(s) !== 'VBZ' && s !== owner
    })

    subject = subject.join(' ')
  }

  // POST PROCESSING
  // -------------------------------------------------- //

  // Now let's account for things like keys
  subject = subject ? subject.split('- ').join('-') : undefined
  owner = owner ? owner.split('- ').join('-') : undefined

  // Clean directory subjects/owners
  subject = (subject && subject.replace(/\s/ig, '').match(dirEx)) ? subject.replace(/\s/ig, '') : subject
  owner = (owner && owner.replace(/\s/ig, '').match(dirEx)) ? owner.replace(/\s/ig, '') : owner

  // If we somehow got an owner and not a subject,
  // swap them
  if (owner && !subject) {
    subject = owner
    owner = undefined
  }

  // Now that everything is properly classified,
  // let's filter the ownership
  switch (owner) {

      // Reverse user possession
    case 'me': case 'my': case 'i': case 'I':
      owner = 'speaker'
      break

      // Reverse nodebot possession
    case 'your': case 'you':
      owner = 'listener'
      break

  }

  // Return what we find
  // -------------------------------------------------- //

  var ret = {
    action: action,
    owner: owner,
    subject: subject,
    tokens: words
  }

  debug && console.log(ret)

  return ret
}

# SpeakEasy

Simple Natural Language Processing

[![Circle CI](https://circleci.com/gh/nhunzaker/speakeasy.svg?style=svg)](https://circleci.com/gh/nhunzaker/speakeasy)

---
`npm install speakeasy-nlp`

---

###Current commands:

1. `*.classify` : Roughly determines the action, subject, and owner (posessive object) of a sentence. As of 0.2.2 it also includes verbs, nouns, and adjectives
2. `*.sentiment`: A collection of methods to approximate the positive/negative affect of a statement (relative to the whole statement)
3. `*.closest`  : Uses levenshtein distance to find the best match for a word given an array

---

``` javascript

var speak = require("./speakeasy-nlp");

// Analyze sentences at a basic level
// ------------------------------------- //
speak.classify("What is your name?")             //=> { action: "what", owner: "listener", subject: "name" }
speak.classify("Do you know what time it is?")   //=> { action: "what", owner: "it", subject: "time" }

// Sentiment analysis
// ------------------------------------- //
speak.sentiment.negativity("I hate your guts")   //=> { score: 1, words: [hate] }
speak.sentiment.positivity("I love you")         //=> { score: 1, words: [love] }

speak.sentiment.analyze("I love you, but you smell something aweful")  
// (Negative scores dictate a stronger influence of negative words)
//=> { score: -1, positive: { ... }, negative: { ... } }

// Closest word
// ------------------------------------- //
speak.closest("node", ["foo", "nodejs", "baz"])     //=> "nodejs"

```


## Philosophy

The goal of this project is not to be the next final solution for natural language processing. There are plenty of
[other projects](http://www.nltk.org/) that do a significantly better job of this. SpeakEasy spawned out of another
of my projects, [Nodebot](http://www.github.com/nhunzaker/nodebot), as a method of processing user input to simulate the illusion
of intelligence.

SpeakEasy's goal is to provide a library for NodeJS to perform simple language processing actions that perform well for
70%-80% of all cases.


## License

`speakeasy` is released under the [MIT License](http://opensource.org/licenses/MIT).

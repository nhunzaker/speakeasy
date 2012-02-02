# SpeakEasy
## Simple Natural Language Processing

---

###Current commands:

1. `*.classify` : Roughly determines the action, subject, and owner (posessive object) of a sentence
2. `*.sentiment`: A collection of methods to approximate the positive/negative affect of a statement (relative to the whole statement)

---

``` javascript

var speak = require("./speakeasy");

// Analyze sentences at a basic level
// ------------------------------------- //
speak.classify("What is your name?")             //=> { action: "what", owner: "listener", subject: "name" }
speak.classify("Do you know what time it is?")   //=> { action: "what", owner: "it", subject: "time" }

// Sentiment analysis
// ------------------------------------- //
speak.sentiment.negativity("I hate your guts")   //=> { score: 0.25, words: [hate] }
speak.sentiment.positivity("I love you")         //=> { score: 0.33, words: [love] }

sentiment.analyze("I love you, but you smell something aweful")  
// (Negative scores dictate a stronger influence of negative words)
//=> { score: -0.12, positive: { ... }, negative: { ... } }

```
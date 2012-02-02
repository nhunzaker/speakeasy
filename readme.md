# SpeakEasy
## Simple Natural Language Processing

---

###Current commands:

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

sentiment.analyze("I love you, but you smell something aweful")  //=> { score: 0.12, positive: { ... }, negative: { ... } }

```
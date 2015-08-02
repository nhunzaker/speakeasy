ABOUT:

pos-js is a Javascript port of Mark Watson's FastTag Part of Speech Tagger
which was itself based on Eric Brill's trained rule set and English
lexicon.

pos-js also includes a basic lexer that can be used to extract words and
other tokens from text strings.

pos-js was written by [Percy Wegmann](http://www.percywegmann.com/) and
is [available on Google code](http://www.percywegmann.com/). This fork
adds node.js and npm support and is maintained by Fortnight Labs.

LICENSE:

jspos is licensed under the GNU LGPLv3

INSTALL:

    npm install pos

USAGE:

    var pos = require('pos');
    var words = new pos.Lexer().lex("This is some sample text. This text can contain multiple sentences.");
    var taggedWords = new pos.Tagger().tag(words);
    for (i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
        console.log(word + " /" + tag);
    }

ACKNOWLEDGEMENTS:

Thanks to Mark Watson for writing FastTag, which served as the basis for jspos.

TAGS:

    CC Coord Conjuncn           and,but,or
    CD Cardinal number          one,two
    DT Determiner               the,some
    EX Existential there        there
    FW Foreign Word             mon dieu
    IN Preposition              of,in,by
    JJ Adjective                big
    JJR Adj., comparative       bigger
    JJS Adj., superlative       biggest
    LS List item marker         1,One
    MD Modal                    can,should
    NN Noun, sing. or mass      dog
    NNP Proper noun, sing.      Edinburgh
    NNPS Proper noun, plural    Smiths
    NNS Noun, plural            dogs
    POS Possessive ending       ’s
    PDT Predeterminer           all, both
    PP$ Possessive pronoun      my,one’s
    PRP Personal pronoun         I,you,she
    RB Adverb                   quickly
    RBR Adverb, comparative     faster
    RBS Adverb, superlative     fastest
    RP Particle                 up,off
    SYM Symbol                  +,%,&
    TO “to”                     to
    UH Interjection             oh, oops
    URL url                     http://www.google.com/
    VB verb, base form          eat
    VBD verb, past tense        ate
    VBG verb, gerund            eating
    VBN verb, past part         eaten
    VBP Verb, present           eat
    VBZ Verb, present           eats
    WDT Wh-determiner           which,that
    WP Wh pronoun               who,what
    WP$ Possessive-Wh           whose
    WRB Wh-adverb               how,where
    , Comma                     ,
    . Sent-final punct          . ! ?
    : Mid-sent punct.           : ; —
    $ Dollar sign               $
    # Pound sign                #
    " quote                     "
    ( Left paren                (
    ) Right paren               )

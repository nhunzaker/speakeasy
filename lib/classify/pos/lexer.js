/*!
 * jsPOS
 *
 * Copyright 2010, Percy Wegmann
 * Licensed under the GNU LGPLv3 license
 * http://www.opensource.org/licenses/lgpl-3.0.html
 */

var re = {
    // http://daringfireball.net/2010/07/improved_regex_for_matching_urls
    url: /\b(?:(?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig,
    number: /[0-9]*\.[0-9]+|[0-9]+/ig,
    space: /\s+/ig,
    unblank: /\S/,
    punctuation: /[\/\.\,\?\!]/ig,
    file: /\S+\.\S+[^\/\?]/ig
};

var Lexer = module.exports = function (){
    // Split by urls, then numbers, then whitespace, then punctuation
    this.regexs = [re.url, re.file, re.number, re.space, re.punctuation];
};

function LexerNode(string, regex, regexs){

    var childElements = [];

    this.string = string;
    this.children = [];

    if (string) {
        this.matches = string.match(regex);
        childElements = string.split(regex);
    }

    if (!this.matches) {
        this.matches = [];
        childElements = [string];
    }

    if (!regexs.length) {
        // no more regular expressions, we're done
        this.children = childElements;
    } else {
        // descend recursively
        var nextRegex = regexs[0]
        , nextRegexes = regexs.slice(1);

        for (var i in childElements) {
            this.children.push(
                new LexerNode(childElements[i], nextRegex, nextRegexes));
        }
    }
}

LexerNode.prototype.fillArray = function(array){

    var child;

    for (var i in this.children) {
        
        child = this.children[i];

        if (child.fillArray) {
            child.fillArray(array);
        } else if (re.unblank.test(child)) {
            array.push(child);
        }

        if (i < this.matches.length) {
            var match = this.matches[i];
            if (re.unblank.test(match))
                array.push(match);
        }
    }
};

LexerNode.prototype.toString = function(){
    var array = [];
    this.fillArray(array);
    return array.toString();
};

Lexer.prototype.lex = function(string){
    var array = []
    , node = new LexerNode(string, this.regexs[0], this.regexs.slice(1));
    node.fillArray(array);
    return array;
};

//var lexer = new Lexer();
//print(lexer.lex("I made $5.60 today in 1 hour of work.  The E.M.T.'s were on time, but only barely.").toString());

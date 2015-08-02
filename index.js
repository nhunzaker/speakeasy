/**
 * Speakeasy
 *
 * A simple natural language processor that tries to be
 * extremely accurate 80% of the time.
 *
 * Note: I am not a linguist, this is the result of
 * writing whatever logic it takes to get my tests
 * to work.
 *
 * Please help me make this better:
 * https://github.com/nhunzaker/speakeasy
 */

module.exports = {
    sentiment : require("./lib/sentiment"),
    classify  : require("./lib/classify"),
    closest   : require("./lib/levenshtein")
};

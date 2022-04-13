const markov = require("./markov")

// Given a phrase, should have an array of words
describe("tests markovMachine", function() {
    let mm;

    beforeEach(function() {
        let phrase = "I can see the water but I cannot see a boat";
        mm = new markov.MarkovMachine(phrase)
    })

    test("mm.words should be array of words", function() {
        let words = ["I", "can", "see", "the", "water", "but", "I", "cannot", "see", "a", "boat"]
        expect(mm.words).toEqual(words);
    })

    test("makeChains() should accurately make a map of chains", function() {
        let values = ["a", "the"];
        expect(mm.chains.get("see")).toEqual(values);
        let value = ["see"];
        expect(mm.chains.get("can")).toEqual(value);
    })

    test("makeText() should return a string", function() {
        expect(mm.makeText()).toEqual(expect.any(String))
    })

    test("makeText() phrase should not be larger than 100", function() {
        let phrase = mm.makeText();
        let words = phrase.split(/[ \r\n]+/);
        words = words.filter(c => c !== "");
        expect(words.length).toBeLessThanOrEqual(100)
    })

    test("generate realistic text", function() {
        let phrase = "I love you"
        let newMm = new markov.MarkovMachine(phrase);
        let makeText = ["I love you ", "love you ", "you "]
        expect(makeText).toContain(newMm.makeText())
    })
})
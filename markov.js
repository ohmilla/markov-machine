/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let newWord = this.words[i + 1];
      if (!this.words[i+1]) {
        newWord = null;
      }
      if (chains.has(this.words[i])) {
        let values = chains.get(this.words[i])
        chains.set(this.words[i], [newWord,...values])
      }
      else {
        chains.set(this.words[i], [newWord])
      }
    }
    return chains
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let startIdx = Math.floor(Math.random() * this.words.length);
    let word = this.words[startIdx];
    let phrase = "";
    let count = 0;

    while (word != null && count < numWords) {
      phrase += `${word} `;
      count ++;
      let values = this.chains.get(`${word}`)
      if (values.length) {
        let idx = Math.floor(Math.random() * values.length);
        word = values[idx];
        values.splice(idx, 1);
      } else break;
    }
    console.log(phrase);
    return phrase;
  }
}

module.exports = { MarkovMachine };
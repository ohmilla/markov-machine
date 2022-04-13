/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require("./markov")


async function readUrl(url) {
  try {
      let res = await axios.get(url);
      generateText(res.data);  
  }
  catch (err) {
      console.error(`Error Reading ${url}: ${err}`)
      process.exit(1);
  }
}

function readFile(file) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
          console.error(`Error Reading ${file}: ${err}`)
          process.exit(1);
        }
        else {
            generateText(data);     
        }
    })  
}

function generateText(text) {
    let mm = new markov.MarkovMachine(String(text));
    mm.makeText();    
}

let path = process.argv[3];

if (process.argv[2] === "file") {
    readFile(path)
}
else {
    readUrl(path);
}




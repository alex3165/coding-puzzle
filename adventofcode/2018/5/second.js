const { read } = require("../../../util");
const input = read("./first-input.txt");
const { getLengthAfterReaction } = require("./util");

input
  .then(([string]) => {
    const inputArr = string.split("");
    const alphabet = Array.from(new Set(inputArr.map(e => e.toLowerCase())));

    const lengths = alphabet
      .map(char => {
        console.log(`Process letter ${char}`);
        const input = inputArr.filter(l => l.toLowerCase() !== char);
        return getLengthAfterReaction(input);
      })
      .sort((a, b) => (a > b ? 1 : -1));

    return lengths[0];
  })
  .then(console.log);

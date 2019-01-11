const { read } = require("../../util");
const input = read("./first-input.txt");
const { getLengthAfterReaction } = require("./util");

input
  .then(([string]) => getLengthAfterReaction(string.split("")))
  .then(console.log);

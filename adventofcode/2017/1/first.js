const { read } = require("../../util");
const input = read("./first-input.txt");

input
  .then(([string]) =>
    string.split("").reduce((acc, curr, id) => {
      if (id === string.length - 1 && curr === string[0]) {
        return acc + parseInt(curr);
      }

      return curr === string[id + 1] ? acc + parseInt(curr) : acc;
    }, 0)
  )
  .then(console.log);

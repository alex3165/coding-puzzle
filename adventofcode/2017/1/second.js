const { read } = require("../../../util");
const input = read("./second-input.txt");

input
  .then(([string]) => {
    const stringArr = string.split("").map(Number);

    const splittedInput = [
      stringArr.slice(0, stringArr.length / 2),
      stringArr.slice(stringArr.length / 2)
    ];

    return splittedInput[0].reduce((acc, curr, index) => {
      if (curr === splittedInput[1][index]) {
        return acc + curr + curr;
      }

      return acc;
    }, 0);
  })
  .then(console.log);

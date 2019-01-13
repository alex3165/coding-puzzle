const { read } = require("../../util");
const input = read("./input.txt");

input
  .then(content => content.map(v => parseInt(v)))
  .then(content => {
    let foundValue;
    let index = 0;
    let total = 0;
    let states = [];

    while (!foundValue) {
      total = total + content[index];

      if (states.includes(total)) {
        foundValue = total;
      }

      if (index === content.length - 1) {
        index = 0;
      } else {
        index++;
      }

      states.push(total);
    }

    return foundValue;
  })
  .then(console.log);

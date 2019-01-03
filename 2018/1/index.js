const { read } = require("../../util");

const input = read("./input.txt");

input
  .then(content => {
    const parsedContent = content.map(v => parseInt(v));
    return parsedContent.reduce((acc, next) => {
      return acc + next;
    }, 0);
  })
  .then(console.log);

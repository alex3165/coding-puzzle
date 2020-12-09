const { read } = require("../../../util");

const input = read("./data.txt");

const isPreambleSum = (p, n) => {
  let valid = false;

  for (let i of p) {
    for (let j of p) {
      if (i !== j && i + j === n) {
        valid = true;
        break;
      }
    }
    if (valid) {
      break;
    }
  }

  return valid;
};

input
  .then((content) => {
    const mappedContent = content.map(Number);
    const preamble = 25;
    const series = mappedContent.slice(preamble, content.length);

    const invalidNumber = series.find((n, i) => {
      const preambleList = mappedContent.slice(i, preamble + i);
      return !isPreambleSum(preambleList, n);
    });

    return invalidNumber;
  })
  .then(console.log);

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

const sum = (series) => {
  return series.reduce((acc, next) => acc + next, 0);
};

const findContiguous = (series, t) => {
  let n = [];

  for (let jtemp in series) {
    let j = parseInt(jtemp);
    s = series[j];
    if (s === t) {
      continue;
    }

    n = [s];
    let i = j + 1;

    while (sum(n) < t) {
      n.push(series[i]);
      i = i + 1;
    }

    if (sum(n) === t) {
      break;
    }
  }

  return n;
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

    const contiguous = findContiguous(mappedContent, invalidNumber);
    const sortedContiguous = contiguous.sort((a, b) => (a > b ? 1 : -1));
    return sortedContiguous[0] + sortedContiguous[sortedContiguous.length - 1];
  })
  .then(console.log);

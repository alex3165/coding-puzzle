const { read } = require('../util');

const parse = str =>
  str.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

const anagram = (first, second) => {
  console.log(first, second);
  const sortedFirst = parse(first);
  const sortedSecond = parse(second);
  let n = 0;

  while (sortedFirst.length && sortedSecond.length) {
    if (!sortedFirst.length) {
      sortedSecond.shift();
      n++;
      break;
    }

    if (!sortedSecond.length) {
      sortedFirst.shift();
      n++;
      break;
    }

    if (sortedFirst[0] === sortedSecond[0]) {
      sortedSecond.shift();
      sortedFirst.shift();
      continue;
    }

    if (sortedFirst[0].charCodeAt(0) < sortedSecond[0].charCodeAt(0)) {
      sortedFirst.shift();
      n++;
    } else {
      sortedSecond.shift();
      n++;
    }
  }

  return n + sortedFirst.length + sortedSecond.length;
};

read('./anagram-input.txt')
  .then(([first, second]) => anagram(first, second))
  .then(console.log);

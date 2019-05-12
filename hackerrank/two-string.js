const { read } = require("../util");

const getSortedString = str => {
  return Array.from(
    new Set(str.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)))
  );
};

const areEquals = (a, b) => {
  let found = false;

  while (a.length && b.length) {
    if (a[0] === b[0]) {
      found = true;
      break;
    }

    if (a[0].charCodeAt(0) < b[0].charCodeAt(0)) {
      a.shift();
    } else {
      b.shift();
    }
  }

  return found;
};

read("./two-string-input.txt")
  .then(([_, ...arr]) => {
    const res = [];

    while (arr.length) {
      const first = getSortedString(arr.shift());
      const second = getSortedString(arr.shift());
      res.push(areEquals(first, second));
    }

    return res.map(val => (val ? "YES" : "NO")).join("\n");
  })
  .then(console.log);

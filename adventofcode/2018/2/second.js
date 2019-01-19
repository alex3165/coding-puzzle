const { read } = require("../../../util");

const input = read("./second-input.txt");

const distance = (a, b) => {
  let count = 0;

  for (let i = 0; i < a.length; i++) {
    const achar = a[i];
    const bchar = b[i];
    if (achar !== bchar) {
      count++;
    }
  }

  return count;
};

const removeChar = (a, b) => {
  let res = "";

  for (let i = 0; i < a.length; i++) {
    const achar = a[i];
    const bchar = b[i];
    if (achar === bchar) {
      res += achar;
    }
  }

  return res;
};

input
  .then(content => {
    const pair = [];
    for (let i = 0; i < content.length; i++) {
      for (let j = content.length - 1; j >= 0; j--) {
        if (i !== j && distance(content[i], content[j]) === 1) {
          pair.push(content[i]);
          pair.push(content[j]);
          break;
        }
      }
      if (pair.length) {
        break;
      }
    }

    return removeChar(...pair);
  })
  .then(console.log);

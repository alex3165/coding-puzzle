const { readFile } = require("fs");
const { promisify } = require("util");

const readFileProm = promisify(readFile);

const read = path => {
  return readFileProm(path, "utf-8").then(content => {
    return content.split("\n");
  });
};

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

const mode = arr =>
  arr
    .sort(
      (a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop();

module.exports = {
  read,
  range,
  mode
};

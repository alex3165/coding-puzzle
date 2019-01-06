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

module.exports = {
  read,
  range
};

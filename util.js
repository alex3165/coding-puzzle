const { readFile } = require("fs");
const { promisify } = require("util");

const readFileProm = promisify(readFile);

const read = path => {
  return readFileProm(path, "utf-8").then(content => {
    return content.split("\n");
  });
};

module.exports = {
  read
};

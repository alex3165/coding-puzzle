const { read } = require("../../../util");

const input = read("./data.txt");

input
  .then((content) => {
    const validPasswords = content.filter((line) => {
      const [length, letter, sequence] = line.split(" ");
      const [min, max] = length.split("-");
      const parsedLetter = letter.replace(":", "");
      const indexMin = parseInt(min) - 1
      const indexMax = parseInt(max) - 1

      let count = 0;
      if (sequence[indexMin] === parsedLetter) {
          count++
      }

      if (sequence[indexMax] === parsedLetter) {
          count++
      }

      return count === 1
    });

    return validPasswords.length;
  })
  .then(console.log);

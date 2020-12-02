const { read } = require("../../../util");

const input = read("./data.txt");

input
  .then((content) => {
    const validPasswords = content.filter((line) => {
      const [length, letter, sequence] = line.split(" ");
      const [min, max] = length.split("-");
      const parsedLetter = letter.replace(":", "");
      const sequenceMap = sequence.split("").reduce((acc, next) => {
        if (acc[next] !== undefined) {
          acc[next] = acc[next] + 1;
        } else {
          acc[next] = 1;
        }
        return acc;
      }, {});

      const res = sequenceMap[parsedLetter];

      return res !== undefined && res >= parseInt(min) && res <= parseInt(max);
    })

    return validPasswords.length
  })
  .then(console.log);

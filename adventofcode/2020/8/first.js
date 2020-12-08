const { read } = require("../../../util");

const input = read("./data.txt");

input
  .then((content) => {
    let acc = 0;
    let index = 0;
    let visitedIndex = [];

    const parsedInstructions = content.map((str) => {
      const instruction = str.slice(0, 3);
      const n = parseInt(str.slice(4, str.length));
      return [instruction, n];
    });

    while (!visitedIndex.includes(index)) {
      visitedIndex.push(index);

      const [instruction, n] = parsedInstructions[index];

      if (instruction === "nop") {
        index++;
        continue;
      }

      if (instruction === "acc") {
        acc += n;
        index++;
        continue;
      }

      if (instruction === "jmp") {
        index += n;
        continue;
      }
    }

    return acc;
  })
  .then(console.log);

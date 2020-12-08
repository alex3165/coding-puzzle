const { read } = require("../../../util");

const input = read("./data.txt");

const playSequence = (seq) => {
  let acc = 0;
  let index = 0;
  let visitedIndex = [];

  while (!visitedIndex.includes(index) && index < seq.length) {
    visitedIndex.push(index);

    const [instruction, n] = seq[index];

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
  const isValid = index > seq.length - 1;

  return [isValid, acc];
};

input
  .then((content) => {
    const parsedInstructions = content.map((str) => {
      const instruction = str.slice(0, 3);
      const n = parseInt(str.slice(4, str.length));
      return [instruction, n];
    });

    const numberOfNopAndJmp = parsedInstructions
      .map(([instruction], index) => [instruction, index])
      .filter(
        ([instruction]) => instruction === "nop" || instruction === "jmp"
      );

    const sequences = numberOfNopAndJmp.map(([_, index]) => {
      const newSeq = [...parsedInstructions];
      const [amendI, n] = newSeq[index];

      if (amendI === "nop") {
        newSeq[index] = ["jmp", n];
      }

      if (amendI === "jmp") {
        newSeq[index] = ["nop", n];
      }

      return newSeq;
    });

    const validSeq = sequences
      .map((seq) => {
        return playSequence(seq);
      })
      .find((res) => {
        return res[0];
      });

    return validSeq[1];
  })
  .then(console.log);

const { read } = require("../../../util");

const input = read("./data.txt");

const sequenceToRowOrColumn = (sequence, min, max) => {
  const i = sequence.shift();

  if (i === "F" || i === "L") {
    return sequenceToRowOrColumn(
      sequence,
      min,
      min + Math.floor((max - min) / 2)
    );
  }

  if (i === "B" || i === "R") {
    return sequenceToRowOrColumn(
      sequence,
      min + Math.ceil((max - min) / 2),
      max
    );
  }

  return min;
};

input
  .then((content) => {
    const maxRowIndex = 127;
    const minRowIndex = 0;
    const maxColumnIndex = 7;
    const minColumnIndex = 0;

    const seatIds = content.map((sequence) => {
      const rowSeq = sequence.slice(0, sequence.length - 3);
      const columnSeq = sequence.slice(sequence.length - 3, sequence.length);

      const row = sequenceToRowOrColumn(
        rowSeq.split(""),
        minRowIndex,
        maxRowIndex
      );

      const column = sequenceToRowOrColumn(
        columnSeq.split(""),
        minColumnIndex,
        maxColumnIndex
      );

      return row * 8 + column;
    });

    return Math.max(...seatIds);
  })
  .then(console.log);

const { read } = require('../util');

const solveMinimumDifference = seq => {
  const sortedSeq = seq.sort((a, b) => a - b);
  let minDiff = Infinity;

  sortedSeq.forEach((el, index) => {
    if (sortedSeq[index + 1] !== undefined) {
      const diff = sortedSeq[index + 1] - el;
      if (diff < minDiff) {
        minDiff = diff;
      }
    }
  });

  return minDiff;
};

read('./minimum-difference-input.txt')
  .then(([_, s]) => {
    const sequence = s.split(' ').map(el => parseInt(el, 10));
    return solveMinimumDifference(sequence);
  })
  .then(console.log);

const { read } = require('../util');

read('./minimum-swap-input.txt')
  .then(([length, arr]) => {
    const input = arr.split(' ').map(Number);
    const sortedInput = [...input].sort((a, b) => a - b);

    const n = sortedInput.reduce((acc, next, index) => {
      if (input[index] !== next) {
        return acc + 1;
      }

      return acc;
    }, -1);

    return n;
  })
  .then(console.log);

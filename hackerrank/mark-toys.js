const { read } = require('../util');

const quickSort = arr => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr.pop();
  const lower = [];
  const higher = [];

  arr.forEach(el => {
    return el < pivot ? lower.push(el) : higher.push(el);
  });

  return quickSort(lower).concat(pivot, quickSort(higher));
};

read('./mark-toys-input.txt')
  .then(([params, s]) => {
    const [_, max] = params.split(' ').map(el => parseInt(el));
    const arr = s.split(' ').map(el => parseInt(el, 10));

    const sortedArr = quickSort(arr);

    let acc = 0;
    let n = 0;
    sortedArr.forEach(el => {
      if (acc + el < max) {
        acc += el;
        n += 1;
      }
    });

    return n;
  })
  .then(console.log);

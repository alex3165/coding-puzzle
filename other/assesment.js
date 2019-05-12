// 23280666370761
// 23280666370761

const hasAllCovered = (counts, board) => {
  return Object.keys(board).every(el => {
    return board[el] === counts[el];
  });
};

function lengthSubsequenceShoppers(inputList) {
  const counts = inputList.reduce((acc, next) => {
    if (acc[next]) {
      acc[next] = acc[next] + 1;
    } else {
      acc[next] = 1;
    }
    return acc;
  }, {});

  let seq = [];
  let board = {};

  inputList.forEach(el => {
    if (board[el]) {
      board[el] = board[el] + 1;
    } else {
      board[el] = 1;
    }

    if (hasAllCovered(counts, board)) {
      seq.push(Object.keys(board).length);
      board = {};
    }
  });

  return seq;
  //
}

const res = lengthSubsequenceShoppers([
  'a',
  'b',
  'c',
  'd',
  'a',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'e'
]);

console.log(res);

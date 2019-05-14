const { read } = require('../util');

const alternate = input => {
  const arr = input.split('');
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res[res.length - 1] !== arr[i]) {
      res.push(arr[i]);
    }
  }

  return arr.length - res.length;
};

read('./alternating-characters-input.txt')
  .then(([_, ...inputs]) => inputs.map(alternate))
  .then(console.log);

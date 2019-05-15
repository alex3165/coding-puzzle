const { read } = require('../util');

const luckBalance = (k, contests) => {
  let uninmportantContestsScore = 0;
  const importantContests = [];

  contests.forEach(([value, weight]) => {
    if (weight === 0) {
      uninmportantContestsScore += value;
    } else {
      importantContests.push(value);
    }
  });

  const sortedContests = importantContests.sort((a, b) => b - a);

  const maxLuck = sortedContests
    .slice(0, k)
    .reduce((acc, next) => acc + next, 0);

  const substr = sortedContests.slice(k).reduce((acc, next) => acc + next, 0);

  return maxLuck + uninmportantContestsScore - substr;
};

read('./luck-balance-input.txt')
  .then(([first, ...inputs]) => {
    const [_, kbis] = first.split(' ');
    const k = parseInt(kbis, 10);
    const contests = inputs.map(input => {
      const [value, weight] = input.split(' ');
      return [parseInt(value), parseInt(weight)];
    });

    return luckBalance(k, contests);
  })
  .then(console.log);

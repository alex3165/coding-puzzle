const { read } = require("../util");

read("./sock-merchant-input.txt")
  .then(([_, s]) => {
    const arr = s.split(" ");

    const dict = arr.reduce((acc, next) => {
      if (acc[next]) {
        acc[next] += 1;
      } else {
        acc[next] = 1;
      }

      return acc;
    }, {});

    return Object.values(dict).reduce((acc, next) => {
      return acc + Math.floor(next / 2);
    }, 0);
  })
  .then(console.log);

const { read } = require("../../../util");

const input = read("./first-input.txt");

input
  .then(content => {
    const [double, triple] = content.reduce(
      (acc, next) => {
        const res = next.split("").reduce((acc, next) => {
          if (acc[next]) {
            acc[next] += 1;
          } else {
            acc[next] = 1;
          }
          return acc;
        }, {});

        let double = 0;
        let triple = 0;
        for (const letter in res) {
          if (double === 0 && res[letter] === 2) {
            double = 1;
          }

          if (triple === 0 && res[letter] === 3) {
            triple = 1;
          }

          if (double && triple) {
            break;
          }
        }

        return [acc[0] + double, acc[1] + triple];
      },
      [0, 0]
    );

    return double * triple;
  })
  .then(console.log);

const { read } = require("../../../util");

const input = read("./data.txt");

input
  .then((content) => {
    const mappedContent = content.map(Number);
    const sortedAdapters = mappedContent.sort((a, b) => (a > b ? 1 : -1));

    const gapSeries = [sortedAdapters[0]];

    const res = sortedAdapters.reduce((acc, cur, i) => {
      if (i + 1 > sortedAdapters.length - 1) {
        return acc;
      }

      const next = sortedAdapters[i + 1];
      const diff = next - cur;

      return [...acc, diff];
    }, gapSeries);

    const series = [...res, 3];

    let strike = 0;
    const dict = {};

    for (let val of series) {
      if (val === 1) {
        strike += 1;
      } else {
        if (strike) {
          if (dict[strike]) {
            dict[strike] += 1;
          } else {
            dict[strike] = 1;
          }
        }
        strike = 0;
      }
    }

    const final = Object.keys(dict).reduce((acc, k) => {
      const val = dict[k];
      let n = 1;
      if (k === "2") {
        n = 2;
      }
      if (k === "3") {
        n = 4;
      }

      if (k === "4") {
        n = 7;
      }

      return Math.pow(n, val) * acc;
    }, 1);

    return final;
  })
  .then(console.log);

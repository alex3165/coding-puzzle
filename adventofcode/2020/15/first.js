const { read, range } = require("../../../util");

const input = read("./data.txt");

const findLastIndexes = (series, number) => {
  const res = [];
  for (let i = series.length - 1; i >= 0; i--) {
    if (series[i] === number) {
      res.push(i + 1);
    }

    if (res.length >= 2) {
      break;
    }
  }

  return res;
};

input
  .then((content) => {
    const series = content[0].split(",").map(Number);

    for (let i = series.length; i < 30000000; i++) {
      const lastNumber = series[i - 1];
      //   console.log(series, lastNumber, i);

      const lastIndexes = findLastIndexes(series, lastNumber);
      //   console.log(lastIndexes);
      if (lastIndexes.length < 2) {
        series.push(0);
      } else {
        series.push(lastIndexes[0] - lastIndexes[1]);
      }
    }

    return series[series.length - 1];
  })
  .then(console.log);

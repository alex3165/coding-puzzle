const moment = require("moment");

const parseDedupe = content => {
  const input = content
    .map(val => {
      const res = val.split(/\[(.*)\] /g);
      res.shift();
      const date = moment(res[0], "YYYY-MM-DD hh:mm");
      return [date, res[1]];
    })
    .sort((a, b) => {
      return a[0].isBefore(b[0]) ? -1 : 1;
    })
    .map(arr => [arr[0].format(), arr[1]]);

  return input.reduce((acc, next) => {
    if (!acc.length) {
      acc.push(next);
      return acc;
    }

    const lastTuple = acc[acc.length - 1];
    if (lastTuple[1].includes("Guard") && next[1].includes("Guard")) {
      console.log("HEEE", lastTuple, next);
      acc.pop();
      acc.push(next);
      return acc;
    }

    if (lastTuple[1] === next[1]) {
      return acc;
    }

    acc.push(next);

    return acc;
  }, []);
};

module.exports = {
  parseDedupe
};

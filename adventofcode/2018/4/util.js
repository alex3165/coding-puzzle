const moment = require("moment");

const parseDedupe = content => {
  return content
    .map(val => {
      const res = val.split(/\[(.*)\] /g);
      res.shift();
      const date = moment(res[0], "YYYY-MM-DD hh:mm");
      return [date, res[1]];
    })
    .sort((a, b) => (a[0].isBefore(b[0]) ? -1 : 1))
    .map(arr => [arr[0].format(), arr[1]])
    .reduce((acc, next) => {
      if (!acc.length) {
        acc.push(next);
        return acc;
      }

      const lastTuple = acc[acc.length - 1];
      if (lastTuple[1].includes("Guard") && next[1].includes("Guard")) {
        acc.pop();
      }

      acc.push(next);

      return acc;
    }, []);
};

module.exports = {
  parseDedupe
};

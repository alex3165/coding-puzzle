const { read } = require("../../util");
const input = read("./second-input.txt");

input
  .then(rows => {
    const parsedRows = rows.map(row => row.split(/\t|\s/g).map(Number));
    return parsedRows.reduce((acc, row) => {
      const sortedRow = row.sort((a, b) => (a < b ? -1 : 1));

      let res = 0;

      for (let i = 0; i < sortedRow.length; i++) {
        for (let j = sortedRow.length - 1; j >= 0; j--) {
          if (sortedRow[j] % sortedRow[i] === 0 && j > i) {
            console.log(sortedRow[j], sortedRow[i]);
            res = sortedRow[j] / sortedRow[i];
            break;
          }
        }
        if (res) {
          break;
        }
      }

      return acc + res;
    }, 0);
  })
  .then(console.log);

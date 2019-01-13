const { read } = require("../../util");
const input = read("./first-input.txt");

input
  .then(rows => {
    const parsedRows = rows.map(row => row.split(/\t/g).map(Number));

    return parsedRows.reduce((acc, row) => {
      const sortedRow = row.sort((a, b) => (a < b ? -1 : 1));
      return acc + (sortedRow[sortedRow.length - 1] - sortedRow[0]);
    }, 0);
  })
  .then(console.log);

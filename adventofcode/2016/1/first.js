const { read } = require("../../../util");
const input = read("./first-input.txt");

input
  .then(([string]) => {
    const res = string.split(", ").reduce(
      (acc, curr) => {
        const [direction, number] = curr.split(/(L|R)(.+)/g).filter(Boolean);
        acc[direction] = {
          count: acc[direction].count + 1,
          total: acc[direction].total + parseInt(number)
        };

        return acc;
      },
      {
        L: { count: 0, total: 0 },
        R: { count: 0, total: 0 }
      }
    );
    // const methodL = res.L.count % 2 === 0 ? Math.floor : Math.ceil;

    // const resL = methodL(res.L.total / 2) + (res.L.total % 2);
    // console.log(resL);
    // return
    // return (
    // Math.floor(res.L.total / res.L.count) +
    // (res.L.total % res.L.count) +
    // (Math.floor(res.R.total / res.R.count) + (res.R.total % res.R.count))
    // );
  })
  .then(console.log);

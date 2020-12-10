const { read } = require("../../../util");

const input = read("./data.txt");

input
  .then((content) => {
    const mappedContent = content.map(Number);
    const sortedAdapters = mappedContent.sort((a, b) => (a > b ? 1 : -1));

    const initialState = {
      3: 1,
    };

    const initial = sortedAdapters[0];

    if (initial === 1) {
      initialState["1"] = 1;
    } else {
      initialState["3"] += 1;
    }

    const res = sortedAdapters.reduce((acc, cur, i) => {
      if (i + 1 > sortedAdapters.length - 1) {
        return acc;
      }

      const next = sortedAdapters[i + 1];
      const diff = next - cur;

      if (acc[diff]) {
        acc[diff] += 1;
      } else {
        acc[diff] = 1;
      }

      return acc;
    }, initialState);

    return Object.values(res).reduce((acc, next) => acc * next, 1);
  })
  .then(console.log);

const { read } = require("../util");

read("./valley-input.txt")
  .then(([_, s]) => {
    let count = 0;
    let index = 0;

    s.split("").forEach(instruction => {
      const newIndex = index + (instruction === "U" ? 1 : -1);
      if (index === 0 && newIndex < 0) {
        count++;
      }

      index = newIndex;
    });

    return count;
  })
  .then(console.log);

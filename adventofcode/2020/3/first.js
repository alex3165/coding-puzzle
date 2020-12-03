const { read } = require("../../../util");

const input = read("./data.txt");

input
  .then((content) => {
    const paddingRight = 3;
    const paddingTop = 1;
    let horizontalPos = paddingRight;
    let verticalPos = paddingTop;
    let numberOfTrees = 0;

    while (verticalPos < content.length) {
      const rowPosition = horizontalPos % content[paddingTop].length;
      const char = content[verticalPos][rowPosition];

      if (char === "#") {
        numberOfTrees += 1;
      }

      horizontalPos += paddingRight;
      verticalPos += paddingTop;
    }

    return numberOfTrees;
  })
  .then(console.log);

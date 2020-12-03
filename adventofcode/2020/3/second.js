const { read } = require("../../../util");

const input = read("./data.txt");

input
  .then((content) => {
    let slopes = [
      {
        paddingRight: 3,
        paddingTop: 1,
        horizontalPos: 3,
        verticalPos: 1,
        numberOfTrees: 0,
      },
      {
        paddingRight: 1,
        paddingTop: 1,
        horizontalPos: 1,
        verticalPos: 1,
        numberOfTrees: 0,
      },
      {
        paddingRight: 5,
        paddingTop: 1,
        horizontalPos: 5,
        verticalPos: 1,
        numberOfTrees: 0,
      },
      {
        paddingRight: 7,
        paddingTop: 1,
        horizontalPos: 7,
        verticalPos: 1,
        numberOfTrees: 0,
      },
      {
        paddingRight: 1,
        paddingTop: 2,
        horizontalPos: 1,
        verticalPos: 2,
        numberOfTrees: 0,
      },
    ];

    slopes = slopes.map((slope) => {
      let {
        horizontalPos,
        paddingRight,
        paddingTop,
        verticalPos,
        numberOfTrees,
      } = slope;

      while (verticalPos < content.length) {
        const rowPosition = horizontalPos % content[paddingTop].length;
        const char = content[verticalPos][rowPosition];

        if (char === "#") {
          numberOfTrees += 1;
        }

        horizontalPos += paddingRight;
        verticalPos += paddingTop;
      }

      return {
        horizontalPos,
        paddingRight,
        paddingTop,
        verticalPos,
        numberOfTrees,
      };
    });

    return slopes.reduce((acc, slope) => acc * slope.numberOfTrees, 1);
  })
  .then(console.log);

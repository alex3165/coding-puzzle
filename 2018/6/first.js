const { read, range, mode } = require("../../util");
const input = read("./first-input.txt");

const getBounds = coordinates => {
  return coordinates.reduce(
    ([lowestX, highestX, lowestY, highestY], next) => {
      const nextState = [lowestX, highestX, lowestY, highestY];

      if (next[0] < lowestX) {
        nextState[0] = next[0];
      }

      if (next[0] > highestX) {
        nextState[1] = next[0];
      }

      if (next[1] < lowestY) {
        nextState[2] = next[1];
      }

      if (next[1] > highestY) {
        nextState[3] = next[1];
      }

      return nextState;
    },
    [Infinity, -Infinity, Infinity, -Infinity]
  );
};

const getDistance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

input
  .then(coordinatesStr => {
    const coordinates = coordinatesStr.map(coord =>
      coord.split(", ").map(Number)
    );
    const bounds = getBounds(coordinates);
    const matrix = [];

    range(bounds[3] - bounds[2], bounds[2]).forEach(y => {
      range(bounds[1] - bounds[0], bounds[0]).forEach(x => {
        matrix.push([x, y]);
      });
    });

    const matrixIndexes = matrix
      .map(point => {
        const distances = coordinates.map(coord => getDistance(point, coord));
        const sortedDistances = [...distances].sort((a, b) => (a < b ? -1 : 1));
        const winningIndex = distances.indexOf(sortedDistances[0]);
        return sortedDistances[0] === sortedDistances[1] ? -1 : winningIndex;
      })
      .filter(index => index !== -1);

    const indexMapCount = {};
    matrixIndexes.forEach(el => {
      if (indexMapCount[el]) {
        indexMapCount[el]++;
      } else {
        indexMapCount[el] = 1;
      }
    });

    const res = Object.keys(indexMapCount).sort((a, b) =>
      indexMapCount[a] < indexMapCount[b] ? 1 : -1
    );

    console.log(coordinates[res[0]]);

    return indexMapCount[res[0]];
  })
  .then(console.log);

const { read, range, mode } = require("../../../util");
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

    const areCoordinatesInfinite = coordinates.slice(4, 5).map((coord, i) => {
      const limits = [
        [coord[0] - 2000, coord[1]],
        [coord[0] + 2000, coord[1]],
        [coord[0], coord[1] - 2000],
        [coord[0], coord[1] + 2000]
      ];

      let hisMinX = true;
      let hisMaxX = true;
      let hisMinY = true;
      let hisMaxY = true;
      let j = 0;

      for (let pos of coordinates) {
        if (i === j) {
          j++;
          continue;
        }
        if (
          hisMinX &&
          getDistance(pos, limits[0]) < getDistance(limits[0], coord)
        ) {
          hisMinX = false;
        }

        if (
          hisMaxX &&
          getDistance(pos, limits[1]) < getDistance(limits[1], coord)
        ) {
          hisMaxX = false;
        }

        if (
          hisMinY &&
          getDistance(pos, limits[2]) < getDistance(limits[2], coord)
        ) {
          hisMinY = false;
        }

        if (
          hisMaxY &&
          getDistance(pos, limits[3]) < getDistance(limits[3], coord)
        ) {
          hisMaxY = false;
        }
        j++;
      }
      console.log(hisMinX, hisMaxX, hisMinY, hisMaxY);
      return hisMinX || hisMaxX || hisMinY || hisMaxY;
    });

    // console.log(areCoordinatesInfinite);

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

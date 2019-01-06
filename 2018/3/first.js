const { read, range } = require("../../util");
const { parse } = require("./util");

const input = read("./first-input.txt");

const getCollisions = (a, b) => {
  const ax = range(a[1][0] - a[0][0] + 1, a[0][0]);
  const bx = range(b[1][0] - b[0][0] + 1, b[0][0]);

  const ay = range(a[1][1] - a[0][1] + 1, a[0][1]);
  const by = range(b[1][1] - b[0][1] + 1, b[0][1]);

  const collidedX = ax.filter(val => bx.includes(val));
  const collidedY = ay.filter(val => by.includes(val));

  const res = [];
  for (let cx of collidedX) {
    for (let cy of collidedY) {
      res.push(`${cx},${cy}`);
    }
  }

  return res;
};

const hasCollision = (a, b) => {
  const collideX = b[0][0] <= a[1][0] && b[1][0] >= a[0][0];
  const collideY = b[0][1] <= a[1][1] && b[1][1] >= a[0][1];
  return collideY && collideX;
};

input
  .then(content => {
    const arr = content.map(parse);

    let compared = {};
    let collisions = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length; j++) {
        if (
          i !== j &&
          !compared[`${i}${j}`] &&
          hasCollision(arr[i].coordinates, arr[j].coordinates)
        ) {
          collisions = collisions.concat(
            getCollisions(arr[i].coordinates, arr[j].coordinates)
          );

          compared[`${j}${i}`] = true;
        }
      }
    }

    return Array.from(new Set(collisions)).length;
  })
  .then(console.log);

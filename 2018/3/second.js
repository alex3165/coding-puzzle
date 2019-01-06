const { read } = require("../../util");
const { parse } = require("./util");

const input = read("./first-input.txt");

const hasCollision = (a, b) => {
  const collideX = b[0][0] <= a[1][0] && b[1][0] >= a[0][0];
  const collideY = b[0][1] <= a[1][1] && b[1][1] >= a[0][1];
  return collideY && collideX;
};

input
  .then(content => {
    const arr = content.map(parse);

    let compared = {};

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i !== j && !hasCollision(arr[i].coordinates, arr[j].coordinates)) {
          if (compared[arr[i].id]) {
            compared[arr[i].id] = compared[arr[i].id] + 1;
          } else {
            compared[arr[i].id] = 1;
          }
        }
      }
    }

    let id = "";
    let value = 0;

    const keys = Object.keys(compared);

    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];
      const currentVal = compared[currentKey];
      if (currentVal > value) {
        id = currentKey;
        value = currentVal;
      }
    }

    return [id, value];
  })
  .then(console.log);

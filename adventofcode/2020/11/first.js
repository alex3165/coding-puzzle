const { read } = require("../../../util");

const input = read("./data.txt");

const getAdjacentPositions = ([x, y], grid) => {
  const adjacents = [];
  const topRow = y - 1;
  const bottomRow = y + 1;

  if (topRow >= 0) {
    adjacents.push([x, topRow]);
    if (x - 1 >= 0) {
      adjacents.push([x - 1, topRow]);
    }
    if (x + 1 < grid[0].length) {
      adjacents.push([x + 1, topRow]);
    }
  }

  if (bottomRow < grid.length) {
    adjacents.push([x, bottomRow]);

    if (x - 1 >= 0) {
      adjacents.push([x - 1, bottomRow]);
    }
    if (x + 1 < grid[0].length) {
      adjacents.push([x + 1, bottomRow]);
    }
  }

  if (x - 1 >= 0) {
    adjacents.push([x - 1, y]);
  }

  if (x + 1 < grid[0].length) {
    adjacents.push([x + 1, y]);
  }

  return adjacents;
};

const getHash = (grid) => {
  return grid.map((line) => line.join("")).join("");
};

const runRound = (grid) => {
  const res = [...grid.map((line) => [...line])];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const el = grid[y][x];
      const adjacentEls = getAdjacentPositions([x, y], grid)
        .map(([ax, ay]) => grid[ay][ax])
        .flat();

      if (el === "L" && !adjacentEls.includes("#")) {
        res[y][x] = "#";
      }

      if (el === "#" && adjacentEls.filter((ael) => ael === "#").length >= 4) {
        res[y][x] = "L";
      }
    }
  }

  return res;
};

input
  .then((content) => {
    const initialGrid = content.map((line) => line.split(""));
    const initialHash = getHash(initialGrid);

    const hashMap = { [initialHash]: true };
    let grid = initialGrid;
    let res = 0;

    while (true) {
      grid = runRound(grid);
      const currentHash = getHash(grid);

      if (hashMap[currentHash] === true) {
        res = currentHash.split("").filter((seat) => seat === "#").length;
        break;
      } else {
        hashMap[currentHash] = true;
      }
    }

    return res;
  })
  .then(console.log);

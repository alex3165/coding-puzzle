const { read } = require("../../../util");

const input = read("./data.txt");

const getHash = (grid) => {
  return grid.map((line) => line.join("")).join("");
};

const getFirstSeat = ([x, y], grid, [dx, dy]) => {
  const gridBounds = x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;

  if (gridBounds && grid[y][x] !== "#" && grid[y][x] !== "L") {
    const ay = y + dy;
    const ax = x + dx;

    return getFirstSeat([ax, ay], grid, [dx, dy]);
  }

  return [x, y];
};

const runRound = (grid) => {
  const res = [...grid.map((line) => [...line])];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const el = grid[y][x];

      const adjPos = [];
      adjPos.push(getFirstSeat([x, y - 1], grid, [0, -1]));
      adjPos.push(getFirstSeat([x - 1, y - 1], grid, [-1, -1]));
      adjPos.push(getFirstSeat([x + 1, y - 1], grid, [1, -1]));
      adjPos.push(getFirstSeat([x + 1, y], grid, [1, 0]));
      adjPos.push(getFirstSeat([x - 1, y], grid, [-1, 0]));
      adjPos.push(getFirstSeat([x, y + 1], grid, [0, 1]));
      adjPos.push(getFirstSeat([x - 1, y + 1], grid, [-1, 1]));
      adjPos.push(getFirstSeat([x + 1, y + 1], grid, [1, 1]));

      const adjs = adjPos
        .filter(
          ([x, y]) => x >= 0 && y >= 0 && x < grid[0].length && y < grid.length
        )
        .map(([ax, ay]) => {
          if (!grid[ay]) {
            console.log(ax, ay);
          }
          return grid[ay][ax];
        });

      if (el === "L" && !adjs.includes("#")) {
        res[y][x] = "#";
      }

      if (el === "#" && adjs.filter((ael) => ael === "#").length >= 5) {
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

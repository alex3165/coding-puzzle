const { read } = require("../../../util");

const input = read("./data.txt");

const orientationMap = {
  "-3": "S",
  "-2": "W",
  "-1": "N",
  0: "E",
  1: "S",
  2: "W",
  3: "N",
};

const getState = ({ x, y, a }, n, i) => {
  if (i === "N") {
    return {
      x,
      y: y + n,
      a,
    };
  }

  if (i === "S") {
    return {
      x,
      y: y - n,
      a,
    };
  }

  if (i === "E") {
    return {
      x: x + n,
      y,
      a,
    };
  }

  if (i === "W") {
    return {
      x: x - n,
      y,
      a,
    };
  }

  return undefined;
};

input
  .then((content) => {
    const parsedLines = content.map((line) => {
      const instruction = line.slice(0, 1);
      const strN = line.slice(1, line.length);
      return [instruction, parseInt(strN)];
    });

    const finalState = parsedLines.reduce(
      ({ x, y, a }, [i, n]) => {
        const facing = (a / 90) % 4;
        if (i === "L") {
          return {
            x,
            y,
            a: a - n,
          };
        }

        if (i === "R") {
          return {
            x,
            y,
            a: a + n,
          };
        }

        if (i === "F") {
          const orientation = orientationMap[String(facing)];
          return getState({ x, y, a }, n, orientation);
        }

        return getState({ x, y, a }, n, i);
      },
      {
        x: 0,
        y: 0,
        a: 0,
      }
    );
    console.log(finalState);
    return Math.abs(finalState.x) + Math.abs(finalState.y);
  })
  .then(console.log);

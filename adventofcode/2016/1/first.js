const { read } = require("../../../util");
const input = read("./first-input.txt");

input
  .then(([string]) => {
    const { x, y } = string.split(", ").reduce(
      (acc, next) => {
        const nextDir = next[0];
        const nextSteps = parseInt(next.slice(1));

        if (acc.facing === "north" && nextDir === "R") {
          return { x: acc.x + nextSteps, y: acc.y, facing: "east" };
        }

        if (acc.facing === "north" && nextDir === "L") {
          return { x: acc.x - nextSteps, y: acc.y, facing: "west" };
        }

        if (acc.facing === "east" && nextDir === "R") {
          return { x: acc.x, y: acc.y - nextSteps, facing: "south" };
        }

        if (acc.facing === "east" && nextDir === "L") {
          return { x: acc.x, y: acc.y + nextSteps, facing: "north" };
        }

        if (acc.facing === "west" && nextDir === "R") {
          return { x: acc.x, y: acc.y + nextSteps, facing: "north" };
        }

        if (acc.facing === "west" && nextDir === "L") {
          return { x: acc.x, y: acc.y - nextSteps, facing: "south" };
        }

        if (acc.facing === "south" && nextDir === "R") {
          return { x: acc.x - nextSteps, y: acc.y, facing: "west" };
        }

        if (acc.facing === "south" && nextDir === "L") {
          return { x: acc.x + nextSteps, y: acc.y, facing: "east" };
        }
      },
      { x: 0, y: 0, facing: "north" }
    );

    return Math.abs(x) + Math.abs(y);
  })
  .then(console.log);

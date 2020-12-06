const fs = require("fs");

const content = fs.readFileSync("./data.txt", "utf-8");

const parsedContent = content
  .split("\n\n")
  .map((passport) => passport.replace(/\n/g, " "));

const main = () => {
  const counts = parsedContent.map((group) => {
    const persons = group.split(" ");
    const total = persons.length;
    const dict = {};

    while (persons.length) {
      const c = persons.shift();
      c.split("").forEach((a) => {
        if (dict[a] === undefined) {
          dict[a] = 1;
        } else {
          dict[a] = dict[a] + 1;
        }
      });
    }

    return Object.keys(dict).filter((k) => dict[k] === total).length;
  });

  const totalCounts = counts.reduce((acc, next) => acc + next, 0);
  console.log(totalCounts);
};

main();

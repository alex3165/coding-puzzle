const fs = require("fs");

const content = fs.readFileSync("./data.txt", "utf-8");

const parsedContent = content
  .split("\n\n")
  .map((passport) => passport.replace(/\n/g, ""));

const main = () => {
  const count = parsedContent.reduce((acc, line) => {
    return acc + Array.from(new Set(line.split(""))).length;
  }, 0);

  console.log(count);
};

main();

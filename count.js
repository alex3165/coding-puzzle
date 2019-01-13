const fs = require("fs");

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      filelist.push(file);
    }
  });
  return filelist;
};

const count = walkSync("./adventofcode/").filter(
  file => file.includes(".js") && !file.includes("util")
);

const readme = fs.readFileSync("./readme.md", "utf-8");

fs.writeFileSync(
  "./readme.md",
  readme.replace(/\*\*(.+)\*\*/g, `**${count.length}/365**`)
);

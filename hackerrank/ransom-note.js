const { read } = require("../util");

read("./ransom-note-input.txt")
  .then(([_, magazine, note]) => {
    const noteDict = note.split(" ").reduce((acc, next) => {
      if (acc[next]) {
        acc[next] += 1;
      } else {
        acc[next] = 1;
      }

      return acc;
    }, {});

    magazine.split(" ").forEach(word => {
      if (typeof noteDict[word] === "number" && noteDict[word] > 0) {
        noteDict[word] = noteDict[word] - 1;
      }
    });

    const hasMissingWord = Object.values(noteDict).some(val => val !== 0);

    return hasMissingWord ? "NO" : "YES";
  })
  .then(console.log);

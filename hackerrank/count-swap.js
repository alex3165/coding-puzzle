const { read } = require("../util");

read("./count-swap-input.txt")
  .then(([_, s]) => {
    const arr = s.split(" ").map(el => parseInt(el));
    let swapCount = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          swapCount++;
        }
      }
    }

    return [
      `Array is sorted in ${swapCount} swaps.`,
      `First Element: ${arr[0]}`,
      `Last Element: ${arr[arr.length - 1]}`
    ].join("\n");
  })
  .then(console.log);

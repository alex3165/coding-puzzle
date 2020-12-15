const { read, range } = require("../../../util");

const input = read("./data.txt");

const computeResult = (mask, value) => {
  const powRange = range(mask.length, 0)
    .map((index) => Math.pow(2, index))
    .reverse();

  return powRange.map((powVal, index) => {
    const maskInstruction = mask[index];
    if (powVal > value && maskInstruction === "X") {
      return 0;
    }

    if (powVal > value && maskInstruction !== "X") {
      return parseInt(maskInstruction);
    }

    if (powVal <= value && maskInstruction === "X") {
      value = value - powVal;
      return 1;
    }

    if (powVal <= value && maskInstruction !== "X") {
      value = value - powVal;
      return parseInt(maskInstruction);
    }
  });
};

const binaryToDecimal = (bin) => {
  const powRange = range(bin.length, 0)
    .map((index) => Math.pow(2, index))
    .reverse();

  return bin.reduce((acc, next, index) => {
    if (next === 1) {
      return acc + powRange[index];
    }

    return acc;
  }, 0);
};

input
  .then((content) => {
    const parsedContent = content.map((el) =>
      el.split("=").map((t) => t.trim())
    );

    let mask;
    const res = parsedContent.reduce((addressDict, [key, value]) => {
      if (key === "mask") {
        mask = value;
        return addressDict;
      }

      const address = key.replace("mem[", "").replace("]", "");

      addressDict[address] = binaryToDecimal(
        computeResult(mask, parseInt(value))
      );

      return addressDict;
    }, {});

    return Object.values(res).reduce((acc, next) => acc + next, 0);
  })
  .then(console.log);

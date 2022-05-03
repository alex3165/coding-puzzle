const { read } = require("../util");

const migratoryBirds = (arr) => {
  const countDict = arr.reduce((acc, next) => {
    if (!acc[next]) {
      acc[next] = 1;
    } else {
      acc[next] += 1;
    }

    return acc;
  }, {});

  console.log(countDict);

  const [id, val] = Object.keys(countDict).reduce(([id, n], nextKey) => {
    const nextValue = countDict[nextKey];
    if (id === undefined) {
      return [nextKey, nextValue];
    }

    if (nextValue > n) {
      return [nextKey, nextValue];
    }

    if (n === nextValue && parseInt(nextKey) < parseInt(id)) {
      return [nextKey, nextValue];
    }

    return [id, n];
  }, []);

  return id;
};

const main = async () => {
  const [_, second] = await read("./migratory-birds.txt");
  const input = second.split(" ").map(Number);
  console.log(migratoryBirds(input));
};

main();

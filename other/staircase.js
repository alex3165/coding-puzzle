const input = 100;

const range = (n) => [...Array(n).keys()];

const staircase = (n) => {
  return range(n)
    .map((i) => {
      return range(n)
        .map((j) => (j <= i ? "#" : " "))
        .reverse()
        .join("");
    })
    .join("\n");
};

const res = staircase(input);
console.log(res);

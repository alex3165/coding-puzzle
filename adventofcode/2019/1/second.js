const { read } = require("../../../util");

const input = read("./second-input.txt");

const whileNotNeg = (input, sum) => {
    const currentN = Math.floor(input / 3) - 2
    return currentN > 0 ? whileNotNeg(currentN, sum + currentN) : sum
}

input
    .then(content => {
        const parsedContent = content.map(v => whileNotNeg(parseInt(v), 0));

        return parsedContent.reduce((acc, next) => {
            return acc + next;
        }, 0);
    })
    .then(console.log);

const { read } = require("../../../util");

const input = read("./first-input.txt");

input
    .then(content => {
        const parsedContent = content.map(v => {
            return Math.floor(parseInt(v) / 3) - 2
        });

        return parsedContent.reduce((acc, next) => {
            return acc + next;
        }, 0);
    })
    .then(console.log);

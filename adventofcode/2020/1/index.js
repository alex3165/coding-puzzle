const { read } = require("../../../util");

const input = read("./data.txt");

input
  .then((content) => {
    const parsedContent = content.map(Number);
    let answer = 0;

    for (let i = 0; i < parsedContent.length; i++) {
        for (let j = parsedContent.length; j > 0; j--) {
            if (i !== j) {
                res = parsedContent[i] + parsedContent[j]

                const lastNumber = parsedContent.find((n, k) => res + n === 2020 && i !== k && j !== k)

                if (lastNumber) {
                  answer = parsedContent[i] * parsedContent[j] * lastNumber;
                  break;
                }
            }
        }

        if (!!answer) {
            break;
        }
    }

    return answer
  })
  .then(console.log);

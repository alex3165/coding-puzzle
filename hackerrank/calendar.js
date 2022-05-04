const { read } = require("../util");

const stringifyN = (n) => {
  if (String(n).length === 1) {
    return `0${n}`;
  } else {
    return String(n);
  }
};

const main = () => {
  read("./calendar.txt").then(([first]) => {
    const y = parseInt(first);
    const day = 256;
    const isGeorgianLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const isJulianleapYear = y % 4 === 0;
    const isLeapYear = y < 1918 ? isJulianleapYear : isGeorgianLeapYear;
    const monthDays = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    const res = monthDays.reduce(
      (acc, next) => {
        if (acc.complete) {
          return acc;
        }

        if (acc.days - next > 0) {
          return {
            days: acc.days - next,
            month: acc.month + 1,
            day: 0,
            complete: false,
          };
        }

        if (acc.days - next <= 0) {
          return {
            days: 0,
            month: acc.month + 1,
            day: acc.days,
            complete: true,
          };
        }

        return acc;
      },
      { days: day, month: 0, day: 0, complete: false }
    );

    console.log(`${stringifyN(res.day)}.${stringifyN(res.month)}.${String(y)}`);
  });
};

main();

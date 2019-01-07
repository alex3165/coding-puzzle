const { read } = require("../../util");
const { parseDedupe } = require("./util");
const input = read("./first-input.txt");
const moment = require("moment");

const getDateKey = date =>
  moment(date)
    .add(30, "minutes")
    .format("YYYY-MM-DD");

const groupRecords = records => {
  const grouped = {};

  records.forEach(([date, instruction], index) => {
    if (instruction.includes("Guard")) {
      grouped[getDateKey(date)] = [[date, instruction]];
    } else if (Array.isArray(grouped[getDateKey(date)])) {
      grouped[getDateKey(date)].push([date, instruction]);
    } else {
      grouped[getDateKey(date)] = [[date, instruction]];
    }
  });

  return grouped;
};

const extractId = string =>
  parseInt(string.split(/Guard #(.+) begins shift/)[1]);

input
  .then(content => parseDedupe(content))
  .then(records => groupRecords(records))
  .then(records => {
    const mapGuardIdToTime = {};

    Object.values(records).forEach(instructions => {
      const guardInstruction = instructions.shift();
      const guardId = extractId(guardInstruction[1]);

      for (let i = 0; i < instructions.length; i = i + 2) {
        const sleep = instructions[i];
        const awake = instructions[i + 1];
        const diff = moment(awake[0]).diff(moment(sleep[0]), "minutes");

        if (mapGuardIdToTime[guardId]) {
          mapGuardIdToTime[guardId].total += diff;
          mapGuardIdToTime[guardId].entries.push(diff - 1);
        } else {
          mapGuardIdToTime[guardId] = {
            id: guardId,
            total: diff,
            entries: [diff - 1]
          };
        }
      }
    });

    const sorted = Object.values(mapGuardIdToTime).sort((a, b) =>
      a.total > b.total ? -1 : 1
    );

    return sorted[0].id * sorted[0].entries.sort((a, b) => (a > b ? -1 : 1))[0];
  })
  .then(console.log);

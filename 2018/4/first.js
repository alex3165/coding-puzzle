const { read } = require("../../util");
const { parseDedupe } = require("./util");
const input = read("./first-input.txt");
const moment = require("moment");
const { range } = require("../../util");

const getDateKey = date =>
  moment(date)
    .add(30, "minutes")
    .format("YYYY-MM-DD");

const mode = arr =>
  arr
    .sort(
      (a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop();

const groupRecords = records => {
  return records.reduce((grouped, [date, instruction]) => {
    if (Array.isArray(grouped[getDateKey(date)])) {
      grouped[getDateKey(date)].push([date, instruction]);
    } else {
      grouped[getDateKey(date)] = [[date, instruction]];
    }

    return grouped;
  }, {});
};

const extractId = string =>
  parseInt(string.split(/Guard #(.+) begins shift/)[1]);

input
  .then(content => parseDedupe(content))
  .then(records => groupRecords(records))
  .then(records => {
    const mapGuardIdToTime = {};

    Object.values(records).forEach(instructions => {
      const guardId = extractId(instructions.shift()[1]);

      for (let i = 0; i < instructions.length; i = i + 2) {
        const sleep = moment(instructions[i][0])
          .utc()
          .minutes();
        const awake = moment(instructions[i + 1][0])
          .utc()
          .minutes();

        const diff = awake - sleep;
        const currentRange = range(diff, sleep);

        if (mapGuardIdToTime[guardId]) {
          mapGuardIdToTime[guardId].total += diff;
          mapGuardIdToTime[guardId].range = mapGuardIdToTime[
            guardId
          ].range.concat(currentRange);
        } else {
          mapGuardIdToTime[guardId] = {
            total: diff,
            id: guardId,
            range: currentRange
          };
        }
      }
    });

    const sorted = Object.values(mapGuardIdToTime).sort((a, b) =>
      a.total > b.total ? -1 : 1
    );

    return mode(sorted[0].range) * sorted[0].id;
  })
  .then(console.log);

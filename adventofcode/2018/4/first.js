const { read, range, mode } = require("../../util");
const { parseDedupe } = require("./util");
const input = read("./first-input.txt");
const moment = require("moment");

const extractId = string =>
  parseInt(string.split(/Guard #(.+) begins shift/)[1]);

input
  .then(content => parseDedupe(content))
  .then(records => {
    const mapGuardIdToTime = {};
    let currentGuardId;

    while (!!records.length) {
      if (records[0][1].includes("Guard")) {
        currentGuardId = extractId(records.shift()[1]);
      }

      const sleep = moment(records.shift()[0])
        .utc()
        .minutes();
      const awake = moment(records.shift()[0])
        .utc()
        .minutes();

      const diff = awake - sleep;
      const currentRange = range(diff, sleep);

      if (mapGuardIdToTime[currentGuardId]) {
        mapGuardIdToTime[currentGuardId].total += diff;
        mapGuardIdToTime[currentGuardId].range = mapGuardIdToTime[
          currentGuardId
        ].range.concat(currentRange);
      } else {
        mapGuardIdToTime[currentGuardId] = {
          total: diff,
          id: currentGuardId,
          range: currentRange
        };
      }
    }

    const sorted = Object.values(mapGuardIdToTime).sort((a, b) =>
      a.total > b.total ? -1 : 1
    );

    return mode(sorted[0].range) * sorted[0].id;
  })
  .then(console.log);

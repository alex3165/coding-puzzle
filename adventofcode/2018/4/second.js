const { read, range, mode } = require("../../../util");
const { parseDedupe } = require("./util");
const input = read("./second-input.txt");
const moment = require("moment");

const mode = arr =>
  arr
    .sort(
      (a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop();

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
        mapGuardIdToTime[currentGuardId].range = mapGuardIdToTime[
          currentGuardId
        ].range.concat(currentRange);
      } else {
        mapGuardIdToTime[currentGuardId] = {
          id: currentGuardId,
          range: currentRange
        };
      }
    }

    const guardOccurences = Object.values(mapGuardIdToTime)
      .map(guardData => {
        const day = mode(guardData.range);
        const numberOccurence = guardData.range.filter(d => d === day).length;

        return { id: guardData.id, numberOccurence, day };
      })
      .sort((a, b) => (a.numberOccurence > b.numberOccurence ? -1 : 1));

    return guardOccurences[0].id * guardOccurences[0].day;
  })
  .then(console.log);

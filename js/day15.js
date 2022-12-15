let fs = require("fs");
let input = fs.readFileSync("day15.txt", { encoding: "utf8" });
let data = input
  .split("\r\n")
  .map((line) => line.split(": closest beacon is at "))
  .map((line) => [
    line[0]
      .substring(10)
      .split(", ")
      .map((val) => parseInt(val.substring(2))),
    line[1].split(", ").map((val) => parseInt(val.substring(2))),
  ])
  .map((pair) => ({
    sensor: { x: pair[0][0], y: pair[0][1] },
    beacon: { x: pair[1][0], y: pair[1][1] },
  }));

const manhattan = (sensor, beacon) => {
  return Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
};

const getRangeInLine = (sensor, beacon, line) => {
  const m = manhattan(sensor, beacon);
  const distance = Math.abs(line - sensor.y);
  // sensor is too far away
  if (distance > m) return null;
  else {
    return { min: sensor.x - (m - distance), max: sensor.x + (m - distance) };
  }
};

const isInRange = (value, range) => {
  return value >= range.min && value <= range.max;
};

const silver = (lineNr) => {
  const ranges = data
    .map((pair) => getRangeInLine(pair.sensor, pair.beacon, lineNr))
    .filter((range) => range != null);

  let beaconsInLine = 0;
  const beaconsSet = new Set();
  data.forEach((pair) => {
    if (pair.beacon.y == lineNr) {
      if (!beaconsSet.has(JSON.stringify(pair.beacon))) {
        beaconsInLine++;
        beaconsSet.add(JSON.stringify(pair.beacon));
      }
    }
  });

  const minX = ranges.reduce(
    (acc, val) => Math.min(acc, val.min),
    Number.POSITIVE_INFINITY
  );
  const maxX = ranges.reduce(
    (acc, val) => Math.max(acc, val.max),
    Number.NEGATIVE_INFINITY
  );

  let silver = 0;
  for (let i = minX; i <= maxX; i++) {
    silver += ranges.some((range) => isInRange(i, range)) ? 1 : 0;
  }
  return silver - beaconsInLine;
};
console.log("silver:", silver(2000000));

// GOLD
const beaconsSet = new Set();
data.forEach((pair) => {
  beaconsSet.add(JSON.stringify(pair.beacon));
});

const isOverlapping = (range1, range2) => {
  // range 1 and 2 are sorted
  return range2.min <= range1.max;
};

const findSpotInLine = (ranges, y, lineWidth) => {
  let i = 1;
  let min = ranges[i - 1].min;
  let max = ranges[i - 1].max;
  while (i < ranges.length && max <= lineWidth) {
    let over = isOverlapping({ min, max }, ranges[i]);
    if (over) {
      max = Math.max(max, ranges[i].max);
      i++;
    } else {
      let v = max + 1;
      while (v < ranges[i].min) {
        if (!beaconsSet.has(JSON.stringify({ x: v, y }))) return [v, y];
        v++;
      }
      max = ranges[i].min;
    }
  }
  return false;
};

const checkLine = (lineNr) => {
  const ranges = data
    .map((pair) => getRangeInLine(pair.sensor, pair.beacon, lineNr))
    .filter((range) => range != null)
    .sort((a, b) => a.min - b.min);
  return findSpotInLine(ranges, lineNr, 4000000);
};

const gold = () => {
  for (let i = 0; i < 4000000; i++) {
    let res = checkLine(i);
    if (res) return res[0] * 4000000 + res[1];
  }
  return "sad";
};

console.log("gold:", gold());

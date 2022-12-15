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
  ]);

const manhattan = (sensor, beacon) => {
  return Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
};

const getRangeInLine = (sensor, beacon, line) => {
  const m = manhattan(sensor, beacon);
  const distance = Math.abs(line - sensor[1]);
  // sensor is too far away
  if (distance > m) return null;
  else {
    return [sensor[0] - (m - distance), sensor[0] + (m - distance)];
  }
};

const isInRange = (value, range) => {
  return value >= range[0] && value <= range[1];
};

const silver = (lineNr) => {
  const ranges = data
    .map((pair) => getRangeInLine(pair[0], pair[1], lineNr))
    .filter((range) => range != null);

  let beaconsInLine = 0;
  const beaconsSet = new Set();
  data.forEach((pair) => {
    if (pair[1][1] == lineNr) {
      if (!beaconsSet.has(JSON.stringify(pair[1]))) {
        beaconsInLine++;
        beaconsSet.add(JSON.stringify(pair[1]));
      }
    }
  });

  const minX = ranges.reduce(
    (acc, val) => Math.min(acc, val[0]),
    Number.POSITIVE_INFINITY
  );
  const maxX = ranges.reduce(
    (acc, val) => Math.max(acc, val[1]),
    Number.NEGATIVE_INFINITY
  );

  let silver = 0;
  let l = "";
  for (let i = minX; i <= maxX; i++) {
    silver += ranges.some((range) => isInRange(i, range)) ? 1 : 0;
    l += ranges.some((range) => isInRange(i, range)) ? "#" : ".";
  }
  return silver - beaconsInLine;
};
console.log("silver:", silver(2000000));

const beaconsSet = new Set();
data.forEach((pair) => {
  beaconsSet.add(JSON.stringify(pair[1]));
});

const isOverlapping = (range1, range2) => {
  // range 1 and 2 are sorted
  return range2[0] <= range1[1];
};

const findUnicorn = (ranges, y, lineWidth) => {
  let i = 1;
  let min = ranges[i - 1][0];
  let max = ranges[i - 1][1];
  while (i < ranges.length && max <= lineWidth) {
    let over = isOverlapping([min, max], ranges[i]);
    if (over) {
      max = Math.max(max, ranges[i][1]);
      i++;
    } else {
      let v = max + 1;
      while (v < ranges[i][0]) {
        if (!beaconsSet.has(JSON.stringify([v, y]))) return [v, y];
        v++;
      }
      max = ranges[i][0];
    }
  }
  return false;
};

const silverGold = (lineNr) => {
  const ranges = data
    .map((pair) => getRangeInLine(pair[0], pair[1], lineNr))
    .filter((range) => range != null)
    .sort((a, b) => a[0] - b[0]);
  return findUnicorn(ranges, lineNr, 4000000);
};

const gold = () => {
  for (let i = 0; i < 4000000; i++) {
    let res = silverGold(i);
    if (res) return res[0] * 4000000 + res[1];
  }
  return "sad";
};

console.log("gold:", gold());

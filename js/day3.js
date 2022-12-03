let fs = require("fs");

const input = fs.readFileSync("day3.txt", { encoding: "utf8" });
const data = input.split("\r\n");
const priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rucksacks = data.map((line) => [
  line.substring(0, line.length / 2),
  line.substring(line.length / 2),
]);
const silver = rucksacks.reduce((acc, compartments) => {
  for (let i = 0; i < compartments[0].length; i++) {
    if (compartments[1].includes(compartments[0][i])) {
      return acc + priorities.indexOf(compartments[0][i]) + 1;
    }
  }
  return acc;
}, 0);
console.log(silver);
const datagold = [];
for (let i = 0; i < data.length; i += 3) {
  datagold.push([data[i], data[i + 1], data[i + 2]]);
}
const gold = datagold.reduce((acc, badgeData) => {
  for (let i = 0; i < badgeData[0].length; i++) {
    if (
      badgeData[1].includes(badgeData[0][i]) &&
      badgeData[2].includes(badgeData[0][i])
    ) {
      return acc + priorities.indexOf(badgeData[0][i]) + 1;
    }
  }
  return acc;
}, 0);
console.log(gold);

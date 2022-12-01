let fs = require('fs');

const input = fs.readFileSync("day1.txt", { encoding: 'utf8' });
const elves = input
  .split("\n\n")
  .map((elf) =>
    elf
      .split("\n")
      .map((item) => parseInt(item))
      .reduce((acc, val) => acc + val, 0)
  ).sort((a, b) => b - a);
const silver = elves[0];
const gold = elves[0] + elves[1] + elves[2];
console.log({ silver, gold });
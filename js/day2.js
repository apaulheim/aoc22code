let fs = require("fs");

const input = fs.readFileSync("day2.txt", { encoding: "utf8" });
const data = input.split("\r\n");
const scores = new Map();
scores.set("X", 1);
scores.set("Y", 2);
scores.set("Z", 3);
const outcomes = new Map();
outcomes.set("A X", 3);
outcomes.set("A Y", 6);
outcomes.set("A Z", 0);
outcomes.set("B X", 0);
outcomes.set("B Y", 3);
outcomes.set("B Z", 6);
outcomes.set("C X", 6);
outcomes.set("C Y", 0);
outcomes.set("C Z", 3);
const silver = data
  .map((game) => {
    const [_, you] = game.split(" ");
    return scores.get(you) + outcomes.get(game);
  })
  .reduce((acc, val) => acc + val, 0);
console.log(silver);

const outcomes2 = new Map();
outcomes2.set("X", 0);
outcomes2.set("Y", 3);
outcomes2.set("Z", 6);
const scores2 = new Map();
scores2.set("A X", 3); // rock paper scissors
scores2.set("A Y", 1);
scores2.set("A Z", 2);
scores2.set("B X", 1);
scores2.set("B Y", 2);
scores2.set("B Z", 3);
scores2.set("C X", 2);
scores2.set("C Y", 3);
scores2.set("C Z", 1);
const gold = data
  .map((game) => {
    const [_, you] = game.split(" ");
    return scores2.get(game) + outcomes2.get(you);
  })
  .reduce((acc, val) => acc + val, 0);
console.log(gold);

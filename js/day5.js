let fs = require("fs");

let input = fs.readFileSync("day5.txt", { encoding: "utf8" });
let [cratesDef, procedureDef] = input.split("\r\n\r\n");

const parseCrates = () => {
  let cratesLines = cratesDef.split("\r\n").reverse();
  let stacks = [];
  const numCrates = cratesLines[0].split("  ").length;
  for (let i = 0; i < numCrates; i++) {
    stacks.push([]);
  }
  for (let i = 1; i < cratesLines.length; i++) {
    for (let j = 0; j < numCrates; j++) {
      const crate = cratesLines[i].substring(j * 4 + 1, j * 4 + 2);
      if (crate != " ") stacks[j].push(crate);
    }
  }
  return stacks;
};
let procedures = procedureDef.split("\r\n").map((line) =>
  line
    .split(" ")
    .filter((v) => v != "move" && v != "from" && v != "to")
    .map((n) => parseInt(n))
);

// silver
let stacks = parseCrates();
for (let i = 0; i < procedures.length; i++) {
  const [move, from, to] = procedures[i];
  const moved = stacks[from - 1].splice(stacks[from - 1].length - move, move);
  moved.reverse();
  stacks[to - 1].push(...moved);
}
let silver = "";
for (let i = 0; i < stacks.length; i++) {
  silver += stacks[i][stacks[i].length - 1];
}
console.log("silver", silver);

// gold
stacks = parseCrates();
for (let i = 0; i < procedures.length; i++) {
  const [move, from, to] = procedures[i];
  const moved = stacks[from - 1].splice(stacks[from - 1].length - move, move);
  stacks[to - 1].push(...moved);
}
let gold = "";
for (let i = 0; i < stacks.length; i++) {
  gold += stacks[i][stacks[i].length - 1];
}
console.log("gold", gold);

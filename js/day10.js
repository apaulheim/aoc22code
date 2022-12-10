let fs = require("fs");

let input = fs.readFileSync("day10.txt", { encoding: "utf8" });

let cmds = input.split("\r\n").map((cmd) => {
  const [cmdStr, numstr] = cmd.split(" ");
  return [cmdStr, parseInt(numstr)];
});

let cycle = 0;
let i = 0;
let value = 1;
let silver = 0;

const checkSignalStrength = (cycle, value) => {
  if (cycle == 20 || (cycle > 20 && (cycle - 20) % 40 == 0)) {
    silver += cycle * value;
  }
};

while (i < cmds.length) {
  const [cmd, arg] = cmds[i];
  if (cmd == "noop") {
    cycle++;
    checkSignalStrength(cycle, value);
  } else if (cmd == "addx") {
    cycle++;
    checkSignalStrength(cycle, value);
    cycle++;
    checkSignalStrength(cycle, value);
    value += arg;
  }
  i++;
}

console.log("silver:", silver);

cycle = 0;
i = 0;
value = 1;
let gold = "";

const writePixel = (cycle, value) => {
  if ((cycle % 40) - 1 >= value - 1 && (cycle % 40) - 1 <= value + 1) {
    gold += "#";
  } else gold += ".";
};

const printGold = () => {
  for (let j = 0; j <= gold.length - 40; j += 40) {
    console.log(gold.substring(j, j + 40));
  }
};

while (i < cmds.length) {
  const [cmd, arg] = cmds[i];
  if (cmd == "noop") {
    cycle++;
    writePixel(cycle, value);
  } else if (cmd == "addx") {
    cycle++;
    writePixel(cycle, value);
    cycle++;
    writePixel(cycle, value);
    value += arg;
    // console.log(value);
  }
  i++;
}
console.log("gold:");
printGold();

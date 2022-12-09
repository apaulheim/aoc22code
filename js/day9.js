let fs = require("fs");
const { REPL_MODE_SLOPPY } = require("repl");

let input = fs.readFileSync("day9.txt", { encoding: "utf8" });

let directions = input.split("\r\n");

let head = [0, 0];
let tail = [0, 0];

const tailPositions = new Set();

const floatToInt = (n) => {
  if (n == 0) return 0;
  else if (n > 0) return Math.ceil(n);
  else return Math.floor(n);
};

const moveTail = (h, t) => {
  if (Math.abs(h[0] - t[0]) > 1 || Math.abs(h[1] - t[1]) > 1) {
    const sub = [floatToInt((h[0] - t[0]) / 2), floatToInt((h[1] - t[1]) / 2)];
    if (sub[0]) t[0] = t[0] + sub[0];
    t[1] = t[1] + sub[1];
  }
  tailPositions.add(`${t[0]},${t[1]}`);
};

const moveHeadOne = (h, t, dir) => {
  switch (dir) {
    case "U":
      h[1] = h[1] + 1;
      break;
    case "R":
      h[0] = h[0] + 1;
      break;
    case "D":
      h[1] = h[1] - 1;
      break;
    case "L":
      h[0] = h[0] - 1;
  }
  moveTail(h, t);
};

const draw = (h, t) => {
  for (let i = 4; i >= 0; i--) {
    let line = "";
    for (let j = 0; j < 6; j++) {
      if (h[0] == j && h[1] == i) line += "H";
      else if (t[0] == j && t[1] == i) line += "T";
      else line += ".";
    }
    console.log(line);
  }
  console.log();
};

// silver
// draw(head, tail);
for (let i = 0; i < directions.length; i++) {
  const [dir, numStr] = directions[i].split(" ");
  const num = parseInt(numStr);
  for (let j = 0; j < num; j++) {
    moveHeadOne(head, tail, dir);
    // draw(head, tail);
  }
}
console.log("silver:", tailPositions.size);

let rope = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

const tailPositionsGold = new Set();

const moveTailGold = (h, t) => {
  if (Math.abs(h[0] - t[0]) > 1 || Math.abs(h[1] - t[1]) > 1) {
    const sub = [floatToInt((h[0] - t[0]) / 2), floatToInt((h[1] - t[1]) / 2)];
    if (sub[0]) t[0] = t[0] + sub[0];
    t[1] = t[1] + sub[1];
  }
};

const moveHeadOneGold = (h, dir) => {
  switch (dir) {
    case "U":
      h[1] = h[1] + 1;
      break;
    case "R":
      h[0] = h[0] + 1;
      break;
    case "D":
      h[1] = h[1] - 1;
      break;
    case "L":
      h[0] = h[0] - 1;
  }
};

// gold
for (let i = 0; i < directions.length; i++) {
  const [dir, numStr] = directions[i].split(" ");
  const num = parseInt(numStr);
  for (let j = 0; j < num; j++) {
    moveHeadOneGold(rope[0], dir);
    for (let k = 1; k < rope.length; k++) {
      moveTailGold(rope[k - 1], rope[k]);
    }
    tailPositionsGold.add(`${rope[9][0]},${rope[9][1]}`);
  }
}
console.log("gold:", tailPositionsGold.size);

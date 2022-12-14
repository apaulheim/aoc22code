let fs = require("fs");
let input = fs.readFileSync("day14.txt", { encoding: "utf8" });
let data = input
  .split("\r\n")
  .map((line) => line.split(" -> ").map((coords) => coords.split(",")));

let min = [Number.POSITIVE_INFINITY, 0];
let max = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
for (let line of data) {
  for (let coords of line) {
    min[0] = Math.min(min[0], coords[0]);
    max[0] = Math.max(max[0], coords[0]);
    max[1] = Math.max(max[1], coords[1]);
  }
}

const printGrid = (grid) => {
  for (let line of grid) {
    let p = "";
    for (let i of line) p += i;
    console.log(p);
  }
  console.log();
};

const initGrid = (gold) => {
  let grid = [];
  for (let i = 0; i <= max[1] - min[1]; i++) {
    let line = [];
    for (let j = 0; j <= max[0] - min[0]; j++) line.push(".");
    grid.push(line);
  }

  for (let line of data) {
    let currentX = line[0][0] - min[0];
    let currentY = line[0][1] - min[1];
    for (let i = 1; i < line.length; i++) {
      let goalX = line[i][0] - min[0];
      let goalY = line[i][1] - min[1];
      grid[currentY][currentX] = "#";
      while (currentX != goalX || currentY != goalY) {
        currentX += Math.sign(goalX - currentX);
        currentY += Math.sign(goalY - currentY);
        grid[currentY][currentX] = "#";
      }
    }
  }
  if (gold) {
    let l = [];
    for (let j = 0; j <= max[0] - min[0]; j++) l.push(".");
    grid.push(l);
    l = [];
    for (let j = 0; j <= max[0] - min[0]; j++) l.push("#");
    grid.push(l);
  }
  return grid;
};

const xInRange = (x) => {
  return x >= 0 && x < grid[0].length;
};

const yInRange = (y) => {
  return y >= 0 && y < grid.length;
};

const sandFalling = () => {
  let x = 500 - min[0];
  let y = 0;
  let rest = false;
  if (grid[y][x] == "o") return false;
  while (!rest && xInRange(x) && yInRange(y)) {
    if (yInRange(y + 1) && (grid[y + 1][x] == "#" || grid[y + 1][x] == "o")) {
      // fall to the left
      if (
        yInRange(y + 1) &&
        xInRange(x - 1) &&
        grid[y + 1][x - 1] != "#" &&
        grid[y + 1][x - 1] != "o"
      ) {
        y++;
        x--;
      }
      // to the right
      else if (
        yInRange(y + 1) &&
        xInRange(x + 1) &&
        grid[y + 1][x + 1] != "#" &&
        grid[y + 1][x + 1] != "o"
      ) {
        y++;
        x++;
      } else rest = true;
    } else y++;
  }
  if (xInRange(x) && yInRange(y)) grid[y][x] = "o";
  return rest;
};

let grid = initGrid(false);
let silver = 0;
while (sandFalling()) {
  silver++;
}
printGrid(grid);
console.log("silver:", silver);

// GOLD
min[0] = min[0] - 1000;
max[0] = max[0] + 1000;
grid = initGrid(true);
let gold = 0;
while (sandFalling()) {
  gold++;
}
console.log("gold:", gold);

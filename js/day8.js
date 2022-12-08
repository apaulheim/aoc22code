let fs = require("fs");

let input = fs.readFileSync("day8.txt", { encoding: "utf8" });

let lines = input.split("\r\n");

let data = [];
let visible = [];
let scenic = [];
for (let i = 0; i < lines.length; i++) {
  let row = [];
  let visibleRow = [];
  let scenicRow = [];
  for (let j = 0; j < lines[i].length; j++) {
    row.push(parseInt(lines[i][j]));
    visibleRow.push(0);
    scenicRow.push(0);
  }
  data.push(row);
  visible.push(visibleRow);
  scenic.push(scenicRow);
}

// parse from left
for (let i = 0; i < data.length; i++) {
  let currentTreeHeight = data[i][0];
  visible[i][0] = 1;
  for (let j = 1; j < data[i].length; j++) {
    if (data[i][j] > currentTreeHeight) {
      visible[i][j] = 1;
      currentTreeHeight = data[i][j];
    }
    if (currentTreeHeight == 9) break;
  }
}

// parse from right
for (let i = 0; i < data.length; i++) {
  let currentTreeHeight = data[i][data[i].length - 1];
  visible[i][data[i].length - 1] = 1;
  for (let j = data[i].length - 2; j >= 0; j--) {
    if (data[i][j] > currentTreeHeight) {
      visible[i][j] = 1;
      currentTreeHeight = data[i][j];
    }
    if (currentTreeHeight == 9) break;
  }
}

// parse from top
for (let j = 0; j < data[0].length; j++) {
  let currentTreeHeight = data[0][j];
  visible[0][j] = 1;
  for (let i = 0; i < data.length; i++) {
    if (data[i][j] > currentTreeHeight) {
      visible[i][j] = 1;
      currentTreeHeight = data[i][j];
    }
    if (currentTreeHeight == 9) break;
  }
}

// parse from bottom
for (let j = 0; j < data[0].length; j++) {
  let currentTreeHeight = data[data.length - 1][j];
  visible[data.length - 1][j] = 1;
  for (let i = data.length - 2; i >= 0; i--) {
    if (data[i][j] > currentTreeHeight) {
      visible[i][j] = 1;
      currentTreeHeight = data[i][j];
    }
    if (currentTreeHeight == 9) break;
  }
}

let visibleTrees = 0;
for (let i = 0; i < visible.length; i++) {
  for (let j = 0; j < visible[i].length; j++) {
    if (visible[i][j] == 1) {
      visibleTrees++;
    }
  }
}
console.log("silver:", visibleTrees);

let maxScenic = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    currentTreeHeight = data[i][j];
    // look up
    let up = 0;
    for (let i2 = i - 1; i2 >= 0; i2--) {
      if (data[i2][j] < currentTreeHeight) up++;
      if (data[i2][j] >= currentTreeHeight) {
        up++;
        break;
      }
    }
    // look down
    let down = 0;
    for (let i2 = i + 1; i2 < data.length; i2++) {
      if (data[i2][j] < currentTreeHeight) down++;
      if (data[i2][j] >= currentTreeHeight) {
        down++;
        break;
      }
    }
    // look left
    let left = 0;
    for (let j2 = j - 1; j2 >= 0; j2--) {
      if (data[i][j2] < currentTreeHeight) left++;
      if (data[i][j2] >= currentTreeHeight) {
        left++;
        break;
      }
    }
    // look right
    let right = 0;
    for (let j2 = j + 1; j2 < data[i].length; j2++) {
      if (data[i][j2] < currentTreeHeight) right++;
      if (data[i][j2] >= currentTreeHeight) {
        right++;
        break;
      }
    }
    scenic[i][j] = up * down * left * right;
    if (scenic[i][j] > maxScenic) maxScenic = scenic[i][j];
  }
}
console.log("gold:", maxScenic);

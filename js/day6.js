let fs = require("fs");

let input = fs.readFileSync("day6.txt", { encoding: "utf8" });

const getMarker = (len) => {
  for (let i = 0; i < input.length - len; i++) {
    const set = new Set();
    for (let j = 0; j < len; j++) {
      set.add(input[i + j]);
    }
    if (set.size == len) {
      return i + len;
    }
  }
};

const silver = getMarker(4);
const gold = getMarker(14);
console.log("silver:", silver);
console.log("gold:", gold);

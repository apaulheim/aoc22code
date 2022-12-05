let fs = require("fs");

let input = fs.readFileSync("day4.txt", { encoding: "utf8" });
const pairs = input
  .split("\r\n")
  .map((p) => p.split(",").map((t) => t.split("-").map((v) => parseInt(v))));

const contained = (t1, t2) => {
  return t1[0] <= t2[0] && t1[1] >= t2[1];
};

const notOverlapped = (t1, t2) => {
  return t1[0] < t2[0] && t1[1] < t2[0];
};

const silver = pairs.filter((p) => {
  return contained(p[0], p[1]) || contained(p[1], p[0]);
}).length;
console.log("silver:", silver);

const gold = pairs.filter((p) => {
  return !(notOverlapped(p[0], p[1]) || notOverlapped(p[1], p[0]));
});
console.log("gold:", gold.length);

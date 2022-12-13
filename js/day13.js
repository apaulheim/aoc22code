let fs = require("fs");
let input = fs.readFileSync("day13.txt", { encoding: "utf8" });
let pairs = input.split("\r\n\r\n").map((pairStr) => {
  const [leftStr, rightStr] = pairStr.split("\r\n");
  return JSON.parse(`{ "left": ${leftStr}, "right": ${rightStr} }`);
});

const CompareResult = {
  False: 0,
  True: 1,
  Equal: 2,
};

const compare = (left, right) => {
  if (!left) return CompareResult.True; // left side ran out of items
  if (!right) return CompareResult.False; // right side ran out of items
  if (typeof left == "number" && typeof right == "number") {
    return left < right
      ? CompareResult.True
      : left == right
      ? CompareResult.Equal
      : CompareResult.False;
  }
  if (typeof left == "number" && Array.isArray(right)) {
    return compare([left], right);
  }
  if (Array.isArray(left) && typeof right == "number") {
    return compare(left, [right]);
  }
  // last case: two arrays
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    let res = compare(left[i], right[i]);
    if (res != CompareResult.Equal) return res;
  }
  return CompareResult.Equal;
};

let silver = pairs.reduce(
  (acc, pair, index) =>
    acc +
    (compare(pair.left, pair.right) == CompareResult.True ? index + 1 : 0),
  0
);
console.log("silver:", silver);

let all = pairs
  .map((pair) => [pair.left, pair.right])
  .flat()
  .concat([[[2]]], [[[6]]])
  .sort((a, b) => {
    let res = compare(a, b);
    return res == CompareResult.True ? -1 : res == CompareResult.Equal ? 0 : 1;
  })
  .map((val) => JSON.stringify(val));
let gold = (all.indexOf("[[2]]") + 1) * (all.indexOf("[[6]]") + 1);
console.log("gold:", gold);

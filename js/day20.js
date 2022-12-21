let fs = require("fs");
let input = fs.readFileSync("day20.txt", { encoding: "utf8" });
let data = input.split("\r\n").map((val) => parseInt(val));
let dataIndices = [];
for (let i in data) {
  dataIndices.push(parseInt(i));
}
// console.log("data", JSON.stringify(data));
// console.log("dataIndices", JSON.stringify(dataIndices));
for (let i = 0; i < data.length; i++) {
  const id = dataIndices.indexOf(i);
  const [value] = data.splice(id, 1);
  const [indexValue] = dataIndices.splice(id, 1);
  const newPosition =
    id + value == 0
      ? data.length
      : id + value == data.length
      ? 0
      : (id + value) % data.length;
  data.splice(newPosition, 0, value);
  dataIndices.splice(newPosition, 0, indexValue);
}
const silver =
  data[(data.indexOf(0) + 1000) % data.length] +
  data[(data.indexOf(0) + 2000) % data.length] +
  data[(data.indexOf(0) + 3000) % data.length];
console.log("silver:", silver);

// GOLD

data = input.split("\r\n").map((val) => 811589153 * parseInt(val));
dataIndices = [];
for (let i in data) {
  dataIndices.push(parseInt(i));
}
for (let j = 0; j < 10; j++) {
  for (let i = 0; i < data.length; i++) {
    const id = dataIndices.indexOf(i);
    const [value] = data.splice(id, 1);
    const [indexValue] = dataIndices.splice(id, 1);
    const newPosition =
      id + value == 0
        ? data.length
        : id + value == data.length
        ? 0
        : (id + value) % data.length;
    data.splice(newPosition, 0, value);
    dataIndices.splice(newPosition, 0, indexValue);
  }
}
const gold =
  data[(data.indexOf(0) + 1000) % data.length] +
  data[(data.indexOf(0) + 2000) % data.length] +
  data[(data.indexOf(0) + 3000) % data.length];
console.log("gold:", gold);

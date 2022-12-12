const dijkstra = require("./dijkstra");
let fs = require("fs");
let input = fs.readFileSync("day12.txt", { encoding: "utf8" });
let lines = input.split("\r\n");
let al = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const getNodeName = (x, y) => {
  return lines[y][x] == "S"
    ? "start"
    : lines[y][x] == "E"
    ? "end"
    : "N" + (y * lines[y].length + x);
};

const getNodeNameGold = (x, y) => {
  return lines[y][x] == "E"
    ? "start"
    : lines[y][x] == "a"
    ? "end"
    : "N" + (y * lines[y].length + x);
};

const getCharVal = (x, y) => {
  return lines[y][x] == "S"
    ? al.indexOf("a")
    : lines[y][x] == "E"
    ? al.indexOf("z")
    : al.indexOf(lines[y][x]);
};

let graph = {};
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    let name = getNodeName(x, y);
    // console.log(name);
    let node = {};
    // find neighbors
    let charVal = getCharVal(x, y, name);
    // up
    if (y - 1 >= 0 && charVal - getCharVal(x, y - 1) >= -1)
      node[getNodeName(x, y - 1)] = 1;
    // right
    if (x + 1 < lines[y].length && charVal - getCharVal(x + 1, y) >= -1)
      node[getNodeName(x + 1, y)] = 1;
    // down
    if (y + 1 < lines.length && charVal - getCharVal(x, y + 1) >= -1)
      node[getNodeName(x, y + 1)] = 1;

    // left
    if (x - 1 >= 0 && charVal - getCharVal(x - 1, y) >= -1)
      node[getNodeName(x - 1, y)] = 1;

    graph[name] = node;
  }
}
// console.log(graph);
console.time("silver");
console.log(
  "silver:",
  dijkstra.findShortestPath(graph, "start", "end").distance
);
console.timeEnd("silver");
// console.log(dijkstra.findShortestPath(graph, "A", "B"));
// console.log(dijkstra.findShortestPath(graph, "A", "start"));

graph = {};
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    let name = getNodeNameGold(x, y);
    // console.log(name);
    let node = {};
    // find neighbors
    let charVal = getCharVal(x, y, name);
    // up
    if (y - 1 >= 0 && getCharVal(x, y - 1) - charVal >= -1)
      node[getNodeNameGold(x, y - 1)] = 1;
    // right
    if (x + 1 < lines[y].length && getCharVal(x + 1, y) - charVal >= -1)
      node[getNodeNameGold(x + 1, y)] = 1;
    // down
    if (y + 1 < lines.length && getCharVal(x, y + 1) - charVal >= -1)
      node[getNodeNameGold(x, y + 1)] = 1;

    // left
    if (x - 1 >= 0 && getCharVal(x - 1, y) - charVal >= -1)
      node[getNodeNameGold(x - 1, y)] = 1;

    graph[name] = node;
  }
}

console.time("gold");
console.log("gold:", dijkstra.findShortestPath(graph, "start", "end").distance);
console.timeEnd("gold");

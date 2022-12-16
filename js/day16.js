let fs = require("fs");
let input = fs.readFileSync("day16.txt", { encoding: "utf8" });
const lines = input.split("\r\n");
console.log(lines[0]);

const regex =
  /^Valve (?<valve>\w\w) has flow rate=(?<flow>\d+); tunnels? leads? to valves? (?<vlist>.+)/;

const data = lines.map((line) => {
  const groups = line.match(regex).groups;
  return {
    valve: groups.valve,
    flow: parseInt(groups.flow),
    vlist: groups.vlist.split(", "),
  };
});
console.log(data);

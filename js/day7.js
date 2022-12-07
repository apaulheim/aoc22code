let fs = require("fs");

let input = fs.readFileSync("day7.txt", { encoding: "utf8" });

let output = input.split("\r\n");

let fileSystem = { parent: null, children: [], size: 0, type: 0, name: "root" };

let current = fileSystem;

for (let cmd of output) {
  if (cmd.startsWith("$ ls")) {
    continue;
  } else if (cmd.startsWith("$ cd ")) {
    const dir = cmd.substring(5);
    if (dir == "..") {
      current = current.parent;
    } else if (dir == "/") {
      current = fileSystem;
    } else {
      current = current.children.find(
        (entry) => entry.type == 0 && entry.name == dir
      );
    }
  } else {
    if (cmd.startsWith("dir ")) {
      current.children.push({
        parent: current,
        children: [],
        size: 0,
        type: 0,
        name: cmd.substring(4),
      });
    } else {
      const [size, name] = cmd.split(" ");
      current.children.push({
        parent: current,
        children: [],
        size: parseInt(size),
        type: 1,
        name: name,
      });
    }
  }
}

const traverse = (node) => {
  let size = node.size;
  for (let child of node.children) {
    size += traverse(child);
  }
  node.size = size;
  return size;
};

const rootSize = traverse(fileSystem);

const silver = (node) => {
  let size = 0;
  if (node.type == 0) {
    if (node.size <= 100000) size += node.size;
    for (let child of node.children) {
      size += silver(child);
    }
  }
  return size;
};

console.log("silver:", silver(fileSystem));

const unusedSpace = 70000000 - rootSize;
const minFolderSize = 30000000 - unusedSpace;

let goldList = [];
const dirList = (node) => {
  if (node.type == 0 && node.size >= minFolderSize) {
    goldList.push(node.size);
  }
  for (let child of node.children) {
    dirList(child);
  }
};

dirList(fileSystem);

const gold = goldList.sort((a, b) => a - b)[0];
console.log("gold:", gold);

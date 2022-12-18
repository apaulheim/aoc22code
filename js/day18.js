let fs = require("fs");
let input = fs.readFileSync("day18.txt", { encoding: "utf8" });
const coords = input
  .split("\r\n")
  .map((coordStr) => coordStr.split(",").map((cooord) => parseInt(cooord)));

const coordSet = new Set();
for (let coord of coords) {
  coordSet.add(JSON.stringify(coord));
}
let min = [
  Number.POSITIVE_INFINITY,
  Number.POSITIVE_INFINITY,
  Number.POSITIVE_INFINITY,
];
let max = [
  Number.NEGATIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
];
let covered = 0;
for (let coord of coords) {
  if (coordSet.has(JSON.stringify([coord[0] - 1, coord[1], coord[2]])))
    covered++;
  if (coordSet.has(JSON.stringify([coord[0] + 1, coord[1], coord[2]])))
    covered++;
  if (coordSet.has(JSON.stringify([coord[0], coord[1] - 1, coord[2]])))
    covered++;
  if (coordSet.has(JSON.stringify([coord[0], coord[1] + 1, coord[2]])))
    covered++;
  if (coordSet.has(JSON.stringify([coord[0], coord[1], coord[2] - 1])))
    covered++;
  if (coordSet.has(JSON.stringify([coord[0], coord[1], coord[2] + 1])))
    covered++;
  min[0] = Math.min(min[0], coord[0]);
  min[1] = Math.min(min[1], coord[1]);
  min[2] = Math.min(min[2], coord[2]);
  max[0] = Math.max(max[0], coord[0]);
  max[1] = Math.max(max[1], coord[1]);
  max[2] = Math.max(max[2], coord[2]);
}

const silver = coords.length * 6 - covered;
console.log("silver:", silver);

// GOLD
// modell invertieren, ein Voxel Layer außen rum
const invertedCoordsMap = new Map();
const absoluteMin = Math.min(Math.min(min[0], min[1]), min[2]) - 1;
const absoluteMax = Math.max(Math.max(max[0], max[1]), max[2]) + 1;

for (let x = absoluteMin; x <= absoluteMax; x++) {
  for (let y = absoluteMin; y <= absoluteMax; y++) {
    for (let z = absoluteMin; z <= absoluteMax; z++) {
      if (!coordSet.has(JSON.stringify([x, y, z])))
        invertedCoordsMap.set(JSON.stringify([x, y, z]), false);
    }
  }
}

const checkNeighboringVoxels = (x, y, z) => {
  if (invertedCoordsMap.has(JSON.stringify([x - 1, y, z]))) {
    if (invertedCoordsMap.get(JSON.stringify([x - 1, y, z])) == false) {
      invertedCoordsMap.set(JSON.stringify([x - 1, y, z]), true);
      checkNeighboringVoxels(x - 1, y, z);
    }
  }
  if (invertedCoordsMap.has(JSON.stringify([x + 1, y, z]))) {
    if (invertedCoordsMap.get(JSON.stringify([x + 1, y, z])) == false) {
      invertedCoordsMap.set(JSON.stringify([x + 1, y, z]), true);
      checkNeighboringVoxels(x + 1, y, z);
    }
  }
  if (invertedCoordsMap.has(JSON.stringify([x, y - 1, z]))) {
    if (invertedCoordsMap.get(JSON.stringify([x, y - 1, z])) == false) {
      invertedCoordsMap.set(JSON.stringify([x, y - 1, z]), true);
      checkNeighboringVoxels(x, y - 1, z);
    }
  }
  if (invertedCoordsMap.has(JSON.stringify([x, y + 1, z]))) {
    if (invertedCoordsMap.get(JSON.stringify([x, y + 1, z])) == false) {
      invertedCoordsMap.set(JSON.stringify([x, y + 1, z]), true);
      checkNeighboringVoxels(x, y + 1, z);
    }
  }
  if (invertedCoordsMap.has(JSON.stringify([x, y, z - 1]))) {
    if (invertedCoordsMap.get(JSON.stringify([x, y, z - 1])) == false) {
      invertedCoordsMap.set(JSON.stringify([x, y, z - 1]), true);
      checkNeighboringVoxels(x, y, z - 1);
    }
  }
  if (invertedCoordsMap.has(JSON.stringify([x, y, z + 1]))) {
    if (invertedCoordsMap.get(JSON.stringify([x, y, z + 1])) == false) {
      invertedCoordsMap.set(JSON.stringify([x, y, z + 1]), true);
      checkNeighboringVoxels(x, y, z + 1);
    }
  }
};

// Dann an einer Ecke anfangen und traversieren -> findet alle voxel die connected sind
checkNeighboringVoxels(0, 0, 0);

const invertedCoords = [];
// nicht connectete voxel sind die inneren Luftbereiche, die filtern wir hier raus
invertedCoordsMap.forEach((value, key) => {
  if (value) invertedCoords.push(JSON.parse(key));
});

// console.log(invertedCoordsMap.size - invertedCoords.length);

// silver aufrufen für die invertierten coords
const invertedCoordSet = new Set();
for (let coord of invertedCoords) {
  invertedCoordSet.add(JSON.stringify(coord));
}
covered = 0;
for (let coord of invertedCoords) {
  if (invertedCoordSet.has(JSON.stringify([coord[0] - 1, coord[1], coord[2]])))
    covered++;
  if (invertedCoordSet.has(JSON.stringify([coord[0] + 1, coord[1], coord[2]])))
    covered++;
  if (invertedCoordSet.has(JSON.stringify([coord[0], coord[1] - 1, coord[2]])))
    covered++;
  if (invertedCoordSet.has(JSON.stringify([coord[0], coord[1] + 1, coord[2]])))
    covered++;
  if (invertedCoordSet.has(JSON.stringify([coord[0], coord[1], coord[2] - 1])))
    covered++;
  if (invertedCoordSet.has(JSON.stringify([coord[0], coord[1], coord[2] + 1])))
    covered++;
}
// äußere Hülle abziehen
const cubeSize = absoluteMax + 1 - absoluteMin;
const gold = invertedCoords.length * 6 - covered - cubeSize * cubeSize * 6;

console.log("gold", gold);

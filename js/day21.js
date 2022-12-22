let fs = require("fs");
let input = fs.readFileSync("day21.txt", { encoding: "utf8" });
let data = input.split("\r\n").map((val) => val.split(": "));

const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
};

const monkeyMap = new Map();

const allMonkeys = new Map();

data.forEach((pair) => {
  if (isNumeric(pair[1])) monkeyMap.set(pair[0], parseInt(pair[1]));
  else allMonkeys.set(pair[0], pair[1]);
});

const monkeyMania = (monkey) => {
  if (monkeyMap.has(monkey)) return monkeyMap.get(monkey);
  else {
    const [one, operation, two] = allMonkeys.get(monkey).split(" ");
    return monkeyOperation(one, operation, two);
  }
};

const monkeyOperation = (one, operation, two) => {
  switch (operation) {
    case "+":
      return monkeyMania(one) + monkeyMania(two);
    case "-":
      return monkeyMania(one) - monkeyMania(two);
    case "*":
      return monkeyMania(one) * monkeyMania(two);
    case "/":
      return monkeyMania(one) / monkeyMania(two);
  }
};

const silver = monkeyMania("root");
console.log("silver", silver);

// GOLD
const allTheOperations = [];

const monkeyManiaGold = (monkey) => {
  if (monkeyMap.has(monkey)) return monkeyMap.get(monkey);
  else {
    const [one, operation, two] = allMonkeys.get(monkey).split(" ");
    return monkeyOperationGold(one, operation, two);
  }
};

const monkeyOperationGold = (one, operation, two) => {
  let resOne = monkeyManiaGold(one);
  let resTwo = monkeyManiaGold(two);
  if (one == "humn") resOne = "humn";
  else if (two == "humn") resTwo = "humn";

  if (isNumeric(resOne) && isNumeric(resTwo))
    switch (operation) {
      case "+":
        return resOne + resTwo;
      case "-":
        return resOne - resTwo;
      case "*":
        return resOne * resTwo;
      case "/":
        return resOne / resTwo;
    }
  else {
    allTheOperations.push(
      `${isNumeric(resOne) ? resOne : "x"} ${operation} ${
        isNumeric(resTwo) ? resTwo : "x"
      }`
    );
    return `(${resOne} ${operation} ${resTwo})`;
  }
};
const [rone, roperation, rtwo] = allMonkeys.get("root").split(" ");
const gold = `${monkeyManiaGold(rone)} == ${monkeyManiaGold(rtwo)}`;
console.log("gold", gold);
console.log(allTheOperations);
let equalVal = monkeyManiaGold(rtwo);
for (let i = allTheOperations.length - 1; i >= 0; i--) {
  let [astr, op, cstr] = allTheOperations[i].split(" ");
  let a = isNumeric(astr) ? parseInt(astr) : astr;
  let c = isNumeric(cstr) ? parseInt(cstr) : cstr;
  if (a == "x") {
    switch (op) {
      case "+":
        equalVal -= c;
        break;
      case "-":
        equalVal += c;
        break;
      case "*":
        equalVal /= c;
        break;
      case "/":
        equalVal *= c;
        break;
    }
  } else {
    switch (op) {
      case "+":
        equalVal -= a;
        break;
      case "-":
        equalVal -= a;
        equalVal *= -1;
        break;
      case "*":
        equalVal /= a;
        break;
      case "/":
        equalVal = a / equalVal;
        break;
    }
  }
}

// 49624267175787 too high
console.log(equalVal);

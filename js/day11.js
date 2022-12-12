let fs = require("fs");

let input = fs.readFileSync("day11.txt", { encoding: "utf8" });

const monkeyData = input.split("\r\n\r\n");

let monkeys = [];

const parseMonkey = (data) => {
  const [_, startStr, opStr, testStr, trueStr, falseStr] = data.split("\r\n");
  const items = startStr
    .substring(18)
    .split(", ")
    .map((v) => parseInt(v));
  const operator = opStr.substring(23, 24);
  const value = opStr.substring(25);
  const divisible = parseInt(testStr.substring(21));
  const positive = parseInt(trueStr.substring(29));
  const negative = parseInt(falseStr.substring(30));
  return {
    items,
    operator,
    value,
    divisible,
    positive,
    negative,
    inspected: 0,
  };
};

for (let data of monkeyData) {
  monkeys.push(parseMonkey(data));
}

const performOperation = (old, operator, value) => {
  const second = value == "old" ? old : parseInt(value);
  switch (operator) {
    case "+":
      return Math.floor((old + second) / 3);
    case "*":
      return Math.floor((old * second) / 3);
  }
};

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    for (let k = 0; k < monkeys[j].items.length; k++) {
      const newValue = performOperation(
        monkeys[j].items[k],
        monkeys[j].operator,
        monkeys[j].value
      );
      if (newValue % monkeys[j].divisible == 0)
        monkeys[monkeys[j].positive].items.push(newValue);
      else monkeys[monkeys[j].negative].items.push(newValue);
    }
    monkeys[j].inspected = monkeys[j].inspected + monkeys[j].items.length;
    monkeys[j].items = [];
  }
}

let sortedMonkeys = monkeys.sort((a, b) => b.inspected - a.inspected);
// console.log(sortedMonkeys);
console.log("silver:", sortedMonkeys[0].inspected * sortedMonkeys[1].inspected);

monkeys = [];
for (let data of monkeyData) {
  monkeys.push(parseMonkey(data));
}

const manage = monkeys.reduce((acc, monkey) => acc * monkey.divisible, 1);

const manageWorryLevels = (old) => {
  return old % manage;
};

const performOperationGold = (old, operator, value) => {
  const second = value == "old" ? old : parseInt(value);
  switch (operator) {
    case "+":
      return old + second;
    case "*":
      return old * second;
  }
};

for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    for (let k = 0; k < monkeys[j].items.length; k++) {
      const newValue = performOperationGold(
        monkeys[j].items[k],
        monkeys[j].operator,
        monkeys[j].value
      );
      if (newValue % monkeys[j].divisible == 0)
        monkeys[monkeys[j].positive].items.push(manageWorryLevels(newValue));
      else monkeys[monkeys[j].negative].items.push(manageWorryLevels(newValue));
    }
    monkeys[j].inspected = monkeys[j].inspected + monkeys[j].items.length;
    monkeys[j].items = [];
  }
  //   if (i == 9999) console.log(monkeys);
}

sortedMonkeys = monkeys.sort((a, b) => b.inspected - a.inspected);
// console.log(sortedMonkeys);
console.log("gold:", sortedMonkeys[0].inspected * sortedMonkeys[1].inspected);

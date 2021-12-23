const { input, consoleTime } = require("lib");

const data = input().split("\n");

const brackets = { "(": ")", "[": "]", "{": "}", "<": ">" };
const open = Object.keys(brackets);
const costs = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
consoleTime(() => solve(data));

function solve(data) {
  const stack = [],
    complete = [];
  let errors = 0,
    error = false;
  for (let i = 0; i < data.length; i++) {
    stack.length = 0;
    error = false;
    row: for (let j = 0; j < data[i].length; j++) {
      const el = data[i][j];
      if (open.includes(el)) {
        stack.push(el);
        continue row;
      }
      const tail = stack.pop();
      if (brackets[tail] !== el) {
        errors += costs[el];
        error = true;
        break row;
      }
    }
    if (!error)
      complete.push(stack.reduceRight((acc, cur) => acc * 5 + costs[cur], 0));
  }

  return [
    errors,
    complete.sort((a, b) => a - b)[Math.floor(complete.length / 2)],
  ];
}

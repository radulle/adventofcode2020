const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const matches = input.match(/(mul)\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
  return matches;
}

function process(matches) {
  let process = true;
  let sum = 0;
  for (const match of matches) {
    if (match === "do()") {
      process = true;
      continue;
    }
    if (match === "don't()") {
      process = false;
      continue;
    }
    if (!process) continue;
    const [_, a, b] = match.match(/mul\((\d+),(\d+)\)/);
    sum += a * b;
  }

  return sum;
}

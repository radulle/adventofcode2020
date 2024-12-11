const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const matches = input.match(/mul\(\d+,\d+\)/g)
  return matches;
}

function process(matches) {
  let sum = 0
  for (const match of matches) {
    const [_, a, b] = match.match(/mul\((\d+),(\d+)\)/)
    sum += a * b
  }

  return sum
}

const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let i = 0;
  const left = []
  const right = []
  for (const el of input.match(/\d+/g)) {
    if (i % 2 === 0)
      left.push(+el)
    else
      right.push(+el)
    i++
  }
  return { left, right };
}

function process({ left, right }) {
  let sum = 0;

  for (const l of left) {
    const apearsInRight = right.filter(r => r === l).length;
    sum += apearsInRight * l;
  }

  return sum
}

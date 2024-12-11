const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input))];
}

function parse(input) {
  const equations = input.split("\n").map((e) => e.split(": "));
  for (const el of equations) {
    el[0] = Number(el[0]);
    el[1] = el[1].split(" ").map(Number);
  }
  return equations;
}

function process(input) {
  const ops = [(a, b) => a + b, (a, b) => a * b];
  let sum = 0;
  for (const [target, source] of input) {
    let v = [source[0]];
    for (let i = 1; i < source.length; i++) {
      const nv = [];
      for (const op of ops) {
        for (const vv of v) {
          nv.push(op(vv, source[i]));
        }
      }
      v = nv;
    }
    if (v.includes(target)) sum += target
  }

  return sum;
}

const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(parse(input), 0), process(parse(input), 1)];
}

function parse(input) {
  const equations = input.split("\n").map((e) => e.split(": "));
  for (const el of equations) {
    el[0] = Number(el[0]);
    el[1] = el[1].split(" ").map(Number);
  }
  return equations;
}

function process(input, part) {
  const ops = [(a, b) => a + b, (a, b) => a * b];
  if (part) ops.push((a, b) => +`${a}${b}`);
  let sum = 0;
  for (const [target, source] of input) {
    let v = [source[0]];
    for (let i = 1; i < source.length; i++) {
      const nv = [];
      for (const op of ops) {
        for (const vv of v) {
          const c = op(vv, source[i]);
          if (c <= target) nv.push(c);
        }
      }
      v = nv;
    }
    if (v.includes(target)) sum += target;
  }

  return sum;
}

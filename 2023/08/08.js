const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(...parse(input, 0)), process(...parse(input, 1))];
}

function parse(input, part) {
  input = [...input.matchAll(/([A-Z0-9]+)/g)].map((e) => e[0]);
  const map = {};
  for (let i = 1; i < input.length; i += 3)
    map[input[i]] = [input[i + 1], input[i + 2]];
  const pos = [["AAA"], [...Object.keys(map)].filter((e) => e[2] === "A")];
  return [pos[part], input[0].split("").map((e) => (e === "R" ? 1 : 0)), map];
}

function process(pos, instr, map) {
  for (let i = 0; i < pos.length; i++) {
    let step = 0;
    while (true) {
      if (pos[i][2] === "Z") {
        pos[i] = step;
        break;
      }
      pos[i] = map[pos[i]][instr[step % instr.length]];
      step++;
    }
  }
  return pos.reduce((acc, cur) => lcm(acc, cur), 1);
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function gcd(a, b) {
  var t = 0;
  a < b && ((t = b), (b = a), (a = t));
  t = a % b;
  return t ? gcd(b, t) : b;
}

const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let [registers, gates] = input.trim().split("\n\n");

  registers = Object.fromEntries(
    registers.split("\n").map((e) => {
      let [a, b] = e.split(": ");
      return [a, +b];
    })
  );
  gates = gates.split("\n").map((e) => e.split(" "));

  return [registers, gates];
}

function process([registers, gates]) {
  for (let [a, , b, , c] of gates) {
    if (typeof registers[c] === 'undefined') registers[c] = null;
    if (typeof registers[a] === 'undefined') registers[a] = null;
    if (typeof registers[b] === 'undefined') registers[b] = null;
  }

  while (true) {
    for (let [a, op, b, _, c] of gates) { 
      if (registers[a] === null || registers[b] === null) continue;
      if (op === "AND") {
        registers[c] = registers[a] & registers[b];
      } else if (op === "OR") {
        registers[c] = registers[a] | registers[b];
      } else if (op === "XOR") {
        registers[c] = registers[a] ^ registers[b];
      } else {
        throw Error("Unknown operation");
      }
    }

    let some = false;
    for (const key of Object.keys(registers)) {
      if (key.startsWith("z") && registers[key] === null) {
        some = true;
        break;
      }
    }
    if (!some) break;
  }

  let ans1 = Object.entries(registers)
  ans1 = ans1.filter((e) => e[0].startsWith("z"));
  ans1.sort((a, b) => b[0].localeCompare(a[0]));
  ans1 = ans1.map((e) => e[1]).join("");
  ans1 = parseInt(ans1, 2);
  return ans1;
}

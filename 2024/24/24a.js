const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  let [wires, gates] = input.trim().split("\n\n");

  wires = Object.fromEntries(
    wires.split("\n").map((e) => {
      let [a, b] = e.split(": ");
      return [a, +b];
    })
  );
  gates = gates.split("\n").map((e) => e.split(" "));

  return [wires, gates];
}

function process([wires, gates]) {
  let loop;
  do {
    loop = false;
    for (let [a, op, b, , c] of gates) {
      if (wires[a] === undefined || wires[b] === undefined) {
        loop = true;
        continue;
      }
      if (op === "AND") wires[c] = wires[a] & wires[b];
      else if (op === "OR") wires[c] = wires[a] | wires[b];
      else if (op === "XOR") wires[c] = wires[a] ^ wires[b];
    }
  } while (loop);

  return parseInt(
    Object.entries(wires)
      .filter((e) => e[0].startsWith("z"))
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map((e) => e[1])
      .join(""),
    2
  );
}

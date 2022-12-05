const { consoleTime } = require("lib");
const { parseData, outputResult } = require("./common");

consoleTime(() => solve());

function solve() {
  const [stacks, instructions] = parseData();

  for (const instruction of instructions) {
    const a = [];
    for (let i = 0; i < instruction[0] + 1; i++) {
      a.push(stacks[instruction[1]].pop());
    }
    a.reverse();
    stacks[instruction[2]].push(...a);
  }

  outputResult(stacks);
}

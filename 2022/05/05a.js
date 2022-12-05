const { consoleTime } = require("lib");
const { parseData, outputResult } = require("./common");

consoleTime(() => solve());

function solve() {
  const [stacks, instructions] = parseData();

  for (const instruction of instructions) {
    for (let i = 0; i < instruction[0] + 1; i++) {
      const a = stacks[instruction[1]].pop();
      stacks[instruction[2]].push(a);
    }
  }

  outputResult(stacks);
}

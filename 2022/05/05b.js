const { consoleTime } = require("lib");
const { parseData, outputResult } = require("./cmn");

consoleTime(() => solve());

function solve() {
  const [stacks, instructions] = parseData();

  for (const [count, from, to] of instructions) {
    const move = stacks[from].splice(-count);
    stacks[to].push(...move);
  }

  outputResult(stacks);
}

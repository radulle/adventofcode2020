const { input } = require("lib");

function parseData() {
  let [_stacks, instructions] = input().split("\n\n");

  _stacks = _stacks.split("\n");

  const count = Math.max(
    ...[..._stacks.pop().matchAll(/\d+/g)].map(([e]) => +e)
  );

  _stacks.reverse();

  const stacks = new Array(count).fill(null).map((e) => []);

  for (let i = 0; i < _stacks.length; i++) {
    for (let j = 0; j < 9; j++) {
      const crate = _stacks[i][1 + j * 4];
      if (crate !== " ") stacks[j].push(crate);
    }
  }

  instructions = instructions
    .split("\n")
    .map((e) => [...e.matchAll(/\d+/g)].map(([e]) => e - 1));

  return [stacks, instructions];
}
exports.parseData = parseData;

function outputResult(stacks) {
  let result = "";
  for (const stack of stacks) {
    result += stack.at(-1);
  }

  console.info(result);
}
exports.outputResult = outputResult;

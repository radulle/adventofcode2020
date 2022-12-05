const { input } = require("lib");

exports.parseData = function parseData() {
  let [_stacks, instructions] = input().split("\n\n");

  _stacks = _stacks.split("\n");
  _stacks.reverse();

  const count = Math.max(
    ...[..._stacks.shift().matchAll(/\d+/g)].map(([e]) => +e)
  );
  const stacks = new Array(count).fill(null).map((e) => []);

  for (let i = 0; i < _stacks.length; i++) {
    for (let j = 0; j < count; j++) {
      const crate = _stacks[i][1 + j * 4];
      if (crate !== " ") stacks[j].push(crate);
    }
  }

  instructions = instructions
    .split("\n")
    .map((e) => [...e.matchAll(/\d+/g)].map(([e], i) => (i ? e - 1 : +e)));

  return [stacks, instructions];
};

exports.outputResult = function outputResult(stacks) {
  let result = "";
  for (const stack of stacks) {
    result += stack.at(-1);
  }
  console.info(result);
};

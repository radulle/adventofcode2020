const { input, consoleTime } = require("lib");
const { move, adjecent, middle } = require("./cmn");

consoleTime(() => solve(2));
consoleTime(() => solve(10));

function solve(ropeLength) {
  const data = input()
    .split("\n")
    .map((e) => e.split(" "));

  let rope = Array(ropeLength)
    .fill(null)
    .map(() => [0, 0]);

  const visited = new Set();

  for (const line of data) {
    const dir = line[0];
    const len = +line[1];
    for (let i = 0; i < len; i++) {
      rope[0] = move[dir](rope[0]);
      for (let j = 1; j < rope.length; j++) {
        if (adjecent(rope[j - 1], rope[j])) break;
        rope[j] = middle(rope[j - 1], rope[j]);
      }
      visited.add(rope.at(-1).join(","));
    }
  }

  console.info(visited.size);
  console.info("end");
}

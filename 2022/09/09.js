const { input, consoleTime } = require("lib");
const { move, adjecent, closer } = require("./cmn");

consoleTime(() => solve(2));
consoleTime(() => solve(10));

function solve(snakeLength) {
  const data = input()
    .split("\n")
    .map((e) => e.split(" "));

  let snake = Array(snakeLength)
    .fill(null)
    .map(() => [0, 0]);

  const visited = new Set();

  for (const line of data) {
    const dir = line[0];
    const len = +line[1];
    for (let i = 0; i < len; i++) {
      snake[0] = move[dir](snake[0]);
      for (let j = 1; j < snake.length; j++) {
        if (adjecent(snake[j - 1], snake[j])) break;
        snake[j] = closer(snake[j - 1], snake[j]);
      }
      visited.add(snake.at(-1).join(","));
    }
  }

  console.info(visited.size);
  console.info("end");
}

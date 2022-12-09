const { input, consoleTime } = require("lib");
const { move, adjecent, closer } = require("./cmn");

const START = 300;
const SIZE = 600;

consoleTime(() => solve(2));
consoleTime(() => solve(10));

function solve(snakeLength) {
  const data = input()
    .split("\n")
    .map((e) => e.split(" "));

  let snake = Array(snakeLength)
    .fill(null)
    .map(() => [START, START]);

  const grid = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(0));

  for (const line of data) {
    const dir = line[0];
    const len = +line[1];
    for (let i = 0; i < len; i++) {
      snake[0] = move[dir](snake[0]);
      for (let j = 1; j < snake.length; j++) {
        if (adjecent(snake[j - 1], snake[j])) break;
        snake[j] = closer(snake[j - 1], snake[j]);
      }
      grid[snake[snakeLength - 1][0]][snake[snakeLength - 1][1]] = 1;
    }
  }

  console.info(grid.flat().reduce((acc, cur) => acc + cur, 0));
  console.info("end");
}

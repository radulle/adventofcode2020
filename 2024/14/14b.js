const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const list = [];
  const re = /(\d+),(\d+).+?(-?\d+),(-?\d+)/g;
  let item;
  while ((item = re.exec(input))) list.push(item.slice(1).map(Number));
  return list;
}

function process(robots) {
  const Y = 103;
  const X = 101;
  const s = 1;

  let i = 1;
  let score = Infinity;
  while (true) {
    for (const robot of robots) {
      robot[0] = (((robot[0] + robot[2] * s) % X) + X) % X;
      robot[1] = (((robot[1] + robot[3] * s) % Y) + Y) % Y;
    }
    
    const grid = new Array(Y).fill(null).map(() => new Array(X).fill(" "));
    for (const robot of robots) grid[robot[1]][robot[0]] = "#";

    let _score = 0;
    for (const row of grid) {
      let e;
      for (let i = 0; i < row.length; i++) {
        if (e !== row[i]) _score++;
        e = row[i];
      }
    }
    if (_score <= score) (score = _score), console.info(i, score);

    // const _grid = grid.map((row) => row.join("")).join("\n")
    // if (_grid.includes("########")) {
    //   console.info(i);
    //   console.info(grid.map((row) => row.join("")).join("\n"));
    //   debugger
    // }

    i++;
  }
}

const { input, consoleTime } = require("lib");
const { toWorker } = require("./06b-to-worker");

consoleTime(async () => await solve(input()));

async function solve(input) {
  return await process(parse(input));
}

function parse(input) {
  const grid = input.split("\n").map((r) => r.split(""));
  return grid;
}

async function process(grid) {
  let sr, sc;
  search: for (let rr = 0; rr < grid.length; rr++) {
    for (let cc = 0; cc < grid[0].length; cc++) {
      if (grid[rr][cc] === "^") {
        (sr = rr), (sc = cc);
        break search;
      }
    }
  }

  let stuck = 0;
  const promisses = [];

  const os = require("os");
  const cpuCount = os.cpus().length;
  const N = Math.floor(grid.length / cpuCount);

  for (let RR = 0; RR < grid.length; RR += N) {
    const rmin = RR;
    const rmax = RR + N;
    promisses.push(
      toWorker(grid, sr, sc, rmin, rmax).then((res) => {
        stuck += res;
      })
    );
  }

  await Promise.all(promisses);

  return stuck;
}

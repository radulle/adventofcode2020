const { input, consoleTime } = require("lib");

const points = [];
let X = 0,
  Y = 0;
for (const e of input().matchAll(/(\d+),(\d+)/g)) {
  const x = +e[1],
    y = +e[2];
  points.push([x, y]);
  if (x > X) X = x;
  if (y > Y) Y = y;
}
const map = Array(Y + 1)
  .fill(null)
  .map((e) => Array(X + 1).fill(0));
points.forEach(([j, i]) => {
  map[i][j] = 1;
});

const folds = [];
for (const [_, ori, pos] of input().matchAll(/(x|y)=(\d+)/g)) {
  folds.push([ori, +pos]);
}

consoleTime(() =>
  solve(map, folds.slice(0, 1))
    .flat()
    .reduce((acc, cur) => acc + (cur ? 1 : 0))
);
consoleTime(() =>
  solve(map, folds.slice(1))
    .map((e) => e.map((m) => (m ? "#" : " ")).join(""))
    .join("\n")
);

function solve(map, folds) {
  for (const [ori, pos] of folds) {
    if (ori === "y") {
      for (let i = 1; i < map.length - pos; i++) {
        for (let j = 0; j < map[i].length; j++) {
          map[pos - i][j] = map[pos - i][j] || map[pos + i][j];
        }
      }
      map = map.slice(0, pos);
      continue;
    }
    for (let i = 0; i < map.length; i++) {
      for (let j = 1; j < map[i].length - pos; j++) {
        map[i][pos - j] = map[i][pos - j] || map[i][pos + j];
      }
    }
    map = map.map((row) => row.slice(0, pos));
  }

  return map;
}

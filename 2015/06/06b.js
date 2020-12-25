console.time()
const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .replace(/\r\n/g, "\n")
  .replace(/turn on/g, "on")
  .replace(/turn off/g, "off")
  .replace(/ through /g, " ")
  .split("\n")
  .map((row) => row.split(" "))
  .map(([act, from, to]) => ({
    act,
    from: from.split(",").map(Number),
    to: to.split(",").map(Number),
  }))

function exec(grid, { act, from, to }) {
  for (let idx = from[0]; idx < to[0] + 1; idx++) {
    for (let jdx = from[1]; jdx < to[1] + 1; jdx++) {
      switch (act) {
        case "on":
          grid[idx][jdx] += 1
          break
        case "off":
          grid[idx][jdx] = Math.max(grid[idx][jdx] - 1, 0)
          break
        case "toggle":
          grid[idx][jdx] += 2
          break
      }
    }
  }
}

const grid = new Array(1000).fill().map(() => new Array(1000).fill(0))

for (let idx = 0; idx < data.length; idx++) {
  exec(grid, data[idx])
}

const result = grid.flat().reduce((acc, cur) => acc + cur, 0)

console.info("Solution:")
console.info(result, "\n")
console.timeEnd()

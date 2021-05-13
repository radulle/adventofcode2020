// #grid
const fs = require("fs")
console.time()

let grid = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n/g)
  .map((row) => row.split(""))

function round(grid) {
  const nGrid = []
  const dr = [-1, 0, 0, 1, 1, 1, -1, -1]
  const dc = [0, -1, 1, 0, 1, -1, 1, -1]
  const neighbors = dr.length
  let t, y

  for (let i = 0; i < grid.length; i++) {
    nGrid[i] = []
    for (let j = 0; j < grid[i].length; j++) {
      switch (grid[i][j]) {
        case ".":
          t = 0
          for (let k = 0; k < neighbors; k++) {
            if (grid[i + dr[k]]?.[j + dc[k]] === "|") t++
          }
          nGrid[i][j] = t > 2 ? "|" : "."
          break
        case "|":
          y = 0
          for (let k = 0; k < neighbors; k++) {
            if (grid[i + dr[k]]?.[j + dc[k]] === "#") y++
          }
          nGrid[i][j] = y > 2 ? "#" : "|"
          break
        case "#":
          t = 0
          y = 0
          for (let k = 0; k < neighbors; k++) {
            if (grid[i + dr[k]]?.[j + dc[k]] === "|") t++
            if (grid[i + dr[k]]?.[j + dc[k]] === "#") y++
          }
          nGrid[i][j] = t > 0 && y > 0 ? "#" : "."
          break
      }
    }
  }
  return nGrid
}

const cache = []
let diff
while (true) {
  grid = round(grid)
  const current = grid
    .flat()
    .reduce(
      (acc, cur) => {
        if (cur === "|") acc[0]++
        if (cur === "#") acc[1]++
        return acc
      },
      [0, 0]
    )
    .reduce((acc, cur) => acc * cur)
  const nDiff = cache.length - cache.lastIndexOf(current)
  if (nDiff === diff && cache.includes(current)) break
  cache.push(current)
  diff = nDiff
}

const resultA = cache[9]

const init = cache.length - diff
const resultB = cache[init + ((1_000_000_000 - init) % diff) - 1]

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("Solution B:\n")
console.info(resultB, "\n")
console.timeEnd()

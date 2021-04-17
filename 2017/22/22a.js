// #grid #movement

console.time()
const fs = require("fs")

const newMatrix = (size, fill) =>
  new Array(size).fill(fill).map((e) => new Array(size).fill(fill))
const expand = (matrix, fill) => {
  const size = matrix.length
  const nMatrix = newMatrix(size * 3, ".")
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      nMatrix[size + i][size + j] = matrix[i][j]
    }
  }
  return nMatrix
}

let grid = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n/g)
  .map((row) => row.split(""))
let initial = grid.map((row) => [...row])
let steps = 0
let row = Math.floor(grid.length / 2)
let col = row
let dir = "u"
let val
let size = grid.length
const mv = {
  d: [1, 0],
  u: [-1, 0],
  r: [0, 1],
  l: [0, -1],
}
const rot = (o) => {
  switch (dir) {
    case "l":
      dir = o === "l" ? "d" : "u"
      break
    case "r":
      dir = o === "l" ? "u" : "d"
      break
    case "u":
      dir = o === "l" ? "l" : "r"
      break
    case "d":
      dir = o === "l" ? "r" : "l"
      break
  }
}
let count = 0

while (steps < 10_000) {
  if (row < 0 || col < 0 || row >= size || col >= size) {
    grid = expand(grid, ".")
    initial = expand(initial, ".")
    row += size
    col += size
    size = grid.length
  }

  if (grid[row][col] === "#") {
    rot("r")
    grid[row][col] = "."
  } else {
    rot("l")
    grid[row][col] = "#"
    count++
  }
  row += mv[dir][0]
  col += mv[dir][1]
  steps++
}

const resultA = count

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()

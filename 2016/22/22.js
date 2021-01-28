const fs = require("fs")
console.time()

const data = [
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(
      /\/dev\/grid\/node-x(\d+)-y(\d+)\s*(\d+)T\s*(\d+)T\s*(\d+)T\s*(\d+)%/g
    ),
]

const resultA = data
  .map((cur, idx, arr) =>
    +cur[4] === 0
      ? 0
      : arr.filter((val, i) => idx !== i && +cur[4] <= +val[5]).length
  )
  .reduce((acc, cur) => acc + cur, 0)
console.info("\nSolution A:")
console.info(resultA, "\n")

// Result A => there is only one free node and limited number of non movables.
const minSize = +data.sort((a, b) => a[3] - b[3])[0][3]
const width = +data.sort((a, b) => b[1] - a[1])[0][1]
const height = +data.sort((a, b) => b[2] - a[2])[0][2]
const free = data.filter((e) => +e[4] === 0)[0]
const grid = new Array(height + 1).fill().map(() => new Array(width + 1).fill())
data.forEach((e) => {
  if (e[4] > minSize) {
    return (grid[+e[2]][+e[1]] = "#")
  }
  grid[+e[2]][+e[1]] = "."
})
grid[0][width] = "G"
grid[free[+2]][free[+1]] = "F"
grid[0][0] = "R"
console.info(grid.map((row) => row.join("")).join("\n"))

// 65 moves to move F next to G
// (width - 2) * (4 F + 1 G) moves for each move of G
// 1 move for last move of G
const resultB = 65 + 36 * 5 + 1
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

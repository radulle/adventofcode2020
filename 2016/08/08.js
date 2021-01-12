const fs = require("fs")
const { join } = require("path")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")

const matrix = new Array(6).fill().map(() => new Array(50).fill("."))

for (const row of data) {
  let match
  if ((match = row.match(/rect (\d+)x(\d+)/))) {
    const [, cols, rows] = match
    for (let idx = 0; idx < rows; idx++) {
      for (let jdx = 0; jdx < cols; jdx++) {
        matrix[idx][jdx] = "#"
      }
    }
    continue
  }
  if ((match = row.match(/rotate row y=(\d+) by (\d+)/))) {
    const [, row, by] = match
    matrix[row] = [...matrix[row].slice(-by), ...matrix[row].slice(0, -by)]
    continue
  }
  if ((match = row.match(/rotate column x=(\d+) by (\d+)/))) {
    const [, col, by] = match
    let column = matrix.map((row) => row[col])
    column = [...column.slice(-by), ...column.slice(0, -by)]
    column.forEach((e, i) => (matrix[i][col] = e))
    continue
  }
}
let resultA = matrix.flat().filter((e) => e === "#").length
let resultB = matrix.map((row) => row.join("")).join("\n")

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")

console.timeEnd()

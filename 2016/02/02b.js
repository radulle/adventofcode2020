const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split(""))

const matrix = `
. . 1 . .
. 2 3 4 .
5 6 7 8 9
. A B C .
. . D . .`
  .trim()
  .split("\n")
  .map((row) => row.split(" "))

let row = 2
let col = 0
const code = []
const cmd = new Map([
  [
    "U",
    () => {
      if (row !== 0 && matrix[row - 1][col] !== ".") row--
    },
  ],
  [
    "D",
    () => {
      if (row !== matrix.length - 1 && matrix[row + 1][col] !== ".") row++
    },
  ],
  [
    "L",
    () => {
      if (col !== 0 && matrix[row][col - 1] !== ".") col--
    },
  ],
  [
    "R",
    () => {
      if (col !== matrix[row].length - 1 && matrix[row][col + 1] !== ".") col++
    },
  ],
])

for (let idx = 0; idx < data.length; idx++) {
  for (let jdx = 0; jdx < data[idx].length; jdx++) {
    cmd.get(data[idx][jdx])()
  }
  code.push(matrix[row][col])
}

const resultB = code.join("")

console.info("\nSolution B:")
console.info(resultB)
console.timeEnd()

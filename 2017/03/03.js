const fs = require("fs")
console.time()

const data = Number(fs.readFileSync("data.txt", "utf8"))

let i = 0
let sum = 1
for (; sum + i * 2 * 4 < data; i++) {
  sum += i * 2 * 4
}
const resultA =
  i +
  Math.min(...[0, 1, 2, 3].map((e) => Math.abs(data - (sum + e * i * 2 + i))))

let size = 5
let row = (size - 1) / 2
let col = row
let mRow = 0
let mCol = 1

const neighbors = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
]

const newArray = (size) => new Array(size).fill(0)

const matrix = newArray(size).map(() => newArray(size))
matrix[row][col] = 1

while (sum < data) {
  sum = 0
  row += mRow
  col += mCol
  neighbors.forEach(([y, x]) => {
    sum += matrix[row + y][col + x]
  })
  matrix[row][col] = sum
  if (mCol === 1) {
    //turn
    if (matrix[row - 1][col] === 0) {
      mCol = 0
      mRow = -1
      continue
    }
    if (matrix[row][col + 2] === undefined) {
      // extend matrix
      row++
      col++
      size += 2
      matrix.forEach((arr) => {
        arr.unshift(0)
        arr.push(0)
      })
      matrix.unshift(newArray(size))
      matrix.push(newArray(size))
    }
  }
  // turn
  if (mRow === -1 && matrix[row][col - 1] === 0) {
    mCol = -1
    mRow = 0
    continue
  }
  // turn
  if (mCol === -1 && matrix[row + 1][col] === 0) {
    mCol = 0
    mRow = 1
    continue
  }
  // turn
  if (mRow === 1 && matrix[row][col + 1] === 0) {
    mCol = 1
    mRow = 0
    continue
  }
}

const resultB = sum

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

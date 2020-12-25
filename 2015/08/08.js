console.time()
const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .replace(/\r\n/g, "\n")
  .split("\n")

const reducedA = data
  .map((row) => [row.length, eval(row).length])
  .reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]], [0, 0])
const resultA = reducedA[0] - reducedA[1]

const reducedB = data
  .map((row) => [row.length, JSON.stringify(row).length])
  .reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]], [0, 0])
const resultB = reducedB[1] - reducedB[0]

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

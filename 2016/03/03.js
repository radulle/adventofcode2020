const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.match(/\d{1,}/g).map(Number))

const check = ([a, b, c]) => a + b > c && b + c > a && c + a > b

const resultA = data.filter(check).length

let resultB = 0
for (let i = 0; i < data.length; i += 3) {
  for (let j = 0; j < 3; j++) {
    if (check([data[i][j], data[i + 1][j], data[i + 2][j]])) resultB++
  }
}

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB)

console.timeEnd()

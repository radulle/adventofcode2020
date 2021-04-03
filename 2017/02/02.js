const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r\n/)
  .map((row) => row.split(/\s/).map(Number))

const resultA = data
  .map((cur) => {
    const max = Math.max(...cur)
    const min = Math.min(...cur)
    return max - min
  })
  .reduce((acc, cur) => acc + cur, 0)

const resultB = data
  .map((cur) => {
    cur.sort((a, b) => b - a)
    for (let i = 0; i < cur.length; i++) {
      for (let j = i + 1; j < cur.length; j++) {
        if (cur[i] % cur[j] === 0) return cur[i] / cur[j]
      }
    }
  })
  .reduce((acc, cur) => acc + cur, 0)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

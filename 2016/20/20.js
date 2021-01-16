const fs = require("fs")
console.time()

const blacklist = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split("-").map(Number))

let whitelist = []
let cur = 0
while (cur < 4294967295) {
  const ranges = blacklist.filter(([min, max]) => cur >= min && cur <= max)
  if (!ranges.length) {
    whitelist.push(cur)
    cur++
    continue
  }
  cur = ranges.sort(([, maxA], [, maxB]) => maxB - maxA)[0][1] + 1
}

const resultA = whitelist[0]
const resultB = whitelist.length

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

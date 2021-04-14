const fs = require("fs")
const lib = require("lib")
console.time()

const skip = Number(fs.readFileSync("data.txt", "utf8"))
let loop = [0]
let pos = 0

for (let i = 1; i < 2018; i++) {
  pos = ((pos + skip) % loop.length) + 1
  loop = [...loop.slice(0, pos), i, ...loop.slice(pos)]
}
const resultA = loop[pos + 1]

pos = 0
let size = 1
let second
for (let i = 1; i < 50_000_001; i++) {
  pos = ((pos + skip) % size) + 1
  if (pos === 1) second = i
  size++
}
let resultB = second

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

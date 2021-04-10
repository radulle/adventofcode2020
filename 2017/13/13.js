const fs = require("fs")
const lib = require("lib")
console.time()

const data = [
  ...fs.readFileSync("data.txt", "utf8").matchAll(/(\d+): (\d+)/g),
].map(([_, a, b]) => [Number(a), Number(b)])

const isZero = (a, b, delay = 0) => !((a + delay) % (b * 2 - 2))

const resultA = data.reduce(
  (acc, [a, b]) => acc + (isZero(a, b) ? a * b : 0),
  0
)

let resultB = 0
while (data.some(([a, b]) => isZero(a, b, resultB))) {
  resultB++
}

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

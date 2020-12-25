console.time()
const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split("x").map(Number))

function wrapper([a, b, c]) {
  const A = a * b
  const B = b * c
  const C = c * a
  return 2 * (A + B + C) + Math.min(A, B, C)
}

const result = data.map(wrapper).reduce((acc, cur) => acc + cur, 0)

console.info("Solution:")
console.info(result, "\n")
console.timeEnd()

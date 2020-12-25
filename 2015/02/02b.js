console.time()
const fs = require("fs")

const data = fs
  .readFileSync("data.txt", "utf8")
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split("x").map(Number))

function ribbon([a, b, c]) {
  return a * b * c + 2 * (a + b + c - Math.max(a, b, c))
}

const result = data.map(ribbon).reduce((acc, cur) => acc + cur, 0)

console.info("Solution:")
console.info(result, "\n")
console.timeEnd()

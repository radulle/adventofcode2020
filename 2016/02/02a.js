const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((row) => row.split(""))

let x = 2
let y = 2
const code = []
const cmd = new Map([
  ["U", () => (y = Math.max(y - 1, 1))],
  ["D", () => (y = Math.min(y + 1, 3))],
  ["L", () => (x = Math.max(x - 1, 1))],
  ["R", () => (x = Math.min(x + 1, 3))],
])

for (let idx = 0; idx < data.length; idx++) {
  for (let jdx = 0; jdx < data[idx].length; jdx++) {
    cmd.get(data[idx][jdx])()
  }
  code.push(3 * (y - 1) + x)
}

const resultA = code.join("")

console.info("\nSolution A:")
console.info(resultA)
console.timeEnd()
const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")

let message = []

for (let idx = 0; idx < data[0].length; idx++) {
  const map = new Map()
  for (let jdx = 0; jdx < data.length; jdx++) {
    const char = data[jdx][idx]
    map.set(char, (map.get(char) || 0) + 1)
  }
  message.push([...map.entries()].sort((a, b) => b[1] - a[1]))
}

let resultA = message.reduce((acc, cur) => acc + cur[0][0], "")
let resultB = message.reduce((acc, cur) => acc + cur[cur.length - 1][0], "")

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")

console.timeEnd()

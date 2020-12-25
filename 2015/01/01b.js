console.time()
const fs = require("fs")

const instructions = fs
  .readFileSync("data.txt", "utf8")
  .split("")
  .map((e) => (e === "(" ? 1 : -1))

let floor = 0
let i = 0
while (floor !== -1) {
  floor = floor + instructions[i]
  i++
}

console.info("Solution:")
console.info(i, "\n")
console.timeEnd()

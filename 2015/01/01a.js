console.time()
const fs = require("fs")

const instructions = fs
  .readFileSync("data.txt", "utf8")
  .split("")
  .map((e) => (e === "(" ? 1 : -1))

const result = instructions.reduce((acc, cur) => acc + cur, 0)
console.info("Solution:")
console.info(result, "\n")
console.timeEnd()

const fs = require("fs")
const knotHash = require(".")
console.time()

const data = fs.readFileSync("data.txt", "utf8")

const resultB = knotHash(data).join("")

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

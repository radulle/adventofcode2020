const fs = require("fs")
const hash = require("../10")
console.time()

const data = fs.readFileSync("data.txt", "utf8")

let filled = 0
for (let i = 0; i < 128; i++) {
  filled += hash(data + "-" + i)
    .map((e) => parseInt(e, 16).toString(2))
    .join("")
    .split("")
    .filter((e) => e === "1").length
}

const resultA = filled

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()

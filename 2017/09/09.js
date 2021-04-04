const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").replace(/!./g, "")

let depth = 0,
  score = 0

for (const c of data.replace(/<.*?>/g, "")) {
  if (c === "{") {
    depth++
    continue
  }
  if (c === "}") score += depth--
}

const resultA = score
const resultB = [...data.match(/<.*?>/g)]
  .map((e) => e.length - 2)
  .reduce((acc, cur) => acc + cur, 0)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

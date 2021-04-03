const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(/\r\n/).map(Number)

function solve(data, stranger = false) {
  const d = data.slice()
  let steps = 0
  let pos = 0
  let offset
  while (pos < d.length) {
    offset = d[pos]
    if (stranger && offset >= 3) {
      d[pos]--
    } else {
      d[pos]++
    }
    pos += offset
    steps++
  }
  return steps
}

const resultA = solve(data)
const resultB = solve(data, true)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

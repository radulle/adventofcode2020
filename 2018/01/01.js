const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(/\r?\n/).map(Number)

let freq = 0
for (const val of data) {
  freq += val
}
const resultA = freq

let set = new Set()
let found
freq = 0
main: while (true) {
  for (const val of data) {
    freq += val
    if (found === undefined && set.has(freq)) {
      found = freq
      break main
    }
    set.add(freq)
  }
}
const resultB = found

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

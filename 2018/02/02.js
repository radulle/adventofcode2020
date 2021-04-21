const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(/\r?\n/)

let twos = 0
let threes = 0
for (const val of data) {
  const counts = {}
  for (const c of val) {
    counts[c] = (counts[c] || 0) + 1
  }
  if (Object.values(counts).includes(2)) twos++
  if (Object.values(counts).includes(3)) threes++
}
const resultA = twos * threes

let resultB
main: for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    let diff = []
    for (let k = 0; k < data[i].length; k++) {
      if (data[i][k] !== data[j][k]) {
        diff.push(k)
      }
    }
    if (diff.length === 1) {
      resultB = data[i].slice(0, diff[0]) + data[i].slice(diff[0] + 1)
      break main
    }
  }
}

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

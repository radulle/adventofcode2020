const fs = require("fs")
console.time()

const INPUT = fs.readFileSync("data.txt", "utf8")

const recipes = [3, 7]
const elves = [0, 1]

let n = 0
const seq = INPUT.split("").map(Number)
let resultB

main: while (true) {
  const sum = elves
    .reduce((acc, cur) => acc + recipes[cur], 0)
    .toString()
    .split("")
    .map(Number)
  for (e of sum) {
    recipes.push(e)
    if (seq[n] === e) {
      n++
      if (n === seq.length) {
        resultB = recipes.length - seq.length
        break main
      }
      continue
    }
    if (seq[0] === e) {
      n = 1
      continue
    }
    n = 0
  }
  elves.forEach((e, id) => {
    elves[id] = (e + recipes[e] + 1) % recipes.length
  })
}

let resultA = ""
for (let i = +INPUT; i < +INPUT + 10; i++) {
  resultA += recipes[i]
}

console.info("\nSolution A:\n")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

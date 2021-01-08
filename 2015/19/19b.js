const { match } = require("assert")
const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n\n")

let molecule = data[1]
const goal = "e"
const formulas = data[0]
  .split("\n")
  .map((e) => e.split(" => ").reverse())
  .sort(([a], [b]) => b.length - a.length)
let count = 0

//  under presumption that there is only one solution
while (molecule !== goal) {
  formulas: for (const [src, dest] of formulas) {
    if (molecule.includes(src)) {
      molecule = molecule.replace(src, dest)
      count++
      break formulas
    }
  }
}

const result = count

console.info("\nSolution B:")
console.info(result)
console.timeEnd()

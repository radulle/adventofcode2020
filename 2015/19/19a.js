const { match } = require("assert")
const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n\n")

const initial = data[1]
const formulas = data[0].split("\n")

const set = new Set()

formulas.forEach((row) => {
  const [src, dest] = row.split(" => ")
  for (const match of initial.matchAll(new RegExp(src, "g"))) {
    set.add(
      match.input.slice(0, match.index) +
        dest +
        match.input.slice(match.index + src.length)
    )
  }
})

const result = set.size

console.info("\nSolution A:")
console.info(result)
console.timeEnd()

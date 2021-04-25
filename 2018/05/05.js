const fs = require("fs")
console.time()

const polymer = fs.readFileSync("data.txt", "utf8").trim()

function reaction(polymer) {
  let newPolymer = []
  for (let i = 0; i < polymer.length; i++) {
    if (
      !newPolymer.length ||
      Math.abs(
        polymer[i].charCodeAt(0) ^
          newPolymer[newPolymer.length - 1].charCodeAt(0)
      ) !== 32
    ) {
      newPolymer.push(polymer[i])
    } else {
      newPolymer.pop()
    }
  }
  return newPolymer.join("")
}

const resultA = reaction(polymer).length

let min = Infinity
for (let i = 65; i < 91; i++) {
  p = polymer.replace(new RegExp(String.fromCharCode(i), "gi"), "")
  min = Math.min(reaction(p).length, min)
}

const resultB = min

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

const fs = require("fs")
console.time()

let data = Number(fs.readFileSync("data.txt", "utf8"))

const goal = data / 10
let houses = new Uint32Array(goal)
let house = goal
for (let i = 1; i < goal; i++) {
  for (let j = i; j < goal; j += i) {
    if ((houses[j] += i) >= goal && j < house) house = j
  }
}
const resultA = house

houses.fill(0)
house = goal
for (let i = 1; i < goal; i++) {
  let used = 0
  for (let j = i; j < goal; j += i) {
    if ((houses[j] += i * 11) >= goal * 10 && j < house) house = j
    if (used++ === 50) break
  }
}
const resultB = house

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB)
console.timeEnd()

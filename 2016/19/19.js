const fs = require("fs")
const {
  LinkedListDoubleCircular,
  LinkedListDoubleCircularMid,
} = require("../linkedList")
console.time()

const size = +fs.readFileSync("data.txt", "utf8").trim()

const circleA = new LinkedListDoubleCircular()
for (let id = 1; id < size + 1; id++) {
  circleA.append(id)
}
const resultA = circleA.reduceToOne()

const circleB = new LinkedListDoubleCircularMid()
for (let id = 1; id < size + 1; id++) {
  circleB.append(id, size)
}
const resultB = circleB.reduceToOne()

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

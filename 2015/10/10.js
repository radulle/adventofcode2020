console.time()
const fs = require("fs")

let data = fs.readFileSync("data.txt", "utf8").trim()

function apply(times) {
  for (let i = 0; i < times; i++) {
    data = data.replace(/(.)\1*/g, (...arg) => arg[0].length + arg[1])
  }
}

apply(40)
console.info("\nSolution A:")
console.info(data.length)
apply(10)
console.info("\nSolution B:")
console.info(data.length, "\n")
console.timeEnd()

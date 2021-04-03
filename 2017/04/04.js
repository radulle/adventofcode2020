const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(/\r\n/)

const resultA = data.filter((row) => {
  return !/\b(\w+)\b.*\b\1\b/.test(row)
}).length

const resultB = data.filter((row) => {
  return !/\b(\w+)\b.*\b\1\b/.test(
    row
      .split(" ")
      .map((word) => word.split("").sort().join(""))
      .join(" ")
  )
}).length

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

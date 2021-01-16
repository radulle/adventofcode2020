const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").trim()

const sum = (acc, cur) => acc + cur
const run = (rows) => {
  const map = []
  map.push(data.split("").map((e) => (e === "^" ? 1 : 0)))
  for (let idx = 0; idx < rows - 1; idx++) {
    const row = []
    const prev = map[idx]
    for (let jdx = 0; jdx < prev.length; jdx++) {
      if (
        (!prev[jdx - 1] && prev[jdx] && prev[jdx + 1]) ||
        (prev[jdx - 1] && prev[jdx] && !prev[jdx + 1]) ||
        (!prev[jdx - 1] && !prev[jdx] && prev[jdx + 1]) ||
        (prev[jdx - 1] && !prev[jdx] && !prev[jdx + 1])
      ) {
        row.push(1)
      } else {
        row.push(0)
      }
    }
    map.push(row)
  }
  return (
    map.length * map[0].length - map.map((row) => row.reduce(sum)).reduce(sum)
  )
}

const resultA = run(40)
const resultB = run(400000)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

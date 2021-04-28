const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(" ").map(Number)

let index = 0
function parse(data) {
  const childCount = data[index++]
  const metaCount = data[index++]
  const values = []
  let value = 0
  for (let i = 0; i < childCount; i++) {
    values.push(parse(data))
  }
  for (let i = index; i < index + metaCount; i++) {
    value += childCount === 0 ? data[i] : values[data[i] - 1] || 0
  }
  index += metaCount
  return value
}

const resultA = parse(data)

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()

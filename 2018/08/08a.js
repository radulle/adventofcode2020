const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(" ").map(Number)

let index = 0
const values = []
function parse(data) {
  const childCount = data[index++]
  const metaCount = data[index++]
  for (let i = 0; i < childCount; i++) {
    parse(data)
  }
  for (let i = index; i < index + metaCount; i++) {
    values.push(data[i])
  }
  index += metaCount
}

parse(data)

const resultB = values.reduce((acc, cur) => acc + cur)

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

const fs = require("fs")
console.time()

const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number)
const SIZE = 256
const list = [...Array(SIZE).keys()]
let skip = 0
let pos = 0

data.forEach((len) => {
  for (let i = 0; i < Math.floor(len / 2); i++) {
    let tmp = list[pos + i]
    list[pos + i] = list[(pos + len - i - 1) % SIZE]
    list[(pos + len - i - 1) % SIZE] = tmp
  }
  pos = (pos + len + skip) % SIZE
  skip++
})

const resultA = list[0] * list[1]

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()

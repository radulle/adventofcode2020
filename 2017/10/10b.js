const fs = require("fs")
console.time()

const SUFFIX = [17, 31, 73, 47, 23]
const data = fs
  .readFileSync("data.txt", "utf8")
  .split("")
  .map((e) => e.charCodeAt(0))
  .concat(SUFFIX)
const SIZE = 256
const ITERATIONS = 64
const list = [...Array(SIZE).keys()]
let skip = 0
let pos = 0

for (let j = 0; j < ITERATIONS; j++) {
  data.forEach((len) => {
    for (let i = 0; i < Math.floor(len / 2); i++) {
      let tmp = list[(pos + i) % SIZE]
      list[(pos + i) % SIZE] = list[(pos + len - i - 1) % SIZE]
      list[(pos + len - i - 1) % SIZE] = tmp
    }
    pos = (pos + len + skip) % SIZE
    skip++
  })
}

const compressed = []
for (let i = 0; i < SIZE; i += 16) {
  let hex
  for (let j = i; j < i + 16; j++) {
    hex = hex ^ list[j]
  }
  compressed.push(hex)
}

const resultB = compressed
  .map((num) => num.toString(16).padStart(2, "0"))
  .join("")

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

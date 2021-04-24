const fs = require("fs")
console.time()

const data = [
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(/#(\d+)+ @ (\d+),(\d+): (\d+)x(\d+)/g),
]
const hash = (col, row) => col + "," + row
const map = new Map()

for (const [_, id, left, top, width, height] of data) {
  for (let i = +top; i < +top + +height; i++) {
    for (let j = +left; j < +left + +width; j++) {
      map.set(hash(i, j), (map.get(hash(i, j)) || 0) + 1)
    }
  }
}
const resultA = [...map.values()].filter((e) => e > 1).length

let resultB
main: for (const [_, id, left, top, width, height] of data) {
  for (let i = +top; i < +top + +height; i++) {
    for (let j = +left; j < +left + +width; j++) {
      if (map.get(hash(i, j)) > 1) continue main
    }
  }
  resultB = +id
  break main
}

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

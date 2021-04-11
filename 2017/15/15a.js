const fs = require("fs")
const hash = require("../10")
console.time()

const data = [
  ...fs.readFileSync("data.txt", "utf8").matchAll(/(\d+)/g),
].map(([_, a]) => Number(a))

function* gen(factor, initial) {
  let val = initial
  while (true) {
    val = (val * factor) % 2147483647
    yield val & 0xffff
  }
}

const a = gen(16807, data[0])
const b = gen(48271, data[1])

let resultA = 0

for (let i = 0; i < 40_000_000; i++) {
  if (a.next().value === b.next().value) resultA++
}

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()

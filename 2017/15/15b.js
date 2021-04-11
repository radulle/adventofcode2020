const fs = require("fs")
const hash = require("../10")
console.time()

const data = [
  ...fs.readFileSync("data.txt", "utf8").matchAll(/(\d+)/g),
].map(([_, a]) => Number(a))

function* gen(factor, initial, mod) {
  let val = initial
  while (true) {
    val = (val * factor) % 2147483647
    if (val & (mod - 1)) continue
    yield val & 0xffff
  }
}

const a = gen(16807, data[0], 4)
const b = gen(48271, data[1], 8)

let resultB = 0

for (let i = 0; i < 5_000_000; i++) {
  if (a.next().value === b.next().value) resultB++
}

console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

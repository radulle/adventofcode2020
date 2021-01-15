const fs = require("fs")
console.time()

const input = fs
  .readFileSync("data.txt", "utf8")
  .matchAll(
    /Disc #(\d+) has (\d+) positions; at time=(\d+), it is at position (\d+)./g
  )

const state = []
for (const el of input) {
  state.push((t) => (t + +el[1] + +el[4]) % +el[2])
}

const run = (state) => {
  let i = 0
  while (state.map((e) => e(i)).some((e) => e !== 0)) {
    i++
  }
  return i
}

const resultA = run(state)
state.push((t) => (t + state.length) % 11)
const resultB = run(state)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

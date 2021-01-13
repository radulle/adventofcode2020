const fs = require("fs")
console.time()

const input = fs.readFileSync("data.txt", "utf8").trim()

const state = []
const rules = []

for (const match of input.matchAll(/value (\d+) goes to bot (\d+)/g)) {
  const [, chip, bot] = match
  state[+bot] = [...(state[+bot] || []), +chip]
}

for (const match of input.matchAll(
  /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/g
)) {
  const [, bot, l, low, h, high] = match
  rules[+bot] = [
    +low + (l === "output" ? 1000 : 0),
    +high + (h === "output" ? 1000 : 0),
  ]
}

let idx, resultA
while ((idx = state.findIndex((e, i) => i < 1000 && e?.length === 2)) !== -1) {
  const [low, high] = state[idx].sort((a, b) => a - b)
  if (low === 17 && high === 61) {
    resultA = idx
  }
  const [l, h] = rules[idx]
  state[idx] = []
  state[l] = [...(state[l] || []), low]
  state[h] = [...(state[h] || []), high]
}

const resultB = state[1000] * state[1001] * state[1002]

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

console.time()
const fs = require("fs")

const data = fs.readFileSync("data.txt", "utf8")

let next = data.match(/Begin in state (.)\./)[1]
let steps = Number(
  data.match(/Perform a diagnostic checksum after (\d+) steps\./)[1]
)

const state = new Map()
let pos = 0

const move = (dir) => (dir === "right" ? pos++ : pos--)
const instructions = new Map()
for (const match of data.matchAll(
  /In state (.):\s*If the current value is \d:\s*- Write the value (\d)\.\s*- Move one slot to the (left|right)\.\s*- Continue with state (.)\.\s*If the current value is \d:\s*- Write the value (\d)\.\s*- Move one slot to the (left|right)\.\s*- Continue with state (.)\./g
)) {
  const [_, current, write1, dir1, next1, write2, dir2, next2] = match
  instructions.set(current, () => {
    const val = state.get(pos) || 0
    if (val === 0) {
      state.set(pos, +write1)
      next = next1
      move(dir1)
    } else {
      state.set(pos, +write2)
      next = next2
      move(dir2)
    }
  })
}

for (let step = 0; step < steps; step++) {
  instructions.get(next)()
}

const resultA = [...state.values()].filter(Boolean).length

console.info("\nSolution A:")
console.info(resultA, "\n")
console.timeEnd()

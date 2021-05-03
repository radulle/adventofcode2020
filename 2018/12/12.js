const fs = require("fs")
console.time()

const file = fs.readFileSync("data.txt", "utf8")

let state = {}
{
  const c = /initial state: (.*)/.exec(file)[1]
  for (let i = -2; i < c.length + 2; i++) {
    state[i] = c[i] === "#" ? "#" : "."
  }
}

const matches = []
for (const [_, from, to] of file.matchAll(/(.+) => (#|\.)/g)) {
  if (to === "#") matches.push(from)
}

let min,
  max,
  prev,
  diff,
  resultA,
  i = 0,
  confidence = 0,
  confidenceThreshold = 42
while (true) {
  i++
  const newState = {}
  min = Infinity
  max = -Infinity
  for (let pos of Object.keys(state)) {
    pos = Number(pos)
    let match = ""
    for (let i = pos - 2; i < pos + 3; i++) {
      match += state[i] === "#" ? "#" : "."
    }
    newState[pos] = matches.includes(match) ? "#" : "."
    if (pos > max && newState[pos] === "#") max = pos
    if (pos < min && newState[pos] === "#") min = pos
  }
  newState[min - 1] = "."
  newState[min - 2] = "."
  newState[max + 1] = "."
  newState[max + 2] = "."
  state = newState
  let value = 0
  for (let j = min; j <= max; j++) {
    value += state[j] === "#" ? j : 0
  }
  if (i === 20) resultA = value
  if (diff === value - prev) {
    confidence++
  } else {
    confidence = 0
  }
  diff = value - prev
  if (confidence > confidenceThreshold) break
  prev = value
}

const resultB = prev + diff * (50_000_000_000 - i + 1)

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()
debugger

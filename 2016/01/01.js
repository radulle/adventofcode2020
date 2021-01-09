const fs = require("fs")
console.time()

const data = fs
  .readFileSync("data.txt", "utf8")
  .split(", ")
  .map((e) => [e[0], Number(e.slice(1))])

let E = 0
let N = 0
let dir = 0
const cmd = new Map([
  [0, () => N++],
  [1, () => E++],
  [2, () => N--],
  [3, () => E--],
  [
    "L",
    () => {
      dir--
      if (dir < 0) dir = 3
    },
  ],
  [
    "R",
    () => {
      dir++
      if (dir > 3) dir = 0
    },
  ],
])
const visited = new Set(["0,0"])
const crossed = []

data.forEach(([turn, dist]) => {
  cmd.get(turn)()
  for (let i = 0; i < dist; i++) {
    cmd.get(dir)()
    if (visited.has(N + "," + E)) crossed.push([N, E])
    visited.add(N + "," + E)
  }
})

const resultA = Math.abs(N) + Math.abs(E)
const resultB = Math.abs(crossed[0][0]) + Math.abs(crossed[0][1])

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

// https://en.wikipedia.org/wiki/Summed-area_table
const fs = require("fs")
console.time()

const SN = Number(fs.readFileSync("data.txt", "utf8"))
const SIZE = 300
const grid = []

const power = (x, y, sn = SN) => {
  const id = x + 1 + 10
  return (Math.floor(((id * (y + 1) + sn) * id) / 100) % 10) - 5
}

for (let y = 0; y < SIZE; y++) {
  grid.push([])
  for (let x = 0; x < SIZE; x++) {
    let sum = power(x, y)
    if (x > 0) sum += grid[y][x - 1]
    if (y > 0) sum += grid[y - 1][x]
    if (x > 0 && y > 0) sum -= grid[y - 1][x - 1]
    grid[y].push(sum)
  }
}

const getVal = (x, y) => (x >= 0 && y >= 0 ? grid[y][x] : 0)
const getSum = (x, y, reg) =>
  getVal(x, y) +
  getVal(x - reg, y - reg) -
  getVal(x - reg, y) -
  getVal(x, y - reg)
const getMax = (reg) => {
  let max = -Infinity
  let pos
  for (let i = reg - 1; i < SIZE; i++) {
    for (let j = reg - 1; j < SIZE; j++) {
      const val = getSum(j, i, reg)
      if (val > max) {
        max = val
        pos = { x: j, y: i }
      }
    }
  }
  return { max, pos, reg }
}

let best = getMax(3)
const resultA = `${best.pos.x - best.reg + 2},${best.pos.y - best.reg + 2} => ${
  best.max
}`

for (reg = 4; reg < 300; reg++) {
  const cur = getMax(reg)
  if (cur.max > best.max) best = cur
}
const resultB = `${best.pos.x - best.reg + 2},${best.pos.y - best.reg + 2},${
  best.reg
} => ${best.max}`

console.info("\nSolution A:\n")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

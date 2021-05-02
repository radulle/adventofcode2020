const fs = require("fs")
console.time()

const SN = Number(fs.readFileSync("data.txt", "utf8"))
const SIZE = 300

const getPowerFactory = (sn = SN, gridSize = SIZE, grid = []) => (x, y) => {
  const pos = x + y * gridSize
  let power = grid[pos]
  if (power !== undefined) return power
  const id = x + 10
  return (grid[pos] = (Math.floor(((id * y + sn) * id) / 100) % 10) - 5)
}

const getMaxPower = ({
  sn = SN,
  regionSize = 3,
  grid = [],
  gridSize = SIZE,
  cache = new Map(),
}) => {
  const getPower = getPowerFactory(sn, gridSize, grid)
  let maxPower = -Infinity
  let maxPosition
  for (let x = 1; x <= gridSize - regionSize; x++) {
    for (let y = 1; y <= gridSize - regionSize; y++) {
      let cached = cache.get(`${regionSize - 1},${x},${y}`)
      let pow = 0
      if (cached !== undefined) {
        pow += cached
        for (let i = 0; i < regionSize - 1; i++) {
          pow += getPower(x + i, y + regionSize - 1)
          pow += getPower(x + regionSize - 1, y + i)
        }
        pow += getPower(x + regionSize - 1, y + regionSize - 1)
      } else {
        for (let i = 0; i < regionSize; i++) {
          for (let j = 0; j < regionSize; j++) {
            pow += getPower(x + i, y + j)
          }
        }
      }
      cache.set(`${regionSize},${x},${y}`, pow)
      if (maxPower < pow) {
        maxPower = pow
        maxPosition = x + "," + y
      }
    }
  }
  return { maxPower, maxPosition }
}

const cache = new Map()
const max = []
const grid = []

for (let regionSize = 1; regionSize <= 300; regionSize++) {
  const { maxPower, maxPosition } = getMaxPower({ regionSize, grid, cache })
  max.push({ maxPower, maxPosition: maxPosition + "," + regionSize })
}

const resultA = max[2]
const resultB = max.reduce(
  (acc, cur) => {
    if (cur.maxPower > acc.maxPower) {
      return cur
    }
    return acc
  },
  { maxPower: -Infinity }
)

console.info("\nSolution A:\n")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

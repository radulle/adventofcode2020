const fs = require("fs")
console.time()

let data = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n/g)
  .map((e) => e.split(",").map(Number))

let minX = Infinity,
  minY = Infinity,
  maxX = -Infinity,
  maxY = -Infinity
for (const [x, y] of data) {
  if (x < minX) minX = x
  if (x > maxX) maxX = x
  if (y < minY) minY = y
  if (y > maxY) maxY = y
}

let area = 0
const THRESHOLD = 10_000
const map = new Array(data.length).fill(0)
for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    const distances = data.map(([X, Y]) => Math.abs(X - x) + Math.abs(Y - y))

    if (distances.reduce((acc, cur) => acc + cur) < THRESHOLD) area++

    const closest = distances.reduce((acc, d, i) => {
      if (!acc.length || acc[0].d > d) return [{ d, i }]
      if (acc[0].d === d) acc.push({ d, i })
      return acc
    }, [])

    if (x === minX || x === maxX || y === minY || y === maxY) {
      closest.forEach(({ i }) => (map[i] = -Infinity))
      continue
    }
    if (closest.length === 1) {
      map[closest[0].i]++
    }
  }
}

const resultA = Math.max(...map)
const resultB = area

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

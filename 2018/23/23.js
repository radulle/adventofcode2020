// #grid
const fs = require("fs")
console.time()

const bots = [
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/g),
].map(([, x, y, z, r]) => [+x, +y, +z, +r])

const str = bots.reduce((acc, cur) => {
  if (acc[3] < cur[3]) acc = cur
  return acc
})

function getDist(A, B = [0, 0, 0]) {
  return Math.abs(A[0] - B[0]) + Math.abs(A[1] - B[1]) + Math.abs(A[2] - B[2])
}

const resultA = bots.filter((cur) => getDist(cur, str) <= str[3]).length

let min = [Infinity, Infinity, Infinity],
  max = [-Infinity, -Infinity, -Infinity]

for (const cur of bots) {
  for (let i = 0; i < 3; i++) {
    if (cur[i] < min[i]) min[i] = cur[i]
    if (cur[i] > max[i]) max[i] = cur[i]
  }
}
let size = max[0] - min[0],
  best

function calc() {
  while (size > 0) {
    let maxCount = 0
    for (let x = min[0]; x < max[0] + 1; x += size) {
      for (let y = min[1]; y < max[1] + 1; y += size) {
        for (let z = min[2]; z < max[2] + 1; z += size) {
          let count = 0
          for (const [ax, ay, az, r] of bots) {
            if (getDist([x, y, z], [ax, ay, az]) - r < size) {
              count++
            }
          }
          if (
            maxCount < count ||
            (maxCount === count && best && getDist([x, y, z]) < getDist(best))
          ) {
            maxCount = count
            best = [x, y, z]
          }
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      min[i] = best[i] - size
      max[i] = best[i] + size
    }
    size = Math.floor(size / 2)
  }
  return getDist(best)
}

const resultB = calc()

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("Solution B:\n")
console.info(resultB, "\n")
console.timeEnd()

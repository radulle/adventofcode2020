const fs = require("fs")
console.time()

const points = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((r) => r.trim().split(",").map(Number))

function getDist(A, B) {
  return (
    Math.abs(A[0] - B[0]) +
    Math.abs(A[1] - B[1]) +
    Math.abs(A[2] - B[2]) +
    Math.abs(A[3] - B[3])
  )
}

const constellations = []
while (points.length) {
  let added = 0
  for (let j = 0; j < constellations.length; j++) {
    for (let i = 0; i < points.length; i++) {
      const point = points[i]
      if (constellations[j].some((p) => getDist(p, point) <= 3)) {
        constellations[j].push(point)
        points.splice(i, 1)
        added++
      }
    }
  }
  if (!added) constellations.push([points.pop()])
}

const resultA = constellations.length

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.timeEnd()

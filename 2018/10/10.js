const fs = require("fs")
console.time()

let data = [
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(
      /position=<(\s*-?\d+),(\s*-?\d+)> velocity=<(\s*-?\d+),(\s*-?\d+)>/g
    ),
].map(([_, dX, dY, vX, vY]) => [+dX, +dY, +vX, +vY])

let i = 0,
  pX = Infinity,
  pY = Infinity,
  minX = Infinity,
  minY = Infinity,
  maxX = -Infinity,
  maxY = -Infinity

function play(back) {
  for (let j = 0; j < data.length; j++) {
    data[j][0] += data[j][2] * (back ? -1 : 1)
    data[j][1] += data[j][3] * (back ? -1 : 1)
  }
  minX = Infinity
  minY = Infinity
  maxX = -Infinity
  maxY = -Infinity
  for (const [x, y] of data) {
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
}

while (true) {
  play()
  if (maxX - minX > pX && maxY - minY > pY) break
  pX = maxX - minX
  pY = maxY - minY
  i++
}

play(true)

const canvas = new Array(maxY - minY + 1)
  .fill()
  .map(() => new Array(maxX - minY + 1).fill(" "))

for (const [x, y] of data) {
  canvas[y - minY][x - minX] = "#"
}

const resultA = canvas.map((row) => row.join("")).join("\n")
const resultB = i

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

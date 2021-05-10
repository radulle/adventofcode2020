// #grid #water
const fs = require("fs")
const { StackQue } = require("lib")
console.time()

let grid
const drops = new StackQue()
const overflows = []

{
  const clays = []
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity
  for (const [_, a, a0, b0, b1] of fs
    .readFileSync("data.txt", "utf8")
    .matchAll(/(x|y)=(\d+), .=(\d+)..(\d+)/g)) {
    if (a === "x") {
      for (let i = +b0; i <= +b1; i++) {
        clays.push([i, +a0])
      }
      if (+a0 < minX) minX = +a0
      if (+a0 > maxX) maxX = +a0
      if (+b0 < minY) minY = +b0
      if (+b1 > maxY) maxY = +b1
    }
    if (a === "y") {
      for (let i = +b0; i <= +b1; i++) {
        clays.push([+a0, i])
      }
      if (+a0 < minY) minY = +a0
      if (+a0 > maxY) maxY = +a0
      if (+b0 < minX) minX = +b0
      if (+b1 > maxX) maxX = +b1
    }
  }

  grid = new Array(maxY - minY + 2)
    .fill()
    .map(() => new Array(maxX - minX + 3).fill("."))
  clays.forEach(([i, j]) => (grid[i - minY + 1][j - minX + 1] = "#"))
  grid[0][500 - minX + 1] = "+"

  drops.enqueue([1, 500 - minX + 1])
}

while (true) {
  while (!drops.size && overflows.length) {
    const [or, oc] = overflows.sort((a, b) => a[0] - b[0]).pop()
    let left = -1,
      right = 1
    while (grid[or + 1][oc + left] === "~") {
      left--
    }
    while (grid[or + 1][oc + right] === "~") {
      right++
    }
    if (grid[or + 1][oc + left] === "#" && grid[or + 1][oc + right] === "#")
      drops.enqueue([or, oc])
  }
  if (!drops.size && !overflows.length) break
  const [r, c] = drops.dequeue()
  if (["#", "~"].includes(grid[r][c])) continue
  if (grid[r + 1] === undefined) {
    grid[r][c] = "|"
    continue
  }
  if (grid[r + 1][c] === ".") {
    grid[r][c] = "|"
    drops.enqueue([r + 1, c])
    continue
  }
  if (grid[r + 1] && ["#", "~"].includes(grid[r + 1][c])) {
    if (grid[r - 1][c] === "|") {
      overflows.push([r - 1, c])
      let left = -1,
        right = 1
      while (grid[r + 1][c + left] === "~") {
        left--
      }
      while (grid[r + 1][c + right] === "~") {
        right++
      }
      if (grid[r + 1][c + left] !== "|" && grid[r + 1][c + right] !== "|") {
        grid[r][c] = "~"
        drops.enqueue([r, c - 1])
        drops.enqueue([r, c + 1])
      } else {
        grid[r][c] = "|"
      }
    } else {
      grid[r][c] = "~"
      drops.enqueue([r, c - 1])
      drops.enqueue([r, c + 1])
    }
    continue
  }
}

const str = grid.flat().join("")
const resultA = (str.match(/~|\|/g) || []).length
const resultB = (str.replace(/\|~+\||\|~+#|#~+\|/g, "").match(/~/g) || [])
  .length

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("Solution B:\n")
console.info(resultB, "\n")
console.timeEnd()

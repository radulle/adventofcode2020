const fs = require("fs")
console.time()

const grid = fs
  .readFileSync("data.txt", "utf8")
  .split(/\r?\n/)
  .map((row) => row.split(""))
let word = ""
let val
let steps = 0
let dir = [1, 0]
let pos = [0, grid[0].findIndex((e) => e === "|")]

while (true) {
  if ((val = grid[pos[0]][pos[1]]) !== "+") {
    if (val === " ") break
    if (/[^ \|\-\+]/.test(val)) word += val
  } else {
    if (dir[0] === 0) {
      if (grid[pos[0] + 1][pos[1]] !== " ") {
        dir = [1, 0]
      } else {
        dir = [-1, 0]
      }
    } else {
      if (grid[pos[0]][pos[1] + 1] !== " ") {
        dir = [0, 1]
      } else {
        dir = [0, -1]
      }
    }
  }
  steps++
  pos = [pos[0] + dir[0], pos[1] + dir[1]]
}

let resultA = word
let resultB = steps

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

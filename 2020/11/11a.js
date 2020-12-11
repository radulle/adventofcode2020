const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

const neighbors = [
  [1, 0],
  [1, 1],
  [0, 1],
  [1, -1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [-1, 1],
]

let grid = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => row.split(""))

function applyToGrid(grid) {
  const newGrid = grid.map((row) => row.map((el) => el))
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      applyToSeat(grid, newGrid, i, j)
    }
  }

  function applyToSeat(grid, newGrid, i, j) {
    const type = grid[i][j]
    if (type === ".") return
    if (type === "#" && countTaken(grid, i, j) > 3) return (newGrid[i][j] = "L")
    if (type === "L" && countTaken(grid, i, j) === 0)
      return (newGrid[i][j] = "#")
  }

  function countTaken(grid, i, j) {
    let num = 0
    neighbors.forEach(([y, x]) => {
      if (grid[i + y] && grid[i + y][j + x] === "#") num++
    })
    return num
  }
  return newGrid
}

function compareGrids(grid, newGrid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== newGrid[i][j]) {
        return false
      }
    }
  }
  return newGrid
}

while (!compareGrids(grid, (newGrid = applyToGrid(grid)))) {
  grid = newGrid
}

const visual = grid.map((row) => row.join("")).join("\n")
console.info(visual, (visual.match(/#/g) || []).length)

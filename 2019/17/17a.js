const fs = require("fs")
const intCode = require("../intCode")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number)
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function photo(data) {
  const pixels = [...intCode([...data])]
  function render(data) {
    let s = ""
    data.forEach((char) => {
      switch (char) {
        case 35:
          s += "#"
          break
        case 46:
          s += "."
          break
        case 10:
          s += "\r\n"
          break
        case 94:
          s += "O"
          break
      }
    })
    return s
  }
  return render(pixels)
}

function read(photo) {
  console.info(photo)
  return photo.split("\r\n").map((row) => row.split(""))
}

function solve(data) {
  const grid = read(photo(data))

  const intersections = []
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (
        grid[i][j] === "#" &&
        grid[i][j + 1] === "#" &&
        grid[i][j - 1] === "#" &&
        grid[i - 1][j] === "#" &&
        grid[i + 1][j] === "#"
      ) {
        intersections.push([i, j])
      }
    }
  }
  return intersections.map(([i, j]) => i * j).reduce((acc, cur) => acc + cur)
}

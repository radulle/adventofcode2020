console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

const directions = ["se", "sw", "ne", "nw", "e", "w"]
function move(posStr, dir) {
  const pos = posStr.split(",").map(Number)
  switch (dir) {
    case "e":
      return [pos[0] + 2, pos[1]].join(",")
    case "se":
      return [pos[0] + 1, pos[1] + 1].join(",")
    case "ne":
      return [pos[0] + 1, pos[1] - 1].join(",")
    case "w":
      return [pos[0] - 2, pos[1]].join(",")
    case "sw":
      return [pos[0] - 1, pos[1] + 1].join(",")
    case "nw":
      return [pos[0] - 1, pos[1] - 1].join(",")
  }
}

function parseData(data) {
  return data
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((row) => {
      directions.forEach((dir, i) => {
        row = row.replace(new RegExp(dir, "g"), i)
      })
      return row.split("").map((i) => directions[i])
    })
}

const data = parseData(getData("data.txt"))

const tiles = data.map((row) => row.reduce((acc, cur) => move(acc, cur), "0,0"))

const black = new Set()

tiles.forEach((tile) => {
  if (!black.has(tile)) return black.add(tile)
  return black.delete(tile)
})

let state = black
for (let day = 0; day < 100; day++) {
  const temp = new Set()
  state.forEach((tile) => {
    const neighbors = directions.map((dir) => move(tile, dir))
    const count = neighbors.reduce(
      (acc, cur) => acc + (state.has(cur) ? 1 : 0),
      0
    )
    if (count === 1 || count === 2) temp.add(tile)
    neighbors.forEach((neighbor) => {
      if (state.has(neighbor)) return
      const n = directions
        .map((dir) => move(neighbor, dir))
        .reduce((acc, cur) => acc + (state.has(cur) ? 1 : 0), 0)
      if (n === 2) temp.add(neighbor)
    })
  })
  state = temp
}

console.info()
console.info("Solution:")
console.info(state.size)
console.info()
console.timeEnd()

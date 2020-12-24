console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

const directions = ["se", "sw", "ne", "nw", "e", "w"]
function move(pos, dir) {
  switch (dir) {
    case "e":
      return [pos[0] + 2, pos[1]]
    case "se":
      return [pos[0] + 1, pos[1] + 1]
    case "ne":
      return [pos[0] + 1, pos[1] - 1]
    case "w":
      return [pos[0] - 2, pos[1]]
    case "sw":
      return [pos[0] - 1, pos[1] + 1]
    case "nw":
      return [pos[0] - 1, pos[1] - 1]
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

const tiles = data.map((row) =>
  row.reduce((acc, cur) => move(acc, cur), [0, 0]).join(",")
)

const black = new Set()

tiles.forEach((tile) => {
  if (!black.has(tile)) return black.add(tile)
  return black.delete(tile)
})

const result = black.size

console.info()
console.info("Solution:")
console.info(result)
console.info()
console.timeEnd()

console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8")
}

function parseData(data) {
  const split = data
    .replace(/\r\n/g, "\n")
    .split(/\n\n/g)
    .map((part) => part.split("\n"))
  const parsed = []
  for (const val of split) {
    const key = Number(val[0].replace(/(:|Tile )/g, ""))
    const tile = []
    for (let i = 1; i < val.length; i++) {
      tile.push(val[i].split(""))
    }
    parsed.push({ key, tile })
  }
  return parsed
}

function transpose(tile) {
  return tile[0].map((_, colIndex) => tile.map((row) => row[colIndex]))
}

function findEdges(tiles) {
  for (const tile of tiles) {
    tile.edges = []
    tile.edges.push(tile.tile[0].join(""))
    tile.edges.push(tile.tile[tile.tile.length - 1].join(""))
    tile.edges.push(transpose(tile.tile)[0].join(""))
    tile.edges.push(transpose(tile.tile)[tile.tile.length - 1].join(""))
  }
  return tiles
}

function solve(file) {
  const data = findEdges(parseData(getData(file)))

  const filter = data.filter(
    (tile, idx, arr) =>
      tile.edges.reduce((acc, cur) => {
        if (
          arr.findIndex(
            ({ edges }, jdx) =>
              (edges.includes(cur) ||
                edges.includes(cur.split("").reverse().join(""))) &&
              jdx !== idx
          ) === -1
        ) {
          return acc + 1
        }
        return acc
      }, 0) === 2
  )
  const agg = filter.reduce((acc, cur) => acc * cur.key, 1)
  return agg
}

console.info()
console.info("Test:")
const test = solve("data-test.txt")
console.info(test, test === 20899048083289)
console.info()
console.info("Solution:")
const solution = solve("data.txt")
console.info(solution)

process.exit(0)

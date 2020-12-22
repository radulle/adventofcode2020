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

/** transpose matrix */
function transpose(tile) {
  return tile[0].map((_, colIndex) => tile.map((row) => row[colIndex]))
}
/** hash top row */
const top = (tile) => tile[0].join("")
/** hash bottom row */
const bot = (tile) => tile[tile.length - 1].join("")
/** reverse string */
const reverse = (str) => str.split("").reverse().join("")
/** add edges to the piece */
function addEdges(pieces) {
  for (const piece of pieces) {
    piece.edges = []
    const tile = piece.tile
    piece.edges.push(top(tile))
    piece.edges.push(bot(tile))
    piece.edges.push(top(transpose(tile)))
    piece.edges.push(bot(transpose(tile)))
  }
  return pieces
}

function solve(file) {
  const data = addEdges(parseData(getData(file)))

  const filter = data.filter(
    (tile, idx, arr) =>
      tile.edges.reduce((acc, cur) => {
        if (
          arr.findIndex(
            ({ edges }, jdx) =>
              (edges.includes(cur) || edges.includes(reverse(cur))) &&
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

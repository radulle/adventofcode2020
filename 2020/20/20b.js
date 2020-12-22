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
/** rotate matrix clockwise */
function rotate(matrix, times = 1) {
  const rot = (matrix) =>
    matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse())
  if (times === 1) return rot(matrix)
  return rotate(rot(matrix), times - 1)
}
/** hash top row */
const getTop = (tile) => tile[0].join("")
/** hash bottom row */
const getBot = (tile) => tile[tile.length - 1].join("")
/** hash right edge */
const getLeft = (tile) => getTop(rotate(tile, 3))
/** hash right edge */
const getRight = (tile) => getBot(rotate(tile))
/** reverse string */
const reverse = (str) => str.split("").reverse().join("")
/** add edges to the piece */
function addEdges(pieces) {
  for (const piece of pieces) {
    piece.edges = []
    for (let idx = 0; idx < 4; idx++) {
      piece.edges.push(getTop(piece.tile))
      piece.tile = rotate(piece.tile)
    }
  }
  return pieces
}
/** matches pieces that have all adjacent edges */
function matchEdges(pile, usedKeys, adjEdges) {
  if (!adjEdges) return []
  return pile.filter(
    ({ key, edges }) =>
      edges.filter(
        (edge) =>
          (adjEdges.includes(edge) || adjEdges.includes(reverse(edge))) &&
          !usedKeys.includes(key)
      ).length === adjEdges.length
  )
}
function matchEdge(pile, usedKeys, adjEdge) {
  return matchEdges(pile, usedKeys, [adjEdge])
}

function assemble(file) {
  const data = addEdges(parseData(getData(file)))
  const size = Math.sqrt(data.length)
  const corners = []
  const sides = []
  const centrals = []

  // group pieces by area of the puzzle
  data.forEach((piece, idx, arr) => {
    piece.unmatched = []
    piece.edges.forEach((cur) => {
      if (
        arr.findIndex(
          ({ edges }, jdx) =>
            (edges.includes(cur) || edges.includes(reverse(cur))) && jdx !== idx
        ) === -1
      )
        piece.unmatched.push(cur)
    })
    switch (piece.unmatched.length) {
      case 2:
        corners.push(piece)
        break
      case 1:
        sides.push(piece)
        break
      default:
        centrals.push(piece)
        break
    }
  })

  // initiate canvas
  let canvas = new Array(size).fill(null).map(() => new Array(size).fill(null))
  const usedKeys = []
  let nextEdges

  // position and rotate/flip the first piece
  {
    canvas[0][0] = corners[0]
    const cell = canvas[0][0]
    usedKeys.push(cell.key)
    if (matchEdges(data, [cell.key], [getTop(cell.tile)]).length !== 0) {
      cell.tile = cell.tile.reverse()
    }
    if (matchEdges(data, [cell.key], [getRight(cell.tile)]).length === 0) {
      cell.tile = cell.tile.map((e) => e.reverse())
    }
    nextEdges = [getRight(cell.tile)]
  }

  // position canvas borders (no rotation/flip)
  for (let idx = 0; idx < corners.length; idx++) {
    if (idx !== 0) {
      const matching = nextEdges.flatMap((edge) =>
        matchEdge(corners, usedKeys, edge)
      )
      if (matching.length > 1) {
        throw new Error("Assumption wrong!")
      }
      usedKeys.push(matching[0].key)
      canvas[0][0] = matching[0]
      const cell = canvas[0][0]
      nextEdges = cell.edges.filter(
        (edge) => !cell.unmatched.includes(edge) && !nextEdges.includes(edge)
      )
    }
    for (let jdx = 1; jdx < sides.length / 4 + 1; jdx++) {
      const matching = nextEdges.flatMap((edge) =>
        matchEdge(sides, usedKeys, edge)
      )
      if (matching.length > 1) {
        throw new Error("Assumption wrong!")
      }
      usedKeys.push(matching[0].key)
      canvas[0][jdx] = matching[0]
      const cell = canvas[0][jdx]
      const unmatchedIdx = cell.edges.findIndex((e) => e === cell.unmatched[0])
      nextEdges = [
        cell.edges[unmatchedIdx === 3 ? 0 : unmatchedIdx + 1],
        cell.edges[unmatchedIdx === 0 ? 3 : unmatchedIdx - 1],
      ]
    }
    canvas = rotate(canvas, 3)
  }

  // orient top canvas border
  for (let jdx = 1; jdx < size; jdx++) {
    const cell = canvas[0][jdx]
    const orientation = cell.edges.findIndex((edgeA) =>
      canvas[0][jdx - 1].edges.some(
        (edgeB) => reverse(edgeB) === edgeA || edgeB === edgeA
      )
    )
    switch (orientation) {
      case 0:
        cell.tile = rotate(cell.tile, 3)
        break
      case 1:
        break
      case 2:
        cell.tile = rotate(cell.tile)
        break
      case 3:
        cell.tile = rotate(cell.tile, 2)
        break
    }
    if (matchEdges(data, [cell.key], [getTop(cell.tile)]).length !== 0) {
      cell.tile = cell.tile.reverse()
    }
  }

  // orient side canvas borders
  for (const idx of [0, size - 1]) {
    for (let jdx = 1; jdx < size; jdx++) {
      const cell = canvas[jdx][idx]
      const upCell = canvas[jdx - 1][idx]
      const orientation = cell.edges.findIndex((edgeA) =>
        upCell.edges.some(
          (edgeB) => reverse(edgeB) === edgeA || edgeB === edgeA
        )
      )
      switch (orientation) {
        case 1:
          cell.tile = rotate(cell.tile)
          break
        case 2:
          cell.tile = rotate(cell.tile, 2)
          break
        case 3:
          cell.tile = rotate(cell.tile, 3)
          break
      }
      if (getTop(cell.tile) !== getBot(upCell.tile))
        cell.tile = cell.tile.map((row) => row.reverse())
    }
  }

  // orient bottom canvas border
  for (let jdx = 1; jdx < size - 1; jdx++) {
    const cell = canvas[size - 1][jdx]
    const left = canvas[size - 1][jdx - 1]
    const orientation = cell.edges.findIndex((edgeA) =>
      left.edges.some((edgeB) => reverse(edgeB) === edgeA || edgeB === edgeA)
    )
    switch (orientation) {
      case 0:
        cell.tile = rotate(cell.tile, 3)
        break
      case 1:
        break
      case 2:
        cell.tile = rotate(cell.tile)
        break
      case 3:
        cell.tile = rotate(cell.tile, 2)
        break
    }
    if (matchEdges(data, [cell.key], [getBot(cell.tile)]).length !== 0) {
      cell.tile = cell.tile.reverse()
    }
  }

  const test = combine(canvas)
  // assemble central pieces
  for (let idx = 1; idx < size - 1; idx++) {
    for (let jdx = 1; jdx < size - 1; jdx++) {
      const left = canvas[idx][jdx - 1]
      const up = canvas[idx - 1][jdx]
      const matching = matchEdges(
        centrals,
        [left.key, up.key],
        [getBot(up.tile), getLeft(left.tile)]
      )
      if (matching.length > 1) {
        throw new Error(`Assumption wrong! ${idx},${jdx}: ${matching.length}`)
      }
      canvas[idx][jdx] = matching[0]
      const cell = canvas[idx][jdx]
      // rotate/flip
      const orientation = cell.edges.findIndex((e) =>
        left.edges.some((a) => reverse(a) === e || a === e)
      )
      switch (orientation) {
        case 0:
          cell.tile = rotate(cell.tile, 3)
          break
        case 1:
          break
        case 2:
          cell.tile = rotate(cell.tile)
          break
        case 3:
          cell.tile = rotate(cell.tile, 2)
          break
      }
      if (getTop(cell.tile) !== getBot(up.tile)) cell.tile = cell.tile.reverse()
    }
  }
  return canvas
}

/** combine matrix of individual pieces */
function combine(canvas, size = 10) {
  return canvas
    .map((a) => a.map((b) => b?.tile?.map((c) => c.join(""))))
    .map((row) =>
      row
        .map((cell) =>
          cell === undefined ? new Array(size).fill(" ".repeat(size)) : cell
        )
        .reduce((acc, cur) => acc.map((e, i) => e + cur[i]))
        .join("\n")
    )
    .join("\n")
}

/** removes piece edges */
function draw(combined, size = 10) {
  const matrix = combined.split("\n").map((row) => row.split(""))
  const cleanCols = matrix.map((row) =>
    row.reduce((acc, cur, idx) => {
      if (idx % size !== 0 && idx % size !== size - 1) acc.push(cur)
      return acc
    }, [])
  )
  const clean = cleanCols.reduce((acc, cur, idx) => {
    if (idx % size !== 0 && idx % size !== size - 1) acc.push(cur)
    return acc
  }, [])
  const string = clean.map((row) => row.join("")).join("\n")
  return string
}

const snake = `
                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `
  .slice(1)
  .split("\n")
  .map((row) => row.split(""))
  .map((line, row) =>
    line.reduce((acc, val, col) => [...acc, { val, row, col }], [])
  )
  .flat()
  .filter(({ val }) => val !== " ")
snake.height = snake.reduce((acc, { row }) => (row > acc ? row : acc), 0)

function markSnakes(matrix, snake) {
  let snakes = 0
  for (let idx = 0; idx < matrix.length - snake.height; idx++) {
    for (let jdx = 0; jdx < matrix[0].length; jdx++) {
      if (snake.every(({ row, col }) => matrix[idx + row][jdx + col] === "#")) {
        snakes++
        snake.forEach(({ row, col }) => (matrix[idx + row][jdx + col] = "O"))
      }
    }
  }
  if (snakes) return matrix
}

const drawing = draw(combine(assemble("data.txt")))
const matrix = drawing.split("\n").map((row) => row.split(""))

// rotate/flip matrix until snakes found
let result
for (let idx = 0; idx < 4; idx++) {
  result = markSnakes(rotate(matrix), snake)
  if (result) break
  result = markSnakes(matrix.reverse(), snake)
  if (result) break
}

const marked = result.map((row) => row.join("")).join("\n")

console.info()
console.info("Drawing:")
console.info(marked)
console.info()
console.info("Solution:")
console.info((marked.match(/#/g) || []).length)
console.info()
console.timeEnd()
process.exit(0)

// TODO: lots of cleanup
// TODO: cover edge cases
console.time()
const { match } = require("assert")
const fs = require("fs")
const { cpuUsage } = require("process")

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

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))
}

function rotate(matrix) {
  return matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex]).reverse()
  )
}

function findEdges(tiles) {
  for (const tile of tiles) {
    tile.edges = []
    for (let idx = 0; idx < 4; idx++) {
      tile.edges.push(tile.tile[0].join(""))
      tile.tile = rotate(tile.tile)
    }
  }
  return tiles
}

function solve(file) {
  const data = findEdges(parseData(getData(file)))
  const size = Math.sqrt(data.length)
  const corners = []
  const sides = []
  const centrals = []

  // sort
  data.forEach((tile, idx, arr) => {
    const free = tile.edges.reduce((acc, cur) => {
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
    }, 0)
    switch (free) {
      case 2:
        corners.push(tile)
        break
      case 1:
        sides.push(tile)
        break
      default:
        centrals.push(tile)
        break
    }
  })

  let canvas = new Array(size).fill(null).map(() => new Array(size).fill(null))

  canvas[0][0] = corners[0]
  const used = [corners[0]]

  // assemble canvas borders
  for (let idx = 0; idx < corners.length; idx++) {
    if (idx !== 0) {
      const matching = matchPieces(corners, used, canvas[1][0])
      if (matching.length > 1) {
        throw new Error("No palindrome assumption wrong!")
      }
      used.push(matching[0].key)
      canvas[0][0] = matching[0]
    }
    for (let jdx = 0; jdx < sides.length / 4; jdx++) {
      const matching = matchPieces(sides, used, canvas[0][jdx])
      if (
        (jdx !== 0 && matching.length > 1) ||
        (jdx === 0 && matching.length > 2)
      ) {
        throw new Error("No palindrome assumption wrong!")
      }
      used.push(matching[0].key)
      canvas[0][jdx + 1] = matching[0]
    }
    canvas = rotate(rotate(rotate(canvas)))
  }

  // orient top left corner canvas piece
  {
    const cell = canvas[0][0]
    if (matchEdges(data, [cell.key], [cell.tile[0].join("")]).length !== 0) {
      cell.tile = cell.tile.reverse()
    }
    if (
      matchEdges(
        data,
        [cell.key],
        [rotate(cell.tile)[cell.tile.length - 1].join("")]
      ).length === 0
    ) {
      cell.tile = cell.tile.map((e) => e.reverse())
    }
  }

  // orient top canvas border
  for (let jdx = 1; jdx < size; jdx++) {
    const cell = canvas[0][jdx]
    const i = cell.edges.findIndex((e) =>
      canvas[0][jdx - 1].edges.some(
        (a) => a.split("").reverse().join("") === e || a === e
      )
    )
    switch (i) {
      case 0:
        cell.tile = rotate(rotate(rotate(cell.tile)))
        break
      case 1:
        cell.tile = rotate(rotate(rotate(rotate(cell.tile))))
        break
      case 2:
        cell.tile = rotate(rotate(rotate(rotate(rotate(cell.tile)))))
        break
      case 3:
        cell.tile = rotate(rotate(cell.tile))
        break
    }
    if (matchEdges(data, [cell.key], [cell.tile[0].join("")]).length !== 0) {
      cell.tile = cell.tile.reverse()
    }
  }

  // orient side canvas borders
  for (const idx of [0, size - 1]) {
    for (let jdx = 1; jdx < size; jdx++) {
      const cell = canvas[jdx][idx]
      const upCell = canvas[jdx - 1][idx]
      const i = cell.edges.findIndex((e) =>
        upCell.edges.some(
          (a) => a.split("").reverse().join("") === e || a === e
        )
      )
      switch (i) {
        case 1:
          cell.tile = rotate(cell.tile)
          break
        case 2:
          cell.tile = rotate(rotate(cell.tile))
          break
        case 3:
          cell.tile = rotate(rotate(rotate(cell.tile)))
          break
      }
      if (
        cell.tile[0].join("") !== upCell.tile[upCell.tile.length - 1].join("")
      )
        cell.tile = cell.tile.map((row) => row.reverse())
    }
  }

  // orient bottom canvas border
  for (let jdx = 1; jdx < size - 1; jdx++) {
    const cell = canvas[size - 1][jdx]
    const left = canvas[size - 1][jdx - 1]
    const i = cell.edges.findIndex((e) =>
      left.edges.some((a) => a.split("").reverse().join("") === e || a === e)
    )
    switch (i) {
      case 0:
        cell.tile = rotate(rotate(rotate(cell.tile)))
        break
      case 1:
        cell.tile = rotate(rotate(rotate(rotate(cell.tile))))
        break
      case 2:
        cell.tile = rotate(rotate(rotate(rotate(rotate(cell.tile)))))
        break
      case 3:
        cell.tile = rotate(rotate(cell.tile))
        break
    }
    if (
      matchEdges(data, [cell.key], [cell.tile[cell.tile.length - 1].join("")])
        .length !== 0
    ) {
      cell.tile = cell.tile.reverse()
    }
  }

  const test = check(canvas)
  // assemble central pieces
  for (let idx = 1; idx < size - 1; idx++) {
    for (let jdx = 1; jdx < size - 1; jdx++) {
      const left = canvas[idx][jdx - 1]
      const up = canvas[idx - 1][jdx]
      const matching = matchEdges(
        centrals,
        [left.key, up.key],
        [
          up.tile[up.tile.length - 1].join(""),
          rotate(rotate(rotate(left.tile)))[0].join(""),
        ]
      )
      if (matching.length > 1) {
        throw new Error(
          `No palindrome assumption wrong! ${idx},${jdx}: ${matching.length}`
        )
      }
      canvas[idx][jdx] = matching[0]
      const cell = canvas[idx][jdx]
      // rotate/flip
      const i = cell.edges.findIndex((e) =>
        left.edges.some((a) => a.split("").reverse().join("") === e || a === e)
      )
      switch (i) {
        case 0:
          cell.tile = rotate(rotate(rotate(cell.tile)))
          break
        case 1:
          cell.tile = rotate(rotate(rotate(rotate(cell.tile))))
          break
        case 2:
          cell.tile = rotate(rotate(rotate(rotate(rotate(cell.tile)))))
          break
        case 3:
          cell.tile = rotate(rotate(cell.tile))
          break
      }
      if (cell.tile[0].join("") !== up.tile[up.tile.length - 1].join(""))
        //   cell.tile[0].reverse().join("") !== up.tile[up.tile.length - 1].join("")
        // ) {
        cell.tile = cell.tile.reverse()
      //   if (cell.tile[0].join("") !== up.tile[up.tile.length - 1].join(""))
      //     cell.tile = cell.tile.map((row) => row.reverse())
      // }
      const test = check(canvas)
    }
  }
  return canvas
}
const result = solve("data-test-1.txt")

function check(canvas) {
  return canvas
    .map((a) => a.map((b) => b?.tile?.map((c) => c.join(""))))
    .map((row) =>
      row
        .map((cell) =>
          cell === undefined ? new Array(10).fill(" ".repeat(10)) : cell
        )
        .reduce((acc, cur) => acc.map((e, i) => e + cur[i]))
        .join("\n")
    )
    .join("\n")
}

function draw(data) {
  const matrix = data.split("\n").map((row) => row.split(""))
  const cleanCols = matrix.map((row) =>
    row.reduce((acc, cur, idx) => {
      if (idx % 10 !== 0 && idx % 10 !== 9) acc.push(cur)
      return acc
    }, [])
  )
  const clean = cleanCols.reduce((acc, cur, idx) => {
    if (idx % 10 !== 0 && idx % 10 !== 9) acc.push(cur)
    return acc
  }, [])
  console.info(clean.length, clean[0].length)
  const string =  clean.map((row) => row.join("")).join("\n")
  return string
}

function matchPieces(pile, used, piece) {
  return pile.filter(({ key, edges }) =>
    edges.some(
      (edge) =>
        (piece.edges.includes(edge) ||
          piece.edges.includes(edge.split("").reverse().join(""))) &&
        !used.includes(key) &&
        piece.key !== key
    )
  )
}

function matchEdges(pile, keys, adjEdges) {
  return pile.filter(
    ({ key, edges }) =>
      edges.filter(
        (edge) =>
          (adjEdges.includes(edge) ||
            adjEdges.includes(edge.split("").reverse().join(""))) &&
          !keys.includes(key)
      ).length === adjEdges.length
  )
}
const checked = check(result)
const asd = new Set(
  result.map((row) => row.map((cell) => cell.key)).flat(Infinity)
)
const drawing = draw(check(result))

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

function markSnakes(drawing, snake) {
  const { height, width } = snake.reduce(
    (acc, { row, col }) => ({
      height: row > acc.height ? row : acc.height,
      width: col > acc.width ? col : acc.width,
    }),
    { height: 0, width: 0 }
  )
  const matrix = rotate(
    drawing
      .split("\n")
      .map((row) => row.split(""))
      .reverse()
  )
  for (let idx = 0; idx < matrix.length - height; idx++) {
    for (let jdx = 0; jdx < matrix[0].length; jdx++) {
      if (snake.every(({ row, col }) => matrix[idx + row][jdx + col] === "#")) {
        console.info("found snake")
        snake.forEach(({ row, col }) => (matrix[idx + row][jdx + col] = "O"))
      }
    }
  }
  return matrix
}

const markedDrawing = markSnakes(drawing, snake)
  .map((row) => row.join(""))
  .join("\n")
console.info(markedDrawing, (markedDrawing.match(/#/g) || []).length)
process.exit(0)

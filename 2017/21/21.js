// #matrices 

console.time()
const fs = require("fs")

const newMatrix = (size) =>
  new Array(size).fill(null).map((e) => new Array(size).fill(null))
const parse = (line) => line.split("/").map((row) => row.split(""))
const hash = (matrix) => matrix.map((cur) => cur.join("")).join("/")
const count = (matrix) => hash(matrix).replace(/[.//]/g, "").length
/** flip matrix over horizontal axis */
function flipH(matrix) {
  return [...matrix.map((e) => e.slice())].reverse()
}
/** flip matrix over vertical axis*/
function flipV(matrix) {
  return matrix.map((row) => row.slice().reverse())
}
/** transpose matrix */
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))
}
/** rotate matrix clockwise */
function rotate(matrix, times = 1) {
  const rot = (matrix) =>
    matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse())
  if (times === 0) return matrix.map((row) => row.slice())
  if (times === 1) return rot(matrix)
  return rotate(rot(matrix), times - 1)
}
/** create a set of hashed combinations (rotate and flip) */
function combos(matrix) {
  const set = new Set()
  for (let i = 0; i < 4; i++) {
    const m = rotate(matrix, i)
    set.add(hash(m))
    set.add(hash(flipV(m)))
    set.add(hash(flipH(m)))
  }
  return set
}
/** flatten matrix of matrices */
function flatten(matrix) {
  const m = matrix[0][0].length
  const size = matrix.length * m
  const n = newMatrix(size)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      n[i][j] = matrix[Math.floor(i / m)][Math.floor(j / m)][i % m][j % m]
    }
  }
  return n
}

let canvas = parse(".#./..#/###")
const book = [
  ...fs.readFileSync("data.txt", "utf8").matchAll(/(.+) => (.+)/g),
].map(([_, a, b]) => [combos(parse(a)), parse(b)])

let resultA
for (let cycle = 0; cycle < 18; cycle++) {
  const size = canvas.length
  const m = size % 2 ? 3 : 2
  const n = size / m
  const newCanvas = newMatrix(n)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = newMatrix(m)
      for (let ci = 0; ci < m; ci++) {
        for (let cj = 0; cj < m; cj++) {
          cell[ci][cj] = canvas[i * m + ci][j * m + cj]
        }
      }
      const hashed = hash(cell)
      newCanvas[i][j] = book.find((e) => e[0].has(hashed))[1]
    }
  }
  if (cycle === 5) resultA = count(canvas)
  canvas = flatten(newCanvas)
}

const resultB = count(canvas)

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

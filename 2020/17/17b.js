const fs = require("fs")

let data = fs
  .readFileSync("data.txt", "utf8")
  .split("\r\n")
  .map((row) => row.split("").map((e) => (e === "#" ? 1 : 0)))

const cycles = 6
const size = data.length + 2 * cycles + 2
const makeCube = (size) =>
  new Array(size)
    .fill(null)
    .map(() =>
      new Array(size)
        .fill(null)
        .map(() =>
          new Array(size).fill(null).map(() => new Array(size).fill(0))
        )
    )

let cube = makeCube(size)
data.forEach((row, j) =>
  row.forEach(
    (cell, k) =>
      (cube[size / 2][size / 2][size / 2 - data.length / 2 + j][
        size / 2 - data.length / 2 + k
      ] = cell)
  )
)

for (let idx = 0; idx < cycles; idx++) {
  let newCube = makeCube(size)
  for (let i = 1; i + 1 < size; i++) {
    for (let j = 1; j + 1 < size; j++) {
      for (let k = 1; k + 1 < size; k++) {
        for (let l = 1; l + 1 < size; l++) {
          if (
            cube[i][j][k][l] === 1 &&
            (count(cube, i, j, k, l) === 2 || count(cube, i, j, k, l) === 3)
          ) {
            newCube[i][j][k][l] = 1
          } else {
            newCube[i][j][k][l] = 0
          }
          if (cube[i][j][k][l] === 0 && count(cube, i, j, k, l) === 3)
            newCube[i][j][k][l] = 1
        }
      }
    }
  }
  cube = newCube
}

console.info(cube.flat(Infinity).reduce(sum))

function sum(acc, cur) {
  return acc + cur
}
function count(cube, z, y, x, w) {
  let num = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        for (let l = -1; l < 2; l++) {
          num += cube[z + i][y + j][x + k][w + l]
        }
      }
    }
  }
  num -= cube[z][y][x][w]
  return num
}

const fs = require("fs")
const intCode = require("../intCode")

const program = fs.readFileSync("data.txt", "utf8").split(",").map(Number)

ship = 100

let row = 0
let col = 0

while (true) {
  if (intCode.eval([...program], [col, row]) === 1) {
    if (intCode.eval([...program], [col + 1, row]) === 0) {
      if (
        col > ship &&
        intCode.eval([...program], [col - ship + 1, row + ship - 1]) === 1
      ) {
        console.info(
          col - ship + 1,
          row,
          intCode.eval([...program], [col, row]),
          intCode.eval([...program], [col - ship + 1, row + ship - 1]),
          intCode.eval([...program], [col - ship + 1, row + ship - 1]),
          (col - ship + 1) * 10000 + row
        )
        break
      }
      row++
      continue
    }
    col++
    continue
  }
  if (
    [1, 2, 3, 4].some((n) => intCode.eval([...program], [col + n, row]) === 1)
  ) {
    col++
    continue
  }
  row++
}

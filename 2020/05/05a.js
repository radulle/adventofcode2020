const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .split("\r\n")
    .map((doc) => doc.split(""))
    .map((doc) => ({ row: doc.slice(0, 7), col: doc.slice(-3) }))
  // console.info(data)
  console.infoTime(() => solve(data, 128, 8).sort((a, b) => b.id - a.id)[0].id)
} catch (err) {
  console.error(err)
}

function solve(data, rows, cols) {
  return data
    .map((seat) => ({
      row: getNum(seat.row, rows),
      col: getNum(seat.col, cols),
    }))
    .map(({ row, col }) => ({ id: 8 * row + col, row, col }))
}

function getNum(arr, range) {
  range = [0, range - 1]
  arr.forEach((el) => {
    if (el === "F" || el === "L")
      range[1] = (range[1] - range[0] + 1) / 2 + range[0] - 1
    if (el === "B" || el === "R")
      range[0] = (range[1] - range[0] + 1) / 2 + range[0]
  })
  return range[0]
}

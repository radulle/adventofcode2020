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
  console.infoTime(() => solve(data, 128, 8))
} catch (err) {
  console.error(err)
}

function solve(data, rows, cols) {
  const seats = data
    .map((seat) => ({
      row: getNum(seat.row, rows),
      col: getNum(seat.col, cols),
    }))
    .map(({ row, col }) => ({ id: 8 * row + col, row, col }))
  return [...Array(seats.sort((a, b) => b.id - a.id)[0].id).keys()].filter(
    (seat) => seats.findIndex((taken) => taken.id === seat) === -1
  ).filter(
    (seat) => seats.filter((taken) => taken.id === seat + cols || taken.id === seat - cols).length === 2
  )
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

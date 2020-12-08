const fs = require("fs")
const intCode = require("../intCode")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number)
  console.infoTime(() => solve(paint(data)))
} catch (err) {
  console.error(err)
}

function paint(data) {
  const hull = new Map()
  const program = intCode(data)

  let direction = 0
  let row = 0
  let col = 0

  const coordinates = () => `${row},${col}`

  const rotate = (turn) => (direction = (direction + (turn === 1 ? 1 : 3)) % 4)

  const move = () => {
    if (direction === 0) return row--
    if (direction === 1) return col++
    if (direction === 2) return row++
    if (direction === 3) return col--
  }

  const getCurrentHullColor = () => hull.get(coordinates()) || 0
  const paintHull = (color) => hull.set(coordinates(), color)

  paintHull(1)
  program.next()
  while (true) {
    const { value: paint, done: paintDone } = program.next(
      getCurrentHullColor()
    )
    if (paintDone) break
    paintHull(paint)

    const { value: turn, done: turnDone } = program.next()
    if (turnDone) break
    rotate(turn)
    move()
  }
  return hull
}

function solve(hull) {
  const map = [...hull].map(([key, val]) => [key.split(",").map(Number), val])
  const height = map.map((e) => Math.abs(e[0][0])).sort((a, b) => b - a)[0]
  const width = map.map((e) => Math.abs(e[0][1])).sort((a, b) => b - a)[0]
  const canvas = [...Array(height + 1).keys()].map(() =>
    Array(width + 1).fill(".")
  )
  map.forEach(([[x, y], paint]) => (canvas[x][y] = paint ? "#" : "."))
  return canvas.map((row) => row.join("")).join("\n")
}

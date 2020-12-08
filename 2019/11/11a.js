const fs = require("fs")
const intCode = require("../intCode")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number)
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function solve(data) {
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

  program.next()
  while (true) {
    const { value: paint, done: paintDone } = program.next(
      getCurrentHullColor()
    )
    paintHull(paint)

    const { value: turn, done: turnDone } = program.next()
    rotate(turn)
    move()
    if (paintDone || turnDone) break
  }
  return hull.size
}

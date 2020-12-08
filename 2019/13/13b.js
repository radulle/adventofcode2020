const fs = require("fs")
const intCode = require("../intCode")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split(",").map(Number)
  data[0] = 2
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function solve(data) {
  const game = intCode(data, undefined, false)

  let ball,
    paddle,
    score,
    i = 0

  while (true) {
    i++
    const joy =
      ball && paddle ? Math.min(1, Math.max(ball.x - paddle.x, -1)) : undefined
    const { value: x } = game.next(joy)
    const { value: y } = game.next()
    const { value: z, done } = game.next()

    if (done) break
    if (x === -1 && y === 0) {
      score = z
      continue
    }
    if (z === 3) {
      paddle = { x, y }
      continue
    }
    if (z === 4) {
      ball = { x, y }
      moved = true
    }
  }

  return score
}

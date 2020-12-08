const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .replace(/[<>=xyz,]/gi, "")
    .split("\r\n")
    .map((row) => row.split(" ").map(Number))
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function sum(arr) {
  return arr.reduce((acc, cur) => acc + Math.abs(cur), 0)
}

function sumMul(a, b) {
  return a.reduce((acc, cur, i) => acc + cur * b[i], 0)
}

function solve(positions) {
  const velocities = [0, 0, 0, 0].map(() => [0, 0, 0])

  function applyGravity() {
    positions.forEach(([x, y, z], i) =>
      positions
        .filter((_, j) => i !== j)
        .forEach(([xo, yo, zo]) => {
          if (x < xo) velocities[i][0]++
          if (x > xo) velocities[i][0]--
          if (y < yo) velocities[i][1]++
          if (y > yo) velocities[i][1]--
          if (z < zo) velocities[i][2]++
          if (z > zo) velocities[i][2]--
        })
    )
  }

  function applyVelocity() {
    positions = positions.map(([x, y, z], i) => [
      x + velocities[i][0],
      y + velocities[i][1],
      z + velocities[i][2],
    ])
  }

  for (let idx = 0; idx < 1000; idx++) {
    applyGravity()
    applyVelocity()
  }

  return sumMul(positions.map(sum), velocities.map(sum))
}

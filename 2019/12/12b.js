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

function solveAxis(data, axis) {
  let positions = data.map((e) => e[axis])
  const velocities = [0, 0, 0, 0]
  const positionsStr = positions.join("")

  function applyGravity() {
    positions.forEach((x, i) =>
      positions
        .filter((_, j) => i !== j)
        .forEach((xo) => {
          if (x < xo) velocities[i]++
          if (x > xo) velocities[i]--
        })
    )
  }

  function applyVelocity() {
    positions = positions.map((x, i) => x + velocities[i])
  }

  let i = 0
  while (true) {
    applyGravity()
    applyVelocity()
    i++
    if (velocities.join("") === "0000" && positions.join("") === positionsStr)
      break
  }
  return i
}

function gcd(a, b) {
  var t = 0
  a < b && ((t = b), (b = a), (a = t))
  t = a % b
  return t ? gcd(b, t) : b
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b
}

function solve(data) {
  return [solveAxis(data, 0), solveAxis(data, 1), solveAxis(data, 2)].reduce(
    lcm
  )
}

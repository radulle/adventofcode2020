const fs = require("fs")
const { nth } = require("lodash")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

function parse(row) {
  return row.split("").map((e) => (e === "." ? 0 : 1))
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split("\r\n").map(parse)
  console.infoTime(() => solve(data, 200))
} catch (err) {
  console.error(err)
}

function getRelationsArr(data, k, l) {
  const sights = new Set()
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] !== 0) {
        const x = i - k
        const y = j - l
        sights.add(Math.sign(x) + "." + Math.sign(y) + "." + x / y)
      }
    }
  }
  return sights.size
}

function getSightsMatrix(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] !== 0) {
        data[i][j] = getRelationsArr(data, i, j) - 1
      }
    }
  }
  return data
}

function getMaxSightsAsteroid(data) {
  const sightsMatrix = getSightsMatrix(data)
  const maxSights = sightsMatrix.flat(Infinity).sort((a, b) => b - a)[0]
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] === maxSights) {
        return [i, j]
      }
    }
  }
}

function getAsteroidsMap(data, k, l) {
  const map = new Map()
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] !== 0 && !(i === k && j == l)) {
        const x = k - i
        const y = j - l
        function calcAngleDegrees(y, x) {
          return (Math.atan2(y, x) * 180) / Math.PI
        }
        const angle =
          calcAngleDegrees(y, x) < 0
            ? 360 + calcAngleDegrees(y, x)
            : calcAngleDegrees(y, x)
        const d = Math.sqrt(x * x + y * y)
        map.set(
          angle,
          [...(map.get(angle) || []), { i, j, d, x, y }].sort(
            (a, b) => a.d - b.d
          )
        )
      }
    }
  }
  return [...map]
    .sort((a, b) => a[0] - b[0])
    .map((e) => ({ angle: e[0], asteroids: e[1] }))
}

function solve(data, n) {
  const maxSightsAsteroid = getMaxSightsAsteroid(data)
  const asteroidsMap = getAsteroidsMap(data, ...maxSightsAsteroid)
  let result
  let position = 0
  for (let i = 0; i < n; i++) {
    if (position === asteroidsMap.length)
      position = position - asteroidsMap.length
    result = asteroidsMap[position].asteroids.shift()
    if (!asteroidsMap[position].asteroids.length) {
      asteroidsMap.splice(position, 1)
    } else {
      position++
    }
  }
  return result.j * 100 + result.i
}
const fs = require("fs")
const intCode = require("../intCode")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split("").map(Number)
  console.infoTime(() => solve(extractLayers(data, 25, 6)))
} catch (err) {
  console.error(err)
}

function extractLayers(data, width, height) {
  const layers = []
  while (data.length) {
    layers.push(data.slice(0, width * height))
    data.splice(0, width * height)
  }
  return layers
}

function solve(layers) {
  const leastZeros = layers
    .map((layer, index) => ({
      index,
      layer,
      zeros: layer.filter((pixel) => pixel === 0).length,
    }))
    .sort((a, b) => a.zeros - b.zeros)[0].layer
  return (
    leastZeros.filter((e) => e === 1).length *
    leastZeros.filter((e) => e === 2).length
  )
}
// 1350 too small
// 1488 too big

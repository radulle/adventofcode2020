const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split("").map(Number)
  console.infoTime(() => solve(data, 25, 6))
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

function solve(data, width, height) {
  return extractLayers(
    extractLayers(data, width, height).reduce((acc, cur) => {
      cur.map((pixel, i) => {
        if (pixel !== 2 && acc[i] !== 0 && acc[i] !== 1) acc[i] = pixel
      })
      return acc
    }, Array(width * height)),
    width,
    1
  )
    .map((row) => row.join(""))
    .join("\n")
    .replace(/0/g, " ")
}

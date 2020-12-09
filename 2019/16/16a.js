const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs.readFileSync("data.txt", "utf8").split("").map(Number)
  console.infoTime(() => solve(data, 100))
} catch (err) {
  console.error(err)
}

function solve(data, phases) {
  function getPattern(i, length) {
    const map = new Map()
    let items = [0, 1, 0, -1].flatMap((e) => Array(i + 1).fill(e))
    while (items.length < length) {
      items.push(...items)
    }
    return items
      .slice(1, length + 1)
      .map((e, i) => [i, e])
      .filter((e) => e[1] !== 0)
  }
  function getPatterns(length) {
    const arr = []
    for (let i = 0; i < length; i++) {
      arr.push(getPattern(i, length))
    }
    return arr
  }

  const patterns = getPatterns(data.length)

  function fft(data) {
    return patterns.map((pattern) =>
      Math.abs(
        pattern.reduce((acc, [idx, sign]) => acc + sign * data[idx], 0) % 10
      )
    )
  }

  let result = data
  for (let phase = 0; phase < phases; phase++) {
    result = fft(result)
  }
  return result.slice(0, 8).join("")
}

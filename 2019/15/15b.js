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

function maze(data, prev) {
  const robot = intCode([...data], undefined, false)
  const map = new Map()
  const visited = new Map()

  let dir = 1
  let row = 0
  let col = 0

  const coords = (d) => {
    if (d === 1) return `${row - 1},${col}`
    if (d === 2) return `${row + 1},${col}`
    if (d === 3) return `${row},${col - 1}`
    if (d === 4) return `${row},${col + 1}`
    return `${row},${col}`
  }

  const move = () => {
    if (dir === 1) return row--
    if (dir === 2) return row++
    if (dir === 3) return col--
    if (dir === 4) return col++
  }

  const free = () => {
    let dirs = []
    if (prev) {
      for (let i = 1; i < 5; i++) {
        if (prev.get(coords(i)) !== 1 || prev.get(coords(i)) !== 2) dirs.push(i)
      }
      if (!dirs.length) {
        for (let i = 1; i < 5; i++) {
          if (prev.get(coords(i)) === 1 || prev.get(coords(i)) === 2)
            dirs.push(i)
        }
      }
    } else {
      dirs = [1, 2, 3, 4]
    }
    return dirs[Math.floor(Math.random() * dirs.length)]
  }

  robot.next()
  while (true) {
    const { value: report, done } = robot.next(dir)
    if (done) break
    if (report === 1) {
      move(dir)
      dir = free()
      map.set(coords(), 1)
      visited.set(coords(), 1)
    }
    if (report === 0) {
      map.set(coords(dir), 0)
      dir = free()
    }
    if (report === 2) {
      map.set(coords(dir), 2)
      return map
    }
  }
}

function draw(data) {
  const map = [...data].map(([key, val]) => [key.split(",").map(Number), val])
  const height = map.map((e) => Math.abs(e[0][0])).sort((a, b) => b - a)[0]
  const width = map.map((e) => Math.abs(e[0][1])).sort((a, b) => b - a)[0]
  const canvas = [...Array(2 * height + 2).keys()].map(() =>
    Array(2 * width + 2).fill(" ")
  )
  map.forEach(
    ([[x, y], paint]) =>
      (canvas[x + height][y + width] =
        paint === 2 ? "F" : paint === 1 ? "." : "#")
  )
  canvas[height][width] = "S"
  console.info(canvas.map((row) => row.join("")).join("\n"))
}

function solve(data) {
  let length = 0
  let solution
  while (true) {
    solution = maze(data, solution)
    const solutionLength = [...solution].filter((e) => e[1] === 1).length
    if (solutionLength > length) {
      length = solutionLength
      console.info("length:", length)
      draw(solution)
      oxygen(solution)
    }
  }
}

function oxygen(data) {
  const map = new Map(data)
  map.set("0,0", 1)
  const noOxygen = () => [...map].some((e) => e[1] === 1)
  const oxygen = () => [...map].filter((e) => e[1] === 2).map((e) => e[0])
  const spread = (xy) => {
    const [row, col] = xy.split(",").map(Number)
    if (map.get(`${row - 1},${col}`) === 1) map.set(`${row - 1},${col}`, 2)
    if (map.get(`${row + 1},${col}`) === 1) map.set(`${row + 1},${col}`, 2)
    if (map.get(`${row},${col - 1}`) === 1) map.set(`${row},${col - 1}`, 2)
    if (map.get(`${row},${col + 1}`) === 1) map.set(`${row},${col + 1}`, 2)
  }

  let i = 0
  while (noOxygen()) {
    oxygen().forEach(spread)
    i++
  }
  console.info("minutes:", i)
}

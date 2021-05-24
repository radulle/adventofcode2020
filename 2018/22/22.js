// #grid
const fs = require("fs")
const { StackQue } = require("lib")
console.time()

const [, depth, X, Y] = fs
  .readFileSync("data.txt", "utf8")
  .matchAll(/depth: (\d+)\r?\ntarget: (\d+),(\d+)/g)
  .next()
  .value.map(Number)

class Grid {
  data = {}

  set(val, x, y = 0, z = 0) {
    if (!this.data[z]) this.data[z] = {}
    if (!this.data[z][y]) this.data[z][y] = {}
    this.data[z][y][x] = val
    return val
  }

  get(x, y = 0, z = 0) {
    return this.data[z]?.[y]?.[x]
  }
}

const erosion = new Grid()

function getErosion(x, y) {
  if (erosion.get(x, y)) return erosion.get(x, y)
  if (y === 0) erosion.set(16807 * x, x, y)
  else if (x === 0) erosion.set(48271 * y, x, y)
  else if (x === X && y === Y) erosion.set(0, x, y)
  else erosion.set(getErosion(x, y - 1) * getErosion(x - 1, y), x, y)
  return erosion.set((erosion.get(x, y) + depth) % 20183, x, y)
}

function getType(x, y) {
  return getErosion(x, y) % 3
}

let resultA = 0
for (let y = 0; y < Y + 1; y++) {
  for (let x = 0; x < X + 1; x++) {
    resultA += getType(x, y)
  }
}

// rocky = 0, wet = 1, narrow = 2
// nothing = 0, torch = 1, climbing = 2
function isValidTool(type, tool) {
  return type !== tool
}

function otherValidTool(type, tool) {
  for (let i = 0; i <= 2; i++) {
    if (i !== type && i !== tool) {
      return i
    }
  }
}

const timeSlots = [new StackQue()]
timeSlots[0].enqueue({ x: 0, y: 0, time: 0, tool: 1, prev: null })

let curTime = 0
const visited = new Grid()
const d = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
]

function enqueue(x, y, time, tool, prev) {
  if (!timeSlots[time]) timeSlots[time] = new StackQue()
  timeSlots[time].enqueue({
    x,
    y,
    time,
    tool,
    prev,
  })
}

main: while (true) {
  while (timeSlots[curTime] && timeSlots[curTime].size) {
    const cur = timeSlots[curTime].dequeue()

    if (visited.get(cur.x, cur.y, cur.tool) !== undefined) {
      continue
    }
    visited.set(cur.prev, cur.x, cur.y, cur.tool)

    if (cur.x === X && cur.y === Y && cur.tool === 1) {
      break main
    }

    for (const [dx, dy] of d) {
      const x = cur.x + dx,
        y = cur.y + dy
      if (x >= 0 && y >= 0 && isValidTool(getType(x, y), cur.tool)) {
        enqueue(x, y, cur.time + 1, cur.tool, [cur.x, cur.y, cur.tool])
      }
    }

    enqueue(
      cur.x,
      cur.y,
      cur.time + 7,
      otherValidTool(getType(cur.x, cur.y), cur.tool),
      cur.prev
    )
  }
  curTime++
}

const resultB = curTime

console.info("\nSolution A:\n")
console.info(resultA, "\n")
console.info("Solution B:\n")
console.info(resultB, "\n")
console.timeEnd()

function getPath(visited, x, y, z) {
  const path = [[x, y, z]]
  while (true) {
    const node = visited.get(x, y, z)
    if (node === null) break
    path.push(node)
    ;[x, y, z] = node
  }
  return path.reverse()
}

function getCanvas(path) {
  let maxX = -Infinity,
    maxY = -Infinity
  for (const [x, y, _] of path) {
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }
  const canvas = new Array(maxY + 1)
    .fill()
    .map(() => new Array(maxX + 1).fill("."))
  for (const [x, y, z] of path) {
    canvas[y][x] = z
  }
  return canvas
}

function drawCanvas(canvas) {
  return canvas.map((r) => r.join("")).join("\n")
}

const path = getPath(visited, ...visited.get(X, Y, 1))
console.info("\nPath:\n")
console.info(drawCanvas(getCanvas(path)))

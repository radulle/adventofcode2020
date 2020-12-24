console.time()
const fs = require("fs")

function getData(file) {
  return fs.readFileSync(file, "utf8").trim()
}

function parseData(data) {
  return data
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((row) => row.split("").map((e) => (e === "#" ? 1 : 0)))
}

const neighbors = (state, [idx, jdx, kdx], size = 5) =>
  [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ].reduce((acc, [j, k]) => {
    // outer
    if (jdx + j === -1) return acc + state[idx - 1]?.[1][2]
    if (jdx + j === size) return acc + state[idx - 1]?.[3][2]
    if (kdx + k === -1) return acc + state[idx - 1]?.[2][1]
    if (kdx + k === size) return acc + state[idx - 1]?.[2][3]
    // inner
    if (jdx + j === 2 && kdx + k === 2) {
      if (jdx === 1)
        return acc + state[idx + 1]?.[0].reduce((acc, cur) => acc + cur, 0)
      if (jdx === 3)
        return (
          acc + state[idx + 1]?.[size - 1].reduce((acc, cur) => acc + cur, 0)
        )
      if (kdx === 1)
        return acc + state[idx + 1]?.reduce((acc, cur) => acc + cur[0], 0)
      if (kdx === 3)
        return (
          acc + state[idx + 1]?.reduce((acc, cur) => acc + cur[size - 1], 0)
        )
    }
    //regular
    return acc + state[idx]?.[jdx + j]?.[kdx + k]
  }, 0)
const empty = (size = 5) =>
  new Array(duration + 3)
    .fill()
    .map(() => new Array(size).fill().map((_, i) => new Array(size).fill(0)))

const data = parseData(getData("data.txt"))
const duration = 200

let state = empty()

const mid = (duration + 2) / 2
let count
state[mid] = data
for (let minute = 0; minute < duration; minute++) {
  const temp = empty()
  for (let idx = 0; idx < state.length; idx++) {
    for (let jdx = 0; jdx < state[idx].length; jdx++) {
      for (let kdx = 0; kdx < state[idx][jdx].length; kdx++) {
        if (jdx === 2 && kdx === 2) continue
        count = neighbors(state, [idx, jdx, kdx])
        if (state[idx][jdx][kdx]) {
          if (count === 1) temp[idx][jdx][kdx] = 1
          continue
        }
        if (count === 1 || count === 2) temp[idx][jdx][kdx] = 1
      }
    }
  }
  state = temp
}

// Draw matrices
{
  const hash = state.map((depth, idx) => [
    `${idx - mid}`,
    ...depth.map((row) => row.map((e) => (e ? "#" : ".")).join("")),
  ])
  hash.pop()
  hash.shift()

  function columnsFormat(drawings, columns = 10) {
    let out = "\n"
    for (let i = 0; i < drawings.length; i += 10) {
      const group = drawings.slice(i, i + columns)
      out +=
        group[0]
          .map((_, idx) =>
            group.reduce((acc, cur) => acc + cur[idx].padEnd(10, " "), "")
          )
          .join("\n") + "\n\n"
    }
    return out
  }

  console.info(columnsFormat(hash.slice(0, hash.length / 2)))
  console.info(columnsFormat(hash.slice(hash.length / 2, hash.length / 2 + 1)))
  console.info(columnsFormat(hash.slice(hash.length / 2 + 1, hash.length)))
}

const result = state.flat(Infinity).reduce((acc, cur) => acc + cur, 0)

console.info("Solution:")
console.info(result)
console.info()
console.timeEnd()

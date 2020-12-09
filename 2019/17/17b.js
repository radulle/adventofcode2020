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

function photo(data) {
  const pixels = [...intCode([...data])]
  function render(data) {
    let s = ""
    data.forEach((char) => {
      switch (char) {
        case 35:
          s += "#"
          break
        case 46:
          s += "."
          break
        case 10:
          s += "\r\n"
          break
        case 94:
          s += "0"
          break
      }
    })
    return s
  }
  return render(pixels)
}

function read(photo) {
  console.info(photo)
  return photo.split("\r\n").map((row) => row.split(""))
}

function getAllInstructions(data) {
  const grid = read(photo(data))

  let path = []
  let row
  let col
  let down = -1
  let right = 0
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === "0") {
        row = i
        col = j
      }
    }
  }

  function rotate(downPrev, rightPrev) {
    right = 0
    down = 0
    if (grid[row] && grid[row][col + 1] === "#") {
      right = 1
    } else if (grid[row] && grid[row][col - 1] === "#") {
      right = -1
    } else if (grid[row - 1] && grid[row - 1][col] === "#") {
      down = -1
    } else if (grid[row + 1] && grid[row + 1][col] === "#") {
      down = 1
    }
    if (rightPrev * down < 0 || downPrev * right > 0) path.push(["L", 0])
    if (downPrev * right < 0 || rightPrev * down > 0) path.push(["R", 0])
  }

  function traverse() {
    while (right !== 0 || down !== 0) {
      while (
        grid[row + down] &&
        grid[row + down][col + right] &&
        grid[row + down][col + right] !== "."
      ) {
        row = row + down
        col = col + right
        path[path.length - 1][1] += 1
        grid[row][col] = "0"
      }
      rotate(down, right)
    }
  }

  traverse()

  path = path.map((e) => [e[0], e[1] < 10 ? "0" + e[1] : e[1]].join(""))
  let patterns = []
  path.forEach((_, index) => {
    path.forEach((_, i, arr) => {
      for (let j = 2; j < arr.length - 1; j++) {
        if (
          (
            path.join("").match(new RegExp(arr.slice(i, j).join(""), "gi")) ||
            []
          ).length > 1
        )
          patterns.push(arr.slice(i, j).join(""))
      }
    })
  })

  patterns = [...new Set(patterns)]
    .sort((a, b) => b.length - a.length)
    .slice(0, -1)

  function find(path, pattern) {
    const regex = new RegExp(pattern, "gi")
    const found = []
    while ((match = regex.exec(path)) !== null) {
      found.push(match)
    }
    return found
  }

  function clean(paths) {
    return paths.flatMap((path) => {
      return patterns.map((pattern) => [
        find(path[0], pattern).reduce((acc, cur) => {
          return (
            acc.slice(0, cur.index) +
            " ".repeat(pattern.length) +
            acc.slice(cur.index + pattern.length)
          )
        }, path[0]),
        [...path[1], pattern],
      ])
    })
  }

  function getRoutines(path) {
    return [
      ...new Set(
        clean(clean(clean([[path.join(""), []]])))
          .filter((e) => e[0].replace(/ /gi, "").length === 0)
          .flat(Infinity)
      ),
    ].slice(1)
  }

  function getCompacted(path, parts) {
    let result = path
    parts.forEach(
      (part, idx) => (result = result.replace(part, idx.toString()))
    )
    return result
  }

  const parts = getRoutines(path)

  const compacted = getCompacted(
    getCompacted(
      getCompacted(getCompacted(path.join(""), parts), parts),
      parts
    ),
    parts
  )

  function cc(char) {
    return char.charCodeAt(0)
  }

  function makeIntCodeFromCompacted(str) {
    const intCode = str
      .split("")
      .join("_,_")
      .split("_")
      .map((e) => cc("ABC"[e] || ","))
    intCode.push(10)
    return intCode
  }
  function makeIntCodeFromRoutines(str) {
    const intCode = str
      .match(/.{1,3}/gi)
      .map((e) => [
        cc(e[0]),
        cc(","),
        Number(e.slice(1))
          .toString()
          .split("")
          .map((char) => cc(char.toString())),
        cc(","),
      ])
      .flat(Infinity)
    intCode.pop()
    intCode.push(10)
    return intCode
  }

  return [
    makeIntCodeFromCompacted(compacted),
    ...parts.map(makeIntCodeFromRoutines),
    cc("y"), // TODO: intCode should work with "n" too
    10,
  ].flat()
}

function solve(data) {
  const instructions = getAllInstructions([...data])
  data[0] = 2
  return intCode.eval([...data], instructions)
}

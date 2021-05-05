const fs = require("fs")
console.time()

const file = fs.readFileSync("data.txt", "utf8")
const sortCarts = () =>
  carts.sort((a, b) => (a.y - b.y) * grid.length + (a.x - b.x))

let carts = []
let grid = [[]]
const crashes = []

{
  let y = 0,
    x = 0,
    p = 0,
    a = 1
  for (const c of file) {
    const code = c.charCodeAt()
    if (code === 13) continue
    if (code === 10) {
      y++
      x = 0
      grid.push([])
      continue
    }
    if ([">", "<"].includes(c)) {
      grid[y].push("-")
      carts.push({ c, y, x, p, a })
      x++
      continue
    }
    if (["^", "v"].includes(c)) {
      grid[y].push("|")
      carts.push({ c, y, x, p, a })
      x++
      continue
    }
    grid[y].push(c)
    x++
  }
}

const turn = (cart, dir) => {
  switch (cart.c) {
    case "^":
      cart.c = dir === "left" ? "<" : ">"
      break
    case "<":
      cart.c = dir === "left" ? "v" : "^"
      break
    case "v":
      cart.c = dir === "left" ? ">" : "<"
      break
    case ">":
      cart.c = dir === "left" ? "^" : "v"
      break
  }
}

const junction = (cart) => {
  switch (cart.p) {
    case 0: // left
      turn(cart, "left")
      cart.p = 1
      break
    case 1: // straight
      cart.p = 2
      break
    case 2: // right
      turn(cart, "right")
      cart.p = 0
      break
  }
}

const move = (cart, grid) => {
  switch (cart.c) {
    case ">":
      cart.x++
      switch (grid[cart.y][cart.x]) {
        case "/":
          cart.c = "^"
          break
        case "\\":
          cart.c = "v"
          break
        case "+":
          junction(cart)
      }
      break
    case "<":
      cart.x--
      switch (grid[cart.y][cart.x]) {
        case "/":
          cart.c = "v"
          break
        case "\\":
          cart.c = "^"
          break
        case "+":
          junction(cart)
      }
      break
    case "v":
      cart.y++
      switch (grid[cart.y][cart.x]) {
        case "/":
          cart.c = "<"
          break
        case "\\":
          cart.c = ">"
          break
        case "+":
          junction(cart)
      }
      break
    case "^":
      cart.y--
      switch (grid[cart.y][cart.x]) {
        case "/":
          cart.c = ">"
          break
        case "\\":
          cart.c = "<"
          break
        case "+":
          junction(cart)
      }
      break
  }
}

sortCarts()

let cartId = 0,
  last
while (true) {
  const cart = carts[cartId]
  if (cart.a) {
    move(cart, grid)
    const crashed = carts.filter(
      ({ x, y, a }) => cart.x === x && cart.y === y && a
    )
    if (crashed.length > 1) {
      crashes.push(crashed)
      crashed.forEach((e) => (e.a = 0))
      last = carts.filter((e) => e.a)
      if (last.length === 1) break
    }
  }
  cartId = (cartId + 1) % carts.length
  if (cartId === 0) sortCarts()
}

const resultA = crashes[0][0].x + "," + crashes[0][0].y
const resultB = last[0].x + "," + last[0].y

console.info("\nSolution A:\n")
console.info(resultA)
console.info("\nSolution B:\n")
console.info(resultB, "\n")
console.timeEnd()

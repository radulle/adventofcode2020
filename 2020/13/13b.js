const fs = require("fs")

const data = fs.readFileSync("data.txt", "utf8").split("\r\n")

const busses = data[1]
  .split(",")
  .map((e, i) => ({ id: Number(e), delay: i }))
  .filter((e) => !isNaN(e.id))

function calc(i) {
  return busses.map(({ id, delay }) => !((i + delay) % id))
}

let increment = busses[0].id
let len = 1
let result = busses[0].id

while (true) {
  const test = calc(result)
  const passed = test.filter((e) => e === true).length
  if (passed === busses.length) break
  if (passed > len) {
    increment = lcm(
      test.reduce((acc, cur, idx) => {
        if (cur) acc.push(busses[idx].id)
        return acc
      }, [])
    )
    len = passed
  }
  result += increment
}

console.info(result)

function lcm(arr) {
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b)
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b)
  }

  return arr.reduce(lcm)
}

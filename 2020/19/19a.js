console.time()
const fs = require("fs")

function parseData(data) {
  const split = data
    .replace(/"/g, "")
    .replace(/\r\n/g, "\n")
    .split(/\n\n/g)
    .map((part) => part.split("\n"))
  const rules = new Map()
  for (const row of split[0]) {
    const [key, value] = row.split(": ")
    rules.set(
      key,
      value.split(" | ").map((el) => el.split(" "))
    )
  }
  const messages = split[1]
  return { rules, messages }
}

function makeRegExpString(rules, val) {
  if (Array.isArray(val)) {
    return `(${val
      .map((e1) => e1.map((e2) => makeRegExpString(rules, e2)).join(""))
      .join("|")})`
  }
  if (/^(a|b)$/.test(val)) return val
  if (/^\d+$/.test(val)) return makeRegExpString(rules, rules.get(val))
}

function solve(data) {
  const parsed = parseData(data)
  const regExpString = makeRegExpString(parsed.rules, "0")
    .replace(/\(a\)/g, "a")
    .replace(/\(b\)/g, "b")
  const matcher = new RegExp(`^${regExpString}$`)
  const result = parsed.messages
    .map((e) => matcher.test(e))
    .filter((e) => e === true).length
  return result
}

const test = solve(fs.readFileSync("data-test-a.txt", "utf8"))
console.info(test, test === 2)

console.info("Solution:")
console.info(solve(fs.readFileSync("data.txt", "utf8")))
console.timeEnd()

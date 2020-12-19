console.time()
const fs = require("fs")

const data = fs.readFileSync("data.txt", "utf8")

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

function makeRegExpString(rules, val, n = 0, maxN = 1) {
  if (n > maxN) return ""
  if (Array.isArray(val)) {
    return `(${val
      .map((e1) =>
        e1
          .map((e2) =>
            makeRegExpString(
              rules,
              e2,
              val === "8" || val === "11" ? n + 1 : n,
              maxN
            )
          )
          .join("")
      )
      .join("|")})`
  }
  if (/^(a|b)$/.test(val)) return val
  if (/^\d+$/.test(val))
    return makeRegExpString(
      rules,
      rules.get(val),
      val === "8" || val === "11" ? n + 1 : n,
      maxN
    )
}

function solve(data) {
  let result
  let maxN = 3
  while (true) {
    const parsed = parseData(data)
    const regExpString = makeRegExpString(parsed.rules, "0", 0, maxN)
      .replace(/\(a\)/g, "a")
      .replace(/\(b\)/g, "b")
    const matcher = new RegExp(`^${regExpString}$`)
    newResult = parsed.messages
      .map((e) => matcher.test(e))
      .filter((e) => e === true).length
    maxN++
    if (newResult === result) {
      result = newResult
      break
    }
    result = newResult
  }
  return result
}

const test1 = solve(fs.readFileSync("data-test-b.txt", "utf8"))
console.info("Test (original):")
console.info(test1, test1 === 3)

const test2 = solve(
  fs
    .readFileSync("data-test-b.txt", "utf8")
    .replace("8: 42", "8: 42 | 42 8")
    .replace("11: 42 31", "11: 42 31 | 42 11 31")
)
console.info("Test (modified):")
console.info(test2, test2 === 12)

const solution = solve(
  fs
    .readFileSync("data.txt", "utf8")
    .replace("8: 42", "8: 42 | 42 8")
    .replace("11: 42 31", "11: 42 31 | 42 11 31")
)
console.info("Solution:")
console.info(solution)
console.timeEnd()

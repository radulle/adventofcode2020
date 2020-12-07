const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .replace(/bags|bag/g, "")
    .split(".\r\n")
    .map((row) =>
      row.split("  contain ").map((elements) => elements.trim().split(" , "))
    )
    .reduce((acc, [container, contents]) => {
      contents.forEach((bag) => {
        if (bag.split(" ")[0] !== "no")
          acc.set(container[0], [
            ...(acc.get(container[0]) || []),
            {
              amount: Number(bag.split(" ")[0]),
              color: bag.split(" ").slice(1).join(" "),
            },
          ])
      })
      return acc
    }, new Map())
  console.infoTime(() => solve(data, "shiny gold"))
} catch (err) {
  console.error(err)
}

function solve(data, initColor) {
  function getContents(color) {
    const contents = data.get(color)
    if (!contents) return 0
    return contents.reduce(
      (acc, cur) => acc + cur.amount * (1 + getContents(cur.color)),
      0
    )
  }
  return getContents(initColor)
}

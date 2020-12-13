const fs = require("fs")

const data = fs.readFileSync("data.txt", "utf8").split("\r\n")

const time = Number(data[0])
const busses = data[1]
  .split(",")
  .filter((e) => e !== "x")
  .map(Number)

console.info(
  busses
    .map((bus) => {
      const wait = bus - (time % bus)
      return {
        bus,
        wait,
        result: bus * wait,
      }
    })
    .sort((a, b) => a.wait - b.wait)[0]
)

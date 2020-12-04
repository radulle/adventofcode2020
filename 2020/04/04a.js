const fs = require("fs")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

const required = `byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)`
  .split("\n")
  .map((e) => e.split(" ")[0])
  .slice(0, -1)

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .split("\r\n\r\n")
    .map((doc) =>
      doc.split(/[\r\n| ]/).reduce((agg, cur) => {
        const keyVal = cur.split(":")
        if (keyVal.length === 2) agg.set(keyVal[0], keyVal[1])
        return agg
      }, new Map())
    )
  console.infoTime(() => valid(data, required).length)
} catch (err) {
  console.error(err)
}

function valid(data, required) {
  return data.filter((passport) => required.every((key) => passport.has(key)))
}

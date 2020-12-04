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
      doc.split(/\r\n| /).reduce((agg, cur) => {
        const keyVal = cur.split(":")
        if (keyVal.length === 2) agg.set(keyVal[0], keyVal[1])
        return agg
      }, new Map())
    )
  console.infoTime(
    () => validateValues(haveRequiredFields(data, required)).length
  )
} catch (err) {
  console.error(err)
}

function haveRequiredFields(data, required) {
  return data.filter((passport) => required.every((key) => passport.has(key)))
}

function validateByr(val) {
  return val.length === 4 && Number(val) > 1919 && Number(val) < 2003
}
function validateIyr(val) {
  return val.length === 4 && Number(val) > 2009 && Number(val) < 2021
}
function validateEyr(val) {
  return val.length === 4 && Number(val) > 2019 && Number(val) < 2031
}
function validateHgt(val) {
  const quantity = parseInt(val)
  const unit = val.slice(-2)
  return (
    (unit === "cm" && quantity > 149 && quantity < 194) ||
    (unit === "in" && quantity > 58 && quantity < 77)
  )
}
function validateHcl(val) {
  return /^#[0-9A-F]{6}$/i.test(val)
}
function validateEcl(val) {
  return val.length === 3 && 'amb blu brn gry grn hzl oth'.split(' ').includes(val)
}
function validatePid(val) {
  return val.length === 9 && val.split('').every(e => !isNaN(parseInt(val)))
}

function validateValues(data) {
  return data.filter((passport) => {
    if (!validateByr(passport.get("byr"))) return false
    if (!validateIyr(passport.get("iyr"))) return false
    if (!validateEyr(passport.get("eyr"))) return false
    if (!validateHgt(passport.get("hgt"))) return false
    if (!validateHcl(passport.get("hcl"))) return false
    if (!validateEcl(passport.get("ecl"))) return false
    if (!validatePid(passport.get("pid"))) return false
    return true
  })
}

const fs = require("fs")
console.time()

const boss = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n")
  .map((e) => Number(e.split(": ")[1]))
const hpB = boss[0]
const atkB = boss[1]

function round(hpB, hpW, mana, shields, poisons, recharges, spell, spent) {
  if (hard && --hpW <= 0) return { victor: "boss" }
  if (poisons > 0 && (hpB -= 3) <= 0) return { victor: "wizard", spent }
  if (recharges > 0) mana += 101
  shields--
  poisons--
  recharges--
  let cost
  switch (spell) {
    case "missile":
      hpB -= 4
      cost = 53
      break
    case "drain":
      hpB -= 2
      hpW += 2
      cost = 73
      break
    case "shield":
      shields = 6
      cost = 113
      break
    case "poison":
      poisons = 6
      cost = 173
      break
    case "recharge":
      recharges = 5
      cost = 229
      break
  }
  spent += cost
  if (poisons > 0) hpB -= 3
  if (hpB <= 0) return { victor: "wizard", spent }
  if (recharges > 0) mana += 101
  if ((hpW -= shields > 0 ? atkB - 7 : atkB) <= 0) return { victor: "boss" }
  mana -= cost
  shields--
  poisons--
  recharges--
  return { state: [hpB, hpW, mana, shields, poisons, recharges], spent }
}

function play(hpB, hpW, mana, shields, poisons, recharges, spent) {
  for (const spell of ["missile", "drain", "shield", "poison", "recharge"]) {
    if (spell === "missile" && mana < 53) continue
    if (spell === "drain" && mana < 73) continue
    if (spell === "shield" && (shields > 1 || mana < 113)) continue
    if (spell === "poison" && (poisons > 1 || mana < 173)) continue
    if (spell === "recharge" && (recharges > 1 || mana < 229)) continue
    const turn = round(
      hpB,
      hpW,
      mana,
      shields,
      poisons,
      recharges,
      spell,
      spent
    )
    if (turn.victor === "wizard" && turn.spent < min) {
      min = turn.spent
      continue
    }
    if (turn.victor === undefined && turn.spent < min) {
      play(...turn.state, turn.spent)
    }
  }
}

let min = Infinity
let hard
const hitW = 50
const manaW = 500
play(hpB, hitW, manaW, 0, 0, 0, 0)
const resultA = min

hard = true
min = Infinity
play(hpB, hitW, manaW, 0, 0, 0, 0)
const resultB = min

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB)
console.timeEnd()

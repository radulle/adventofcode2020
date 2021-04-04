const fs = require("fs")
console.time()

const data = [
  ...fs
    .readFileSync("data.txt", "utf8")
    .matchAll(/(\w+) \((\d+)\)(?: -> (.+))?/g),
].map(([_, node, weight, children]) => ({
  node,
  weight: Number(weight),
  children: children?.split(", "),
}))

// Find a root node
const resultA = data.find(
  ({ node }) => !data.some(({ children }) => children?.includes(node))
).node

// Fill total wights and parents
;(function fill(node, parent) {
  const el = data.find((e) => e.node === node)
  el.parent = parent
  el.total =
    el.weight +
    (el.children !== undefined
      ? el.children.reduce((acc, cur) => acc + fill(cur, node), 0)
      : 0)
  return el.total
})(resultA)

const unbalanced = data.filter((e1) =>
  data.some((e2) => e2.parent === e1.parent && e2.total !== e1.total)
)

// Most shallow node that causes unbalance
const node = unbalanced
  .map(({ weight, total, parent }) => ({
    weight,
    total,
    siblings: unbalanced
      .filter((e) => e.parent === parent)
      .map(({ total }) => total),
  }))
  .filter((e1) => e1.siblings.filter((e2) => e2 === e1.total).length === 1)
  .sort((a, b) => a.total - b.total)[0]

const resultB =
  node.weight + node.siblings.find((e) => e !== node.total) - node.total

console.info("\nSolution A:")
console.info(resultA)
console.info("\nSolution B:")
console.info(resultB, "\n")
console.timeEnd()

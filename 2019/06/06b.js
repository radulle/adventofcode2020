const fs = require("fs")
const intCode = require("../intCode")

global.console.infoTime = (logMe) => {
  console.time()
  console.info(typeof logMe === "function" ? logMe() : logMe)
  console.timeEnd()
}

try {
  const data = fs
    .readFileSync("data.txt", "utf8")
    .split("\r\n")
    .map((e) => ({ id: e.split(")")[1], parentId: e.split(")")[0] }))
  console.infoTime(() => solve(data))
} catch (err) {
  console.error(err)
}

function buildTree(data) {
  const grandfatherLess = data.filter(
    (el) => data.findIndex((e) => el.parentId === e.id) === -1
  )
  data.forEach((el) => {
    const parent = data.find((e) => e.id === el.parentId)
    if (parent) parent.children = [...(parent.children || []), el]
  })

  const parentLess = grandfatherLess.reduce((agg, cur) => {
    agg.add(cur.parentId)
    return agg
  }, new Set())

  const tree = {
    id: undefined,
    children: [...parentLess].map((id) => ({
      id,
      children: grandfatherLess.filter(({ parentId }) => parentId === id),
    })),
  }

  return tree.children.length === 1 ? tree.children[0] : tree
}

function* flatten(tree, parents = []) {
  for (const item of tree) {
    const path = [...parents, item.id]
    if (item.children && item.children.length > 0) {
      const { children, ...rest } = item
      yield { ...rest, path }
      yield* flatten(item.children, path)
    } else {
      yield { ...item, path }
    }
  }
}

function solve(data) {
  const flat = [...flatten([buildTree(data)])]
  const san = flat.find(({ id }) => id === "SAN").path
  const you = flat.find(({ id }) => id === "YOU").path
  let i = 0
  while (san[0] === you[0]) {
    san.shift()
    you.shift()
    i++
  }
  return san.length + you.length - 2
}

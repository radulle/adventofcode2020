function getGroups(nodes) {
  const groups = []

  function drill(key, group) {
    if (group.has(key)) return
    group.add(key)
    nodes.get(key).forEach((n) => drill(n, group))
  }

  while (nodes.size) {
    const group = new Set()
    groups.push(group)
    const key = nodes.keys().next().value
    drill(key, group)
    for (const key of group) {
      nodes.delete(key)
    }
  }

  return groups
}

module.exports = getGroups

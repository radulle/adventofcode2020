module.exports = class Graph {
  constructor(adjacent = {}) {
    this.adjacent = adjacent
  }

  /** Deep copy of essential data into new Graph */
  copy() {
    return new Graph(
      Object.fromEntries(
        Object.entries(this.adjacent).map(
          ([key, { node, edges, locked, ...rest }]) => [
            key,
            {
              key,
              node: typeof node === "string" ? node : [...node],
              edges: new Set(edges),
              locked: new Set(locked),
              ...rest,
            },
          ]
        )
      )
    )
  }

  fold(i) {
    return Object.fromEntries(
      Object.entries(this.adjacent).map(
        ([key, { node, edges, locked, ...rest }]) => [
          key.replace("(0)", `(${i})`),
          {
            key: key.replace("(0)", `(${i})`),
            node: node.replace("(0)", `(${i})`),
            edges: new Set([...edges].map((e) => e.replace("(0)", `(${i})`))),
          },
        ]
      )
    )
  }

  getNodeByKey(key) {
    return this.adjacent[key]
  }

  getNodeByType(type) {
    return Object.values(this.adjacent).find((val) => val.type === type)
  }

  getDistinctNodes() {
    return Object.values(this.adjacent).filter((val) => val.type !== ".")
  }

  getKeyNodes() {
    return Object.values(this.adjacent).filter((val) => /[a-z]/.test(val.type))
  }

  getDoorNodes() {
    return Object.values(this.adjacent).filter((val) => /[A-Z]/.test(val.type))
  }

  addNode(node, type, extra) {
    const key = toKey(node)
    if (this.adjacent[key]) throw new Error("Node already exists!")
    this.adjacent[key] = {
      key,
      node,
      type,
      edges: new Set(),
      locked: new Set(),
      ...extra,
    }
    return this.adjacent[key]
  }

  addEdge(A, B) {
    if (!this.adjacent[toKey(A)] || !this.adjacent[toKey(B)]) {
      throw new Error("Missing vertices!")
    }
    this.adjacent[toKey(A)].edges.add(toKey(B))
  }

  addLocked(A, B) {
    if (!this.adjacent[toKey(A)] || !this.adjacent[toKey(B)]) {
      throw new Error("Missing vertices!")
    }
    this.adjacent[toKey(A)].locked.add(toKey(B))
  }

  /** Breadth first search */
  bfs(source) {
    const visited = new Map()
    let que = []

    visited.set(toKey(source), 0)
    que.push([toKey(source), 0])

    while (que.length) {
      const [container, step] = que.pop()
      for (let node of this.adjacent[container].edges) {
        if (!visited.has(node)) {
          visited.set(node, step + 1)
          que.unshift([node, step + 1])
        }
      }
    }
    return visited
  }

  /** Depth first search */
  dfs(source) {
    const visited = new Map()

    const dfs = (source, visited, step = 0) => {
      visited.set(source, step)
      for (let node of this.adjacent[source].edges) {
        if (!visited.has(node)) {
          dfs(node, visited, step + 1)
        }
      }
    }

    dfs(toKey(source), visited)
    return visited
  }

  /** Draws if each node have a node [row, col] */
  draw(overlay = []) {
    const size = Object.values(this.adjacent).reduce(
      (acc, cur) => {
        if (cur.node[0] > acc[0]) acc[0] = cur.node[0]
        if (cur.node[1] > acc[1]) acc[1] = cur.node[1]
        return acc
      },
      [0, 0]
    )
    const canvas = new Array(size[0] + 2)
      .fill(null)
      .map(() => new Array(size[1] + 2).fill("#"))

    const draw = ({ node: [row, col], type }) => {
      canvas[row][col] = type
    }

    Object.values(this.adjacent).forEach(draw)
    overlay.forEach(draw)
    return canvas.map((row) => row.join("")).join("\n")
  }
}

const toKey = (v) => (Array.isArray(v) ? `${v[0]},${v[1]}` : v)

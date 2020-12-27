class Graph {
  adjacent = new Map()

  addNode(key) {
    if (this.adjacent.has(key)) throw new Error("Node already exists!")
    this.adjacent.set(key, new Map())
    return this.adjacent.get(key)
  }

  hasNode(key) {
    return this.adjacent.has(key)
  }

  countNodes() {
    return this.adjacent.size
  }

  addEdge(A, B, weight = 1) {
    if (!this.adjacent.has(A) || !this.adjacent.has(B)) {
      throw new Error("Missing vertices!")
    }
    this.adjacent.get(A).set(B, { key: B, weight })
  }

  /** Unweighted breadth first search */
  bfs(source) {
    const visited = new Map()
    let que = []

    visited.set(source, 0)
    que.push({ key: source, depth: 0 })

    while (que.length) {
      const { key, depth } = que.pop()
      for (let node of this.adjacent.get(key).values()) {
        if (!visited.has(node.key)) {
          visited.set(node.key, depth + 1)
          que.unshift({ key: node.key, depth: depth + 1 })
        }
      }
    }
    return visited
  }

  /**
   *  Traveling salesman problem (weighted)
   *
   *  (visit every node exactly once)
   */
  tsp(options = {}) {
    const candidates = []
    const traversed = new Map()
    for (const source of this.adjacent.keys()) {
      let que = [{ key: source, depth: 0, visited: [source] }]
      for (let i = 0; i < this.countNodes(); i++) {
        const newQue = []
        for (const { key, depth, visited } of que) {
          const hash = [...visited].sort().join(",") + "," + key
          if (traversed.has(hash)) {
            if (options.longest && traversed.get(hash) > depth) continue
            if (!options.longest && traversed.get(hash) < depth) continue
          }
          traversed.set(hash, depth)
          if (visited.length === this.countNodes()) {
            candidates.push({ visited, depth })
            continue
          }
          for (const { key: dest, weight } of this.adjacent.get(key).values()) {
            if (visited.includes(dest)) continue
            newQue.push({
              key: dest,
              depth: depth + weight,
              visited: [...visited, dest],
            })
          }
        }
        que = newQue
      }
    }
    if (options.returnCandidates) return candidates
    return candidates.sort((a, b) =>
      options.longest ? b.depth - a.depth : a.depth - b.depth
    )[0]
  }

  /**
   *  Round trip problem (weighted)
   *
   *  (visit every node and get back to the first,
   *  it is presumed that edge between every node is provided)
   */
  rtp(options = {}) {
    const candidates = []
    const traversed = new Map()
    const source = this.adjacent.keys().next().value
    let que = [{ key: source, depth: 0, visited: [source] }]
    for (let i = 0; i < this.countNodes(); i++) {
      const newQue = []
      for (const { key, depth, visited } of que) {
        const hash = [...visited].sort().join(",") + "," + key
        if (traversed.has(hash)) {
          if (options.longest && traversed.get(hash) > depth) continue
          if (!options.longest && traversed.get(hash) < depth) continue
        }
        traversed.set(hash, depth)
        if (visited.length === this.countNodes()) {
          candidates.push({
            visited,
            depth: depth + this.adjacent.get(key)?.get(source).weight,
          })
          continue
        }
        for (const { key: dest, weight } of this.adjacent.get(key).values()) {
          if (visited.includes(dest)) continue
          newQue.push({
            key: dest,
            depth: depth + weight,
            visited: [...visited, dest],
          })
        }
      }
      que = newQue
    }

    candidates.sort((a, b) =>
      options.longest ? b.depth - a.depth : a.depth - b.depth
    )

    if (options.returnCandidates) return candidates
    return candidates[0]
  }

  /** Weighted breadth first search */
  wbfs(source) {
    const visited = new Map()
    let que = [{ key: source, depth: 0, doors: [] }]

    visited.set(source, { depth: 0, doors: [] })

    while (que.length) {
      const newQue = []
      for (let { key, depth, doors: nodeDoors } of que) {
        for (let node of this.adjacent.get(key).values()) {
          const visitedNode = visited.get(node.key)
          const cell = this.getCellByKey(node.key)
          const doors = [...nodeDoors]
          if (cell?.group === "door") doors.push(cell.type)
          if (
            visitedNode?.depth === undefined ||
            visitedNode.depth > depth + node.weight
          ) {
            visited.set(node.key, { depth: depth + node.weight, doors })
            newQue.push({ key: node.key, depth: depth + node.weight, doors })
          }
        }
      }
      que = newQue
    }
    return visited
  }

  /** Unweighted depth first search */
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

    dfs(source, visited)
    return visited
  }

  clone() {
    const graph = new Graph()
    graph.adjacent = new Map([...this.adjacent.entries()].map(cloneObj))
    return graph
  }
}

class Grid extends Graph {
  cells = []
  height = 0
  width = 0

  addNode(coords, obj) {
    const key = toKey(coords)
    if (!super.addNode(key)) return false
    const length = this.cells.push({ key, coords, ...obj })
    if (coords[0] > this.height) this.height = coords[0]
    if (coords[1] > this.width) this.width = coords[1]
    return this.cells[length - 1]
  }

  clone() {
    const grid = new Grid()
    grid.adjacent = new Map([...this.adjacent.entries()].map(cloneObj))
    grid.cells = cloneObj(this.cells)
    grid.height = this.height
    grid.width = this.width
    return grid
  }

  /* Draws grid [row, col] */
  draw(overlay = [], fill = "#") {
    let height = 0
    let width = 0
    const size = this.cells.forEach(({ coords: [row, col] }) => {
      if (row > height) height = row
      if (col > width) width = col
    })

    const canvas = new Array(height + 2)
      .fill(null)
      .map(() => new Array(width + 2).fill(fill))

    const draw = ({ coords: [row, col], type }) => {
      canvas[row][col] = type
    }

    this.cells.forEach(draw)
    overlay.forEach(draw)
    return canvas.map((row) => row.join("")).join("\n")
  }

  getCellByKey(key) {
    return this.cells.find((val) => val.key === key)
  }

  getCellByType(type) {
    return this.cells.find((val) => val.type === type)
  }

  getDistinctCells() {
    return this.cells.filter((val) => val.type !== ".")
  }

  compress() {
    const distinctCells = this.getDistinctCells()
    const distinctKeys = distinctCells.map(({ key }) => key)
    const compressed = []
    distinctKeys.forEach((key) =>
      compressed.push(
        ...[...this.wbfs(key)]
          .filter((e) => distinctKeys.includes(e[0]) && e[1] !== 0)
          .map((keyDepth) => [key, ...keyDepth])
      )
    )
    return compressed
  }

  /** Path by unweighted breadth first search */
  path(source, destination) {
    const visited = new Map()
    let que = [{ key: source, depth: 0, path: [] }]

    visited.set(source, { depth: 0, path: [] })
    while (que.length) {
      const tQue = []
      for (const { key, depth, path } of que) {
        for (let node of this.adjacent.get(key).values()) {
          if (!visited.has(node.key)) {
            const element = {
              key: node.key,
              depth: depth + 1,
              path: [...path, key],
            }
            if (destination === node.key) return element.path.slice(1)
            visited.set(node.key, element)
            tQue.push(element)
          }
        }
        que = tQue
      }
    }
  }
}

const toKey = (v) => (Array.isArray(v) ? v.join(",") : v)

function cloneObj(obj) {
  const clone = Array.isArray(obj) ? [] : {}
  for (var i in obj) {
    if (obj[i] != null && typeof obj[i] == "object") clone[i] = cloneObj(obj[i])
    else clone[i] = obj[i]
  }
  return clone
}

module.exports = { Graph, Grid, toKey, cloneObj }

class Graph {
  constructor(adjacent = new Map()) {
    this.adjacent = adjacent
  }

  addNode(key) {
    if (this.adjacent.has(key)) throw new Error("Node already exists!")
    this.adjacent.set(key, new Map())
    return this.adjacent.get(key)
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

  /** Weighted breadth first search */
  wbfs(source) {
    const visited = new Map()
    let que = []

    visited.set(source, 0)
    que.push({ key: source, depth: 0 })

    while (que.length) {
      const { key, depth } = que.pop()
      for (let node of this.adjacent.get(key).values()) {
        const visitedDepth = visited.get(node.key)
        if (visitedDepth === undefined || visitedDepth > depth + node.weight) {
          visited.set(node.key, depth + node.weight)
          que.unshift({ key: node.key, depth: depth + node.weight })
        }
      }
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
    return new Graph(
      new Map(
        [...this.adjacent.entries()].map((row) => [row[0], cloneObj(row[1])])
      )
    )
  }
}

class Grid extends Graph {
  constructor(adjacent, cells = []) {
    super(adjacent)
    this.cells = cells
  }

  addNode(coords, obj) {
    const key = toKey(coords)
    if (!super.addNode(key)) return false
    const length = this.cells.push({ key, coords, ...obj })
    return this.cells[length - 1]
  }

  clone() {
    return new Grid(
      new Map(
        [...this.adjacent.entries()].map((row) => [row[0], cloneObj(row[1])])
      ),
      cloneObj(this.cells)
    )
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

module.exports = { Graph, Grid, toKey }

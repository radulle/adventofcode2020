class Node {
  constructor(element, next = null, prev = null) {
    this.element = element
    this.next = next
    this.prev = prev
  }
}

class CircularLinkedListMapped {
  constructor() {
    this.head = null
    this.map = new Map()
    this.tail = null
  }

  get size() {
    return this.map.size
  }

  /** Get node by element */
  getNodeByElement = function (element) {
    return this.map.get(element)
  }

  /** Move head by N */
  moveHeadBy = function (n) {
    if (n < 0) throw new Error("This is single linked list!")
    for (let i = 0; i < n; i++) {
      this.tail = this.head
      this.head = this.head.next
    }
  }

  /** Add new node */
  appendNode = function (node) {
    this.map.set(node.element, node)
    if (this.head === null) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
    }
    node.next = this.head
    this.tail = node
  }

  /** Remove N nodes after head */
  removeNodesAfterHead = function (n = 1) {
    if (n >= this.size || n === 0) throw new Error("Can't remove head!")
    let next = this.head.next
    const head = next
    let tail
    for (let i = 0; i < n; i++) {
      this.map.delete(next.element)
      if (i === n - 1) tail = next
      next = next.next
    }
    this.head.next = next
    tail.next = null
    return head
  }

  /** Insert nodes after a node */
  insertNodesAfterNode = function (node, nodes) {
    const next = node.next
    let temp = nodes
    while (temp !== null) {
      this.map.set(temp.element, temp)
      if (temp.next === null) break
      temp = temp.next
    }
    node.next = nodes
    temp.next = next
  }

  /** Does the list contain the element */
  has = (element) => {
    return this.map.has(element)
  }

  /** Convert list to array starting at head */
  get array() {
    const arr = []
    let current = this.head
    const start = this.head.element
    while (current) {
      if (start === current.next.element) {
        arr.push(current.element)
        break
      }
      arr.push(current.element)
      current = current.next
    }
    return arr
  }
}

module.exports = { CircularLinkedListMapped, Node }

class StackQue {
  constructor(maxSize) {
    if (maxSize !== undefined) {
      this.maxSize = maxSize
    }
  }
  head = 0
  tail = 0
  map = new Map()
  push(item) {
    this.map.set(this.tail, item)
    this.tail++
    if (this.maxSize && this.maxSize < this.size) {
      this.dequeue()
    }
    return this.size
  }
  pop() {
    if (this.size <= 0) return undefined
    const item = this.map.get(this.tail - 1)
    this.map.delete(this.tail - 1)
    this.tail--
    return item
  }
  enqueue(item) {
    return this.push(item)
  }
  dequeue() {
    if (this.size <= 0) return undefined
    const item = this.map.get(this.head)
    this.map.delete(this.head)
    this.head++
    return item
  }
  clear() {
    this.map.clear()
    this.head = 0
    this.tail = 0
  }
  get size() {
    return this.tail - this.head
  }
  toArray() {
    return [...this.map.values()]
  }
}

module.exports = { StackQue }

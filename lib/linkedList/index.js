class LinkedList {
  head
  tail
  size = 0

  append(el) {
    this.size++
    const cur = typeof el === "object" ? el : { id: el }
    if (this.tail === undefined) {
      this.head = cur
    } else {
      this.tail.next = cur
    }
    this.tail = cur
  }

  getByPos(pos) {
    let res = this.head
    for (let i = 0; i < pos; i++) {
      res = res.next
    }
    return res
  }

  toString(separator = "") {
    let str = ""
    let cur = this.head
    do {
      str += separator + cur.id
      cur = cur.next
    } while (cur.id !== this.head.id || !cur)
    return str
  }

  toArray() {
    let arr = []
    let cur = this.head
    do {
      arr.push(cur)
      cur = cur.next
    } while (cur.id !== this.head.id || !cur)
    return arr
  }
}

class LinkedListDouble extends LinkedList {
  append(el) {
    this.size++
    const cur = typeof el === "object" ? el : { id: el }
    if (this.head === undefined) {
      this.head = cur
    } else {
      this.tail.next = cur
      cur.prev = this.tail
    }
    this.tail = cur
    return cur
  }

  remove(node) {
    if (!size) return
    this.size--
    if (!size) {
      this.head = undefined
      this.tail = undefined
    }
    if (this.head.id === node.id) {
      this.head = this.head.next
      this.head.prev = undefined
      return
    }
    if (this.tail.id === node.id) {
      this.tail = this.tail.prev
      this.tail.next = undefined
      return
    }
    let next = node.next
    let prev = node.prev
    prev.next = next
    next.prev = prev
  }
}

class LinkedListDoubleCircular extends LinkedListDouble {
  append(el) {
    const cur = super.append(el)
    this.tail.next = this.head
    this.head.prev = this.tail
    return cur
  }

  insert(el, prev) {
    if (prev.id === this.tail.id) {
      return this.append(el)
    }
    this.size++
    const next = prev.next
    const cur = typeof el === "object" ? el : { id: el }
    prev.next = cur
    cur.prev = prev
    next.prev = cur
    cur.next = next
    return cur
  }

  remove(node) {
    if (!this.size) return
    this.size--
    if (!this.size) {
      this.head = undefined
      this.tail = undefined
    }
    if (this.head.id === node.id) {
      this.head = this.head.next
      this.head.prev = this.tail
      this.tail.next = this.head
      return
    }
    if (this.tail.id === node.id) {
      this.tail = this.tail.prev
      this.tail.next = this.head
      this.head.prev = this.tail
      return
    }
    let next = node.next
    let prev = node.prev
    prev.next = next
    next.prev = prev
  }
}

module.exports = {
  LinkedList,
  LinkedListDouble,
  LinkedListDoubleCircular,
  ...require("./circularSingleMapped"),
}

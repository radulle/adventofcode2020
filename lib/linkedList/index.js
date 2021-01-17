class LinkedList {
  head
  first
  size = 0

  append(id) {
    this.size++
    const cur = { id }
    if (!this.head) {
      this.first = cur
      this.head = cur
    }
    this.head.next = cur
    this.head = cur
  }

  getByPos(pos) {
    let res = this.first
    for (let i = 0; i < pos; i++) {
      res = res.next
    }
    return res
  }

  toString(split = "") {
    let str = ""
    let cur = this.first
    do {
      str += split + cur.id
      cur = cur.next
    } while (cur.id !== this.first.id || !cur)
    return str
  }

  toArray() {
    let arr = []
    let cur = this.first
    do {
      arr.push(cur)
      cur = cur.next
    } while (cur.id !== this.first.id || !cur)
    return arr
  }
}

class LinkedListDouble extends LinkedList {
  _prev

  append(id) {
    this.size++
    this.head = { id }
    if (this._prev) {
      this._prev.next = this.head
      this.head.prev = this._prev
    }
    this._prev = this.head
  }

  swap(A, B) {
    // TODO: when one is first
    if (A.next.id === B.id) {
      let prev = A.prev
      let next = B.next
      A.next = next
      A.prev = B
      B.prev = prev
      B.next = A
      prev.next = B
      next.prev = A
    } else if (B.next.id === A.id) {
      let prev = B.prev
      let next = A.next
      B.next = next
      B.prev = A
      A.prev = prev
      A.next = B
      prev.next = A
      next.prev = B
    } else {
      let t
      A.prev.next = B
      A.next.prev = B
      B.prev.next = A
      B.next.prev = A
      t = A.next
      A.next = B.next
      B.next = t
      t = A.prev
      A.prev = B.prev
      B.prev = t
    }
    if (this.first.id === A.id) {
      this.first = B
    } else if (this.first.id === B.id) {
      this.first = A
    }
  }

  removeNode(node) {
    if (this.first.id === node.id) this.first = this.first.next
    let next = node.next
    let prev = node.prev
    prev.next = next
    next.prev = prev
  }
}

class LinkedListDoubleCircular extends LinkedListDouble {
  append(id) {
    if (!this._prev) {
      super.append(id)
      this.first = this.head
    } else {
      super.append(id)
    }
    this._prev.next = this.first
    this.first.prev = this._prev
  }

  /** Reduces list to one by [remove next, move next] #AOC2016-19a*/
  reduceToOne() {
    let cur = this.first
    while (this.size !== 1) {
      cur.next = cur.next.next
      cur = cur.next
      this.size--
    }
    return cur.id
  }
}

/** Specific linked list that handles middle element #AOC2016-19b */
class LinkedListDoubleCircularMid extends LinkedListDoubleCircular {
  mid
  append(id, finalSize) {
    super.append(id)
    if (id - 1 === Math.floor(finalSize / 2)) {
      this.mid = this.head
    }
  }

  /** Reduces list to one by [remove opposite, move next] #AOC2016-19b*/
  reduceToOne() {
    let cur = this.first
    while (this.size !== 1) {
      this.mid.prev.next = this.mid.next
      this.mid.next.prev = this.mid.prev
      this.mid = this.mid.next
      cur = cur.next
      this.size--
      if (this.size % 2 === 0) this.mid = this.mid.next
    }
    return cur.id
  }
}

module.exports = {
  LinkedList,
  LinkedListDouble,
  LinkedListDoubleCircular,
  LinkedListDoubleCircularMid,
  ...require("./circularSingleMapped"),
}

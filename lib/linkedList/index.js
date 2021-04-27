// FIXME: having FIRST and _PREV was not a good idea! Should use HEAD only and reference the FIRST externally...
class LinkedList {
  head
  tail
  size = 0

  append(id) {
    this.size++
    const cur = { id }
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
  append(id) {
    this.size++
    const cur = { id }
    if (this.head === undefined) {
      this.head = cur
    } else {
      this.tail.next = cur
      cur.prev = this.tail
    }
    this.tail = cur
    return cur
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
    if (this.tail.id === A.id) {
      this.tail = B
    } else if (this.tail.id === B.id) {
      this.tail = A
    }
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
  append(id) {
    const cur = super.append(id)
    this.tail.next = this.head
    this.head.prev = this.tail
    return cur
  }

  insert(id, prev) {
    if (prev.id === this.tail.id) {
      return this.append(id)
    }
    this.size++
    const next = prev.next
    const cur = { id }
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

  /** Reduces list to one by [remove next, move next] #AOC2016-19a*/
  reduceToOne() {
    let cur = this.tail
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
      this.mid = this.tail
    }
  }

  /** Reduces list to one by [remove opposite, move next] #AOC2016-19b*/
  reduceToOne() {
    let cur = this.tail
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

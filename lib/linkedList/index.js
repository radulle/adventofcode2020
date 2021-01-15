class LinkedList {
  head
  size = 0

  append(id) {
    this.size++
    const curr = { id }
    this.head.next = curr
    this.head = curr
  }
}

class LinkedListDouble extends LinkedList {
  prev

  append(id) {
    this.size++
    this.head = { id }
    if (this.prev) {
      this.prev.next = this.head
      this.head.prev = this.prev
    }
    this.prev = this.head
  }
}

class LinkedListDoubleCircular extends LinkedListDouble {
  first

  append(id) {
    if (!this.prev) {
      super.append(id)
      this.first = this.head
    } else {
      super.append(id)
    }
    this.prev.next = this.first
    this.first.prev = this.prev
  }

  /** Reduces list to one by [remove next, move next] #AOC2016-19a*/
  reduceToOne() {
    let curr = this.first
    while (this.size !== 1) {
      curr.next = curr.next.next
      curr = curr.next
      this.size--
    }
    return curr.id
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
    let curr = this.first
    while (this.size !== 1) {
      this.mid.prev.next = this.mid.next
      this.mid.next.prev = this.mid.prev
      this.mid = this.mid.next
      curr = curr.next
      this.size--
      if (this.size % 2 === 0) this.mid = this.mid.next
    }
    return curr.id
  }
}

module.exports = {
  LinkedList,
  LinkedListDouble,
  LinkedListDoubleCircular,
  LinkedListDoubleCircularMid,
  ...require("./circularSingleMapped"),
}

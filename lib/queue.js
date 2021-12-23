class Queue {
  head;
  tail;

  enqueue(value) {
    const link = { value, next: undefined };
    this.tail = this.head ? (this.tail.next = link) : (this.head = link);
  }

  dequeue() {
    if (this.head) {
      const value = this.head.value;
      this.head = this.head.next;
      return value;
    }
  }

  peek() {
    return this.head?.value;
  }
}

module.exports = { Queue };

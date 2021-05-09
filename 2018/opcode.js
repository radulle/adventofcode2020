class OpCode {
  #register
  #map

  constructor(size = 4) {
    this.#register = new Array(size).fill(0)
  }

  get register() {
    return this.#register
  }

  set register(registers) {
    this.#register = registers
  }

  get map() {
    return this.#map
  }

  set map(map) {
    this.#map = map
  }

  op = {
    /** addr (add register) stores into register C the result of adding register A and register B. */
    addr: (A, B, C) => {
      this.#register[C] = this.#register[A] + this.#register[B]
    },
    /** addi (add immediate) stores into register C the result of adding register A and value B. */
    addi: (A, B, C) => {
      this.#register[C] = this.#register[A] + B
    },
    /** mulr (multiply register) stores into register C the result of multiplying register A and register B. */
    mulr: (A, B, C) => {
      this.#register[C] = this.#register[A] * this.#register[B]
    },
    /** muli (multiply immediate) stores into register C the result of multiplying register A and value B. */
    muli: (A, B, C) => {
      this.#register[C] = this.#register[A] * B
    },
    /** banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B. */
    banr: (A, B, C) => {
      this.#register[C] = this.#register[A] & this.#register[B]
    },
    /** bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B. */
    bani: (A, B, C) => {
      this.#register[C] = this.#register[A] & B
    },
    /** borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B. */
    borr: (A, B, C) => {
      this.#register[C] = this.#register[A] | this.#register[B]
    },
    /** bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B. */
    bori: (A, B, C) => {
      this.#register[C] = this.#register[A] | B
    },
    /** setr (set register) copies the contents of register A into register C. (Input B is ignored.) */
    setr: (A, _, C) => {
      this.#register[C] = this.#register[A]
    },
    /** seti (set immediate) stores value A into register C. (Input B is ignored.) */
    seti: (A, _, C) => {
      this.#register[C] = A
    },
    /** gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0. */
    gtir: (A, B, C) => {
      this.#register[C] = A > this.#register[B] ? 1 : 0
    },
    /** gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0. */
    gtri: (A, B, C) => {
      this.#register[C] = this.#register[A] > B ? 1 : 0
    },
    /** gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0. */
    gtrr: (A, B, C) => {
      this.#register[C] = this.#register[A] > this.#register[B] ? 1 : 0
    },
    /** eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0. */
    eqir: (A, B, C) => {
      this.#register[C] = A === this.#register[B] ? 1 : 0
    },
    /** eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0. */
    eqri: (A, B, C) => {
      this.#register[C] = this.#register[A] === B ? 1 : 0
    },
    /** eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0. */
    eqrr: (A, B, C) => {
      this.#register[C] = this.#register[A] === this.#register[B] ? 1 : 0
    },
  }
}

module.exports = OpCode

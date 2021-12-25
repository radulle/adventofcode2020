const { input, consoleTime } = require("lib");

// Input loops 14 times (once per each digit):
// inp w          w = digit_i
// mul x 0        .
// add x z        .
// mod x 26       . x = z % 26
// div z (-?\d+)  . z = z // a
// add x (-?\d+)  . x = z % 26 + b
// eql x w        . x = z % 26 + b === w ? 1 : 0
// eql x 0        . x = z % 26 + b !== w ? 1 : 0
// mul y 0        .
// add y 25       . y = 25
// mul y x        . y = 25 * x
// add y 1        . y = 25 * x + 1 => y = x + b !== w ? 26 : 1
// mul z y        . z = (z // a) * (z % 26 + b !== w ? 26 : 1)
// mul y 0        .
// add y w        . y = w
// add y (-?\d+)  . y = w + c
// mul y x        . y = x * (w + c)
// add z y        ! z = (z // a) * (z % 26 + b !== w ? 26 : 1) + (z % 26 + b !== w ? 1 : 0) * (w + c)

// only 2nd args on lines 4 (a), 5 (b) and 15 (c) change
// w: 1 <= w <= 9 (input digit)
// x & y: reset to 0 on each loop
// z: carries to next loop
// a: a = 1 | 26
// b: negative if a is 26, positive if a is 1;
//    Math.abs <= 15 (7 times negative, 7 times positive);
//    when positive always greater than 10
// c: 15 >= c >= 0

// a = 1: (b > 10 > w => (z % 26 + b !== w) === true)
// z = z * 26 + w + c

// a = 26: (b <= 0)
//   (z % 26 + b !== w) === true:
//   z = z // 26 * 26 + (w + c)
//   (z % 26 + b !== w) === false:
//   z = z // 26 * 1

// c <= 15 && w <= 9 => w + c < 26
// z = z * 26 + X => z.push(X)
// z = z // 26 => z.pop()

// a = 1:
// z.push(w + c)

// a = 26 && w === z.peak() + b:
// z.pop()

// w_i = w_j + c_j + b_i
//  a,  b,  c
//  1, 10, 13  push A => W13 = W0 - 10 + 13 => W13 = W0 + 3
//  1, 13, 10  push B => W12 = W1 - 13 + 10 => W12 = W1 - 3
//  1, 13,  3  push C => W3 = W2 - 11 + 3 => W3 = W2 - 8
// 26,-11,  1  pop  C
//  1, 11,  9  push D => W4 = W5 - 4 + 9 => W5 = W4 + 5
// 26, -4,  3  pop  D
//  1, 12,  5  push E => W11 = W6 - 11 + 5 => W11 = W6 - 6
//  1, 12,  1  push F => W10 = W7 - 5 + 1 => W10 = W7 - 4
//  1, 15,  0  push G => W9 = W8 - 2 + 0 => W9 = W8 - 2
// 26, -2, 13  pop  G
// 26, -5,  7  pop  F
// 26,-11, 15  pop  E
// 26,-13, 12  pop  B
// 26,-10,  8  pop  A

// max: 69914999975369, min: 14911675311114

consoleTime(() => {
  const params = [
    ...input().matchAll(
      /inp w\nmul x 0\nadd x z\nmod x 26\ndiv z (-?\d+)\nadd x (-?\d+)\neql x w\neql x 0\nmul y 0\nadd y 25\nmul y x\nadd y 1\nmul z y\nmul y 0\nadd y w\nadd y (-?\d+)\nmul y x\nadd z y/g
    ),
  ].map(([_, a, b, c]) => [+a, +b, +c]);

  const stack = [];
  const diffs = [];
  for (let i = 0; i < params.length; i++) {
    const [a, b, c] = params[i];
    if (a === 1) {
      stack.push([i, c]);
    } else {
      const [I, C] = stack.pop();
      diffs[i] = [I, C + b];
    }
  }

  const optimize = (order) => {
    const number = [];
    for (let i = 0; i < diffs.length; i++) {
      const diff = diffs[i];
      if (!diff) continue;
      for (let num of order) {
        const inv = num - diff[1];
        if (order.includes(inv)) {
          number[i] = num;
          number[diff[0]] = inv;
          break;
        }
      }
    }
    return +number.join("");
  };

  const order = [...Array(9).keys()].map((e) => e + 1).reverse();
  return { max: optimize(order), min: optimize(order.reverse()) };
});

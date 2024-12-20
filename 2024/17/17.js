const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input.trim().match(/\d+/gm).map(Number);
}

function process([A, B, C, ...prog]) {
  const ans1 = run(A, B, C, prog);

  const _prog = [...prog].reverse().join("");
  const ans2 = [];

  (function search(sum, pow) {
    for (let i = 0; i < 8; i++) {
      let _A = sum + Math.pow(8, pow) * i;
      (A = _A), (B = 0), (C = 0);
      let __prog = run(A, B, C, prog).reverse().join("");
      if (_prog === __prog) {
        ans2.push(_A);
      } else if (_prog.startsWith(__prog.substring(0, _prog.length - pow))) {
        search(_A, pow - 1);
      }
    }
  })(0, prog.length - 1);

  return [ans1.join(","), Math.min(...ans2)];
}

function run(A, B, C, prog) {
  const [adv, bxl, bst, jnz, bxc, out, bdv, cdv] = [0, 1, 2, 3, 4, 5, 6, 7];
  let ptr = 0;
  const output = [];

  while (ptr < prog.length) {
    let opcode = prog[ptr];
    let operand = prog[ptr + 1];

    const combo = (o) => (o === 4 ? A : o === 5 ? B : o === 6 ? C : o);

    switch (opcode) {
      case adv:
        A = Math.floor(A / 2 ** combo(operand));
        break;
      case bxl:
        B = Math.abs(B ^ operand);
        break;
      case bst:
        B = combo(operand) % 8;
        break;
      case jnz:
        if (A === 0) break;
        ptr = operand;
        continue;
      case bxc:
        B = B ^ C;
        break;
      case out:
        output.push(combo(operand) % 8);
        break;
      case bdv:
        B = Math.floor(A / 2 ** combo(operand));
        break;
      case cdv:
        C = Math.floor(A / 2 ** combo(operand));
        break;
    }

    ptr += 2;
  }

  return output;
}

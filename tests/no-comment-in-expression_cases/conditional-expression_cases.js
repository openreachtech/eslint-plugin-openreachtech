// @ts-check
'use strict'

module.exports = {
  expression: 'conditional expression',
  validCodes: [
    `
      const test = // line comment
        a > 0 ? a : -a
    `,
    `
      const test = a > 0 ? a : -a // line comment
    `,
    `
      const test = // line comment
        x > 0 ? 1 : (x=0 ? -1 : 2)
    `,
    `
      const test = x > 0 ? 1 : (x=0 ? -1 : 2) // line comment
    `,
    `
      condition
        ? (foo())
        : (caf()) /** block comment */
    `,
    `
      function example(x, y, z) {
        return x > 0 ? value1
            : y > 0 ? value2
            : z > 0 ? value3
            : value4 // line comment
      }
    `,
  ],
  invalidCodes: [
    `
      const test = a // line comment
        > 0 // line comment
        ? // line comment
        a: // line comment
        -a
    `,
    `
      const test =x > 0
        ? 1
        : (x=0
          ? - //line comment
          1
          : 2)
    `,
    `
      const test = x // line comment
        > 0 // line comment
        ? // line comment
        1: // line comment
        ( // line comment
          x = 0 // line comment
          ? // line comment
          -1 : // line comment
          2 // line comment
        )
    `,
    `
      const test = x > 0 /* this is
                        * a
                        * block comment
                        */
        ? 1 : (x=0 ? -1 : 2)
    `,
    `
      condition
        ? foo(/* block comment */)
        : baz()
    `,
    `
      function example(x, y, z) {
        return x > 0 ? value1 // line comment
            : y > 0 ? value2 // line comment
            : z > 0 ? value3 /** this is
                              * a block comment
                              */
            : value4
      }
    `,
  ],
}

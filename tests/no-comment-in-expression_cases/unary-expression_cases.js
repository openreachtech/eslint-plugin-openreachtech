// @ts-check
'use strict'

module.exports = {
  expression: 'unary expression',
  validCodes: [
    `
      const x = +1 // line comment
    `,
    `
      const x = '123'
      const y = +x // line comment
    `,
    `
      const x = true
      const y = // line comment
        +x
    `,
    `
      const x = null
      const y = +x /* block comment */
    `,
    `
      const x = undefined
      const y = +x /* block comment */
    `,
    `
      const x = '123'
      const y = -x // line comment
    `,
    `
      const x = true // line comment
      const y = -x // line comment
    `,
    `
      !x // line comment
    `,
    `
      ~x /* block comment */
    `,
    `
      typeof x // line comment
    `,
    `
      void x // line comment
    `,
    `
      delete 1 /* block comment */
    `,
    `
      const y = +(a - 1) // line comment
    `,
    `
      const y = +
      (a
          + b
          * c
      )
      / d // line comment
    `,
    `
      const x = +(-(a + b)) /* block comment */
    `,
    `
      const result = -(foo(a + b)
      + c)
      /* this is
       * a variable
       */
    `,
    `
      const result = -(Math
      .max(a ** b, c * d)
      / c + 8) // line comment
    `,
    `
      if (!(number < 5 || number > 10)) {
      console.log(1, number) // line comment
    }
    `,
    `
      if (+(first
      || second
      && third) > 0
      ) {
      console.log(11, first, second, third)
      } // line comment
    `,
  ],
  invalidCodes: [
    `
      const x = + // line comment
      1
    `,
    `
      const x = '123'
      const y = + // line comment
      x
    `,
    `
      const x = true
      const y = + // line comment
      x
    `,
    `
      const x = null
      const y = + /* block comment */
      x
    `,
    `
      const x = undefined
      const y = + /*
                   * this is
                   * a block
                   * comment
                   */
      x
    `,
    `
      const x = '123'
      const y = - // line comment
      x
    `,
    `
      const x = true
      const y = - // line comment
      x
    `,
    `
      ! /* block comment */ x
    `,
    `
      ~ /* block comment */ x
    `,
    `
      typeof /*
              * this is
              * a block comment
              */
      x
    `,
    `
      void /* block comment */ x
    `,
    `
      delete /* block comment */ o.p
    `,
    `
      const y = + // line comment
      (a // line comment
      - 1)
    `,
    `
      const y = - // line comment
      (a /*
          * this is
          * a block comment
          */
      + b // line comment
      * c) // line comment
      / d
    `,
    `
      const x = + // line comment
      (-(a // line comment
          + b // line comment
      ))
    `,
    `
      const result = -( // line comment
      foo(a + b)
          + c // line comment
      )
    `,
    `
      const result = -( // line comment
      Math
      .max(a ** b, c * d)
      / c + 8 // line comment
      )
    `,
    `
      if (!( // line comment
      number < 5 || number > 10) // line comment
      ) {
      console.log(1, number)
      }
    `,
    `
      const n = -(
      first
          || second
          && third // line comment
      ? foo() * s
      : bar  // line comment
      )
    `,
  ]
}

'use strict'

module.exports = {
  expression: 'binary expression',
  validCodes: [
    `
      const result = a
        + b // comment
    `,
    `
      const result =  // comment
        a
        + b
    `,
    `
      const result = a
        + b
        * c
        /** This
         * is a
         * comment
         */
    `,
    `
      const result = foo(a)
        + b // comment
    `,
    `
      const result = a
        + foo(b)
        /** this is
         * a function
         */
    `,
    `
      const result = foo(a + b)
        + c
        /* this is
        * a variable
        */
    `,
    `
      const result =
        /**
         * this is
         * a comment
         */
        foo(a + b)
        + c // comment
    `,
    `
      const result = Math
        .max(a ** b, c * d)
        / c //comment
    `,
  ],
  invalidCodes: [
    `
      const result = a // comment
        + b
    `,
    `
      const result = a
        /** This
         * is a
         * comment
         */
        + b // comment
        * c
    `,
    `
      const result = foo(a) // comment
        + b
    `,
    `
      const result = a
        /** this is
         * a variable
         */
        + foo(b)
    `,
    `
      const result = foo(a + b)
        /* this is a
        * function
        */
        + c
    `,
    `
      const result =
        foo(a + b)
        /** this is
         * a function
         */
        + c // comment
    `,
    `
      const result =
        foo( // comment
        a
        + b // comment
        )
        /** this is
         * a function
         */
        + c // comment
    `,
    `
      const result = Math //comment
        .max(a ** b, /* note!!! */ c * d) //comment
        / d
    `,
    `
      f(-(a + /* comment here */ b)) + c
    `,
    `
      f(isOdd ? /* comment here */ (a + b) : (a * b)) + c
    `,
    `
      const answer =
        (-5 + Math.pow(7 ** 2 // comment
        - 4 * a * 9)) // comment
        / (2 // comment
        * a)
    `,
    `
      const t = f((a + /* comment here 1 */ b) > 0 && (a /* comment here 2 */ * b) < 0) + c
    `,
    `
      const answer =
             (-b + Math.pow(b ** 2 - 4 * a * c)) // comment
        / // ----------------------------------------
             (2 * a)
    `,
  ],
}

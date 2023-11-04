'use strict'

module.exports = {
  expression: 'logical expression',
  validCodes: [
    `
      if ( // comment
        first
        || second
      ) {
        console.log(1, first, second)
      }
    `,
    `
      if (first
        || second
        && third // comment
      ) {
        console.log(11, first, second, third)
      }
    `,
    `
      if (first
        || second
        && third
        /* this is
         * a comment
         */
      ) {
        console.log(11, first, second, third)
      }
    `,
  ],
  invalidCodes: [
    `
      if (first // comment
        || second
      ) {
        console.log(1, first, second)
      }
    `,
    `
      if (first // comment
        || second // comment
        && third
      ) {
        console.log(11, first, second, third)
      }
    `,
    `
      if (first /* this is a comment */
        || second /** this is a comment */
        && third
      ) {
        console.log(11, first, second, third)
      }
    `,
    `
      if (
        (a + b) > 0 // comment here
        && (a * /* block */ b) < 0
        || isValid(m
           /**
            * block
            */
          )
      ) {
        foo()
      }
    `,
  ],
}

// @ts-check
'use strict'

const ESLintHelper = require('../tools/ESLintHelper')
const ruleBody = require('../../lib/no-comment-in-expression')

describe('Prohibiting comments in binary expression or logic expression.', () => {
  const name = 'no-comment-in-expression'
  const tester = ESLintHelper.createTester()

  const groups = [
    {
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
      ]
    },
    {
      expression: 'logic expression',
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
      ]
    },
  ]

  describe.each(groups)('$expression', ({ validCodes, invalidCodes }) => {
    tester.run(
      name,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors: [{ messageId: 'errorMessage' }]}))
      }
    )
  })
})

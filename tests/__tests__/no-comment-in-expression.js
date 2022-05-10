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
      ]
    },
    {
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

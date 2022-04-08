// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../tools/ESLintHelper').createTester()

/** @type {Function|Object} */
const ruleBody = require('../../lib/multiline-indent-in-logical-expression')

const ruleName = 'multiline-indent-in-logical-expression'

describe('multiline indent in infix operator expression', () => {
  describe('valid code only', () => {
    const validCodes = [
      `
      if (first
        || second
      ) {
        console.log(1, first, second)
      }
      `,
      `
      if (
        first
        || second
      ) {
        console.log(2, first, second)
      }
      `,
      `
      if (first
        || second
        || third
      ) {
        console.log(11, first, second, third)
      }
      `,
      `
      if (
        first
        || second
        || third
      ) {
        console.log(22, first, second, third)
      }
      `,
      `
      function test (xxx) {
        return xxx
          || 999
      }
      `,
      `
      function test (xxx) {
        const result =
          xxx
          || 999

        return result
      }
      `,
    ]

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      ruleName,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: [],
      }
    )
  })

  describe('must indent', () => {
    const invalidCodes = [
      [
        [
          `
          const result = leftOperand
          || 1
          `,
          `
            const result = leftOperand
          || 1
          `,
          `
          function getEnv () {
            return this.env.NODE_ENV
            || 'aaaa' // <---------------- should error
          }
          `,
          `
          if (first
          || second
          ) {
            save(first, second, third)
          }
          `,
          `
            if (first
          || second
            ) {
              save(first, second)
            }
          `,
          `
          function test (xxx) {
            const zzz = xxx
            || 999 // <---------------- should error

            return zzz
          }
          `,
        ],
        [
          'Must indent second line of infix expression, when chopped down before "||" operator.'
        ]
      ],
      [
        [
          `
          const result = leftOperand
          && 11
          `,
          `
            const result = leftOperand
          && 11
          `,
        ],
        [
          'Must indent second line of infix expression, when chopped down before "&&" operator.'
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must align indent left-right operands', () => {
    const invalidCodes = [
      [
        [
          `
          if (
            first
          || second
          ) {
            save(first, second)
          }
          `,
          `
          if (
            first
              || second
          ) {
            save(first, second)
          }
          `,
          `
          if (
          first
            || second
          ) {
            save(first, second)
          }
          `,
          `
            if (
          first
            || second
            ) {
              save(first, second)
            }
          `,
          `
          function test (xxx) {
            const zzz =
              xxx
            || 999 // <---------------- should error

            return zzz
          }
          `,
        ],
        [
          'Must align indent before "||" operator to left-operand, when chopped down before left-operand of infix expression.'
        ]
      ]
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must align indent of operator in nested expressions', () => {
    const invalidCodes = [
      [
        [
          `
          if (first
            || second
              && third
          ) {
            console.log(first, second, third)
          }`,
          `
          if (first
              || second
            && third
          ) {
            console.log(first, second, third)
          }`,
          `
          if (
            first
            || second
              && third
          ) {
            console.log(first, second, third)
          }`,
          `
          if (
            first
            || second
          && third
          ) {
            console.log(first, second, third)
          }
          `,
        ],
        [
          'Must align operator in nested infix expressions, when chopped down before "&&" operator.'
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must align indent left-right operands (x2)', () => {
    const invalidCodes = [
      [
        [
          `
          if (
            first
          || second
          && third
          ) {
            console.log(first, second, third)
          }
          `,
          `
            if (
              first
          || second
          && third
            ) {
              console.log(first, second, third)
            }
          `,
        ],
        [
          'Must align indent before "||" operator to left-operand, when chopped down before left-operand of infix expression.',
          'Must align indent before "&&" operator to left-operand, when chopped down before left-operand of infix expression.',
        ]
      ]
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('shortage indent && align each right operand', () => {
    const invalidCodes = [
      [
        [
          `
          if (first
          || second
              && third
          ) {
            console.log(first, second, third)
          }
          `,
          `
          if (first
          || second
            && third
          ) {
            console.log(first, second, third)
          }
          `,
          `
            if (first
          || second
            && third
            ) {
              console.log(first, second, third)
            }
          `,
          `
            if (first
            || second
          && third
            ) {
              console.log(first, second, third)
            }
          `,
        ],
        [
          'Must indent second line of infix expression, when chopped down before "||" operator.',
          'Must align operator in nested infix expressions, when chopped down before "&&" operator.',
        ]
      ]
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('shortage indent && nested left-right', () => {
    const invalidCodes = [
      [
        [
          `
          if (first
          || second
          && third
          ) {
            console.log(first, second, third)
          }
          `,
          `
            if (first
          || second
          && third
            ) {
              console.log(first, second, third)
            }
          `,
        ],
        [
          'Must indent second line of infix expression, when chopped down before "||" operator.',
          'Must align indent before "&&" operator to left-operand, when chopped down before left-operand of infix expression.',
        ]
      ]
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('align left operand to right operand && align each right operand', () => {
    const invalidCodes = [
      [
        [
          `
          if (
            first
              || second
            && third
          ) {
            console.log(first, second, third)
          }`,
          `
          if (
            first
          || second
            && third
          ) {
            console.log(first, second, third)
          }
          `,
          `
            if (
              first
          || second
            && third
            ) {
              console.log(first, second, third)
            }
          `,
        ],
        [
          'Must align indent before "||" operator to left-operand, when chopped down before left-operand of infix expression.',
          'Must align operator in nested infix expressions, when chopped down before "&&" operator.',
        ]
      ]
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })
})

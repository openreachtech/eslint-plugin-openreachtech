// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../tools/ESLintHelper').createTester()

/** @type {Function|Object} */
const ruleBody = require('../../lib/multiline-indent-in-logical-expression')

const ruleName = 'multiline-indent-in-logical-expression'
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
]

describe(ruleName, () => {
  describe('valid code only', () => {
    // tester.run([rule name], [rule defination], [test patterns])
    tester.run(
      ruleName,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: [],
      }
    )
  })

  describe('simple indent error (single)', () => {
    const invalidCodes = [
      [
        [
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
            const zzz = xxx
            || 999 // <---------------- should error

            return zzz
          }
          `,
        ],
        ['When chopping down by infix operator as "||", it requires indentation after the second line.']
      ],
    ]

    // tester.run([rule name], [rule defination], [test patterns])
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

  describe('indent of right operand', () => {
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
        ['Different indent of right operand vertically by infix operator as "&&".']
      ],
    ]

    // tester.run([rule name], [rule defination], [test patterns])
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

  describe('simple indent error (double)', () => {
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
          'When chopping down by infix operator as "||", it requires indentation after the second line.',
          'When chopping down by infix operator as "&&", it requires indentation after the second line.',
        ]
      ],
    ]

    // tester.run([rule name], [rule defination], [test patterns])
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

  describe('simple indent error (complex)', () => {
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
          'When chopping down by infix operator as "||", it requires indentation after the second line.',
          'Different indent of right operand vertically by infix operator as "&&".',
        ]
      ],
    ]

    // tester.run([rule name], [rule defination], [test patterns])
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

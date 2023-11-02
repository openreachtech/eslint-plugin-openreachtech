'use strict'

const ESLintHelper = require('../tools/ESLintHelper')
const ruleBody = require('../../lib/no-unexpected-multiline')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('no-unexpected-multiline', () => {
  describe('default options and { indent: 2 }', () => {
    const options = [{ indent: 2 }]

    const validCodes = [
      // ---------------------- - operator
      'var THINGS_TO_EAT = [apples, oysters, sprayOnCheese] - 1',
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]
        - 1
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]
        -1
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

      // bash-like conditional statements
        -1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

      // bash-like conditional statements
      ; -1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese];

      // bash-like conditional statements
      -1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese];

      // bash-like conditional statements
        -1 == resultOfOperation() || die()
      `,

      // ---------------------- + operator
      'var THINGS_TO_EAT = [apples, oysters, sprayOnCheese] + 1',
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]
        + 1
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]
        +1
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

      // bash-like conditional statements
        +1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

      // bash-like conditional statements
      ; +1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese];

      // bash-like conditional statements
      +1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese];

      // bash-like conditional statements
        +1 == resultOfOperation() || die()
      `,
    ].map(code => ({ code }))

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        [
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              -1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              ; -1 == resultOfOperation() || die();`,
          },
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              - 1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              ; - 1 == resultOfOperation() || die();`,
          },
        ],
        ['no unexpected multiline in "-" expression.'],
      ],
      [
        [
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              +1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              ; +1 == resultOfOperation() || die();`,
          },
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              + 1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              ; + 1 == resultOfOperation() || die();`,
          },
        ],
        ['no unexpected multiline in "+" expression.'],
      ],
    ])

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      'no options',
      ruleBody,
      {
        valid: validCodes,
        invalid: invalidCases,
      }
    )

    tester.run(
      'options as { indent: 2 }',
      ruleBody,
      {
        valid: validCodes.map(it => ({ ...it, options })),
        invalid: invalidCases.map(it => ({ ...it, options })),
      }
    )
  })

  describe('default options and { indent: 4 }', () => {
    const options = [{ indent: 4 }]

    const validCodes = [
      // ---------------------- - operator
      'var THINGS_TO_EAT = [apples, oysters, sprayOnCheese] - 1',
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]
          - 1
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]
          -1
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

      // bash-like conditional statements
          -1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

      // bash-like conditional statements
      ; -1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese];

      // bash-like conditional statements
      -1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese];

      // bash-like conditional statements
          -1 == resultOfOperation() || die()
      `,

      // ---------------------- + operator
      'var THINGS_TO_EAT = [apples, oysters, sprayOnCheese] + 1',
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]
          + 1
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]
          +1
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

      // bash-like conditional statements
          +1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

      // bash-like conditional statements
      ; +1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese];

      // bash-like conditional statements
      +1 == resultOfOperation() || die()
      `,
      `
      var THINGS_TO_EAT = [apples, oysters, sprayOnCheese];

      // bash-like conditional statements
          +1 == resultOfOperation() || die()
      `,
    ].map(code => ({ code }))

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        [
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              -1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              ; -1 == resultOfOperation() || die();`,
          },
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              - 1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              ; - 1 == resultOfOperation() || die();`,
          },
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

                // bash-like conditional statements
                -1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

                // bash-like conditional statements
                ; -1 == resultOfOperation() || die();`,
          },
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

                // bash-like conditional statements
                - 1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

                // bash-like conditional statements
                ; - 1 == resultOfOperation() || die();`,
          },
        ],
        ['no unexpected multiline in "-" expression.'],
      ],
      [
        [
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              +1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              ; +1 == resultOfOperation() || die();`,
          },
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              + 1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

              // bash-like conditional statements
              ; + 1 == resultOfOperation() || die();`,
          },
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

                // bash-like conditional statements
                +1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

                // bash-like conditional statements
                ; +1 == resultOfOperation() || die();`,
          },
          {
            code: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

                // bash-like conditional statements
                + 1 == resultOfOperation() || die();`,
            output: `
              var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

                // bash-like conditional statements
                ; + 1 == resultOfOperation() || die();`,
          },
        ],
        ['no unexpected multiline in "+" expression.'],
      ],
    ])

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      'options as { indent: 4 }',
      ruleBody,
      {
        valid: validCodes.map(it => ({ ...it, options })),
        invalid: invalidCases.map(it => ({ ...it, options })),
      }
    )
  })
})

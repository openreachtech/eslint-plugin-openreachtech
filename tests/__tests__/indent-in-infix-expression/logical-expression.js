// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../../tools/ESLintHelper').createTester()

/** @type {Function|Object} */
const ruleBody = require('../../../lib/indent-in-infix-expression')

const ruleName = 'indent-in-logical-expression'

describe('LogicalExpression', () => {
  describe('\\n before operator', () => {
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

    describe('Must add indent (x1)', () => {
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
          [
            'Must add indent before "||".',
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
            'Must add indent before "&&".',
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

    describe('Must remove indent (x1)', () => {
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
            function test (xxx) {
              const zzz =
                xxx
                  || 999 // <---------------- should error

              return zzz
            }
            `,
          ],
          [
            'Must remove indent before "||".',
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

    describe('Must add indent (x1), Must remove indent (x1)', () => {
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
                && second
            || third
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
            if (first
                  && second
            || third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (first
                  && second
          || third
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
                && second
            || third
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
                  && second
            || third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (
              first
                  && second
          || third
            ) {
              console.log(first, second, third)
            }`,
          ],
          [
            'Must add indent before "||".',
            'Must remove indent before "&&".',
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

    describe('three errors', () => {
      const invalidCodes = [
        [
          [
            `
            if (first
                || second
            && third
            || fourth
            ) {
              console.log(first, second, third, fourth)
            }`,
            `
            if (
              first
                || second
            && third
            || fourth
            ) {
              console.log(first, second, third, fourth)
            }
            `,
          ],
          [
            'Must add indent before "||".',
            'Must remove indent before "||".',
            'Must add indent before "&&".',
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

  describe('\\n before right operand', () => {
    describe('valid code only', () => {
      const validCodes = [
        `
        if (first ||
          second
        ) {
          console.log(1, first, second)
        }
        `,
        `
        if (
          first ||
          second
        ) {
          console.log(2, first, second)
        }
        `,
        `
        if (first ||
          second ||
          third
        ) {
          console.log(11, first, second, third)
        }
        `,
        `
        if (
          first ||
          second ||
          third
        ) {
          console.log(22, first, second, third)
        }
        `,
        `
        function test (xxx) {
          return xxx ||
            999
        }
        `,
        `
        function test (xxx) {
          const result =
            xxx ||
            999

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

    describe('Must add indent (x1)', () => {
      const invalidCodes = [
        [
          [
            `
            const result = leftOperand ||
            1
            `,
            `
              const result = leftOperand ||
            1
            `,
            `
            function getEnv () {
              return this.env.NODE_ENV ||
              'aaaa' // <---------------- should error
            }
            `,
            `
            if (first ||
            second
            ) {
              save(first, second, third)
            }
            `,
            `
              if (first ||
            second
              ) {
                save(first, second)
              }
            `,
            `
            if (
              first ||
            second
            ) {
              save(first, second)
            }
            `,
            `
            function test (xxx) {
              const zzz = xxx ||
              999 // <---------------- should error

              return zzz
            }
            `,
          ],
          [
            'Must add indent before right operand of "||".',
          ]
        ],
        [
          [
            `
            const result = leftOperand &&
            11
            `,
            `
              const result = leftOperand &&
            11
            `,
          ],
          [
            'Must add indent before right operand of "&&".',
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

    describe('Must remove indent (x1)', () => {
      const invalidCodes = [
        [
          [
            `
            if (
              first ||
                second
            ) {
              save(first, second)
            }
            `,
            `
            if (
            first ||
              second
            ) {
              save(first, second)
            }
            `,
            `
              if (
            first ||
              second
              ) {
                save(first, second)
              }
            `,
            `
            function test (xxx) {
              const zzz =
                xxx ||
                  999 // <---------------- should error

              return zzz
            }
            `,
          ],
          [
            'Must remove indent before right operand of "||".',
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

    describe('Must add indent (x1), Must remove indent (x1)', () => {
      const invalidCodes = [
        [
          [
            `
            if (first ||
            second &&
                third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (first &&
                second ||
            third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (first ||
          second &&
                third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (first &&
                  second ||
            third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (first &&
                  second ||
          third
            ) {
              console.log(first, second, third)
            }`,

            `
            if (
              first ||
            second &&
                third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (
              first &&
                second ||
            third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (
              first ||
          second &&
                third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (
              first &&
                  second ||
            third
            ) {
              console.log(first, second, third)
            }`,
            `
            if (
              first &&
                  second ||
          third
            ) {
              console.log(first, second, third)
            }`,
          ],
          [
            'Must add indent before right operand of "||".',
            'Must remove indent before right operand of "&&".',
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

    describe('three errors', () => {
      const invalidCodes = [
        [
          [
            `
            if (first ||
                second &&
            third ||
            fourth
            ) {
              console.log(first, second, third, fourth)
            }`,
            `
            if (
              first ||
                second &&
            third ||
            fourth
            ) {
              console.log(first, second, third, fourth)
            }
            `,
          ],
          [
            'Must add indent before right operand of "||".',
            'Must remove indent before right operand of "||".',
            'Must add indent before right operand of "&&".',
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
})

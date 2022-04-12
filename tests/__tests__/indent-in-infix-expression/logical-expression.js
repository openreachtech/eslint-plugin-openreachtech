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
          valid: validCodes.map(code => ({ code, output: code })),
          invalid: [],
        }
      )
    })

    describe('Must add indent (x1)', () => {
      const invalidCases = [
        [
          [
            {
              code: `
                const result = leftOperand
                || 1
              `,
              output: `
                const result = leftOperand
                  || 1
              `,
            },
            {
              code: `
                const result = leftOperand
              || 1
              `,
              output: `
                const result = leftOperand
                  || 1
              `,
            },
            {
              code: `
              function getEnv () {
                return this.env.NODE_ENV
                || 'aaaa' // <---------------- should error
              }
              `,
              output: `
              function getEnv () {
                return this.env.NODE_ENV
                  || 'aaaa' // <---------------- should error
              }
              `,
            },
            {
              code: `
              if (first
              || second
              ) {
                save(first, second, third)
              }
              `,
              output: `
              if (first
                || second
              ) {
                save(first, second, third)
              }
              `,
            },
            {
              code: `
                if (first
              || second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (first
                  || second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                if (
                  first
                || second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (
                  first
                  || second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                function test (xxx) {
                  const zzz = xxx
                  || 999 // <---------------- should error

                  return zzz
                }
              `,
              output: `
                function test (xxx) {
                  const zzz = xxx
                    || 999 // <---------------- should error

                  return zzz
                }
              `,
            },
          ],
          [
            'Must add indent before "||".',
          ]
        ],
        [
          [
            {
              code: `
              const result = leftOperand
              && 11
              `,
              output: `
              const result = leftOperand
                && 11
              `,
            },
            {
              code: `
                const result = leftOperand
              && 11
              `,
              output: `
                const result = leftOperand
                  && 11
              `,
            },
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
          invalid: invalidCases.flatMap(([patterns, errors]) =>
            patterns.map(it => ({ ...it, errors }))
          ),
        }
      )
    })

    describe('Must remove indent (x1)', () => {
      const invalidCases = [
        [
          [
            {
              code: `
                if (
                  first
                    || second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (
                  first
                  || second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                if (
                first
                  || second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (
                first
                || second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                if (
              first
                || second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (
              first
              || second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
              function test (xxx) {
                const zzz =
                  xxx
                    || 999 // <---------------- should error

                return zzz
              }
              `,
              output: `
              function test (xxx) {
                const zzz =
                  xxx
                  || 999 // <---------------- should error

                return zzz
              }
              `,
            },
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
          invalid: invalidCases.flatMap(([patterns, errors]) =>
            patterns.map(it => ({ ...it, errors }))
          ),
        }
      )
    })

    describe('Must add indent (x1), Must remove indent (x1)', () => {
      const invalidCases = [
        [
          [
            {
              code: `
                if (first
                || second
                    && third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (first
                  || second
                  && third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (first
                    && second
                || third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (first
                  && second
                  || third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (first
              || second
                    && third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (first
                  || second
                  && third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (first
                      && second
                || third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (first
                  && second
                  || third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (first
                      && second
              || third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (first
                  && second
                  || third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first
                || second
                    && third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (
                  first
                  || second
                  && third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first
                    && second
                || third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (
                  first
                  && second
                  || third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first
              || second
                    && third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (
                  first
                  || second
                  && third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first
                      && second
                || third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (
                  first
                  && second
                  || third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first
                      && second
              || third
                ) {
                  console.log(first, second, third)
                }`,
              output: `
                if (
                  first
                  && second
                  || third
                ) {
                  console.log(first, second, third)
                }`,
            },
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
          invalid: invalidCases.flatMap(([patterns, errors]) =>
            patterns.map(it => ({ ...it, errors }))
          ),
        }
      )
    })

    describe('three errors', () => {
      const invalidCases = [
        [
          [
            {
              code: `
                if (first
                    || second
                && third
                || fourth
                ) {
                  console.log(first, second, third, fourth)
                }`,
              output: `
                if (first
                  || second
                  && third
                  || fourth
                ) {
                  console.log(first, second, third, fourth)
                }`,
            },
            {
              code:
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
              output:
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
            },
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
          invalid: invalidCases.flatMap(([patterns, errors]) =>
            patterns.map(it => ({ ...it, errors }))
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
      const invalidCases = [
        [
          [
            {
              code: `
                const result = leftOperand ||
                1
              `,
              output: `
                const result = leftOperand ||
                  1
              `,
            },
            {
              code: `
              const result = leftOperand ||
            1
            `,
              output: `
              const result = leftOperand ||
                1
            `,
            },
            {
              code: `
                function getEnv () {
                  return this.env.NODE_ENV ||
                  'aaaa' // <---------------- should error
                }
              `,
              output: `
                function getEnv () {
                  return this.env.NODE_ENV ||
                    'aaaa' // <---------------- should error
                }
              `,
            },
            {
              code: `
                if (first ||
                second
                ) {
                  save(first, second, third)
                }
              `,
              output: `
                if (first ||
                  second
                ) {
                  save(first, second, third)
                }
              `,
            },
            {
              code: `
                if (first ||
              second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (first ||
                  second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                if (
                  first ||
                second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (
                  first ||
                  second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                function test (xxx) {
                  const zzz = xxx ||
                  999 // <---------------- should error

                  return zzz
                }
              `,
              output: `
                function test (xxx) {
                  const zzz = xxx ||
                    999 // <---------------- should error

                  return zzz
                }
              `,
            },
          ],
          [
            'Must add indent before right operand of "||".',
          ]
        ],
        [
          [
            {
              code: `
                const result = leftOperand &&
                11
              `,
              output: `
                const result = leftOperand &&
                  11
              `,
            },
            {
              code: `
                const result = leftOperand &&
              11
              `,
              output: `
                const result = leftOperand &&
                  11
              `,
            },
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
          invalid: invalidCases.flatMap(([patterns, errors]) =>
            patterns.map(it => ({ ...it, errors }))
          ),
        }
      )
    })

    describe('Must remove indent (x1)', () => {
      const invalidCases = [
        [
          [
            {
              code: `
                if (
                  first ||
                    second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (
                  first ||
                  second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                if (
                first ||
                  second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (
                first ||
                second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                if (
              first ||
                second
                ) {
                  save(first, second)
                }
              `,
              output: `
                if (
              first ||
              second
                ) {
                  save(first, second)
                }
              `,
            },
            {
              code: `
                function test (xxx) {
                  const zzz =
                    xxx ||
                      999 // <---------------- should error

                  return zzz
                }
              `,
              output: `
                function test (xxx) {
                  const zzz =
                    xxx ||
                    999 // <---------------- should error

                  return zzz
                }
              `,
            },




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
          invalid: invalidCases.flatMap(([patterns, errors]) =>
            patterns.map(it => ({ ...it, errors }))
          ),
        }
      )
    })

    describe('Must add indent (x1), Must remove indent (x1)', () => {
      const invalidCases = [
        [
          [
            {
              code: `
                if (first ||
                second &&
                    third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (first ||
                  second &&
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (first &&
                    second ||
                third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (first &&
                  second ||
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (first ||
              second &&
                    third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (first ||
                  second &&
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (first &&
                      second ||
                third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (first &&
                  second ||
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (first &&
                      second ||
              third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (first &&
                  second ||
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first ||
                second &&
                    third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (
                  first ||
                  second &&
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first &&
                    second ||
                third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (
                  first &&
                  second ||
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first ||
              second &&
                    third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (
                  first ||
                  second &&
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first &&
                      second ||
                third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (
                  first &&
                  second ||
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
            {
              code: `
                if (
                  first &&
                      second ||
              third
                ) {
                  console.log(first, second, third)
                }`,
              output :`
                if (
                  first &&
                  second ||
                  third
                ) {
                  console.log(first, second, third)
                }`,
            },
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
          invalid: invalidCases.flatMap(([patterns, errors]) =>
            patterns.map(it => ({ ...it, errors }))
          ),
        }
      )
    })

    describe('three errors', () => {
      const invalidCases = [
        [
          [
            {
              code: `
                if (first ||
                    second &&
                third ||
                fourth
                ) {
                  console.log(first, second, third, fourth)
                }`,
              output: `
                if (first ||
                  second &&
                  third ||
                  fourth
                ) {
                  console.log(first, second, third, fourth)
                }`,
            },
            {
              code: `
                if (
                  first ||
                    second &&
                third ||
                fourth
                ) {
                  console.log(first, second, third, fourth)
                }
                `,
              output :`
                if (
                  first ||
                  second &&
                  third ||
                  fourth
                ) {
                  console.log(first, second, third, fourth)
                }
                `,
            },

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
          invalid: invalidCases.flatMap(([patterns, errors]) =>
            patterns.map(it => ({ ...it, errors }))
          ),
        }
      )
    })
  })
})

// @ts-check
'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')

/** @type {Function | object} */
const ruleBody = require('../../../lib/indent-in-infix-expression')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()
const ruleName = 'indent-in-logical-expression'

describe('LogicalExpression', () => {
  describe('default options as { indent: 2 }', () => {
    const options = [{ indent: 2 }]

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

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: validCodes.map(code => ({ code, options })),
            invalid: [],
          }
        )
      })

      describe('Must add indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases,
          }
        )

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases,
          }
        )

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('Must add indent (x1), Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases,
          }
        )

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('three errors', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases,
          }
        )

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
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

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: validCodes.map(code => ({ code, options })),
            invalid: [],
          }
        )
      })

      describe('Must add indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases,
          }
        )

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases,
          }
        )

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('Must add indent (x1), Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases,
          }
        )

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('three errors', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
                output: `
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases,
          }
        )

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })
    })
  })

  describe('options: { indent: 4 }', () => {
    const options = [{ indent: 4 }]

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
            valid: validCodes.map(code => ({
              code,
              options,
              output: code,
            })),
            invalid: [],
          }
        )
      })

      describe('Must add indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('Must add indent (x1), Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('three errors', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
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
            valid: validCodes.map(code => ({
              code,
              options,
              output: code,
            })),
            invalid: [],
          }
        )
      })

      describe('Must add indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('Must add indent (x1), Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
                output: `
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })

      describe('three errors', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
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
                output: `
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
            ],
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases.map(it => ({ ...it, options })),
          }
        )
      })
    })
  })

  describe('cancel to remove by interrupting comment', () => {
    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        [
          `
          if (first
              /* comment here */ || second
          ) {
            console.log(1, first, second)
          }
          `,
          `
          if (first
            /*
             * comment here
             */ || second
          ) {
            console.log(1, first, second)
          }
          `,
          `
          if (first
              /*
               * comment here
               */ || second
          ) {
            console.log(1, first, second)
          }
          `,
        ].map(code => ({ code })),
        [
          'Must remove indent before "||".',
        ],
      ],
      [
        [
          `
          if (first ||
              /* comment here */ second
          ) {
            console.log(1, first, second)
          }
          `,
          `
          if (first ||
            /*
             * comment here
             */ second
          ) {
            console.log(1, first, second)
          }
          `,
          `
          if (first ||
              /*
               * comment here
               */ second
          ) {
            console.log(1, first, second)
          }
          `,
        ].map(code => ({ code })),
        [
          'Must remove indent before right operand of "||".',
        ],
      ],
    ])

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCases,
      }
    )
  })
})

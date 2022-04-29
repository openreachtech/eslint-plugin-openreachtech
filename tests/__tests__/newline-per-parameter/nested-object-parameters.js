'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-argument', () => {
  const errors = ['Require to chop down per argument.']

  describe('nested object arguments', () => {
    const validCases = []
      .concat([
        {
          code: `
            function method ({
              firstArgument,
              secondArgument: {
                thirdArgument,
                fourthArgument,
              }
            }) {
              return firstArgument + thirdArgument + fourthArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstArgument,
              secondArgument: {
                thirdArgument,
                fourthArgument,
              }
            }) {
              return firstArgument + thirdArgument + fourthArgument * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstArgument,
              secondArgument: {
                thirdArgument,
                fourthArgument,
              }
            }) => {
              return firstArgument + thirdArgument + fourthArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstArgument,
                secondArgument: {
                  thirdArgument,
                  fourthArgument,
                }
              }) {
                this.firstArgument = firstArgument
                this.thirdArgument = thirdArgument
                this.fourthArgument = fourthArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstArgument,
                secondArgument: {
                  thirdArgument,
                  fourthArgument,
                }
              }) {
                return firstArgument + thirdArgument + fourthArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstArgument,
                secondArgument: {
                  thirdArgument,
                  fourthArgument,
                }
              }) {
                return firstArgument + thirdArgument + fourthArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstArgument,
                secondArgument: {
                  thirdArgument,
                  fourthArgument,
                }
              }) {
                return firstArgument + thirdArgument + fourthArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstArgument,
                secondArgument: {
                  thirdArgument,
                  fourthArgument,
                }
              }) {
                return firstArgument + thirdArgument + fourthArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstArgument,
                secondArgument: {
                  thirdArgument,
                  fourthArgument,
                }
              }) => {
                return firstArgument + thirdArgument + fourthArgument * 90
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        [

        ],
        errors
      ],
    ])

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      'plane argument',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })
})

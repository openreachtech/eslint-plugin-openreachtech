'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-parameter', () => {
  const errors = ['Require to chop down per parameter of function declaration.']

  describe('nested object arguments', () => {
    const validCases = []
      .concat([
        {
          code: `
            function method ({
              firstItem,
              secondItem: {
                thirdItem,
                fourthItem,
              }
            }) {
              return firstItem + thirdItem + fourthItem * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstItem,
              secondItem: {
                thirdItem,
                fourthItem,
              }
            }) {
              return firstItem + thirdItem + fourthItem * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstItem,
              secondItem: {
                thirdItem,
                fourthItem,
              }
            }) => {
              return firstItem + thirdItem + fourthItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstItem,
                secondItem: {
                  thirdItem,
                  fourthItem,
                }
              }) {
                this.firstItem = firstItem
                this.thirdItem = thirdItem
                this.fourthItem = fourthItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstItem,
                secondItem: {
                  thirdItem,
                  fourthItem,
                }
              }) {
                return firstItem + thirdItem + fourthItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstItem,
                secondItem: {
                  thirdItem,
                  fourthItem,
                }
              }) {
                return firstItem + thirdItem + fourthItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstItem,
                secondItem: {
                  thirdItem,
                  fourthItem,
                }
              }) {
                return firstItem + thirdItem + fourthItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstItem,
                secondItem: {
                  thirdItem,
                  fourthItem,
                }
              }) {
                return firstItem + thirdItem + fourthItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstItem,
                secondItem: {
                  thirdItem,
                  fourthItem,
                }
              }) => {
                return firstItem + thirdItem + fourthItem * 90
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

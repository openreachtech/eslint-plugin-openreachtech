'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-parameter', () => {
  const validCases = []
    .concat([
      {
        code: `
          function method () {
            return 10
          }
        `,
      },
      {
        code: `
          const method = function () {
            return 20
          }
        `,
      },
      {
        code: `
          const method = () => {
            return 30
          }
        `,
      },
      {
        code: `
          class TestClass {
            constructor () {
              this.param = 40
            }
          }
        `,
      },
      {
        code: `
          class TestClass {
            method () {
              return 50
            }
          }
        `,
      },
      {
        code: `
          class TestClass {
            static method () {
              return 60
            }
          }
        `,
      },
      {
        code: `
          const object = {
            method () {
              return 70
            }
          }
        `,
      },
      {
        code: `
          const object = {
            method: function () {
              return 80
            }
          }
        `,
      },
      {
        code: `
          const object = {
            method: () => {
              return 90
            }
          }
        `,
      },
    ])

  // tester.run([rule name], [rule definition], [test patterns])
  tester.run(
    'zero-arguments',
    ruleBody,
    {
      valid: validCases,
      invalid: [],
    }
  )
})

// @ts-check
'use strict'

const ESLintHelper = require('../tools/ESLintHelper')
const ruleBody = require('../../lib/no-if-in-oneline')

describe('Forbid if statements and else to be written on a single line.', () => {
  const errorMessage = 'Forbid if statements to be written on a single line.'
  const errors = [errorMessage]
  const name = 'no-if-in-oneline'
  const tester = ESLintHelper.createTester()

  describe('then branch', () => {
    const validCodes = [
      `
        if (condition);
      `,
      `
        if (condition) {}
      `,
      `
        if (condition) 
          foo()
      `,
      `
        if (condition
          ||condition2
        )
          foo() 
      `,
      `
        if (condition) {
          foo()
          bar()
        }
      `,
      `
        function test() {
          if (condition
            ||condition2
          ) {
            return
          }
        }
      `,
      `
        if (condition) {
          foo()
        } else if (condition2) {
          bar()
          kit()
        }
      `,
    ]
    const invalidCodes = [
      `
        function test() {
          if (condition) return
        }
      `,
      `
        function test() {
          if (condition) return;
        }
      `,
      `
        function test() {
          if (condition) return result; return calc()
        }
      `,
      `
        function test() {
          if (condition) return result; return calc();
        }
      `,
      `
        if (condition) foo()
      `,
      `
        if (condition
          ||condition2
        ) foo() 
      `,
      `
        function test() {
          if (condition) { return }
        }
      `,
      `
        function test() {
          if (condition) { return; }
        }
      `,
      `
        if (condition) { foo() }
      `,
      `
        function test() {
          if (condition) { var result = calc(); return result }
        }
      `,
      `
        function test() {
          if (condition) { var result = calc(); return result; }
        }
      `,
      `
        function test() {
          if (condition) { foo()
            return
          }
        }
      `,
      `
        function test() {
          if (condition) { m
            .foo()
            .bar
    
            return
          }
        }
      `,
      `
        function test() {
          if (condition
            || condition2
          ) { return }
        }
      `,
      `
        if (condition) {
          foo()
        } else if (condition2) { bar()
          kit()
        }
      `,
    ]

    tester.run(
      name,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors })),
      }
    )
  })

  describe('else branch', () => {
    const validCodes = [
      `
        if (condition) {
          foo()
        } else;
      `,
      `
        if (condition) {
          foo()
        } else {}
      `,
      `
        if (condition) {
          foo()
        } else
          bar()
      `,
      `
        function test() {
          if (condition) {
            foo()
          } else {
            return
          }
        }
      `,
      `
        if (condition) {
          foo()
        } else {
          bar()
          kit()
        }
      `,
      `
        if (condition) {
          foo()
        } else if (condition2) {
          bar()
          kit()
        }
      `,
    ]
    const invalidCodes = [
      `
        function test() {
          if (condition) {
            foo()
          } else return
        }
      `,
      `
        if (condition) {
          foo()
        } else bar()
      `,
      `
        function test() {
          if (condition) {
            foo()
          } else { return }
        }
      `,
      `
        function test() {
          if (condition) {
            foo()
          } else { bar() 
            return 
          }
        }
      `,
      `
        function test() {
          if (condition) {
            foo()
          } else { m.
            bar()

            return 
          }
        }
      `,
    ]

    tester.run(
      name,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors })),
      }
    )
  })

  describe('then else branch', () => {
    const doubleErrors = [errorMessage, errorMessage]
    const invalidCodes = [
      `
        function test2() {
          if (condition) foo()
          else return 
        }
      `,
      `
        function test2() {
          if (condition) return 111
          else return 222
        }
      `,
      `
        function test2() {
          if (condition) { foo() } else { return }
        }
      `,
      `
        function test2() {
          if (condition) { return 111 } else { return 222 }
        }
      `,
    ]

    tester.run(
      name,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.map(code => ({ code, errors: doubleErrors })),
      }
    )
  })
})

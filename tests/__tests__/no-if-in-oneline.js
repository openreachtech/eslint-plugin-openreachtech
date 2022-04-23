// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const RuleTester = require('eslint').RuleTester

const noIfInOnelineRule = require('../../lib/no-if-in-oneline')

describe('Forbid if statements and else to be written on a single line.', () => {
  const errors = ['Forbid if statements to be written on a single line.']
  const name = 'no-if-in-oneline'
  const tester = new RuleTester()

  describe('if branch', () => {
    const validCodes = [
      `
        if (condition);
      `,
      `
        if (condition) {}
      `,
      `
        function test() {
          if (condition) {
            return
          }
        }
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
          if (condition) { return }
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
      noIfInOnelineRule,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors }))
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
      noIfInOnelineRule,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors }))
      }
    )
  })
})

// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const RuleTester = require('eslint').RuleTester

const noIfInOnelineRule = require('../../lib/no-if-in-oneline')

const errors = ['Forbid if statements to be written on a single line.']
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
]

describe('Forbid if statements to be written on a single line.', () => {
  const tester = new RuleTester()
  tester.run(
    'no-if-in-oneline',
    noIfInOnelineRule,
    {
      valid: validCodes.map(code => ({ code })),
      invalid: invalidCodes.map(code => ({ code, errors }))
    }
  )
})

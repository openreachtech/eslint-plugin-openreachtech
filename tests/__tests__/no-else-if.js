'use strict'

const RuleTester = require('eslint').RuleTester
const noElseIfRule = require('../../lib/no-else-if')

const errors = ['Never use else-if statement.']
const validCodes = [
  `if (condition) {
    // noop 01-01
  } else {
    // noop 01-02
  }`,
  `if (condition) {
    // noop 01-03
  } else {
    // noop 01-04
  }`,
  `/* if (condition) {
    // noop 01-05
  } else if (subconditions) {
    // noop 01-06
  } */`,
]
const invalidCodes = [
  `if (condition) {
    // noop 02-01
  } else if (subconditions) {
    // noop 02-01
  }`,
  `if (condition) {
    // noop 02-03
  } else
  if (subconditions) {
    // noop 02-04
  }`,
  `if (condition) {
    // noop 02-05
  }
  else
  if (subconditions) {
    // noop 02-06
  }`,
]

describe('ESLint: no-else-if', () => {
  // ESLint tester instead of Jest `test()`
  const tester = new RuleTester()

  // tester.run([rule name], [rule definition], [test patterns])
  tester.run(
    'no-else-if',
    noElseIfRule,
    {
      valid: validCodes.map(code => ({ code })),
      invalid: invalidCodes.map(code => ({ code, errors }))
    }
  )
})

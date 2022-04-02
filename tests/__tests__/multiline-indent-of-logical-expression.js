// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../tools/ESLintHelper').createTester()
/** @type {Function|Object} */
const ruleBody = require('../../lib/multiline-indent-of-logical-expression')

const ruleName = 'multiline-indent-of-logical-expression'
const validCodes = [
  `
  if (first
    || second
    || third
  ) {
    console.log(1, first, second, third)
  }
  `,
  `
  if (
    first
    || second
    || third
  ) {
    console.log(2, first, second, third)
  }
  `,
]

describe(ruleName, () => {
  describe('simple indent error (single)', () => {
    const errors = ['When chopping down infix operator, it requires indentation after the second line.']

    const invalidCodes = [
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
        console.log(first, second, third)
      }`,
      `
      if (
        first
      || second
        || third
      ) {
        console.log(first, second, third)
      }`,
    ]

    // tester.run([rule name], [rule defination], [test patterns])
    tester.run(
      ruleName,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors }))
      }
    )
  })

  describe('simple indent error (double)', () => {
    const errors = [
      'When chopping down infix operator, it requires indentation after the second line.',
      'When chopping down infix operator, it requires indentation after the second line.',
    ]

    const invalidCodes = [
      `
      if (first
      || second
      || third
      ) {
        console.log(first, second, third)
      }
      `,
      `
      if (first
    || second
      || third
      ) {
        console.log(first, second, third)
      }
      `,
      `
      if (first
      || second
    || third
      ) {
        console.log(first, second, third)
      }
      `,
      `
      if (first
    || second
    || third
      ) {
        console.log(first, second, third)
      }
      `,
      `
      if (
        first
        || second
      || third
      ) {
        console.log(first, second, third)
      }`,
      `
      if (
        first
      || second
      || third
      ) {
        console.log(first, second, third)
      }`,
    ]

    // tester.run([rule name], [rule defination], [test patterns])
    tester.run(
      ruleName,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors }))
      }
    )
  })
})
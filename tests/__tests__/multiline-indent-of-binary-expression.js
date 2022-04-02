// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../tools/ESLintHelper').createTester()

/** @type {Function|Object} */
const ruleBody = require('../../lib/multiline-indent-of-binary-expression')

const ruleName = 'multiline-indent-of-binary-expression'
const validCodes = [
  'const result = leftOperand - 11',

  `
  const result = leftOperand
    - 11
  `,
  `
  const result = leftOperand
      - 11
  `,
  `
  const result = leftOperand
    + rightOperand
    - 11
  `,
  `
  const result = leftOperand
      + rightOperand
      - 11
  `,

  `
  {
    const result = leftOperand
      - 11
  }`,
  `
  {
    const result = leftOperand
        - 11
  }`,
  `
  {
    const result = leftOperand
      + rightOperand
      - 11
  }`,
  `
  {
    const result = leftOperand
        + rightOperand
        - 11
  }`,
]

describe(ruleName, () => {
  describe('simple indent error (single)', () => {
    const errors = [
      'When chopping down infix operator, it requires indentation after the second line.'
    ]

    const invalidCodes = [
      `
      const result = leftOperand
      + 11
      `,
      `
        const result = leftOperand
      + 11
      `,
      `
      const result = leftOperand
      - 11
      `,
      `
        const result = leftOperand
      - 11
      `,
      `
      const result = leftOperand
      * 11
      `,
      `
        const result = leftOperand
      * 11
      `,
      `
      const result = leftOperand
      / 11
      `,
      `
        const result = leftOperand
      / 11
      `,
      `
      const result = leftOperand
      % 11
      `,
      `
        const result = leftOperand
      % 11
      `,
      `
      {
        const result = leftOperand
        + 11
      }
      `,
      `
      {
        const result = leftOperand
      + 11
      }
      `,
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

  describe('indent of right operand', () => {
    const errors = [
      'Different indent of right operand vertically.',
    ]

    const invalidCodes = [
      `
      const result = leftOperand
          + rightOperand
        - 11
      `,
      `
      const result = leftOperand
        + rightOperand
          - 11
      `,
      `
      {
        const result = leftOperand
        + rightOperand
          - 11
      }
      `,
      `
      {
        const result = leftOperand
            + rightOperand
          - 11
      }`,
      `
      {
        const result = leftOperand
          + rightOperand
            - 11
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
      const result = leftOperand
      + rightOperand
      - 11
      `,
      `
        const result = leftOperand
      + rightOperand
      - 11
      `,
      `
      {
        const result = leftOperand
        + rightOperand
        - 11
      }
      `,
      `
      {
        const result = leftOperand
      + rightOperand
      - 11
      }
      `,
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

  describe('simple indent error (complex)', () => {
    const errors = [
      'When chopping down infix operator, it requires indentation after the second line.',
      'Different indent of right operand vertically.',
    ]

    const invalidCodes = [
      `
      const result = leftOperand
        + rightOperand
      - 11
      `,
      `
      {
        const result = leftOperand
          + rightOperand
        - 11
      }
      `,
      `
      {
        const result = leftOperand
      + rightOperand
        - 11
      }
      `,
      `
      {
        const result = leftOperand
        + rightOperand
      - 11
      }
      `,
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

  describe('space after operator', () => {
    const errors = ['Needs space after infix operator.']

    const invalidCodes = [
      `
      {
        const result = leftOperand
          -1
      }`,
      `
      const result = leftOperand
        -1 === flag || die()`,
      // `
      // const result = leftOperand
      //     -1 === flag || die()`,

      // `  const result = leftOperand
      // + 11`,
      // `  const result = leftOperand
      // -1`,

      // `  const result = leftOperand
      // + rightOperand
      // -1`,
      // `  const result = leftOperand
      //   + rightOperand
      // -1`,
      // `  const result = leftOperand
      // + rightOperand
      //   -1`,

      // `  const result = leftOperand
      // + rightOperand
      // - 11`,
      // `  const result = leftOperand
      //   + rightOperand
      // - 11`,
      // `  const result = leftOperand
      // + rightOperand
      //   - 11`,

      // `  const result = leftOperand
      // + rightOperand
      // -1 === flag || die()`,
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

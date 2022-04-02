// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../tools/ESLintHelper').createTester()
const ruleBody = require('../../lib/binary-expression-multiline-indent')

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

  // `{
  //   if (first
  //     || second
  //     || third
  //   ) {
  //     console.log(first, second, third)
  //   }
  // }`,
  // `{
  //   if (
  //     first
  //     || second
  //     || third
  //   ) {
  //     console.log(first, second, third)
  //   }
  // }`,
]

describe('ESLint: binary-expression-multiline-indent', () => {
  describe('simple indent error (single)', () => {
    const errors = ['When chopping down infix operator, it requires indentation after the second line.']

    const invalidCodes = [
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
    ]

    // tester.run([rule name], [rule defination], [test patterns])
    tester.run(
      'binary-expression-multiline-indent',
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
      `
      {
        const result = leftOperand
      + rightOperand
      - 11
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
      if (first
    || second
    || third
      ) {
        console.log(first, second, third)
      }
      `,
    ]

    // tester.run([rule name], [rule defination], [test patterns])
    tester.run(
      'binary-expression-multiline-indent',
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
      // `{
      //   const result = leftOperand
      //     -1
      // }`,
      // `  const result = leftOperand
      //   -1 === flag || die()`,
      // `  const result = leftOperand
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

      // `  if (
      //   first
      // || second
      // ) {
      //   console.log(first, second, third)
      // }`,
      // `  if (
      //   first
      // || second
      // || third
      // ) {
      //   console.log(first, second, third)
      // }`,
      // `  if (
      //   first
      // || second
      //   || third
      // ) {
      //   console.log(first, second, third)
      // }`,
      // `  if (
      //   first
      //   || second
      // || third
      // ) {
      //   console.log(first, second, third)
      // }`,
    ]

    // tester.run([rule name], [rule defination], [test patterns])
    tester.run(
      'binary-expression-multiline-indent',
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors }))
      }
    )
  })
})
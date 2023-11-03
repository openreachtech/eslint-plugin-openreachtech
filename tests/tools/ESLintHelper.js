// @ts-check
'use strict'

const {
  RuleTester,
} = require('eslint')

class ESLintHelper {
  /**
   * Create tester instance.
   *
   * @param {{
   *   [key: string]: *,
   * }} options
   * @returns {RuleTester} - RuleTester instance.
   */
  static createTester (options = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
      jest: true,
    },
    parserOptions: {
      ecmaVersion: 'latest',
    },
  }) {
    return new RuleTester(options)
  }

  /**
   * Expand invalid cases.
   *
   * @param {Array<Array<Array>>} cases - Invalid cases.
   * @returns {Array<{
   *   code: string,
   *   output: string,
   *   errors: Array<string>,
   * }>} - Expanded invalid cases.
   */
  static expandInvalidCases (cases) {
    return cases.flatMap(([patterns, errors]) =>
      patterns.map(it => ({
        errors,
        ...it,
      }))
    )
  }
}

module.exports = ESLintHelper

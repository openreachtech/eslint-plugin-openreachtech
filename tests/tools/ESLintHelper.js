// @ts-check
'use strict'

const {
  RuleTester
} = require('eslint')

class ESLintHelper {
  /**
   * Create tester instance.
   * @param {Object.<string, *>} options
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
    }
  }) {
    return new RuleTester(options)
  }
}

module.exports = ESLintHelper

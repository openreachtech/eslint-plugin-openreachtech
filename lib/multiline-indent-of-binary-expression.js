// @ts-check
'use strict'

/**
 * BinarryExpression
 *   +
 *   -
 *   *
 *   /
 *   %
 *   ==
 *   ===
 */

const MultilineIndentRuleHelper = require('./parts/MultilineIndentRuleHelper')

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: {
    category: '',
    docs: {
      description: 'Require indent when chopping down binary expression after the second line.',
      recommended: false,
      url: 'https://eslint.org',
    },
    hasSuggestions: false,
    messages: {
      onErrorWithoutSpaceAfterOperator: 'Needs space after infix operator.',
      onErrorWithoutIndent: 'When chopping down infix operator, it requires indentation after the second line.',
      onErrorWithoutIndentSame: 'xxxx ....',
    },
    schema: [],
    type: 'problem',
  },

  /**
   * Rule creator.
   * @param {Object} context
   * @returns {Object} - rule creator.
   */
  create (context) {
    return {
      BinaryExpression: MultilineIndentRuleHelper.createRule(context),
    }
  }
}

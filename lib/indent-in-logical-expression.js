// @ts-check
'use strict'

/**
 * LogicalExpression
 *   ||
 *   &&
 */

const MultilineIndentRuleHelper = require('./parts/MultilineIndentRuleHelper')

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: MultilineIndentRuleHelper.createMeta({
    description: 'Requires indent when chopping down logical expression..'
  }),

  /**
   * Rule creator.
   * @param {Object} context
   * @returns {Object} - rule creator.
   */
  create (context) {
    return {
      LogicalExpression: MultilineIndentRuleHelper.createRule(context),
    }
  }
}

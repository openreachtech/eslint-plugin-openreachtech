// @ts-check
'use strict'

/**
 * LogicalExpression
 *   ||
 *   &&
 */

const IndentRuleHelper = require('./parts/IndentRuleHelper')

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: IndentRuleHelper.createMeta({
    description: 'Requires indent when chopping down logical expression..'
  }),

  /**
   * Rule creator.
   * @param {Object} context
   * @returns {Object} - rule creator.
   */
  create (context) {
    return {
      LogicalExpression: IndentRuleHelper.createRule(context),
    }
  }
}

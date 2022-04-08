// @ts-check
'use strict'

/**
 * BinarryExpression
 *   +
 *   -
 *   *
 *   /
 *   %
 *   **
 *
 *   |
 *   &
 *   ^
 *   <<
 *   >>
 *   >>>
 *
 *   ==
 *   !=
 *   ===
 *   !==
 *   >
 *   <
 *   >=
 *   <=
 *
 *   in
 *   instanceof
 */

const IndentRuleHelper = require('./parts/IndentRuleHelper')

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: IndentRuleHelper.createMeta({
    description: 'Requires indent when chopping down binary expression.'
  }),

  /**
   * Rule creator.
   * @param {Object} context
   * @returns {Object} - rule creator.
   */
  create (context) {
    return {
      BinaryExpression: IndentRuleHelper.createRule(context),
    }
  }
}

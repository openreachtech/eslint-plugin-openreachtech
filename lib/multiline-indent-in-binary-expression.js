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

const MultilineIndentRuleHelper = require('./parts/MultilineIndentRuleHelper')

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: MultilineIndentRuleHelper.createMeta({
    description: 'Requires indent when chopping down binary expression.'
  }),

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

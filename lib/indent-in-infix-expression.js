// @ts-check
'use strict'

const IndentValidator = require('./indent-in-infix-expression/IndentValidator')

/**
 * BinaryExpression
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
 *
 * LogicalExpression
 *   ||
 *   &&
 */

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: {
    category: '',
    docs: {
      description: 'Check indent in infix expression chopped down.',
      recommended: false,
      url: 'https://eslint.org',
    },
    fixable: 'whitespace',
    hasSuggestions: false,
    messages: {
      errorMessage: 'Must {{behavior}} indent before {{token}}.',
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
      BinaryExpression: ruleBody,
      LogicalExpression: ruleBody,
    }

    /**
     * Common rule body.
     * @param {Object} node - AST node.
     */
    function ruleBody (node) {
      const validator = new IndentValidator({
        context,
        node,
      })

      const message = validator.createErrorMessage()

      if (!message) {
        return
      }

      context.report({
        node,
        messageId: 'errorMessage',
        data: message,
        fix (fixer) {
          return validator.fix(fixer)
        }
      })
    }
  }
}

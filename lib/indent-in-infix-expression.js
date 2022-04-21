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
    docs: {
      category: '',
      description: 'Check indent in infix expression chopped down.',
      recommended: false,
      url: 'https://eslint.org',
    },
    fixable: 'whitespace',
    hasSuggestions: false,
    messages: {
      errorMessage: 'Must {{behavior}} indent before {{token}}.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          indent: {
            type: 'number'
          }
        },
        additionalProperties: false,
      },
    ],
    type: 'layout',
  },

  /**
   * Create rule handler.
   * @param {import('./shared/types').RuleContext} context - Rule context.
   * @returns {import('./shared/types').RuleHandler} - Rule handler.
   */
  create (context) {
    return {
      BinaryExpression: ruleBody,
      LogicalExpression: ruleBody,
    }

    /**
     * Common rule body.
     * @param {import('./shared/types').ASTNode} node - AST node.
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

        /**
         * Fix rule.
         * @param {import('./shared/types').Fixer} fixer - Fixer
         * @returns {import('./shared/types').AutoFixParams} - Auto fix parameters.
         */
        fix (fixer) {
          return validator.fix(fixer)
        }
      })
    }
  }
}

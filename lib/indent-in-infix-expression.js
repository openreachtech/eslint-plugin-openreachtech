// @ts-check
'use strict'

/*
 * link
 *   https://github.com/estree/estree/blob/master/es5.md#binaryexpression
 *   https://github.com/estree/estree/blob/master/es5.md#logicalexpression
 */

const IndentValidator = require('./indent-in-infix-expression/IndentValidator')

/*
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

/** @type {import('eslint').Rule.RuleModule} */
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
            type: 'number',
          },
        },
        additionalProperties: false,
      },
    ],
    type: 'layout',
  },

  /**
   * Create rule handler.
   *
   * @param {import('eslint').Rule.RuleContext} context - Rule context.
   * @returns {import('eslint').Rule.RuleListener} - Rule listener.
   */
  create (context) {
    return {
      /**
       * Common rule body.
       *
       * @param {import('./indent-in-infix-expression/IndentValidator').InfixExpression} node - AST node.
       */
      'BinaryExpression,LogicalExpression' (node) {
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
           *
           * @param {import('eslint').Rule.RuleFixer} fixer - Fixer
           * @returns {import('eslint').Rule.Fix} - Fix instance.
           */
          fix (fixer) {
            return validator.fix(fixer)
          },
        })
      },
    }
  },
}

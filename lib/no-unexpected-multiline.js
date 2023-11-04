// @ts-check
'use strict'

/*
 * link
 *   https://github.com/estree/estree/blob/master/es5.md#binaryexpression
 */

const LineBreakValidator = require('./no-unexpected-multiline/LineBreakValidator')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      category: '',
      description: 'no unexpected multiline in infix expression.',
      recommended: false,
      url: 'https://eslint.org',
    },
    fixable: 'whitespace',
    hasSuggestions: false,
    messages: {
      errorMessage: 'no unexpected multiline in "{{operator}}" expression.',
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
    type: 'problem',
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
       * Rule body.
       *
       * @param {import('estree').BinaryExpression} node - AST node.
       */
      BinaryExpression (node) {
        const validator = new LineBreakValidator({
          context,
          node,
        })

        if (validator.isValid()) {
          return
        }

        context.report({
          node,
          messageId: 'errorMessage',
          data: validator.createErrorValues(),

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

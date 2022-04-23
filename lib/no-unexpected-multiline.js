// @ts-check
'use strict'

const LineBreakValidator = require('./no-unexpected-multiline/LineBreakValidator')

/** @type {import('eslint/lib/shared/types').Rule} */
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
            type: 'number'
          }
        },
        additionalProperties: false,
      },
    ],
    type: 'problem',
  },

  /**
   * Create rule handler.
   * @param {import('./shared/types').RuleContext} context - Rule context.
   * @returns {import('./shared/types').RuleHandler} - Rule handler.
   */
  create (context) {
    return {
      /**
       * IFStatement rule.
       * @param {import('./shared/types').ASTNode} node - AST node.
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
}
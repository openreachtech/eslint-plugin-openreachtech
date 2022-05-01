// @ts-check
'use strict'

/**
 * @type {import('eslint/lib/shared/types').Rule}
 */
module.exports = {
  meta: {
    docs: {
      category: '',
      description: 'Prohibiting comments in expressions.',
      recommended: false,
      url: 'https://eslint.org',
    },
    hasSuggestions: false,
    messages: {
      errorMessage: 'Prohibiting comments in {{ expression }}{{ additional }}.'
    },
    schema: [],
    type: 'layout',
  },

  /**
   * Create rule handler.
   * @param {import('./shared/types').RuleContext} context - Rule context.
   * @returns {import('./shared/types').RuleHandler} - Rule handler.
   */
  create (context) {
    const EXPRESSION_TYPES = ['BinaryExpression', 'LogicalExpression']
    const EXPRESSION_SELECTORS = EXPRESSION_TYPES.join(',')

    return {
      /**
       * Common rule body.
       * @link
       *   https://github.com/estree/estree/blob/master/es5.md#binaryexpression
       *   https://github.com/estree/estree/blob/master/es5.md#logicalexpression
       * @param {import('./shared/types').ASTNode} expression - AST node.
       */
      [EXPRESSION_SELECTORS] (expression) {
        if (isChildExpression()) {
          return
        }

        const comments = context
          .getSourceCode()
          .getCommentsInside(expression)

        if (comments.length === 0) {
          return
        }

        context.report({
          node: comments[0],
          messageId: 'errorMessage',
          data: {
            expression: getExpressionDescription(expression),
            additional: comments.length > 1
              ? ` (+${comments.length - 1})`
              : ''
          }
        })
      }
    }

    /**
     * Determine whether node is child expression.
     *
     * @returns {boolean} - True if expression is child expression; otherwise false.
     */
    function isChildExpression() {
      return context
        .getAncestors()
        .some(node => (EXPRESSION_TYPES.includes(node.type)))
    }

    /**
     * Get expression description.
     *
     * @param {import('./shared/types').ASTNode} expression - Expression node to determine.
     * @returns {string} - Expression description.
     */
    function getExpressionDescription (expression) {
      return expression
        .type
        .replace(/(?<!^)(?=[A-Z])/, ' ')
        .toLowerCase()
    }
  }
}

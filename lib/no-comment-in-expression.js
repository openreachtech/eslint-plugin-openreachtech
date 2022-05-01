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
    const EXPRESSION_SELECTORS = getTopExpressionSelectors ([
      'BinaryExpression',
      'LogicalExpression'
    ])

    return {
      /**
       * Common rule body.
       *
       * @link
       *   https://github.com/estree/estree/blob/master/es5.md#binaryexpression
       *   https://github.com/estree/estree/blob/master/es5.md#logicalexpression
       * @param {import('./shared/types').ASTNode} expression - AST node.
       */
      [EXPRESSION_SELECTORS] (expression) {
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
     * Get top expression selectors.
     *
     * @param {Array<string>} expressions - Expression names.
     * @returns {string} - Top expression selectors.
     */
    function  getTopExpressionSelectors (expressions) {
      return expressions
        .map(expression => `${expression}:not(${composeIncludingSelectors(expression)})`)
        .join(',')

      function composeIncludingSelectors (current) {
        return expressions
          .map(expression => `${expression} ${current}`)
          .join(',')
      }
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

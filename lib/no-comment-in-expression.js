// @ts-check
'use strict'

/**
 * @type {import('eslint').Rule.RuleModule}
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
      errorMessage: 'Prohibiting comment in expression{{ additional }}.'
    },
    schema: [],
    type: 'layout',
  },

  /**
   * Create rule handler.
   * @param {import('eslint').Rule.RuleContext} context - Rule context.
   * @returns {import('eslint').Rule.RuleListener} - Rule listener.
   */
  create (context) {
    const EXPRESSION_SELECTOR = [
      'BinaryExpression',
      'LogicalExpression',
      'UnaryExpression',
    ]
      .map(createTopExpressionSelector)
      .join(',')

    return {
      /**
       * Common rule body.
       *
       * @link
       *   https://github.com/estree/estree/blob/master/es5.md#binaryexpression
       *   https://github.com/estree/estree/blob/master/es5.md#logicalexpression
       * @param {import('eslint').Rule.Node} expression - AST node.
       */
      [EXPRESSION_SELECTOR] (expression) {
        const comments = context
          .getSourceCode()
          .getCommentsInside(expression)

        if (comments.length === 0) {
          return
        }

        context.report({
          loc: comments[0].loc,
          messageId: 'errorMessage',
          data: createErrorValues(comments)
        })
      }
    }

    /**
     * Create top expression selector for current expression.
     *
     * @param {string} item - Current expression item.
     * @param {number} _ - Current expression item index.
     * @param {Array<string>} expressions - Expression list to iterate.
     * @returns {string} - Top expression selector.
     */
    function createTopExpressionSelector (item, _, expressions) {
      return `${item}:not(${composeIncludingSelectors()})`

      function composeIncludingSelectors () {
        return expressions
          .map(ancestor => `${ancestor} ${item}`)
          .join(',')
      }
    }

    /**
     * Create error values.
     *
     * @param {Array<import('estree').Comment>} comments - Comments in expression.
     * @returns {Object} - Expression description.
     */
    function createErrorValues (comments) {
      return {
        additional: comments.length > 1
          ? ` (+${comments.length - 1})`
          : ''
      }
    }
  }
}

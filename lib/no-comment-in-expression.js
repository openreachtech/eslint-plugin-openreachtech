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
      errorMessage: 'Prohibiting comments in {{ expression }}{{ additional }}.'
    },
    schema: [],
    type: 'layout',
  },

  /**
   * Create rule handler.
   * @param {import('eslint').Rule.RuleContext} context - Rule context.
   * @returns {import('eslint').Rule.RuleListener} - Rule handler.
   */
  create (context) {
    const EXPRESSION_SELECTOR = [
      'BinaryExpression',
      'LogicalExpression',
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
          node: comments[0],
          messageId: 'errorMessage',
          data: createHydratingParams({
            expression,
            comments
          })
        })
      }
    }

    /**
     * Create top expression selectors.
     *
     * @param {import('eslint').Rule.Node} expression - Expression node.
     * @param {number} _ - Index.
     * @param {Array<import('eslint').Rule.Node>} expressions - Expression nodes.
     * @returns {string} - Top expression selectors.
     */
    function createTopExpressionSelector(expression, _, expressions) {
      return `${expression}:not(${composeIncludingSelectors()})`

      function composeIncludingSelectors() {
        return expressions
          .map(ancestor => `${ancestor} ${expression}`)
          .join(',')
      }
    }

    /**
     * Create expression description.
     *
     * @param {{
     *   expression: import('eslint').Rule.Node,
     *   comments: Array<import('eslint').Rule.Node>,
     * }} obj - Expression node to determine.
     * @returns {object} - Expression description.
     */
    function createHydratingParams({
      expression,
      comments
    }) {
      return {
        expression: expression
          .type
          .replace(/(?<!^)(?=[A-Z])/, ' ')
          .toLowerCase(),
        additional: comments.length > 1
          ? ` (+${comments.length - 1})`
          : ''
      }
    }
  }
}

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
      errorMessage: 'Prohibiting comment in expression{{ additional }}.',
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
    const EXPRESSION_SELECTOR = createTopExpressionSelector(
      'BinaryExpression',
      'ConditionalExpression',
      'LogicalExpression',
      'UnaryExpression',
      'UpdateExpression'
    )

    return {
      /**
       * Common rule body.
       *
       * @link
       *   https://github.com/estree/estree/blob/master/es5.md#binaryexpression
       *   https://github.com/estree/estree/blob/master/es5.md#conditionalexpression
       *   https://github.com/estree/estree/blob/master/es5.md#logicalexpression
       *   https://github.com/estree/estree/blob/master/es5.md#unaryexpression
       *   https://github.com/estree/estree/blob/master/es5.md#updateexpression
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
          data: createErrorValues(comments),
        })
      },
    }

    /**
     * Create top expression selector.
     *
     * @param {Array<string>} expressions - Expressions.
     * @returns {string} - Top expression selector.
     */
    function createTopExpressionSelector (...expressions) {
      const  selector = expressions.join(',')

      return `:matches(${selector}):not(:matches(${selector}) *)`
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
          : '',
      }
    }
  },
}

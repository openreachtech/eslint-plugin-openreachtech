// @ts-check
'use strict'

/** @type {import('eslint/lib/shared/types').Rule} */
module.exports = {
  meta: {
    category: '',
    docs: {
      description: 'Require indent when chopping down binary expression after the second line.',
      recommended: false,
      url: 'https://eslint.org',
    },
    hasSuggestions: false,
    messages: {
      onErrorWithoutSpaceAfterOperator: 'Needs space after infix operator.',
      onErrorWithoutIndent: 'When chopping down infix operator, it requires indentation after the second line.',
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
      if (isOneLine(node)) {
        return
      }

      if (
        !isSameLineWithParent(node)
        && node.loc.start.column <= node.parent.loc.start.column
      ) {
        context.report({
          node,
          messageId: 'onErrorWithoutIndent',
        })

        return
      }

      const leftHeadColumn = getLeftOperandHeadColumn(node)
      const operatorSpan = getOperatorSpan(node)
      const rightHeadColumn = getRightOperandHeadColumn(node)

      const indent = rightHeadColumn
        - (operatorSpan + 1)
        - leftHeadColumn

      if (indent >= 2) {
        return
      }

      const messageId = indent === 1
        ? 'onErrorWithoutSpaceAfterOperator'
        : 'onErrorWithoutIndent'

      context.report({
        node,
        messageId,
      })
    }

    /**
     * Check the node oneline.
     * @param {Object} node - AST node.
     * @returns {boolean} - true: oneline.
     */
    function isOneLine (node) {
      return node.loc.start.line === node.loc.end.line
    }

    /**
     * Calculate indent of hind operand.
     * @param {Object} node - AST node.
     * @returns {number} - Indent of hind operand.
     */
    function calculateIndentOfHindOperand (node) {
      const leftHeadColumn = getLeftOperandHeadColumn(node)
      const operatorSpan = getOperatorSpan(node)
      const rightHeadColumn = getRightOperandHeadColumn(node)

      return rightHeadColumn
        - (operatorSpan + 1)
        - leftHeadColumn
    }

    /**
     * Get left operand head column.
     * @param {Object} node - AST node.
     * @returns {number} - Left operand head column.
     */
    function getLeftOperandHeadColumn (node) {
      return isSameLineWithParent(node)
        ? getLeftOperandHeadColumn(node.parent)
        : node.loc.start.column
    }

    /**
     * Get operator span.
     * @param {Object} node - AST node.
     * @returns {number} - Operator offset.
     */
    function getOperatorSpan (node) {
      return node.operator.length
    }

    /**
     * Get right operand head column.
     * @param {Object} node - AST node.
     * @returns {number} - Right operand head column.
     */
    function getRightOperandHeadColumn (node) {
      return node.right.loc.start.column
    }

    /**
     * Check to be same line with parent node.
     * @param {Object} node - AST node.
     * @returns {boolean} - true: same.
     */
    function isSameLineWithParent (node) {
      return node.loc.start.line === node.parent?.loc.start.line
    }
  }
}
// @ts-check
'use strict'

const IndentValidator = require('./IndentValidator')

class MultilineIndentRuleHelper {
  /**
   * Create meta object.
   * @param {{
   *   description: string,
   * }} meta - Meta options.
   * @returns {Object} - Meta object.
   */
  static createMeta ({
    description
  }) {
    return {
      category: '',
      docs: {
        description,
        recommended: false,
        url: 'https://eslint.org',
      },
      hasSuggestions: false,
      schema: [],
      type: 'problem',
    }
  }

  /**
   * Create rule by context.
   * @param {Object} context - ESLint context.
   * @returns {Function} - Function to create rule by context.
   */
  static createRule (context) {
    return ruleBody

    /**
     * Common rule body.
     * @param {Object} node - AST node.
     */
    function ruleBody (node) {
      if (isOneLine(node)) {
        return
      }

      if (differentIndentOfRightOperand(node)) {
        context.report({
          node,
          message: createErrorMessageOnDifferentIndentOfRightOperand(node)
        })

        return
      }

      const indentValidator = new IndentValidator(node)

      if (indentValidator.hasShortageIndentBeforeRightOperand()) {
        context.report({
          node,
          message: createErrorMessageOnShortageIndent(node),
        })

        return
      }

      if (indentValidator.isNotAlignedBothOperands()) {
        context.report({
          node,
          message: createErrorMessageOnNotAlignedBothOperands(node),
        })

        return
      }
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
     * Different indent of right operand in nested expressions.
     *   1. Node type is same as parent.
     *   2. Different loc.line from parent.
     *   3. Different column of right operand loc.start.
     * @example
     *   if (
     *     first
     *     || second
     *       || third
     *   ) {
     *     ...
     *   }
     * @param {Object} node - AST node.
     * @returns {boolean} - true:
     */
    function differentIndentOfRightOperand (node) {
      return node.type === node.parent.type
        && node.right.loc.start.line !== node.parent.right.loc.start.line
        && (
          node.right.loc.start.column - (node.operator.length + 1)
          !== (node.parent.right.loc.start.column - (node.parent.operator.length + 1))
        )
    }

    /**
     * Create error message on different indent of right operand.
     * @param {Object} node - AST node.
     * @returns {string} - Error message.
     */
    function createErrorMessageOnDifferentIndentOfRightOperand (node) {
      return `Must align operator in nested infix expressions, when chopped down before "${node.operator}" operator.`
    }

    /**
     * Create error message on shortage indent.
     * @param {Object} node - AST node.
     * @returns {string} - Error message.
     */
    function createErrorMessageOnShortageIndent (node) {
      return `Must indent second line of infix expression, when chopped down before "${node.operator}" operator.`
    }

    /**
     * Create error message on not aligned both operands.
     * @param {Object} node - AST node.
     * @returns {string} - Error message.
     */
    function createErrorMessageOnNotAlignedBothOperands (node) {
      return `Must align indent before "${node.operator}" operator to left-operand, when chopped down before left-operand of infix expression.`
    }
  }
}

module.exports = MultilineIndentRuleHelper

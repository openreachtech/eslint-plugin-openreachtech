// @ts-check
'use strict'

class MultilineIndentRuleHelper {
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

      const leadingNode = findLeadingNode(node)

      /**
       * 以下の条件のエラーを確認する。
       *   1. 当 node が leading node の時。
       *   2. 親の line から改行されてる。(Multiple line)
       *   3. カラムがインデントされてない。
       *
       * if (
       * first // <----------------- here
       *   || second
       * ) {
       *   ...
       * }
       *
       * NOTE: 此のエラーは、二項演算子系のインデントとは異なる可能性が高い。
       *   if statement の test 内の indent 問題と云える。
       *   なので、此のルールの対象外とするべき。
       */
      // if (
      //   node === leadingNode
      //   && node.loc.start.line !== node.parent.loc.start.line
      //   && node.loc.start.column <= node.parent.loc.start.column
      // ) {
      //   context.report({
      //     node,
      //     messageId: 'onErrorWithoutIndent', // TODO: right operand indent にする。
      //   })

      //   return
      // }

      if (differentIndentOfRightOperand(node)) {
        context.report({
          node,
          message: createErrorMessageOnDifferentIndentOfRightOperand(node)
        })

        return
      }

      const leftHeadColumn = getLeftOperandHeadColumn(leadingNode)
      const operatorSpan = getOperatorSpan(node)
      const rightHeadColumn = getRightOperandHeadColumn(node)

      const indent = rightHeadColumn
        - operatorSpan
        - leftHeadColumn

      // If true: allowingZeroIndent.
      const isLeadingNodeSameType = node.type === leadingNode.type

      const minIndent = isLeadingNodeSameType
        ? 0
        : 2

      if (minIndent <= indent) {
        return
      }

      context.report({
        node,
        message: createErrorMessageOnIncorrectIndent(node),
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
     * Find leading node on same line.
     * @param {Object} node - AST node.
     * @returns {Object} - AST node.
     */
    function findLeadingNode (node) {
      return isSameLineWithParent(node)
        ? findLeadingNode(node.parent)
        : node
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
     * Check to be same line with parent node.
     * @param {Object} node - AST node.
     * @returns {boolean} - true: same.
     */
    function isSameLineWithParent (node) {
      return node.parent?.type !== 'Program'
        && node.loc.start.line === node.parent?.loc.start.line
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
     * Create error message on incorrect indent.
     * @param {Object} node - AST ndoe.
     * @returns {string} - Error message.
     */
    function createErrorMessageOnIncorrectIndent (node) {
      return `When chopping down by infix operator as "${node.operator}", it requires indentation after the second line.`
    }

    /**
     * Create error message on different indent of right operand.
     * @param {Object} node - AST ndoe.
     * @returns {string} - Error message.
     */
    function createErrorMessageOnDifferentIndentOfRightOperand (node) {
      return `Different indent of right operand vertically by infix operator as "${node.operator}".`
    }
  }
}

module.exports = MultilineIndentRuleHelper

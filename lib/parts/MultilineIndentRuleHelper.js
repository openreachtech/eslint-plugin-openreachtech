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

      if (
        node === leadingNode
        && node.loc.start.line !== node.parent.loc.start.line
        && node.loc.start.column <= node.parent.loc.start.column
      ) {
        context.report({
          node,
          messageId: 'onErrorWithoutIndent', // TODO: right operand indent にする。
        })

        return
      }

      /**
       * Same expression type
       * Multiple line
       *
       */
      if (
        node.type === node.parent.type
        && node.right.loc.start.line !== node.parent.right.loc.start.line
        && (
          node.right.loc.start.column - (node.operator.length + 1)
          !== (node.parent.right.loc.start.column - (node.parent.operator.length + 1))
        )
      ) {
        context.report({
          node,
          messageId: 'onErrorWithoutIndent', // TODO: right operand indent にする。
        })

        return
      }

      const leftHeadColumn = getLeftOperandHeadColumn(leadingNode)
      const operatorSpan = getOperatorSpan(node)
      const rightHeadColumn = getRightOperandHeadColumn(node)

      const indent = rightHeadColumn
        - (operatorSpan + 1)
        - leftHeadColumn

      // If true: allowingZeroIndent.
      const isLeadingNodeSameType = node.type === leadingNode.type

      const minIndent = isLeadingNodeSameType
        ? 0
        : 2

      if (minIndent <= indent) {
console.dir({
  leadingNode,
  xxx: 999,
  minIndent,
  indent,
}, {
  depth: 5
})
        return
      }

      const messageId = indent === 1
        ? 'onErrorWithoutSpaceAfterOperator'
        : 'onErrorWithoutIndent'

      context.report({
        node,
        messageId,
      })

      // console.dir({
      //   node,
      //   leadingNode,
      //   isLeadingNodeSameType,
      //   leftHeadColumn,
      //   operatorSpan,
      //   rightHeadColumn,
      // }, {
      //   depth: 5
      // })

/*

      if (node.type === node.parent?.type) {
        if (node.right.loc.start.column !== node.parent.right.loc.start.column) {
          context.report({
            node,
            messageId: 'onErrorWithoutIndent',
          })
        }

        return
      }

      const existsNewLineBeforeLeftOperand = !isSameLineWithParent(node)

      if (
        existsNewLineBeforeLeftOperand
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

      if (indent === 1) {
        context.report({
          node,
          messageId: 'onErrorWithoutSpaceAfterOperator',
        })

        return
      }

      if (
        existsNewLineBeforeLeftOperand
        && indent === 0
      ) {
        return
      }

// if (node.type === 'BinaryExpression') {
//   console.dir({
//     node,
//     indent,
//     leftHeadColumn,
//     operatorSpan,
//     rightHeadColumn,
//   }, { depth: 5 })
// }
      context.report({
        node,
        messageId: 'onErrorWithoutIndent',
      })
*/
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
  }
}

module.exports = MultilineIndentRuleHelper

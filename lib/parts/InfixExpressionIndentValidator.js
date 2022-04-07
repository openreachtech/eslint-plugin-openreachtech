// @ts-check
'use strict'

class InfixExpressionIndentValidator {
  /**
   * Constructor.
   * @param {Object} node - AST node.
   */
  constructor (node) {
    this.node = node

    this.leadingNode = this.findLeadingNode(node)
    this.indent = this.calculateIndent(node)
  }

  /**
   * Has shortage indent before right operand.
   * @returns {boolean} - true: shortage.
   */
  hasShortageIndentBeforeRightOperand () {
    return this.node.type !== this.leadingNode.type
      && this.indent < 2
  }

  /**
   * Is not aligned both operands.
   * @returns {boolean} - true: Not aligned.
   */
  isNotAlignedBothOperands () {
    return this.node.type === this.leadingNode.type
      && this.indent !== 0 && this.indent !== 1
  }

  /**
   * Find leading node on same line.
   * @param {Object} node - AST node.
   * @returns {Object} - AST node.
   */
  findLeadingNode (node) {
    return this.isSameLineWithParent(node)
      ? this.findLeadingNode(node.parent)
      : node
  }

  /**
   * Check to be same line with parent node.
   * @param {Object} node - AST node.
   * @returns {boolean} - true: same.
   */
  isSameLineWithParent (node) {
    return node.parent?.type !== 'Program'
      && node.loc.start.line === node.parent?.loc.start.line
  }

  /**
   * Calculate indent.
   * @param {Object} node - AST node.
   * @returns {number} - Indent of right operand from left operand.
   */
  calculateIndent (node) {
    const leftHeadColumn = this.getLeftOperandHeadColumn(this.leadingNode)
    const operatorSpan = this.getOperatorSpan(node)
    const rightHeadColumn = this.getRightOperandHeadColumn(node)

    return rightHeadColumn
      - operatorSpan
      - leftHeadColumn
  }

  /**
   * Get left operand head column.
   * @param {Object} node - AST node.
   * @returns {number} - Left operand head column.
   */
  getLeftOperandHeadColumn (node) {
    return this.isSameLineWithParent(node)
      ? this.getLeftOperandHeadColumn(node.parent)
      : node.loc.start.column
  }

  /**
   * Get operator span.
   * @param {Object} node - AST node.
   * @returns {number} - Operator offset.
   */
  getOperatorSpan (node) {
    return node.operator.length
  }

  /**
   * Get right operand head column.
   * @param {Object} node - AST node.
   * @returns {number} - Right operand head column.
   */
  getRightOperandHeadColumn (node) {
    return node.right.loc.start.column
  }
}

module.exports = InfixExpressionIndentValidator

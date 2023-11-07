'use strict'

const {
  isParenthesized,
} = require('@eslint-community/eslint-utils')

class IndentValidator {
  /**
   * Constructor.
   *
   * @param {{
   *   context: import('eslint').Rule.RuleContext,
   *   node: InfixExpression,
   * }} params
   */
  constructor ({
    context,
    node,
  }) {
    this.context = context
    this.node = node

    this._setupParamsByConstructorArguments()
  }

  /**
   * Setup params by constructor arguments.
   *
   * @private
   */
  _setupParamsByConstructorArguments () {
    this.operatorToken = this._getOperatorToken()

    this.isChoppedDownBeforeOperator = this._isChoppedDownBeforeOperator()
    this.isChoppedDownBeforeRightOperand = this._isChoppedDownBeforeRightOperand()
    this.indentBaseColumn = this._getIndentBaseColumn()
  }

  /**
   * Get operator token.
   *
   * @returns {import('eslint').AST.Token} - Operator token.
   * @private
   */
  _getOperatorToken () {
    return this.context.sourceCode
      .getFirstTokenBetween(
        this.node.left,
        this.node.right,
        token => token.value === this.node.operator
      )
  }

  /**
   * Is chopped down before operator.
   *
   * @returns {boolean} - true: Chopped down before operator.
   */
  _isChoppedDownBeforeOperator () {
    if (isParenthesized(this.node.left, this.context.sourceCode)) {
      return false
    }

    return this.node.left.loc.end.line !== this.operatorToken.loc.start.line
  }

  /**
   * Is chopped down before right operand.
   *
   * @returns {boolean} - true: Chopped down before right operand.
   */
  _isChoppedDownBeforeRightOperand () {
    if (isParenthesized(this.node.right, this.context.sourceCode)) {
      return false
    }

    return this.node.right.loc.start.line !== this.operatorToken.loc.start.line
  }

  /**
   * Get indent base column.
   *
   * @returns {number} - base indent column.
   */
  _getIndentBaseColumn () {
    const keptSourceCode = this.context.sourceCode

    const leadingNode = getLeadingNodeRecursive(
      /** @type {import('eslint').Rule.Node} */ (this.node)
    )

    if (
      this.node === leadingNode
      && isParenthesized(leadingNode, keptSourceCode)
    ) {
      return leadingNode.loc.start.column
    }

    const isChoppedDownBeforeLeftOperand = this.node.type === leadingNode.type

    return isChoppedDownBeforeLeftOperand
      ? leadingNode.loc.start.column
      : leadingNode.loc.start.column + this._getIndentSpan()

    /**
     * Get leading node on same line.
     *
     * @param {import('eslint').Rule.Node} node - AST node.
     * @returns {import('eslint').Rule.Node} - AST node.
     */
    function getLeadingNodeRecursive (node) {
      if (isParenthesized(node, keptSourceCode)) {
        return node
      }

      const isLeadingNode = node.parent?.type !== node.type
        && (
          node.parent?.type === 'Program'
          || node.parent?.loc.start.line !== node.loc.start.line
        )

      return isLeadingNode
        ? node
        : getLeadingNodeRecursive(node.parent)
    }
  }

  /**
   * Get indent span.
   *
   * @returns {number} - Indent span.
   * @private
   */
  _getIndentSpan () {
    const [
      { indent = 2 } = {},
    ] = this.context.options

    return indent
  }

  // ---------------------------------------------------------------------------

  /**
   * Create error message.
   *
   * @returns {IndentInInfixExpressionError|null} - Error message or null
   */
  createErrorMessage () {
    if (this._isOneLine()) {
      return null
    }

    const indentOffset = this._calcIndentOffset()

    if (indentOffset === 0) {
      return null
    }

    return {
      behavior: this._createBehavior(indentOffset),
      token: this._createNameOfTargetToFixIndent(),
    }
  }

  /**
   * Check the node oneline.
   *
   * @returns {boolean} - true: oneline.
   */
  _isOneLine () {
    return this.node.left.loc.end.line === this.node.loc.end.line
  }

  /**
   * Create indent offset.
   *
   * @returns {number} - Indent offset.
   * @private
   */
  _calcIndentOffset () {
    return this._getErrorTargetToken().loc.start.column - this.indentBaseColumn
  }

  /**
   * Get location of error target token.
   *
   * @returns {IndentTarget} - Error target node or token.
   * @private
   */
  _getErrorTargetToken () {
    return /** @type {IndentTarget} */ (
      this.isChoppedDownBeforeRightOperand
        ? this.node.right
        : this.operatorToken
    )
  }

  /**
   * Create behavior.
   *
   * @param {number} indentOffset - Indent offset.
   * @returns {string} - Behavior string.
   * @private
   */
  _createBehavior (indentOffset) {
    return indentOffset < 0
      ? 'add'
      : 'remove'
  }

  /**
   * Create name of target (node/token) to fix indent.
   *
   * @returns {string} - The name of target.
   * @private
   */
  _createNameOfTargetToFixIndent () {
    return this.isChoppedDownBeforeRightOperand
      ? `right operand of "${this.operatorToken.value}"`
      : `"${this.operatorToken.value}"`
  }

  // ---------------------------------------------------------------------------

  /**
   * Fix up.
   *
   * @param {import('eslint').Rule.RuleFixer} fixer - Fixer.
   * @returns {object | null} - Instance of Fixer.
   */
  fix (fixer) {
    const indexOffset = this._calcIndentOffset()

    if (indexOffset === 0) {
      return null
    }

    const targetToken = /** @type {IndentTarget} */ (this._getErrorTargetToken())

    if (indexOffset < 0) {
      return fixer.insertTextBefore(
        targetToken,
        ' '.repeat(-indexOffset)
      )
    }

    if (this._existsInterruptingComment(targetToken)) {
      return null
    }

    return fixer.removeRange([
      targetToken.range[0] - indexOffset,
      targetToken.range[0],
    ])
  }

  /**
   * Exists interrupting comment.
   *
   * @param {IndentTarget} targetToken - Target token to remove intent.
   * @returns {boolean} - true: exists.
   */
  _existsInterruptingComment (targetToken) {
    const latestComment = this.context
      .sourceCode
      .getCommentsBefore(targetToken)
      .pop()

    return latestComment
      && latestComment.loc.end.line === targetToken.loc.start.line
  }
}

module.exports = IndentValidator

/**
 * @typedef {import('estree').BinaryExpression|import('estree').LogicalExpression} InfixExpression
 */

/**
 * @typedef {import('estree').BinaryExpression|import('eslint').AST.Token} IndentTarget
 */

/**
 * @typedef {{
 *   behavior: string,
 *   token: string,
 * }} IndentInInfixExpressionError
 */

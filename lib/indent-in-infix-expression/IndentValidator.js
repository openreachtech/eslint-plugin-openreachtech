// @ts-check
'use strict'

class IndentValidator {
  /**
   * Constructor.
   * @param {{
   *   context: Object,
   *   node: Object, // AST Node.
   * }} params
   */
  constructor ({
    context,
    node
  }) {
    this.context = context
    this.node = node

    this._setupParamsByConstructorArguments()
  }

  /**
   * Setup params by constructor arguments.
   * @private
   */
  _setupParamsByConstructorArguments () {
    this.operatorToken = this._getOperatorToken()

    this.isChoppedDownBeforeRightOperand = this._isChoppedDownBeforeRightOperand()
    this.indentBaseColumn = this._getIndentBaseColumn()
  }

  /**
   * Get operator token.
   * @private
   * @returns {Object} - Operator token.
   */
  _getOperatorToken () {
    return this.context.getSourceCode()
      .getFirstTokenBetween(
        this.node.left,
        this.node.right,
        token => token.value === this.node.operator
      )
  }

  /**
   * Is chopped down before right operand.
   * @returns {boolean} - true: Chopped down before right operand.
   */
  _isChoppedDownBeforeRightOperand () {
    return this.node.right.loc.start.line !== this.operatorToken.loc.start.line
  }

  /**
   * Get indent base column.
   * @returns {number} - base indent column.
   */
  _getIndentBaseColumn () {
    const leadingNode = getLeadingNodeRecursive(this.node)
    const isChoppedDownBeforeLeftOperand = this.node.type === leadingNode.type

    return isChoppedDownBeforeLeftOperand
      ? leadingNode.loc.start.column
      : leadingNode.loc.start.column + this._getIndentSpan()

    /**
     * Get leading node on same line.
     * @param {Object} node - AST node.
     * @returns {Object} - AST node.
     */
    function getLeadingNodeRecursive (node) {
      const isSameLineWithParent =
        node.parent?.type !== 'Program'
        && node.loc.start.line === node.parent?.loc.start.line

      return isSameLineWithParent
        ? getLeadingNodeRecursive(node.parent)
        : node
    }
  }

  /**
   * Get indent span.
   * @private
   * @returns {number} - Indent span.
   */
  _getIndentSpan () {
    return 2
  }

  // ---------------------------------------------------------------------------

  /**
   * Create error message.
   * @returns {string|null} - Error message or null
   */
  createErrorMessage () {
    if (this._isOneLine()) {
      return null
    }

    const indentOffset = this._calcIndentOffset()

    if (indentOffset === 0) {
      return null
    }

    return `Must ${this._createBehaviorVerb(indentOffset)} indent before ${this._createNameOfTargetToFixIndent()}.`
  }

  /**
   * Check the node oneline.
   * @returns {boolean} - true: oneline.
   */
  _isOneLine () {
    return this.node.left.loc.end.line === this.node.loc.end.line
  }

  /**
   * Create indent offset.
   * @private
   * @returns {number} - Indent offset.
   */
  _calcIndentOffset () {
    const targetToFixIndent = this.isChoppedDownBeforeRightOperand
      ? this.node.right
      : this.operatorToken

    return targetToFixIndent.loc.start.column - this.indentBaseColumn
  }

  /**
   * Create behavior verb.
   * @private
   * @param {number} indentOffset - Indent offset.
   * @returns {string} - Behavior verb string.
   */
  _createBehaviorVerb (indentOffset) {
    return indentOffset < 0
      ? 'add'
      : 'remove'
  }

  /**
   * Create name of target (node/token) to fix indent.
   * @private
   * @returns {string} - The name of target.
   */
  _createNameOfTargetToFixIndent () {
    return this.isChoppedDownBeforeRightOperand
      ? `right operand after "${this.operatorToken.value}" operator`
      : `"${this.operatorToken.value}" operator`
  }
}

module.exports = IndentValidator

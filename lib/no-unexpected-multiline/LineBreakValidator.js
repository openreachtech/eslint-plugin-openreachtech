// @ts-check
'use strict'

class LineBreakValidator {
  /**
   * Constructor.
   * @param {{
   *   context: import('../shared/types').RuleContext,
   *   node: import('../shared/types').ASTNode,
   * }} params
   */
  constructor ({
    context,
    node
  }) {
    this.context = context
    this.node = node

    this.operatorToken = this._getOperatorToken()
  }

  /**
   * Get operator token.
   * @private
   * @returns {import('../shared/types').Token} - Operator token.
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
   * Get indent base column.
   * @private
   * @returns {number} - base indent column.
   */
  _getIndentBaseColumn () {
    const leadingNode = getLeadingNodeRecursive(this.node)

    return leadingNode.loc.start.column + this._getIndentSpan()

    /**
     * Get leading node on same line.
     * @param {import('../shared/types').ASTNode} node - AST node.
     * @returns {import('../shared/types').ASTNode} - AST node.
     */
    function getLeadingNodeRecursive (node) {
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
   * @private
   * @returns {number} - Indent span.
   */
  _getIndentSpan () {
    const [
      { indent = 2 } = {}
    ] = this.context.options

    return indent
  }

  // ---------------------------------------------------------------------------

  /**
   * Is valid in this rule.
   * @returns {boolean} - true: valid
   */
  isValid () {
    const isTargetOperator = ['-', '+'].includes(this.node.operator)
    const existsNewLineBeforeOperator = this.operatorToken.loc.end.line <= this.node.left.loc.end.line
    const existsIndentBeforeOperator = this._getIndentBaseColumn() <= this.operatorToken.loc.start.column

    return !isTargetOperator
      || existsNewLineBeforeOperator
      || existsIndentBeforeOperator
  }

  /**
   * Create error message.
   * @returns {NoUnexpectedMultilineError} - Error message values.
   */
  createErrorValues () {
    return {
      operator: this.operatorToken.value,
    }
  }

  // ---------------------------------------------------------------------------

  /**
   * Fix up.
   * @param {import('../shared/types').Fixer} fixer - Fixer.
   * @returns {Object|null} - Instance of Fixer.
   */
  fix (fixer) {
    return fixer.insertTextBefore(
      this.operatorToken,
      '; '
    )
  }
}

module.exports = LineBreakValidator

/**
 * @typedef {{
 *   operator: string,
 * }} NoUnexpectedMultilineError
 */

'use strict'

class LineBreakValidator {
  /**
   * Constructor.
   *
   * @param {{
   *   context: import('eslint').Rule.RuleContext,
   *   node: import('estree').BinaryExpression,
   * }} params
   */
  constructor ({
    context,
    node,
  }) {
    this.context = context
    this.node = node

    this.operatorToken = this._getOperatorToken()
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
   * Get indent base column.
   *
   * @returns {number} - base indent column.
   * @private
   */
  _getIndentBaseColumn () {
    const leadingNode = getLeadingNodeRecursive(
      /** @type {import('eslint').Rule.Node} */ (this.node)
    )

    return leadingNode.loc.start.column + this._getIndentSpan()

    /**
     * Get leading node on same line.
     *
     * @param {import('eslint').Rule.Node} node - AST node.
     * @returns {import('eslint').Rule.Node} - AST node.
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
   * Is valid in this rule.
   *
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
   *
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
   *
   * @param {import('eslint').Rule.RuleFixer} fixer - Fixer.
   * @returns {import('eslint').Rule.Fix} - Instance of Fixer.
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

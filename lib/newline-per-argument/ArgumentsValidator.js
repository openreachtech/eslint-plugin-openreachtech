// @ts-check
'use strict'

class ArgumentsValidator {
  /**
   * Constructor.
   *
   * @param {{
   *   context: import('eslint').Rule.RuleContext,
   *   node: Object.<string, *>,
   * }} params
   */
  constructor ({
    context,
    node
  }) {
    this.context = context
    this.node = node
  }

  /**
   * Is valid in this rule.
   *
   * @returns {boolean} - true: valid
   */
  isValid () {
    // When no params, return true.
    if (this.node.params.length === 0) {
      return true
    }

    return this.isOneLine()
      ? this.isValidOnOneLine()
      : this.isChoppedDown()
  }

  /**
   * Is one line.
   *
   * @private
   * @returns {boolean} - true: all params on one line.
   */
  isOneLine () {
    const lines = this.node.params
      .flatMap(it => [it.loc.start.line, it.loc.end.line])

    return Math.min(...lines) === Math.max(...lines)
  }

  /**
   * Is valid all params on one line.
   *
   * @private
   * @returns {boolean} - true: valid on one line params.
   */
  isValidOnOneLine () {
    // Has too many params, or has object pattern
    if (
      this.node.params.length >= 3
      || this.node.params.some(it => it.type === 'ObjectPattern')
    ) {
      return false
    }

    // Has two params?
    if (this.node.params.length === 2) {
      return this.node.params.every(it => it.type === 'Identifier')
    }

    // Hereafter, one param.

    const param = this.node.params[0]

    // Is assignment pattern
    if (param.type !== 'AssignmentPattern') {
      return true
    }

    if (param.left.type === 'ObjectPattern') {
      return false
    }

    // Has newline before first param.
    return this.node.loc.start.line < param.loc.start.line
  }

  /**
   * Is chopped down
   *
   * @private
   * @returns {boolean} - true: valid.
   */
  isChoppedDown () {
    const lines = this.deepCollectLines(this.node.params)

    return lines.length === new Set(lines).size
  }

  /**
   * Collect identifiers from Function params.
   *
   * @private
   * @param {Array<*>} params - Function parameters.
   * @returns {Array<import('eslint').AST.Token>} - Identifier token.
   */
  deepCollectLines (params) {
    const collectors = {
      AssignmentPattern: (param) => this.deepCollectLines([param.left]),
      Identifier: (param) => param.loc.start.line,
      ObjectPattern: (param) => [
        param.loc.start.line,
        param.loc.end.line,
        ...this.deepCollectLines(param.properties)
      ],
      Property: (param) => this.deepCollectLines([param.key]),
    }

    return params.reduce(
      (accumulator, param) => accumulator.concat(collectors[param.type]?.(param) ?? []),
      []
    )
  }
}

module.exports = ArgumentsValidator

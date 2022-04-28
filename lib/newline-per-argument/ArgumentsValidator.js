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
    if (this.isOneLine()) {
      return this.isValidOnOneLine()
    }

    return this.isChoppedDown()
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
    // When no params, return false.
    if (this.node.params.length === 0) {
      return true
    }

    // When too many params, or has object pattern
    if (
      this.node.params.length >= 3
      || this.node.params.some(it => it.type === 'ObjectPattern')
    ) {
      return false
    }

    // Is every param identifier?
    if (this.node.params.every(it => it.type === 'Identifier')) {
      return true
    }

    // two params?
    if (this.node.params.length === 2) {
      return false
    }

    const isFirstParamAssignmentPattern = this.node.params[0].type === 'AssignmentPattern'
    const hasNewlineBeforeFirstParam = this.node.loc.start.line < this.node.params[0].loc.start.line

    return !isFirstParamAssignmentPattern
      || hasNewlineBeforeFirstParam
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
    return params.reduce(
      (accumulator, param) => {
        if (param.type === 'Identifier') {
          return accumulator.concat(param.loc.start.line)
        }

        if (param.type === 'AssignmentPattern') {
          return accumulator.concat(
            this.deepCollectLines([param.left])
          )
        }

        if (param.type === 'ObjectPattern') {
          return accumulator
            .concat(
              param.loc.start.line,
              param.loc.end.line,
            )
            .concat(
              this.deepCollectLines(param.properties)
            )
        }

        if (param.type === 'Property') {
          return accumulator.concat(
            this.deepCollectLines([param.key])
          )
        }

        return accumulator
      },
      []
    )
  }
}

module.exports = ArgumentsValidator

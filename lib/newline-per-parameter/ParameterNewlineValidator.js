// @ts-check
'use strict'

class ParameterNewlineValidator {
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

    this.collectors = {
      AssignmentPattern: (param) => this.deepCollectLines([param.left]),
      Identifier: (param) => param.loc.start.line,
      ObjectPattern: (param) => [
        param.loc.end.line,
        ...this.deepCollectLines(param.properties)
      ],
      Property: (param) => this.deepCollectLines([param.key]),
    }
  }

  /**
   * Is valid in this rule.
   *
   * @returns {boolean} - true: valid
   */
  isValid () {
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
      (accumulator, param) => accumulator.concat(this.collectors[param.type]?.(param) ?? []),
      []
    )
  }
}

module.exports = ParameterNewlineValidator
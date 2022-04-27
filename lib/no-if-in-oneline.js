// @ts-check
'use strict'

/**
 * @type {import('eslint/lib/shared/types').Rule}
 */
module.exports = {
  meta: {
    docs: {
      category: '',
      description: 'Forbid if statements to be written on a single line.',
      recommended: false,
      url: 'https://eslint.org',
    },
    hasSuggestions: false,
    messages: {
      errorMessage: 'Forbid if statements to be written on a single line.',
    },
    schema: [],
    type: 'layout',
  },

  /**
   * Create rule handler.
   * @param {import('./shared/types').RuleContext} context - Rule context.
   * @returns {import('./shared/types').RuleHandler} - Rule handler.
   */
  create (context) {
    const excludedStatements = 'EmptyStatement,BlockStatement[body.length=0]'
    const CONSEQUENT_ALTERNATE_SELECTORS = [
      `IfStatement>.consequent:not(${excludedStatements})`,
      `IfStatement>.alternate:not(${excludedStatements},IfStatement)`
    ].join(',')

    return {
      /**
       * Common rule body.
       * @link
       *   https://github.com/estree/estree/blob/master/es5.md#ifstatement
       *   https://github.com/estree/estree/blob/master/es5.md#emptystatement
       *   https://github.com/estree/estree/blob/master/es5.md#blockstatement
       * @param {import('./shared/types').ASTNode} statement - AST node.
       */
      [CONSEQUENT_ALTERNATE_SELECTORS] (statement) {
        const firstStatement = statement.type === 'BlockStatement'
          ? statement.body[0]
          : statement

        if (!firstStatement) {
          return
        }

        // forward test's right parenthesis (consequent) or "else" (alternate) keyword
        const targetToken = context
          .getSourceCode()
          .getTokenBefore(statement)

        if (targetToken.loc.start.line !== firstStatement.loc.start.line) {
          return
        }

        context.report({
          node: firstStatement,
          messageId: 'errorMessage',
        })
      }
    }
  }
}

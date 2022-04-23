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
   * @param {RuleContext} context - Rule context.
   * @returns {RuleHandler} - Rule handler.
   */
  create (context) {
    const IF_BRANCH = 'IfStatement > .consequent'
    const ELSE_BRANCH = 'IfStatement > .alternate'

    return {
      [IF_BRANCH] (statement) {
        handle(statement)
      },

      [ELSE_BRANCH] (statement) {
        if (statement.type === 'IfStatement') {
          return
        }

        handle(statement)
      },
    }

    /**
     * Handle rule check.
     * @param {ASTNode} statement - AST node.
     */
    function handle(statement) {
      if (!isInOneline(statement)
        || isEmptyStatement(statement)
        || isEmptyBlockStatement(statement)
      ) {
        return
      }

      context.report({
        node: getFirstStatement(statement),
        messageId: 'errorMessage',
      })
    }

    /**
     * Indicate whether node is EmptyStatement.
     * @param {ASTNode} statement - AST node.
     * @returns {boolean} - True if is EmptyStatement; otherwise false.
     */
    function isEmptyStatement (statement) {
      return statement.type === 'EmptyStatement'
    }

    /**
     * Indicate whether node is empty BlockStatement.
     * @param {ASTNode} statement - AST node.
     * @returns {boolean} - True if is empty BlockStatement; otherwise false.
     */
    function isEmptyBlockStatement (statement) {
      return statement.type === 'BlockStatement'
        && statement.body.length === 0
    }

    /**
     * Indicate whether ifStatement is in oneline.
     * @param {ASTNode} statement - AST node.
     * @returns {boolean} - True if in oneline; otherwise false.
     */
    function isInOneline (statement) {
      const firstStatement = getFirstStatement(statement)

      if (!firstStatement) {
        return true
      }

      // right parenthesis or else keyword
      const targetToken = context
        .getSourceCode()
        .getTokenBefore(statement)

      return targetToken.loc.start.line === firstStatement.loc.start.line
    }

    /**
     * Get the first statement from the specified statement.
     * @param {ASTNode} statement - AST node.
     * @returns {ASTNode} - First statement of the specified statement if it is block statement;
     *                      otherwise statement itself.
     */
    function getFirstStatement (statement) {
      return statement.type === 'BlockStatement'
        ? statement.body[0]
        : statement
    }
  }
}

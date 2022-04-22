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
    return {
      IfStatement (node) {
        if (!isInOneline(node)
          || isEmptyStatement(node.consequent)
          || isEmptyBlockStatement(node.consequent)
        ) {
          return
        }

        context.report({
          node,
          messageId: 'errorMessage',
        })
      }
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
     * @param {ASTNode} ifStatement - AST node.
     * @returns {boolean} - True if in oneline; otherwise false.
     */
    function isInOneline (ifStatement) {
      return isIfBranchInOneline(ifStatement) || isElseBranchInOneline (ifStatement)
    }

    /**
     * Indicate whether if branch is in oneline.
     * @param {ASTNode} ifStatement - AST node.
     * @returns {boolean} - True if in oneline; otherwise false.
     */
    function isIfBranchInOneline(ifStatement) {
      const firstStatement = ifStatement.consequent.type == 'BlockStatement'
        ? ifStatement.consequent.body[0]
        : ifStatement.consequent

      if (!firstStatement) {
        return true
      }

      const conditionEndToken = context
        .getSourceCode()
        .getTokenAfter(ifStatement.test)

      return conditionEndToken.loc.start.line === firstStatement.loc.start.line
    }

    /**
     * Indicate whether else branch is in oneline.
     * @param {ASTNode} ifStatement - AST node.
     * @returns {boolean} - True if in oneline; otherwise false.
     */
    function isElseBranchInOneline (ifStatement) {
      if (ifStatement.alternate === null
        || ifStatement.alternate.type === 'IfStatement'
        || ifStatement.alternate.type === 'EmptyStatement'
      ) {
        return false
      }

      const firstStatement = ifStatement.alternate.type == 'BlockStatement'
        ? ifStatement.alternate.body[0]
        : ifStatement.alternate

      if (!firstStatement) {
        return false
      }

      const elseToken = context
        .getSourceCode()
        .getTokenBefore(ifStatement.alternate)

      return elseToken.loc.start.line === firstStatement.loc.start.line
    }
  }
}

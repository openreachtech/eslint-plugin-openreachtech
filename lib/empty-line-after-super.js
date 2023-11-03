// @ts-check
'use strict'

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    docs: {
      category: '',
      description: 'Require empty line between super call and other statements.',
      recommended: false,
      url: 'https://eslint.org',
    },
    fixable: 'whitespace',
    hasSuggestions: false,
    messages: {
      errorMessage: 'Require empty line between super call and other statements.',
    },
    schema: [],
    type: 'layout',
  },

  /**
   * Create rule handler.
   *
   * @link
   *   https://github.com/estree/estree/blob/53ab1c7dd29e7f1205ee9f6a6691bf6eaad5fb4b/es2015.md#classdeclaration
   *   https://github.com/estree/estree/blob/53ab1c7dd29e7f1205ee9f6a6691bf6eaad5fb4b/es2015.md#classbody
   *   https://github.com/estree/estree/blob/53ab1c7dd29e7f1205ee9f6a6691bf6eaad5fb4b/es2015.md#methoddefinition
   *   https://github.com/estree/estree/blob/8e4059e6f787d9854874729e225b1758a2e02a20/es5.md#functionexpression
   *   https://github.com/estree/estree/blob/8e4059e6f787d9854874729e225b1758a2e02a20/es5.md#blockstatement
   *   https://github.com/estree/estree/blob/8e4059e6f787d9854874729e225b1758a2e02a20/es5.md#expressionstatement
   *   https://github.com/estree/estree/blob/8e4059e6f787d9854874729e225b1758a2e02a20/es5.md#callexpression
   * @param {import('eslint').Rule.RuleContext} context - Rule context.
   * @returns {import('eslint').Rule.RuleListener} - Rule listener.
   */
  create (context) {
    const SUPER_CALL_SELECTOR = [
      'ClassDeclaration',
      'ClassBody',
      'MethodDefinition[kind="constructor"]',
      'FunctionExpression',
      'BlockStatement',
      'ExpressionStatement:has(CallExpression[callee.type="Super"])',
    ].join('>')

    return {
      [SUPER_CALL_SELECTOR] (superCallStatement) {
        if (hasEmptyLineBetweenSuperAndTheNext()) {
          return
        }

        context.report({
          node: superCallStatement,
          messageId: 'errorMessage',

          /**
           * Fix rule.
           *
           * @param {import('eslint').Rule.RuleFixer} fixer - Fixer
           * @returns {import('eslint').Rule.Fix} - Fix instance.
           */
          fix (fixer) {
            const nextTokenStartPosition = getNextTokenStartPosition()
            const indent = getFixingIndent(nextTokenStartPosition)

            const sourceCode = context.getSourceCode()

            /** @type {import('eslint').AST.Range} */
            const range = [
              (getSuperStatementTailComment() || superCallStatement).range[1],
              sourceCode.getIndexFromLoc(nextTokenStartPosition),
            ]

            return fixer.replaceTextRange(range, `\n\n${indent}`)
          },
        })

        /**
         * Determine whether there are empty lines between super call statement and the following statements.
         *
         * @returns {boolean} - if there is at least one statement after super call statement
         *                      and there are empty lines between them, will return true;
         *                      or there is no statement after super call statement, will return true;
         *                      otherwise, false.
         */
        function hasEmptyLineBetweenSuperAndTheNext () {
          const nextTokenStartPosition = getNextTokenStartPosition()

          if (!nextTokenStartPosition) {
            return true
          }

          const superCallEndLineNumber = superCallStatement.loc.end.line
          const nextTokenStartLineNumber = nextTokenStartPosition.line

          return (nextTokenStartLineNumber - superCallEndLineNumber) > 1
        }

        /**
         * Get next token start position.
         *
         * @returns {import('estree').Position} - next token start position.
         */
        function getNextTokenStartPosition () {
          const nextStatement = findNextStatement()

          if (!nextStatement) {
            return null
          }

          const forestComment = context
            .getSourceCode()
            .getCommentsBefore(nextStatement)
            .filter(comment =>
              comment.loc.start.line !== superCallStatement.loc.end.line
              || comment.loc.start.line !== comment.loc.end.line
            )
            .shift()

          const nextToken = forestComment || nextStatement

          return nextToken.loc.start
        }

        /**
         * Find next statement after super call statement.
         *
         * @returns {import('eslint').Rule.Node} - next AST node.
         */
        function findNextStatement () {
          const blockStatements = superCallStatement.parent.body
          const superIndex = blockStatements.indexOf(superCallStatement)

          return blockStatements[superIndex + 1]
        }

        /**
         * Get fixing indent.
         *
         * @param {import('estree').Position} nextTokenStartPosition - Next token start position.
         * @returns {string} - Fixing indent.
         */
        function getFixingIndent (nextTokenStartPosition) {
          const sourceCode = context.getSourceCode()

          if (nextTokenStartPosition.line !== superCallStatement.loc.end.line) {
            return sourceCode
              .getText()
              .substring(
                sourceCode.getIndexFromLoc({
                  line: nextTokenStartPosition.line,
                  column: 0,
                }),
                sourceCode.getIndexFromLoc(nextTokenStartPosition)
              )
          }

          const prevToken = sourceCode
            .getTokensBefore(
              superCallStatement,
              {
                includeComments: true,
                filter: token =>
                  token.loc.start.line === superCallStatement.loc.start.line
                  || token.loc.end.line === superCallStatement.loc.start.line,
              }
            )
            .shift()

          if (prevToken && prevToken.loc.start.line !== prevToken.loc.end.line) {
            return ''
          }

          const start = superCallStatement.range[0] - superCallStatement.loc.start.column
          const end = (prevToken || superCallStatement).range[0]

          return sourceCode
            .getText()
            .substring(start, end)
        }

        /**
         * Get super statement tail comment.
         *
         * @returns {import('estree').Comment} - Comment token.
         */
        function getSuperStatementTailComment () {
          return context
            .getSourceCode()
            .getCommentsAfter(superCallStatement)
            .filter(comment =>
              comment.loc.start.line === superCallStatement.loc.end.line
              && comment.loc.start.line === comment.loc.end.line
            )
            .shift()
        }
      },
    }
  },
}

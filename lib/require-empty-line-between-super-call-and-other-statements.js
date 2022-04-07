// @ts-check
'use strict'

/** 
 * @type {import('eslint/lib/shared/types').Rule} 
 */
module.exports = {
  meta: {
    type: 'layout',
    category: '',
    docs: {
      description: 'Require empty line between super call and other statements.',
      recommended: false,
      url: 'https://eslint.org',
    },
    hasSuggestions: false,
    messages: {
      errorMessage: 'Require empty line between super call and other statements.',
    },
    schema: [],
    fixable: 'code'
  },

  /**
   * Rule creator.
   * @param {Object} context - context
   * @returns {Object} rule creator.
   */
  create (context) {
    const SUPER_CALL_SELECTOR = 'ClassDeclaration > ClassBody > MethodDefinition[kind="constructor"] > FunctionExpression > BlockStatement > ExpressionStatement:has(CallExpression[callee.type="Super"])'

    return {      
      [SUPER_CALL_SELECTOR] (node) {
        const blockStatements = node.parent.body

        const superIndex = blockStatements.indexOf(node)
        const nextStatements = blockStatements[superIndex + 1]

        if (!nextStatements) {
          return
        }

        const superCallEndLineNumber = node.loc.end.line
        const nextStatementStartLineNumber = nextStatements.loc.start.line
       
        if ((nextStatementStartLineNumber - superCallEndLineNumber) > 1) {
          return
        }

        context.report({
          node,
          messageId: 'errorMessage',
          fix (fixer) {
            const sourceCode = context.getSourceCode()
            const prevToken = sourceCode.getTokenBefore(node, { includeComments: true })

            const start = node.range[0] - node.loc.start.column
            const end = node.range[0]
          
            const indent = (prevToken.range[1] <= start)
              ? sourceCode
                .getText()
                .substring(start, end)
              : ''

            const range = [node.range[1], nextStatements.range[0]]

            return fixer.replaceTextRange(range, `\n\n${indent}`)
          }
        })
      },
    }
  } 
}

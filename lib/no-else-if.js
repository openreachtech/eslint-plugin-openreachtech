// @ts-check
'use strict'

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      category: '',
      description: 'no else-if statement.',
      recommended: false,
      url: 'https://eslint.org',
    },
    hasSuggestions: false,
    messages: {
      neverUseElseIfStatement: 'Never use else-if statement.',
    },
    schema: [],
    type: 'problem',
  },

  /**
   * Create rule handler.
   * @param {import('./shared/types').RuleContext} context - Rule context.
   * @returns {import('./shared/types').RuleHandler} - Rule handler.
   */
  create (context) {
    return {
      /**
       * IFStatement rule.
       * @link https://github.com/estree/estree/blob/master/es5.md#ifstatement
       * @param {import('./shared/types').ASTNode} node - AST node.
       */
      IfStatement (node) {
        if (node.parent.type !== 'IfStatement') {
          return
        }
        if (node.parent.alternate !== node) {
          return
        }

        context.report({
          node,
          messageId: 'neverUseElseIfStatement',
        })
      },
    }
  }
}

'use strict'

/*
 * link
 *   https://github.com/estree/estree/blob/master/es5.md#ifstatement
 */

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
   *
   * @param {import('eslint').Rule.RuleContext} context - Rule context.
   * @returns {import('eslint').Rule.RuleListener} - Rule listener.
   */
  create (context) {
    return {
      /**
       * IFStatement rule.
       *
       * @param {import('eslint').Rule.Node} node - AST node.
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
  },
}

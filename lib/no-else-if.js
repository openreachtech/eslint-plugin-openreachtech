// @ts-check
'use strict'

module.exports = {
  meta: {
    category: '',
    docs: {
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
   * Rule creator.
   * @param {Object} context
   * @returns {Object} - rule creator.
   */
  create (context) {
    return {
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

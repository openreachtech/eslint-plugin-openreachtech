// @ts-check
'use strict'

const ArgumentsValidator = require('./newline-per-argument/ArgumentsValidator')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      category: '',
      description: 'Require to chop down per argument.',
      recommended: false,
      url: 'https://eslint.org',
    },
    hasSuggestions: false,
    messages: {
      errorMessage: 'Require to chop down per argument.',
    },
    schema: [],
    type: 'layout',
  },

  /**
   * Create rule listener.
   *
   * @param {import('eslint').Rule.RuleContext} context - Rule context.
   * @returns {import('eslint').Rule.RuleListener} - Rule listener.
   */
  create (context) {
    const SELECTOR = [
      'ArrowFunctionExpression',
      'FunctionDeclaration',
      'FunctionExpression',
    ].join(',')

    return {
      /**
       * Rule body.
       *
       * @param {import('eslint').Rule.Node} node - AST node.
       */
      [SELECTOR] (node) {
        const validator = new ArgumentsValidator({
          context,
          node,
        })

        if (validator.isValid()) {
          return
        }

        context.report({
          node,
          messageId: 'errorMessage',
        })
      }
    }
  }
}

// @ts-check
'use strict'

const ESLintHelper = require('../tools/ESLintHelper')
const ruleBody = require('../../lib/no-comment-in-expression')

const binaryExpressionCases = require('../no-comment-in-expression_cases/binary-expression_cases')
const conditionalExpressionCases = require('../no-comment-in-expression_cases/conditional-expression_cases')
const logicalExpressionCases = require('../no-comment-in-expression_cases/logical-expression_cases')
const unaryExpressionCases = require('../no-comment-in-expression_cases/unary-expression_cases')
const updateExpressionCases = require('../no-comment-in-expression_cases/update-expression_cases')

const groups = [
  binaryExpressionCases,
  conditionalExpressionCases,
  logicalExpressionCases,
  unaryExpressionCases,
  updateExpressionCases
]

describe('Prohibiting comments in expression.', () => {
  const name = 'no-comment-in-expression'
  const tester = ESLintHelper.createTester()

  describe.each(groups)('$expression', ({ validCodes, invalidCodes }) => {
    tester.run(
      name,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: invalidCodes.map(code => ({ code, errors: [{ messageId: 'errorMessage' }]}))
      }
    )
  })
})

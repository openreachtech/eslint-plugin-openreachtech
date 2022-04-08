// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../tools/ESLintHelper').createTester()

/** @type {Function|Object} */
const ruleBody = require('../../lib/multiline-indent-in-binary-expression')

const theCaseSuggestedByGoogle = `
var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // セミコロンがない

// 3. bash 風な条件文
-1 == resultOfOperation() || die();`

const ruleName = 'multiline-indent-in-binary-expression'

describe('multiline indent in binary expression', () => {
  describe('valid code only', () => {
    const validCodes = [
      'const result = leftOperand - 11',

      `
      const result = leftOperand
        + 11
      `,
      `
      const result = leftOperand
          + 11
      `,
      `
      const result = leftOperand
        - 11
      `,
      `
      const result = leftOperand
          - 11
      `,
      `
      const result = leftOperand
        * 11
      `,
      `
      const result = leftOperand
          * 11
      `,
      `
      const result = leftOperand
        / 11
      `,
      `
      const result = leftOperand
          / 11
      `,
      `
      const result = leftOperand
        % 11
      `,
      `
      const result = leftOperand
          % 11
      `,
      `
      const result = leftOperand
        ** 11
      `,
      `
      const result = leftOperand
          ** 11
      `,
      `
      const result = leftOperand
        | 11
      `,
      `
      const result = leftOperand
        | 11
      `,
      `
      const result = leftOperand
        & 11
      `,
      `
      const result = leftOperand
        & 11
      `,
      `
      const result = leftOperand
        ^ 11
      `,
      `
      const result = leftOperand
        ^ 11
      `,
      `
      const result = leftOperand
        << 4
      `,
      `
      const result = leftOperand
        << 4
      `,
      `
      const result = leftOperand
        >> 6
      `,
      `
      const result = leftOperand
        >> 6
      `,
      `
      const result = leftOperand
        >>> 8
      `,
      `
      const result = leftOperand
        >>> 8
      `,
      `
      const result = leftOperand
        in 8
      `,
      `
      const result = leftOperand
        in 8
      `,
      `
      const result = leftOperand
        instanceof 8
      `,
      `
      const result = leftOperand
        instanceof 8
      `,

      `
      const result = leftOperand
        + rightOperand
        - 11
      `,
      `
      const result = leftOperand
          + rightOperand
          - 11
      `,

      `
      const result =
        leftOperand
        - 11
      `,
      `
      const result =
          leftOperand
          - 11
      `,
      `
      const result =
        leftOperand
        + rightOperand
        - 11
      `,
      `
      const result =
          leftOperand
          + rightOperand
          - 11
      `,

      `
      {
        const result = leftOperand
          - 11
      }`,
      `
      {
        const result = leftOperand
            - 11
      }`,
      `
      {
        const result = leftOperand
          + rightOperand
          - 11
      }`,
      `
      {
        const result =
          leftOperand
          + rightOperand
          - 11
      }`,

      `
      const result = leftOperand
        -1 !== flag || die()`,
      `
      const result = leftOperand
          -1 === flag || die()`,
    ]

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      ruleName,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: [],
      }
    )
  })

  describe('must indent', () => {
    const invalidCodes = [
      [
        [
          `
          const result = leftOperand
          - 1
          `,
          `
            const result = leftOperand
          - 1
          `,
          `
          function getEnv () {
            return this.env.NODE_ENV
            - 'aaaa' // <---------------- should error
          }
          `,
          `
          const result = leftOperand
          -1 === flag || die()`,
          `
            const result = leftOperand
          -1 === flag || die()`,
          theCaseSuggestedByGoogle,
        ],
        ['Must indent second line of infix expression, when chopped down before "-" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          + 11
          `,
          `
            const result = leftOperand
          + 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "+" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          * 11
          `,
          `
            const result = leftOperand
          * 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "*" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          / 11
          `,
          `
            const result = leftOperand
          / 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "/" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          % 11
          `,
          `
            const result = leftOperand
          % 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "%" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          ** 11
          `,
          `
            const result = leftOperand
          ** 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "**" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          | 11
          `,
          `
            const result = leftOperand
          | 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "|" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          & 11
          `,
          `
            const result = leftOperand
          & 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "&" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          ^ 11
          `,
          `
            const result = leftOperand
          ^ 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "^" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          << 11
          `,
          `
            const result = leftOperand
          << 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "<<" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          >> 11
          `,
          `
            const result = leftOperand
          >> 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before ">>" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          >>> 11
          `,
          `
            const result = leftOperand
          >>> 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before ">>>" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          in 11
          `,
          `
            const result = leftOperand
          in 11
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "in" operator.']
      ],
      [
        [
          `
          const result = leftOperand
          instanceof RightOperandClass
          `,
          `
            const result = leftOperand
          instanceof RightOperandClass
          `,
        ],
        ['Must indent second line of infix expression, when chopped down before "instanceof" operator.']
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must align indent left-right operands', () => {
    const invalidCodes = [
      [
        [
          `
          const result =
            leftOperand
              - 1
          `,
          `
          const result =
              leftOperand
            - 1
          `,
          `
          {
            const result =
              leftOperand
                - 11
          }`,
        ],
        [
          'Must align indent before "-" operator to left-operand, when chopped down before left-operand of infix expression.'
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must align indent of operator in nested expressions', () => {
    const invalidCodes = [
      [
        [
          `
          const result = leftOperand
          + rightOperand
            - 11
          `,
          `
          const result = leftOperand
              + rightOperand
            - 11
          `,
          `
          const result = leftOperand
            + rightOperand
              - 11
          `,
          `
          const result =
            leftOperand
          + rightOperand
            - 1
          `,
          `
          const result =
            leftOperand
              + rightOperand
            - 1
          `,
        ],
        [
          'Must align operator in nested infix expressions, when chopped down before "+" operator.'
        ]
      ],
      [
        [
          `
          const result = leftOperand
          * rightOperand
            / 11
          `,
          `
          const result = leftOperand
              * rightOperand
            / 11
          `,
          `
          const result = leftOperand
            * rightOperand
              / 11
          `,
          `
          const result = leftOperand
                * rightOperand
              / 11
          `,
        ],
        [
          'Must align operator in nested infix expressions, when chopped down before "*" operator.'
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must indent (x2)', () => {
    const invalidCodes = [
      [
        [
          `
          const result = leftOperand
          + rightOperand
          - 11
          `,
          `
            const result = leftOperand
          + rightOperand
          - 11
          `,
          `
          {
            const result = leftOperand
            + rightOperand
            - 11
          }
          `,
          `
          {
            const result = leftOperand
          + rightOperand
          - 11
          }
          `,
          `
          function testFunc (xxx) {
            return xxx
            + 9 // <---------------- should error
            - 8
          }
          `,
        ],
        [
          'Must indent second line of infix expression, when chopped down before "-" operator.',
          'Must indent second line of infix expression, when chopped down before "+" operator.',
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must indent // must align indent of operator in nested expressions', () => {
    const invalidCodes = [
      [
        [
          `
          const result = leftOperand
            + rightOperand
          - 11
          `,
          `
            const result = leftOperand
          + rightOperand
            - 11
          `,
          `
            const result = leftOperand
            + rightOperand
          - 11
          `,
        ],
        [
          'Must indent second line of infix expression, when chopped down before "-" operator.',
          'Must align operator in nested infix expressions, when chopped down before "+" operator.',
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must align indent left-right operands // must align indent of operator in nested expressions', () => {
    const invalidCodes = [
      [
        [
          `
          const result =
            leftOperand
            + rightOperand
          - 1
          `,
        ],
        [
          'Must align indent before "-" operator to left-operand, when chopped down before left-operand of infix expression.',
          'Must align operator in nested infix expressions, when chopped down before "+" operator.',
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('must align indent of operator in nested expressions (x2)', () => {
    const invalidCodes = [
      [
        [
          `
          const result =
            leftOperand
            * middleOperand
              + rightOperand
            - 1
          `,
          `
          const result =
            leftOperand
              + middleOperand
            * rightOperand
            - 1
          `,
        ],
        [
          'Must align operator in nested infix expressions, when chopped down before "+" operator.',
          'Must align operator in nested infix expressions, when chopped down before "*" operator.',
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('align each right operand (x2) && nested left-right', () => {
    const invalidCodes = [
      [
        [
          `
          const result =
            leftOperand
              * middleOperand
                + rightOperand
              - 1
          `,
          `
          const result =
            leftOperand
                * middleOperand
              + rightOperand
                - 1
          `,
        ],
        [
          'Must align indent before "-" operator to left-operand, when chopped down before left-operand of infix expression.',
          'Must align operator in nested infix expressions, when chopped down before "+" operator.',
          'Must align operator in nested infix expressions, when chopped down before "*" operator.',
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })

  describe('nested left-right (x2) && align each right operand', () => {
    const invalidCodes = [
      [
        [
          `
          const result =
            leftOperand
            + middleOperand
            * rightOperand
              - 1
          `,
        ],
        [
          'Must align indent before "-" operator to left-operand, when chopped down before left-operand of infix expression.',
          'Must align operator in nested infix expressions, when chopped down before "+" operator.',
          'Must align indent before "*" operator to left-operand, when chopped down before left-operand of infix expression.',
        ]
      ],
    ]

    tester.run(
      ruleName,
      ruleBody,
      {
        valid: [],
        invalid: invalidCodes.flatMap(([codes, errors]) =>
          codes.map(code => ({ code, errors }))
        ),
      }
    )
  })
})

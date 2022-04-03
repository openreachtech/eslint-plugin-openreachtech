// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../tools/ESLintHelper').createTester()

/** @type {Function|Object} */
const ruleBody = require('../../lib/multiline-indent-of-binary-expression')

const theCaseSuggestedByGoogle = `
var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // セミコロンがない

// 3. bash 風な条件文
-1 == resultOfOperation() || die();`

const ruleName = 'multiline-indent-of-binary-expression'
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
    const result = leftOperand
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

describe(ruleName, () => {
  describe('valid code only', () => {
    // tester.run([rule name], [rule defination], [test patterns])
    tester.run(
      ruleName,
      ruleBody,
      {
        valid: validCodes.map(code => ({ code })),
        invalid: [],
      }
    )
  })

  describe('simple indent error (single)', () => {
    const invalidCodes = [
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
          `
          function getEnv () {
            return this.env.NODE_ENV
            + 'aaaa' // <---------------- should error
          }
          `,
        ],
        ['When chopping down by infix operator as "+", it requires indentation after the second line.']
      ],
      [
        [
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
          -1 === flag || die()`,
          `
            const result = leftOperand
          -1 === flag || die()`,
          theCaseSuggestedByGoogle,
        ],
        ['When chopping down by infix operator as "-", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "*", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "/", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "%", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "**", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "|", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "&", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "^", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "<<", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as ">>", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as ">>>", it requires indentation after the second line.']
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
        ['When chopping down by infix operator as "in", it requires indentation after the second line.']
      ],
      [
        [
          `
          const result = leftOperand
          instanceof 11
          `,
          `
            const result = leftOperand
          instanceof 11
          `,
        ],
        ['When chopping down by infix operator as "instanceof", it requires indentation after the second line.']
      ],
    ]

    // tester.run([rule name], [rule defination], [test patterns])
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

  describe('indent of right operand', () => {
    const invalidCodes = [
      [
        [
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
          }`,
          `
          {
            const result = leftOperand
              + rightOperand
                - 11
          }`,
        ],
        ['Different indent of right operand vertically by infix operator as "+".']
      ],
      [
        [
          `
          const result = leftOperand
            * rightOperand
              / 11
          `,
        ],
        ['Different indent of right operand vertically by infix operator as "*".']
      ],
    ]

    // tester.run([rule name], [rule defination], [test patterns])
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

  describe('simple indent error (double)', () => {
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
          'When chopping down by infix operator as "-", it requires indentation after the second line.',
          'When chopping down by infix operator as "+", it requires indentation after the second line.',
        ]
      ],
    ]

    // tester.run([rule name], [rule defination], [test patterns])
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

  describe('simple indent error (complex)', () => {
    const invalidCodes = [
      [
        [
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
          {
            const result = leftOperand
            + rightOperand
          - 11
          }
          `,
        ],
        [
          'When chopping down by infix operator as "-", it requires indentation after the second line.',
          'Different indent of right operand vertically by infix operator as "+".',
        ]
      ],
    ]

    // tester.run([rule name], [rule defination], [test patterns])
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

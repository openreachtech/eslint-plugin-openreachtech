// @ts-check
'use strict'

// ESLint tester instead of Jest `test()`
const tester = require('../../tools/ESLintHelper').createTester()

/** @type {Function|Object} */
const ruleBody = require('../../../lib/indent-in-infix-expression')

const theCaseSuggestedByGoogle = `
var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

// bash-like conditional statements
-1 == resultOfOperation() || die();`

const ruleName = 'indent-in-infix-expression'

describe('BinaryExpression', () => {
  describe('\\n before operator', () => {
    describe('valid code only', () => {
      const validCodes = [
        'const result = leftOperand - 11',

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
          * 11
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
          ** 11
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
          ^ 11
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
          >>> 8
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
            + rightOperand
            - 11
        }`,

        `
        const result = leftOperand
          -1 !== flag || die()`,
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

    describe('Must add indent (x1)', () => {
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
            const result =
            leftOperand
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
          [
            'Must add indent before "-".',
          ]
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
          ['Must add indent before "+".']
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
          ['Must add indent before "*".']
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
          ['Must add indent before "/".']
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
          ['Must add indent before "%".']
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
          ['Must add indent before "**".']
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
          ['Must add indent before "|".']
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
          ['Must add indent before "&".']
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
          ['Must add indent before "^".']
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
          ['Must add indent before "<<".']
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
          ['Must add indent before ">>".']
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
          ['Must add indent before ">>>".']
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
          ['Must add indent before "in".']
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
          ['Must add indent before "instanceof".']
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

    describe('Must remove indent (x1)', () => {
      const invalidCodes = [
        [
          [
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
            'Must remove indent before "-".',
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

    describe('Must add indent (x1), Must remove indent (x1)', () => {
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
            const result = leftOperand
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
            const result =
              leftOperand
          + rightOperand
                    - 11
            `,
          ],
          [
            'Must remove indent before "-".',
            'Must add indent before "+".',
          ]
        ],
        [
          [
            `
            const result = leftOperand
            + rightOperand
                * 11
            `,
            `
            const result = leftOperand
          + rightOperand
                * 11
            `,
            `
            const result = leftOperand
            + rightOperand
                  * 11
            `,
            `
            const result = leftOperand
         + rightOperand
                  * 11
            `,

            `
            const result =
              leftOperand
            + rightOperand
                * 11
            `,
            `
            const result =
              leftOperand
          + rightOperand
                * 11
            `,
            `
            const result =
              leftOperand
            + rightOperand
                  * 11
            `,
            `
            const result =
              leftOperand
          + rightOperand
                    * 11
            `,
          ],
          [
            'Must add indent before "+".',
            'Must remove indent before "*".',
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

    describe('three errors', () => {
      const invalidCodes = [
        [
          [
            `
            const result = firstOperand
            + secondOperand
            * thirdOperand
            - fourthOperand
            `,
            `
            const result =
              firstOperand
            + secondOperand
            * thirdOperand
            - fourthOperand
            `,
          ],
          [
            // in operating priority low to hight.
            'Must add indent before "-".',
            'Must add indent before "+".',
            'Must add indent before "*".',
          ]
        ],
        [
          [
            `
            const result = firstOperand
                + secondOperand
            * thirdOperand
            - fourthOperand
            `,
            `
            const result =
              firstOperand
                + secondOperand
            * thirdOperand
            - fourthOperand
            `,
          ],
          [
            'Must add indent before "-".',
            'Must remove indent before "+".',
            'Must add indent before "*".',
          ]
        ],
        [
          [
            `
            const result = firstOperand
            + secondOperand
                * thirdOperand
            - fourthOperand
            `,
            `
            const result =
              firstOperand
            + secondOperand
                * thirdOperand
            - fourthOperand
            `,
          ],
          [
            'Must add indent before "-".',
            'Must add indent before "+".',
            'Must remove indent before "*".',
          ]
        ],
        [
          [
            `
            const result = firstOperand
            + secondOperand
            * thirdOperand
                - fourthOperand
            `,
            `
            const result =
              firstOperand
            + secondOperand
            * thirdOperand
                - fourthOperand
            `,
          ],
          [
            'Must remove indent before "-".',
            'Must add indent before "+".',
            'Must add indent before "*".',
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

  describe('\\n before right operand', () => {
    describe('valid code only', () => {
      const validCodes = [
        `
        const result = leftOperand +
          11
        `,
        `
        const result = leftOperand -
          11
        `,
        `
        const result = leftOperand *
          11
        `,
        `
        const result = leftOperand /
          11
        `,
        `
        const result = leftOperand %
          11
        `,
        `
        const result = leftOperand **
          11
        `,
        `
        const result = leftOperand |
          11
        `,
        `
        const result = leftOperand &
          11
        `,
        `
        const result = leftOperand ^
          11
        `,
        `
        const result = leftOperand <<
          4
        `,
        `
        const result = leftOperand >>
          6
        `,
        `
        const result = leftOperand >>>
          8
        `,
        `
        const result = leftOperand in
          8
        `,
        `
        const result = leftOperand instanceof
          8
        `,

        `
        const result = leftOperand +
          rightOperand -
          11
        `,

        `
        const result =
          leftOperand -
          11
        `,
        `
        const result =
          leftOperand +
          rightOperand -
          11
        `,

        `
        const result = leftOperand +
          11
        `,
        `
        const result = leftOperand +
          11 - 22
        `,
        `
        const result = leftOperand +
          11 - 22 +
          33
        `,

        `
        const result =
          leftOperand *
          rightOperand *
          11
        `,

        `
        {
          const result = leftOperand -
            11
        }`,
        `
        {
          const result = leftOperand +
            rightOperand -
            11
        }`,
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

    describe('Must add indent (x1)', () => {
      const invalidCodes = [
        [
          [
            `
            const result = leftOperand -
            1
            `,
            `
              const result = leftOperand -
            1
            `,
            `
            const result =
              leftOperand -
            1
            `,
            `
            const result =
                leftOperand -
              1
            `,
            `
            const result =
            leftOperand -
          1
            `,
          ],
          [
            'Must add indent before right operand of "-".',
          ]
        ],
        [
          [
            `
            const result = leftOperand +
            11
            `,
            `
              const result = leftOperand +
            11
            `,
            `
            function getEnv () {
              return this.env.NODE_ENV +
              'aaaa' // <---------------- should error
            }
            `,
          ],
          ['Must add indent before right operand of "+".']
        ],
        [
          [
            `
            const result = leftOperand *
            11
            `,
            `
              const result = leftOperand *
            11
            `,
          ],
          ['Must add indent before right operand of "*".']
        ],
        [
          [
            `
            const result = leftOperand /
            11
            `,
            `
              const result = leftOperand /
            11
            `,
          ],
          ['Must add indent before right operand of "/".']
        ],
        [
          [
            `
            const result = leftOperand %
            11
            `,
            `
              const result = leftOperand %
            11
            `,
          ],
          ['Must add indent before right operand of "%".']
        ],
        [
          [
            `
            const result = leftOperand **
            11
            `,
            `
              const result = leftOperand **
            11
            `,
          ],
          ['Must add indent before right operand of "**".']
        ],
        [
          [
            `
            const result = leftOperand |
            11
            `,
            `
              const result = leftOperand |
            11
            `,
          ],
          ['Must add indent before right operand of "|".']
        ],
        [
          [
            `
            const result = leftOperand &
            11
            `,
            `
              const result = leftOperand &
            11
            `,
          ],
          ['Must add indent before right operand of "&".']
        ],
        [
          [
            `
            const result = leftOperand ^
            11
            `,
            `
              const result = leftOperand ^
            11
            `,
          ],
          ['Must add indent before right operand of "^".']
        ],
        [
          [
            `
            const result = leftOperand <<
            11
            `,
            `
              const result = leftOperand <<
            11
            `,
          ],
          ['Must add indent before right operand of "<<".']
        ],
        [
          [
            `
            const result = leftOperand >>
            11
            `,
            `
              const result = leftOperand >>
            11
            `,
          ],
          ['Must add indent before right operand of ">>".']
        ],
        [
          [
            `
            const result = leftOperand >>>
            11
            `,
            `
              const result = leftOperand >>>
            11
            `,
          ],
          ['Must add indent before right operand of ">>>".']
        ],
        [
          [
            `
            const result = leftOperand in
            11
            `,
            `
              const result = leftOperand in
            11
            `,
          ],
          ['Must add indent before right operand of "in".']
        ],
        [
          [
            `
            const result = leftOperand instanceof
            RightOperandClass
            `,
            `
              const result = leftOperand instanceof
            RightOperandClass
            `,
          ],
          ['Must add indent before right operand of "instanceof".']
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

    describe('Must remove indent (x1)', () => {
      const invalidCodes = [
        [
          [
            `
            const result =
              leftOperand -
                1
            `,
            `
            {
              const result =
                leftOperand -
                  11
            }`,
          ],
          [
            'Must remove indent before right operand of "-".',
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

    describe('Must add indent (x1), Must remove indent (x1)', () => {
      const invalidCodes = [
        [
          [
            `
            const result = leftOperand +
            rightOperand -
                11
            `,
            `
            const result = leftOperand +
          rightOperand -
                11
            `,
            `
            const result = leftOperand +
            rightOperand -
                  11
            `,
            `
            const result = leftOperand +
         rightOperand -
                  11
            `,

            `
            const result =
              leftOperand +
            rightOperand -
                11
            `,
            `
            const result =
              leftOperand +
          rightOperand -
                11
            `,
            `
            const result =
              leftOperand +
            rightOperand -
                  11
            `,
            `
            const result =
              leftOperand +
          rightOperand -
                    11
            `,
          ],
          [
            'Must remove indent before right operand of "-".',
            'Must add indent before right operand of "+".',
          ]
        ],
        [
          [
            `
            const result = leftOperand +
            rightOperand               *
                11
            `,
            `
            const result = leftOperand +
          rightOperand *
                11
            `,
            `
            const result = leftOperand +
            rightOperand *
                  11
            `,
            `
            const result = leftOperand +
         rightOperand *
                  11
            `,

            `
            const result =
              leftOperand +
            rightOperand *
                11
            `,
            `
            const result =
              leftOperand +
          rightOperand *
                11
            `,
            `
            const result =
              leftOperand +
            rightOperand *
                  11
            `,
            `
            const result =
              leftOperand +
          rightOperand *
                    11
            `,
          ],
          [
            'Must add indent before right operand of "+".',
            'Must remove indent before right operand of "*".',
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

    describe('three errors', () => {
      const invalidCodes = [
        [
          [
            `
            const result = firstOperand +
            secondOperand *
          thirdOperand -
          fourthOperand
            `,
            `
            const result =
              firstOperand +
            secondOperand *
          thirdOperand -
          fourthOperand
            `,
          ],
          [
            // in operating priority low to hight.
            'Must add indent before right operand of "-".',
            'Must add indent before right operand of "+".',
            'Must add indent before right operand of "*".',
          ]
        ],
        [
          [
            `
            const result = firstOperand +
                secondOperand *
            thirdOperand -
            fourthOperand
            `,
            `
            const result =
              firstOperand +
                secondOperand *
            thirdOperand -
            fourthOperand
            `,
          ],
          [
            'Must add indent before right operand of "-".',
            'Must remove indent before right operand of "+".',
            'Must add indent before right operand of "*".',
          ]
        ],
        [
          [
            `
            const result = firstOperand +
            secondOperand *
                thirdOperand -
            fourthOperand
            `,
            `
            const result =
              firstOperand +
            secondOperand *
                thirdOperand -
            fourthOperand
            `,
          ],
          [
            'Must add indent before right operand of "-".',
            'Must add indent before right operand of "+".',
            'Must remove indent before right operand of "*".',
          ]
        ],
        [
          [
            `
            const result = firstOperand +
            secondOperand *
          thirdOperand -
                fourthOperand
            `,
            `
            const result =
              firstOperand +
            secondOperand *
          thirdOperand -
                fourthOperand
            `,
          ],
          [
            'Must remove indent before right operand of "-".',
            'Must add indent before right operand of "+".',
            'Must add indent before right operand of "*".',
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
})

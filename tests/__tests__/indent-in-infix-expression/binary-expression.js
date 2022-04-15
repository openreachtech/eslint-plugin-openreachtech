// @ts-check
'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')

/** @type {Function|Object} */
const ruleBody = require('../../../lib/indent-in-infix-expression')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

const theCaseSuggestedByGoogle = {
  code: `
    var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

    // bash-like conditional statements
    -1 == resultOfOperation() || die();`,
  output: `
    var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // no semi-colon

    // bash-like conditional statements
      -1 == resultOfOperation() || die();`,
}

const ruleName = 'indent-in-infix-expression'

describe('BinaryExpression', () => {
  describe('default options as { indent: 2 }', () => {
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
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = leftOperand
                  - 1
                `,
                output: `
                  const result = leftOperand
                    - 1
                `,
              },
              {
                code: `
                  const result = leftOperand
                - 1
              `,
                output: `
                  const result = leftOperand
                    - 1
              `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  - 1
                `,
                output: `
                  const result =
                    leftOperand
                    - 1
                `,
              },
              {
                code: `
                  const result =
                      leftOperand
                    - 1
                `,
                output: `
                  const result =
                      leftOperand
                      - 1
                `,
              },
              {
                code: `
                  const result =
                  leftOperand
                - 1
                `,
                output: `
                  const result =
                  leftOperand
                  - 1
                `,
              },
              {
                code: `
                  function getEnv () {
                    return this.env.NODE_ENV
                    - 'aaaa' // <---------------- should error
                  }
                `,
                output: `
                  function getEnv () {
                    return this.env.NODE_ENV
                      - 'aaaa' // <---------------- should error
                  }
                `,
              },
              {
                code: `
                  const result = leftOperand
                  -1 === flag || die()`,
                output: `
                  const result = leftOperand
                    -1 === flag || die()`,
              },
              {
                code: `
                  const result = leftOperand
                -1 === flag || die()`,
                output: `
                  const result = leftOperand
                    -1 === flag || die()`,
              },
              theCaseSuggestedByGoogle,
            ],
            [
              'Must add indent before "-".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  + 11
                `,
                output: `
                  const result = leftOperand
                    + 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                + 11
              `,
                output: `
                  const result = leftOperand
                    + 11
              `,
              },
            ],
            ['Must add indent before "+".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  * 11
                `,
                output: `
                  const result = leftOperand
                    * 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                * 11
              `,
                output: `
                  const result = leftOperand
                    * 11
              `,
              },
            ],
            ['Must add indent before "*".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  / 11
                `,
                output: `
                  const result = leftOperand
                    / 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                / 11
              `,
                output: `
                  const result = leftOperand
                    / 11
              `,
              },
            ],
            ['Must add indent before "/".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  % 11
                `,
                output: `
                  const result = leftOperand
                    % 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                % 11
              `,
                output: `
                  const result = leftOperand
                    % 11
              `,
              },
            ],
            ['Must add indent before "%".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  ** 11
                `,
                output: `
                  const result = leftOperand
                    ** 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                ** 11
              `,
                output: `
                  const result = leftOperand
                    ** 11
              `,
              },
            ],
            ['Must add indent before "**".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  | 11
                `,
                output: `
                  const result = leftOperand
                    | 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                | 11
              `,
                output: `
                  const result = leftOperand
                    | 11
              `,
              },
            ],
            ['Must add indent before "|".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  & 11
                `,
                output: `
                  const result = leftOperand
                    & 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                & 11
              `,
                output: `
                  const result = leftOperand
                    & 11
              `,
              },
            ],
            ['Must add indent before "&".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  ^ 11
                `,
                output: `
                  const result = leftOperand
                    ^ 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                ^ 11
              `,
                output: `
                  const result = leftOperand
                    ^ 11
              `,
              },
            ],
            ['Must add indent before "^".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  << 11
                `,
                output: `
                  const result = leftOperand
                    << 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                << 11
              `,
                output: `
                  const result = leftOperand
                    << 11
              `,
              },
            ],
            ['Must add indent before "<<".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  >> 11
                `,
                output: `
                  const result = leftOperand
                    >> 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                >> 11
              `,
                output: `
                  const result = leftOperand
                    >> 11
              `,
              },
            ],
            ['Must add indent before ">>".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  >>> 11
                `,
                output: `
                  const result = leftOperand
                    >>> 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                >>> 11
              `,
                output: `
                  const result = leftOperand
                    >>> 11
              `,
              },
            ],
            ['Must add indent before ">>>".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  in 11
                `,
                output: `
                  const result = leftOperand
                    in 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                in 11
              `,
                output: `
                  const result = leftOperand
                    in 11
              `,
              },
            ],
            ['Must add indent before "in".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  instanceof RightOperandClass
                `,
                output: `
                  const result = leftOperand
                    instanceof RightOperandClass
                `,
              },
              {
                code: `
                  const result = leftOperand
                instanceof RightOperandClass
              `,
                output: `
                  const result = leftOperand
                    instanceof RightOperandClass
              `,
              },
            ],
            ['Must add indent before "instanceof".']
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result =
                    leftOperand
                      - 1
                `,
                output: `
                  const result =
                    leftOperand
                    - 1
                `,
              },
              {
                code: `
                  {
                    const result =
                      leftOperand
                        - 11
                  }`,
                output: `
                  {
                    const result =
                      leftOperand
                      - 11
                  }`,
              },
            ],
            [
              'Must remove indent before "-".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('Must add indent (x1), Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = leftOperand
                  + rightOperand
                      - 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                + rightOperand
                      - 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                  + rightOperand
                        - 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result = leftOperand
              + rightOperand
                        - 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  + rightOperand
                      - 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                + rightOperand
                      - 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  + rightOperand
                        - 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                + rightOperand
                          - 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    - 11
                `,
              },
            ],
            [
              'Must remove indent before "-".',
              'Must add indent before "+".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  + rightOperand
                      * 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                + rightOperand
                      * 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                  + rightOperand
                        * 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result = leftOperand
              + rightOperand
                        * 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  + rightOperand
                      * 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                + rightOperand
                      * 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  + rightOperand
                        * 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                + rightOperand
                          * 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                      leftOperand
                  + rightOperand
                            * 11
                `,
                output: `
                  const result =
                      leftOperand
                      + rightOperand
                      * 11
                `,
              },
            ],
            [
              'Must add indent before "+".',
              'Must remove indent before "*".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('three errors', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = firstOperand
                  + secondOperand
                  * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand
                  + secondOperand
                  * thirdOperand
                  - fourthOperand
                  `,
                output: `
                  const result =
                    firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                  `,
              },
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
              {
                code: `
                  const result = firstOperand
                      + secondOperand
                  * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand
                      + secondOperand
                  * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result =
                    firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
            ],
            [
              'Must add indent before "-".',
              'Must remove indent before "+".',
              'Must add indent before "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = firstOperand
                  + secondOperand
                      * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand
                  + secondOperand
                      * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result =
                    firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
            ],
            [
              'Must add indent before "-".',
              'Must add indent before "+".',
              'Must remove indent before "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = firstOperand
                  + secondOperand
                  * thirdOperand
                      - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand
                  + secondOperand
                  * thirdOperand
                      - fourthOperand
                `,
                output: `
                  const result =
                    firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },


            ],
            [
              'Must remove indent before "-".',
              'Must add indent before "+".',
              'Must add indent before "*".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
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
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = leftOperand -
                  1
                `,
                output: `
                  const result = leftOperand -
                    1
                `,
              },
              {
                code: `
                  const result = leftOperand -
                1
              `,
                output: `
                  const result = leftOperand -
                    1
              `,
              },
              {
                code: `
                  const result =
                    leftOperand -
                  1
                `,
                output: `
                  const result =
                    leftOperand -
                    1
                `,
              },
              {
                code: `
                  const result =
                      leftOperand -
                    1
                `,
                output: `
                  const result =
                      leftOperand -
                      1
                `,
              },
              {
                code: `
                  const result =
                  leftOperand -
                1
                `,
                output: `
                  const result =
                  leftOperand -
                  1
                `,
              },
            ],
            [
              'Must add indent before right operand of "-".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand +
                  11
                `,
                output: `
                  const result = leftOperand +
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                11
              `,
                output: `
                  const result = leftOperand +
                    11
              `,
              },
              {
                code: `
                  function getEnv () {
                    return this.env.NODE_ENV +
                    'aaaa' // <---------------- should error
                  }
                `,
                output: `
                  function getEnv () {
                    return this.env.NODE_ENV +
                      'aaaa' // <---------------- should error
                  }
                `,
              },
            ],
            [
              'Must add indent before right operand of "+".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand *
                  11
                `,
                output: `
                  const result = leftOperand *
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand *
                11
              `,
                output: `
                  const result = leftOperand *
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand /
                  11
                `,
                output: `
                  const result = leftOperand /
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand /
                11
              `,
                output: `
                  const result = leftOperand /
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "/".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand %
                  11
                `,
                output: `
                  const result = leftOperand %
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand %
                11
              `,
                output: `
                  const result = leftOperand %
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "%".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand **
                  11
                `,
                output: `
                  const result = leftOperand **
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand **
                11
              `,
                output: `
                  const result = leftOperand **
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "**".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand |
                  11
                `,
                output: `
                  const result = leftOperand |
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand |
                11
              `,
                output: `
                  const result = leftOperand |
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "|".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand &
                  11
                `,
                output: `
                  const result = leftOperand &
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand &
                11
              `,
                output: `
                  const result = leftOperand &
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "&".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand ^
                  11
                `,
                output: `
                  const result = leftOperand ^
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand ^
                11
              `,
                output: `
                  const result = leftOperand ^
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "^".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand <<
                  11
                `,
                output: `
                  const result = leftOperand <<
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand <<
                11
              `,
                output: `
                  const result = leftOperand <<
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "<<".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand >>
                  11
                `,
                output: `
                  const result = leftOperand >>
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand >>
                11
              `,
                output: `
                  const result = leftOperand >>
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of ">>".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand >>>
                  11
                `,
                output: `
                  const result = leftOperand >>>
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand >>>
                11
              `,
                output: `
                  const result = leftOperand >>>
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of ">>>".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand in
                  11
                `,
                output: `
                  const result = leftOperand in
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand in
                11
              `,
                output: `
                  const result = leftOperand in
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "in".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand instanceof
                  RightOperandClass
                `,
                output: `
                  const result = leftOperand instanceof
                    RightOperandClass
                `,
              },
              {
                code: `
                  const result = leftOperand instanceof
                RightOperandClass
              `,
                output: `
                  const result = leftOperand instanceof
                    RightOperandClass
              `,
              },
            ],
            [
              'Must add indent before right operand of "instanceof".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result =
                    leftOperand -
                      1
                `,
                output: `
                  const result =
                    leftOperand -
                    1
                `,
              },
              {
                code: `
                {
                  const result =
                    leftOperand -
                      11
                }`,
                output: `
                {
                  const result =
                    leftOperand -
                    11
                }`,
              },
            ],
            [
              'Must remove indent before right operand of "-".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('Must add indent (x1), Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = leftOperand +
                  rightOperand -
                      11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                rightOperand -
                      11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                  rightOperand -
                        11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
              rightOperand -
                        11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                  rightOperand -
                      11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                rightOperand -
                      11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                  rightOperand -
                        11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                rightOperand -
                          11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand -
                    11
                `,
              },
            ],
            [
              'Must remove indent before right operand of "-".',
              'Must add indent before right operand of "+".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand +
                  rightOperand *
                      11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                rightOperand *
                      11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                  rightOperand *
                        11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
              rightOperand *
                        11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                  rightOperand *
                      11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                rightOperand *
                      11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                  rightOperand *
                        11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                rightOperand *
                          11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand *
                    11
                `,
              },
            ],
            [
              'Must add indent before right operand of "+".',
              'Must remove indent before right operand of "*".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('three errors', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = firstOperand +
                  secondOperand *
                thirdOperand -
                fourthOperand
                `,
                output: `
                  const result = firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand +
                  secondOperand *
                thirdOperand -
                fourthOperand
                `,
                output: `
                  const result =
                    firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
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
              {
                code: `
                  const result = firstOperand +
                      secondOperand *
                  thirdOperand -
                  fourthOperand
                `,
                output: `
                  const result = firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand +
                      secondOperand *
                  thirdOperand -
                  fourthOperand
                `,
                output: `
                  const result =
                    firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
            ],
            [
              'Must add indent before right operand of "-".',
              'Must remove indent before right operand of "+".',
              'Must add indent before right operand of "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = firstOperand +
                  secondOperand *
                      thirdOperand -
                  fourthOperand
                `,
                output: `
                  const result = firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand +
                  secondOperand *
                      thirdOperand -
                  fourthOperand
                `,
                output: `
                  const result =
                    firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
            ],
            [
              'Must add indent before right operand of "-".',
              'Must add indent before right operand of "+".',
              'Must remove indent before right operand of "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = firstOperand +
                  secondOperand *
                thirdOperand -
                      fourthOperand
                `,
                output: `
                  const result = firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand +
                  secondOperand *
                thirdOperand -
                      fourthOperand
                `,
                output: `
                  const result =
                    firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
            ],
            [
              'Must remove indent before right operand of "-".',
              'Must add indent before right operand of "+".',
              'Must add indent before right operand of "*".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })
    })
  })

  describe('options: { indent: 4 }', () => {
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
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = leftOperand
                  - 1
                `,
                output: `
                  const result = leftOperand
                    - 1
                `,
              },
              {
                code: `
                  const result = leftOperand
                - 1
              `,
                output: `
                  const result = leftOperand
                    - 1
              `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  - 1
                `,
                output: `
                  const result =
                    leftOperand
                    - 1
                `,
              },
              {
                code: `
                  const result =
                      leftOperand
                    - 1
                `,
                output: `
                  const result =
                      leftOperand
                      - 1
                `,
              },
              {
                code: `
                  const result =
                  leftOperand
                - 1
                `,
                output: `
                  const result =
                  leftOperand
                  - 1
                `,
              },
              {
                code: `
                  function getEnv () {
                    return this.env.NODE_ENV
                    - 'aaaa' // <---------------- should error
                  }
                `,
                output: `
                  function getEnv () {
                    return this.env.NODE_ENV
                      - 'aaaa' // <---------------- should error
                  }
                `,
              },
              {
                code: `
                  const result = leftOperand
                  -1 === flag || die()`,
                output: `
                  const result = leftOperand
                    -1 === flag || die()`,
              },
              {
                code: `
                  const result = leftOperand
                -1 === flag || die()`,
                output: `
                  const result = leftOperand
                    -1 === flag || die()`,
              },
              theCaseSuggestedByGoogle,
            ],
            [
              'Must add indent before "-".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  + 11
                `,
                output: `
                  const result = leftOperand
                    + 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                + 11
              `,
                output: `
                  const result = leftOperand
                    + 11
              `,
              },
            ],
            ['Must add indent before "+".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  * 11
                `,
                output: `
                  const result = leftOperand
                    * 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                * 11
              `,
                output: `
                  const result = leftOperand
                    * 11
              `,
              },
            ],
            ['Must add indent before "*".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  / 11
                `,
                output: `
                  const result = leftOperand
                    / 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                / 11
              `,
                output: `
                  const result = leftOperand
                    / 11
              `,
              },
            ],
            ['Must add indent before "/".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  % 11
                `,
                output: `
                  const result = leftOperand
                    % 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                % 11
              `,
                output: `
                  const result = leftOperand
                    % 11
              `,
              },
            ],
            ['Must add indent before "%".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  ** 11
                `,
                output: `
                  const result = leftOperand
                    ** 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                ** 11
              `,
                output: `
                  const result = leftOperand
                    ** 11
              `,
              },
            ],
            ['Must add indent before "**".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  | 11
                `,
                output: `
                  const result = leftOperand
                    | 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                | 11
              `,
                output: `
                  const result = leftOperand
                    | 11
              `,
              },
            ],
            ['Must add indent before "|".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  & 11
                `,
                output: `
                  const result = leftOperand
                    & 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                & 11
              `,
                output: `
                  const result = leftOperand
                    & 11
              `,
              },
            ],
            ['Must add indent before "&".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  ^ 11
                `,
                output: `
                  const result = leftOperand
                    ^ 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                ^ 11
              `,
                output: `
                  const result = leftOperand
                    ^ 11
              `,
              },
            ],
            ['Must add indent before "^".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  << 11
                `,
                output: `
                  const result = leftOperand
                    << 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                << 11
              `,
                output: `
                  const result = leftOperand
                    << 11
              `,
              },
            ],
            ['Must add indent before "<<".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  >> 11
                `,
                output: `
                  const result = leftOperand
                    >> 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                >> 11
              `,
                output: `
                  const result = leftOperand
                    >> 11
              `,
              },
            ],
            ['Must add indent before ">>".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  >>> 11
                `,
                output: `
                  const result = leftOperand
                    >>> 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                >>> 11
              `,
                output: `
                  const result = leftOperand
                    >>> 11
              `,
              },
            ],
            ['Must add indent before ">>>".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  in 11
                `,
                output: `
                  const result = leftOperand
                    in 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                in 11
              `,
                output: `
                  const result = leftOperand
                    in 11
              `,
              },
            ],
            ['Must add indent before "in".']
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  instanceof RightOperandClass
                `,
                output: `
                  const result = leftOperand
                    instanceof RightOperandClass
                `,
              },
              {
                code: `
                  const result = leftOperand
                instanceof RightOperandClass
              `,
                output: `
                  const result = leftOperand
                    instanceof RightOperandClass
              `,
              },
            ],
            ['Must add indent before "instanceof".']
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result =
                    leftOperand
                      - 1
                `,
                output: `
                  const result =
                    leftOperand
                    - 1
                `,
              },
              {
                code: `
                  {
                    const result =
                      leftOperand
                        - 11
                  }`,
                output: `
                  {
                    const result =
                      leftOperand
                      - 11
                  }`,
              },
            ],
            [
              'Must remove indent before "-".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('Must add indent (x1), Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = leftOperand
                  + rightOperand
                      - 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                + rightOperand
                      - 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                  + rightOperand
                        - 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result = leftOperand
              + rightOperand
                        - 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  + rightOperand
                      - 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                + rightOperand
                      - 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  + rightOperand
                        - 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    - 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                + rightOperand
                          - 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    - 11
                `,
              },
            ],
            [
              'Must remove indent before "-".',
              'Must add indent before "+".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand
                  + rightOperand
                      * 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                + rightOperand
                      * 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result = leftOperand
                  + rightOperand
                        * 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result = leftOperand
              + rightOperand
                        * 11
                `,
                output: `
                  const result = leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  + rightOperand
                      * 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                + rightOperand
                      * 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                  + rightOperand
                        * 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand
                + rightOperand
                          * 11
                `,
                output: `
                  const result =
                    leftOperand
                    + rightOperand
                    * 11
                `,
              },
              {
                code: `
                  const result =
                      leftOperand
                  + rightOperand
                            * 11
                `,
                output: `
                  const result =
                      leftOperand
                      + rightOperand
                      * 11
                `,
              },
            ],
            [
              'Must add indent before "+".',
              'Must remove indent before "*".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('three errors', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = firstOperand
                  + secondOperand
                  * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand
                  + secondOperand
                  * thirdOperand
                  - fourthOperand
                  `,
                output: `
                  const result =
                    firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                  `,
              },
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
              {
                code: `
                  const result = firstOperand
                      + secondOperand
                  * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand
                      + secondOperand
                  * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result =
                    firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
            ],
            [
              'Must add indent before "-".',
              'Must remove indent before "+".',
              'Must add indent before "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = firstOperand
                  + secondOperand
                      * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result = firstOperand
                  + secondOperand
                      * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand
                  + secondOperand
                      * thirdOperand
                  - fourthOperand
                `,
                output: `
                  const result =
                    firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
            ],
            [
              'Must add indent before "-".',
              'Must add indent before "+".',
              'Must remove indent before "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = firstOperand
                  + secondOperand
                  * thirdOperand
                      - fourthOperand
                `,
                output: `
                  const result = firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand
                  + secondOperand
                  * thirdOperand
                      - fourthOperand
                `,
                output: `
                  const result =
                    firstOperand
                    + secondOperand
                    * thirdOperand
                    - fourthOperand
                `,
              },


            ],
            [
              'Must remove indent before "-".',
              'Must add indent before "+".',
              'Must add indent before "*".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
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
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = leftOperand -
                  1
                `,
                output: `
                  const result = leftOperand -
                    1
                `,
              },
              {
                code: `
                  const result = leftOperand -
                1
              `,
                output: `
                  const result = leftOperand -
                    1
              `,
              },
              {
                code: `
                  const result =
                    leftOperand -
                  1
                `,
                output: `
                  const result =
                    leftOperand -
                    1
                `,
              },
              {
                code: `
                  const result =
                      leftOperand -
                    1
                `,
                output: `
                  const result =
                      leftOperand -
                      1
                `,
              },
              {
                code: `
                  const result =
                  leftOperand -
                1
                `,
                output: `
                  const result =
                  leftOperand -
                  1
                `,
              },
            ],
            [
              'Must add indent before right operand of "-".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand +
                  11
                `,
                output: `
                  const result = leftOperand +
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                11
              `,
                output: `
                  const result = leftOperand +
                    11
              `,
              },
              {
                code: `
                  function getEnv () {
                    return this.env.NODE_ENV +
                    'aaaa' // <---------------- should error
                  }
                `,
                output: `
                  function getEnv () {
                    return this.env.NODE_ENV +
                      'aaaa' // <---------------- should error
                  }
                `,
              },
            ],
            [
              'Must add indent before right operand of "+".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand *
                  11
                `,
                output: `
                  const result = leftOperand *
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand *
                11
              `,
                output: `
                  const result = leftOperand *
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand /
                  11
                `,
                output: `
                  const result = leftOperand /
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand /
                11
              `,
                output: `
                  const result = leftOperand /
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "/".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand %
                  11
                `,
                output: `
                  const result = leftOperand %
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand %
                11
              `,
                output: `
                  const result = leftOperand %
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "%".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand **
                  11
                `,
                output: `
                  const result = leftOperand **
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand **
                11
              `,
                output: `
                  const result = leftOperand **
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "**".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand |
                  11
                `,
                output: `
                  const result = leftOperand |
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand |
                11
              `,
                output: `
                  const result = leftOperand |
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "|".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand &
                  11
                `,
                output: `
                  const result = leftOperand &
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand &
                11
              `,
                output: `
                  const result = leftOperand &
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "&".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand ^
                  11
                `,
                output: `
                  const result = leftOperand ^
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand ^
                11
              `,
                output: `
                  const result = leftOperand ^
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "^".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand <<
                  11
                `,
                output: `
                  const result = leftOperand <<
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand <<
                11
              `,
                output: `
                  const result = leftOperand <<
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "<<".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand >>
                  11
                `,
                output: `
                  const result = leftOperand >>
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand >>
                11
              `,
                output: `
                  const result = leftOperand >>
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of ">>".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand >>>
                  11
                `,
                output: `
                  const result = leftOperand >>>
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand >>>
                11
              `,
                output: `
                  const result = leftOperand >>>
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of ">>>".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand in
                  11
                `,
                output: `
                  const result = leftOperand in
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand in
                11
              `,
                output: `
                  const result = leftOperand in
                    11
              `,
              },
            ],
            [
              'Must add indent before right operand of "in".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand instanceof
                  RightOperandClass
                `,
                output: `
                  const result = leftOperand instanceof
                    RightOperandClass
                `,
              },
              {
                code: `
                  const result = leftOperand instanceof
                RightOperandClass
              `,
                output: `
                  const result = leftOperand instanceof
                    RightOperandClass
              `,
              },
            ],
            [
              'Must add indent before right operand of "instanceof".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result =
                    leftOperand -
                      1
                `,
                output: `
                  const result =
                    leftOperand -
                    1
                `,
              },
              {
                code: `
                {
                  const result =
                    leftOperand -
                      11
                }`,
                output: `
                {
                  const result =
                    leftOperand -
                    11
                }`,
              },
            ],
            [
              'Must remove indent before right operand of "-".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('Must add indent (x1), Must remove indent (x1)', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = leftOperand +
                  rightOperand -
                      11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                rightOperand -
                      11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                  rightOperand -
                        11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
              rightOperand -
                        11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                  rightOperand -
                      11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                rightOperand -
                      11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                  rightOperand -
                        11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand -
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                rightOperand -
                          11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand -
                    11
                `,
              },
            ],
            [
              'Must remove indent before right operand of "-".',
              'Must add indent before right operand of "+".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = leftOperand +
                  rightOperand *
                      11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                rightOperand *
                      11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
                  rightOperand *
                        11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result = leftOperand +
              rightOperand *
                        11
                `,
                output: `
                  const result = leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                  rightOperand *
                      11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                rightOperand *
                      11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                  rightOperand *
                        11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand *
                    11
                `,
              },
              {
                code: `
                  const result =
                    leftOperand +
                rightOperand *
                          11
                `,
                output: `
                  const result =
                    leftOperand +
                    rightOperand *
                    11
                `,
              },
            ],
            [
              'Must add indent before right operand of "+".',
              'Must remove indent before right operand of "*".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })

      describe('three errors', () => {
        const invalidCases = ESLintHelper.expandInvalidCases([
          [
            [
              {
                code: `
                  const result = firstOperand +
                  secondOperand *
                thirdOperand -
                fourthOperand
                `,
                output: `
                  const result = firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand +
                  secondOperand *
                thirdOperand -
                fourthOperand
                `,
                output: `
                  const result =
                    firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
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
              {
                code: `
                  const result = firstOperand +
                      secondOperand *
                  thirdOperand -
                  fourthOperand
                `,
                output: `
                  const result = firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand +
                      secondOperand *
                  thirdOperand -
                  fourthOperand
                `,
                output: `
                  const result =
                    firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
            ],
            [
              'Must add indent before right operand of "-".',
              'Must remove indent before right operand of "+".',
              'Must add indent before right operand of "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = firstOperand +
                  secondOperand *
                      thirdOperand -
                  fourthOperand
                `,
                output: `
                  const result = firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand +
                  secondOperand *
                      thirdOperand -
                  fourthOperand
                `,
                output: `
                  const result =
                    firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
            ],
            [
              'Must add indent before right operand of "-".',
              'Must add indent before right operand of "+".',
              'Must remove indent before right operand of "*".',
            ]
          ],
          [
            [
              {
                code: `
                  const result = firstOperand +
                  secondOperand *
                thirdOperand -
                      fourthOperand
                `,
                output: `
                  const result = firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
              {
                code: `
                  const result =
                    firstOperand +
                  secondOperand *
                thirdOperand -
                      fourthOperand
                `,
                output: `
                  const result =
                    firstOperand +
                    secondOperand *
                    thirdOperand -
                    fourthOperand
                `,
              },
            ],
            [
              'Must remove indent before right operand of "-".',
              'Must add indent before right operand of "+".',
              'Must add indent before right operand of "*".',
            ]
          ],
        ])

        tester.run(
          ruleName,
          ruleBody,
          {
            valid: [],
            invalid: invalidCases
          }
        )
      })
    })
  })
})

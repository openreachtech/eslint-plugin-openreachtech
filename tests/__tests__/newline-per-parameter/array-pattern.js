'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-parameter', () => {
  const errors = ['Require to chop down per parameter of function declaration.']

  describe('array parameter', () => {
    const validCases = []
      .concat([ // ([\narg1,\narg2,\n]) patterns
        {
          code: `
            function method ([
              firstItem,
              secondItem,
            ]) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function ([
              firstItem,
              secondItem,
            ]) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ([
                firstItem,
                secondItem,
              ]) {
                this.firstItem = firstItem
                this.secondItem = secondItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ([
                firstItem,
                secondItem,
              ]) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ([
                firstItem,
                secondItem,
              ]) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ([
                firstItem,
                secondItem,
              ]) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ([
                firstItem,
                secondItem,
              ]) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
      ])
      .concat([ // ([\narg1,\n...arg2,\n]) patterns
        {
          code: `
            function method ([
              firstItem,
              ...secondItems
            ]) {
              return firstItem + secondItems.length * 10
            }
          `,
        },
        {
          code: `
            const method = function ([
              firstItem,
              ...secondItems
            ]) {
              return firstItem + secondItems.length * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ([
                firstItem,
                ...secondItems
              ]) {
                this.firstItem = firstItem
                this.secondItems = secondItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ([
                firstItem,
                ...secondItems
              ]) {
                return firstItem + secondItems.length * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ([
                firstItem,
                ...secondItems
              ]) {
                return firstItem + secondItems.length * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ([
                firstItem,
                ...secondItems
              ]) {
                return firstItem + secondItems.length * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ([
                firstItem,
                ...secondItems
              ]) {
                return firstItem + secondItems.length * 80
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like valid
        {
          code: `
            const method = ([
              firstItem,
              ...secondItems
            ]) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ([
                firstItem,
                ...secondItems
              ]) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like invalid
        {
          code: `
            const method = ([firstItem, ...secondItems]) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ([firstItem, ...secondItems]) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        []
          .concat([ // ([arg1, arg2]) patterns
            {
              code: `
                function method ([firstItem, secondItem]) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function ([firstItem, secondItem]) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ([firstItem, secondItem]) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ([firstItem, secondItem]) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ([firstItem, secondItem]) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ([firstItem, secondItem]) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ([firstItem, secondItem]) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
          ])
          .concat([ // ([arg1, ...arg2]) patterns
            {
              code: `
                function method ([firstItem, ...secondItems]) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function ([firstItem, ...secondItems]) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ([firstItem, ...secondItems]) {
                    this.firstItem = firstItem
                    this.secondItems = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ([firstItem, ...secondItems]) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ([firstItem, ...secondItems]) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ([firstItem, ...secondItems]) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ([firstItem, ...secondItems]) {
                    return firstItem + secondItems.length * 80
                  }
                }
              `,
            },
          ]),
        errors,
      ],
    ])

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      'plane parameter',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })

  // -------------------------------------------------------- with default value
  describe('array parameter', () => {
    const validCases = []
      .concat([ // ([\narg1,\narg2,\n] = []) patterns
        {
          code: `
            function method ([
              firstItem,
              secondItem,
            ] = []) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function ([
              firstItem,
              secondItem,
            ] = []) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ([
                firstItem,
                secondItem,
              ] = []) {
                this.firstItem = firstItem
                this.secondItem = secondItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ([
                firstItem,
                secondItem,
              ] = []) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ([
                firstItem,
                secondItem,
              ] = []) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ([
                firstItem,
                secondItem,
              ] = []) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ([
                firstItem,
                secondItem,
              ] = []) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
      ])
      .concat([ // ([\narg1,\n...arg2,\n] = []) patterns
        {
          code: `
            function method ([
              firstItem,
              ...secondItems
            ] = []) {
              return firstItem + secondItems.length * 10
            }
          `,
        },
        {
          code: `
            const method = function ([
              firstItem,
              ...secondItems
            ] = []) {
              return firstItem + secondItems.length * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ([
                firstItem,
                ...secondItems
              ] = []) {
                this.firstItem = firstItem
                this.secondItems = secondItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ([
                firstItem,
                ...secondItems
              ] = []) {
                return firstItem + secondItems.length * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ([
                firstItem,
                ...secondItems
              ] = []) {
                return firstItem + secondItems.length * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ([
                firstItem,
                ...secondItems
              ] = []) {
                return firstItem + secondItems.length * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ([
                firstItem,
                ...secondItems
              ] = []) {
                return firstItem + secondItems.length * 80
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like valid
        {
          code: `
            const method = ([
              firstItem,
              ...secondItems
            ] = []) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ([
                firstItem,
                ...secondItems
              ] = []) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like invalid
        {
          code: `
            const method = ([firstItem, ...secondItems] = []) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ([firstItem, ...secondItems] = []) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        []
          .concat([ // ([arg1, arg2] = []) patterns
            {
              code: `
                function method ([firstItem, secondItem] = []) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function ([firstItem, secondItem] = []) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ([firstItem, secondItem] = []) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ([firstItem, secondItem] = []) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ([firstItem, secondItem] = []) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ([firstItem, secondItem] = []) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ([firstItem, secondItem] = []) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
          ])
          .concat([ // ([arg1, ...arg2] = []) patterns
            {
              code: `
                function method ([firstItem, ...secondItems] = []) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function ([firstItem, ...secondItems] = []) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ([firstItem, ...secondItems] = []) {
                    this.firstItem = firstItem
                    this.secondItems = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ([firstItem, ...secondItems] = []) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ([firstItem, ...secondItems] = []) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ([firstItem, ...secondItems] = []) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ([firstItem, ...secondItems] = []) {
                    return firstItem + secondItems.length * 80
                  }
                }
              `,
            },
          ]),
        errors,
      ],
    ])

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      'with default value',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })
})

// @ts-check
'use strict'

//  ------------------------------------------------------------------------------
// Requirements
//  ------------------------------------------------------------------------------

// ESLint tester instead of Jest `test()`
const tester = require('../tools/ESLintHelper').createTester()

const rule = require('../../lib/empty-line-after-super')

const errors = [{
  messageId: 'errorMessage',
  data: { kind: 'this' },
  type: 'ExpressionStatement'
}]

const name = 'empty-line-after-super'

// ------------------------------------------------------------------------------
// Tests
//  ------------------------------------------------------------------------------

describe('Require empty line between super call and other statements.', () => {
  describe('valid', () => {
    const validCodes = [
      {
        description: 'has no statements after super()',
        code:`
          class A extends B {
            constructor (name) {
              super(name)
            } 
          }
        `
      },
      {
        description: 'has empty line after super()',
        code:`
          class A extends B {
            constructor (name, age) {
              super(name)
     
              this.age = age
            }
          }
        `
      },
      {
        description: 'has empty lines after super()',
        code:`
          class A extends B {
            constructor (name, age) {
              super(name)
            
     
              this.age = age
            }
          }
        `
      },
      {
        description: 'has empty line after super() - single line comments',
        code:`
          class A extends B {
            constructor (name, age) {
              super(name) // does not require age.
 
              this.age = age
            }
          }
        `
      },
      {
        description: 'has empty line after super() - single line comments at new line',
        code:`
          class A extends B {
            constructor (name, age) {
              super(name)
     
              // NOTE: Max number of age is 99.
              this.age = age
            }
          }
        `
      },
      {
        description: 'has empty line after super() - multiple lines comments',
        code:`
          class A extends B {
            constructor (name, age) {
              super(name)
             
              /**
               * @type {{
               *   age: number,
               *   name: null, // default name
               * }}
               */
              this.age = age
            }
          }
        `
      },
      {
        description: 'has empty line after super() - super call break to multiple lines',
        code:`
          class A extends B {
            constructor (name, age) {
              super(
                name
              )
      
              this.age = age
            }
          }
        `
      },
    ]

    describe.each(validCodes)('$# - $description', ({ code }) => {
      tester.run(
        name,
        rule,
        {
          valid: [{ code }],
          invalid: []
        }
      )
    })
  })

  describe('invalid', () => {
    const invalidCodes = [
      {
        description: 'has no empty line after super() - multiple statements in same line',
        code: `
          class A extends B {
            constructor (name, age) {
              super(name); this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              super(name);

              this.age = age
            }
          }
        `
      },
      {
        description: 'has no empty line after super()',
        code: `
          class A extends B {
            constructor (name, age) {
              super(name)
              this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              super(name)

              this.age = age
            }
          }
        `
      },
      {
        description: 'has no empty line after super() - super call break to multiple lines',
        code: `
          class A extends B {
            constructor (name, age) {
              super(
                name
              )
              this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              super(
                name
              )

              this.age = age
            }
          }
        `
      },
      {
        description: 'has no empty line after super() - single line comment',
        code: `
          class A extends B {
            constructor (name, age) {
              super(name) // does not require age.
              this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              super(name) // does not require age.

              this.age = age
            }
          }
        `
      },
      {
        description: 'has no empty line after super() - single line comment in new line',
        code: `
          class A extends B {
            constructor (name, age) {
              super(name)
              // NOTE: Max number of age is 99.
              this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              super(name)

              // NOTE: Max number of age is 99.
              this.age = age
            }
          }
        `
      },
      {
        description: 'has no empty line after super() - multiple lines comments',
        code: `
          class A extends B {
            constructor (name, age) {
              super(name)
              /**
               * @type {{
               *   age: number,
               *   name: null, // default name
               * }}
               */
              this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              super(name)

              /**
               * @type {{
               *   age: number,
               *   name: null, // default name
               * }}
               */
              this.age = age
            }
          }
        `
      },
      {
        description: 'has no empty line after super() - multiple lines comments start from super line',
        code: `
          class A extends B {
            constructor (name, age) {
              super(name) /**
               * @type {{
               *   age: number,
               *   name: null, // default name
               * }}
               */
              this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              super(name)

              /**
               * @type {{
               *   age: number,
               *   name: null, // default name
               * }}
               */
              this.age = age
            }
          }
        `

      },
      {
        description: 'has no empty line after super() - comments before super',
        code: `
          class A extends B {
            constructor (name, age) {
              /* age is default */ /* name is default */ super(name)
              this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              /* age is default */ /* name is default */ super(name)

              this.age = age
            }
          }
        `

      },
      {
        description: 'has no empty line after super() -  multiple lines comments before super',
        code: `
          class A extends B {
            constructor (name, age) {
              /* age is default
               * name is default
               */ super(name)
              this.age = age
            }
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {
              /* age is default
               * name is default
               */ super(name)

              this.age = age
            }
          }
        `
      },
      {
        description: 'has no empty line after super() - all in one line',
        code: `
          class A extends B {constructor (name, age) {super(name); this.age = age;}}
        `,
        output: `
          class A extends B {constructor (name, age) {super(name);

          this.age = age;}}
        `
      },
      {
        description: 'has no empty line after super() - all in one line in constructor',
        code: `
          class A extends B {
            constructor (name, age) {super(name); this.age = age;}
          }
        `,
        output: `
          class A extends B {
            constructor (name, age) {super(name);

            this.age = age;}
          }
        `
      },
    ]

    describe.each(invalidCodes)('$# - $description', ({ code, output }) => {
      tester.run(
        name,
        rule,
        {
          valid: [],
          invalid: [{ code, output, errors }]
        }
      )
    })
  })
})

'use strict'

//  ------------------------------------------------------------------------------
// Requirements
//  ------------------------------------------------------------------------------

const rule = require('../../lib/require-empty-line-between-super-call-and-other-statements')
const { RuleTester } = require('eslint/lib/rule-tester')

const validCodes = [
  // has no statements after super()
  `
  class A extends B {
    constructor(name) { 
      super(name)
    } 
  }
  `,
 
  // has empty line after super()
  `
    class A extends B {
      constructor(name, age) {
        super(name)
 
        this.age = age
      }
    }
  `,

  // has empty line after super()
  `
  class A extends B {
    constructor(name, age) {
      super(
        name
      )

      this.age = age
    }
  }
  `

]
 
const invalidCodes = [
  // has no empty line after super() - multiple statements in same line
  {
    code: `
      class A extends B {
        constructor(name, age) {
          super(name); this.age = age
        }
      }
    `,
    output: `
      class A extends B {
        constructor(name, age) {
          super(name);

          this.age = age
        }
      }
    `
  },

  // has no empty line after super()
  {
    code: `
      class A extends B {
        constructor(name, age) {
          super(name)
          this.age = age
        }
      }
    `,
    output: `
      class A extends B {
        constructor(name, age) {
          super(name)

          this.age = age
        }
      }
    `
  },

  // has no empty line after super() - super call break to multiple lines
  {
    code: `
      class A extends B {
        constructor(name, age) {
          super(
            name
          )
          this.age = age
        }
      }
    `,
    output: `
      class A extends B {
        constructor(name, age) {
          super(
            name
          )

          this.age = age
        }
      }
    `
  }
  
]
 
const errors = [{ 
  messageId: 'errorMessage', 
  data: { kind: 'this' }, 
  type: 'ExpressionStatement' 
}]
   
// ------------------------------------------------------------------------------
// Tests
//  ------------------------------------------------------------------------------
   
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })
 
ruleTester.run('require-empty-line-between-super-call-and-other-statements', rule, {
  valid: validCodes.map(code => ({ code })),
  invalid: invalidCodes.map(({ code, output }) => ({ code, output, errors }))
})

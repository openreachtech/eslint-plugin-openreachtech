// @ts-check
'use strict'

//  ------------------------------------------------------------------------------
// Requirements
//  ------------------------------------------------------------------------------

const { RuleTester } = require('eslint/lib/rule-tester')

const rule = require('../../lib/empty-line-after-super')

const validCodes = [
  // has no statements after super()
  `
  class A extends B {
    constructor (name) { 
      super(name)
    } 
  }
  `,

  // has empty line after super()
  `
    class A extends B {
      constructor (name, age) {
        super(name)
 
        this.age = age
      }
    }
  `,

  // has empty lines after super()
  `
    class A extends B {
      constructor (name, age) {
        super(name)
        
 
        this.age = age
      }
    }
  `,

  // has empty line after super() - single line comments
  `
   class A extends B {
     constructor (name, age) {
       super(name) // does not require age.

       this.age = age
     }
   }
 `,

  // has empty line after super() - single line comments at new line
  `
   class A extends B {
     constructor (name, age) {
       super(name)

       // NOTE: Max number of age is 99.
       this.age = age
     }
   }
 `,

  // has empty line after super() - multiple lines comments
  `
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

  // has empty line after super() - super call break to multiple lines
  `
  class A extends B {
    constructor (name, age) {
      super(
        name
      )

      this.age = age
    }
  }
  `,
]

const invalidCodes = [
  // has no empty line after super() - multiple statements in same line
  {
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

  // has no empty line after super()
  {
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

  // has no empty line after super() - super call break to multiple lines
  {
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

  // has no empty line after super() - single line comment
  {
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

  // has no empty line after super() - single line comment in new line
  {
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

  // has no empty line after super() - multiple lines comments
  {
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

  // has no empty line after super() - multiple lines comments start from super line
  {
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

  // has no empty line after super() - comments before super
  {
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

  // has no empty line after super() -  multiple lines comments before super
  {
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

  // has no empty line after super() - all in one line
  {
    code: `
      class A extends B {constructor (name, age) {super(name); this.age = age;}}
    `,
    output: `
      class A extends B {constructor (name, age) {super(name);

      this.age = age;}}
    `
  },

  // has no empty line after super() - all in one line in constructor
  {
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

const errors = [{
  messageId: 'errorMessage',
  data: { kind: 'this' },
  type: 'ExpressionStatement'
}]

// ------------------------------------------------------------------------------
// Tests
//  ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } })

ruleTester.run('empty-line-after-super', rule, {
  valid: validCodes.map(code => ({ code })),
  invalid: invalidCodes.map(({ code, output }) => ({ code, output, errors }))
})

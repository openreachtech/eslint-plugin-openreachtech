// @ts-check
'use strict'

module.exports = {
  expression: 'update expression',
  validCodes: [
    `
      const a = 2
      const b = a++ //line comment
    `,
    `
      const a = 2
      const b = //line comment
        a++
    `,
    `
      const a = 10
      const b = a-- /** block comment */
    `,
    `
      const a = 10
      const b =/** block comment */
        a--
    `,
    `
      const a = 8
      const b = ++a //line comment
    `,
    `
      const a = 8
      const b = --a //line comment
    `,
    `
      const a = 8
      const b = a++ + a-- + ++a + --a // line comment
    `,
    `
      function foo(a, b){
        if(a > 0 || b > 0 ){
          return -(++a/4)
        } //line comment

        return b--*5 //line comment
      }
    `,
  ],
  invalidCodes: [
    `
      const a = 2
      const b = a /** block comment */++
    `,
    `
      const a = 2
      const b = ++ /** block comment */a
    `,
    `
      const a = 2
      const b = ++ /** block
                    * comment
                    */
        a + 8
    `,
    `
      const a = 2
      const b = a /** block comment */--
    `,
    `
      const a = 2
      const b = -- /** block comment */a
    `,
    `
      const a = 2
      const b = -- /** block
                    * comment
                    */
        a + 8
    `,
    `
      const a = 8
      const b = a++ + a-- + ++ // line comment
      a + --a
    `,
    `
      function foo(a, b){
        if(a > 0 || b > 0 ){
          return -(++ /** block comment */a / 4)
        }

        return b-- * 5
      }
    `,
  ]
}

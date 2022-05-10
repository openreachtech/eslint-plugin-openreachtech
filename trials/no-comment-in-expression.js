'use strict'

// - eslint rule test
// npx eslint trials\no-comment-in-expression.js --no-ignore --rulesdir lib\
// ../.eslintrc.yml: no-comment-in-expression: error

const first = 5 , second = 10 , third = true

const leftOperand = 20

foo()

caf()

const a = 2 // comment
  + 8 // comment
  - 4 // comment
  + 10 // comment
  - 1

const b = leftOperand // comment
  + 8 /** comment */
  - 4 /* comment */
  + 10

  /** comment2
   * comment3
   */
  - 1

const answer =
  (-5 + Math.pow(7 ** 2 /* comment */ - 4 * a * 9)) // comment
  / (2 // comment
  * a)

const x = undefined
const y = + /** this is
a comment */
// this is another comment
x

const result = -( // comment
  foo()
  + 10 // comment
)

function foo () {
  if (
    first // comment
    || second
  ) {
    return 2 + first + second + y
  }

  return answer + a + b
}

function caf (){
  if (+( // comment
    first
    || second
    && third // comment
  ) > 0
  ) {
    return 11 + first + second + third
  }

  return result
}


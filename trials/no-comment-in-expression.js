'use strict'

// - eslint rule test
// npx eslint trials\no-comment-in-expression.js --no-ignore --rulesdir lib\
// ../.eslintrc.yml: no-comment-in-expression: error

const first = 5 , second = 10

const leftOperand = 20

foo()

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

function foo () {
  if (
    first // comment
    || second
  ) {
    return 2 + first + second
  }

  return answer + a + b
}

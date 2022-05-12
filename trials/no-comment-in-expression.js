'use strict'

// - eslint rule test
// npx eslint trials\no-comment-in-expression.js --no-ignore --rulesdir lib\
// ../.eslintrc.yml: no-comment-in-expression: error

const first = 5 , second = 10 , third = true

const leftOperand = 20

foo()

foo2()

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

function foo2 (a, b){
  if(a > 0 || b > 0 ){
    return -(++/** block comment */a / 4)
  }

  return --/** block comment */b * 5
}

const test =
a > 0 // comment
  ? a // comment
  : -a

const test2 =
first > 0 // line comment
  ? 1 // line comment
  : (second > 0 // line comment
    ? -1 // line comment
    : 2)

const test3 = first > 0
  ? 1
  : (second > 0
    ? -// comment
    1
    : 2)

function caf (){
  if (+( // comment
    first
    || second
    && third // comment
  ) > 0
  ) {
    return 11 + first + second + third + test + test2 + test3
  }

  return result
}

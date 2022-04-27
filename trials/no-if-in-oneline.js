'use strict'

// - eslint rule test
// npx eslint trials\no-if-in-oneline.js --no-ignore --rulesdir lib\
// ../.eslintrc.yml: no-if-in-oneline: error

test()
test2()

const condition = bar()

function test() {
  if (condition) { bar()
    foo()
  } else { bar()

    return
  }
}

function test2() {
  if (condition) { foo() } else { return }
}

function bar() {}

function foo() {}

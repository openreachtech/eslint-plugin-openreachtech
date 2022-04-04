'use strict'

/* no-if-in-test.js
- selector: 'CallExpression[callee.name=/it|test/] IfStatement' 
  message: 'no if statement in it()/test()'
- selector: 'CallExpression[callee.callee.object.name=/it|test/][callee.callee.property.name="each"] IfStatement'
  message: 'no if statement in it.each()/test.each()' 
*/

describe('test no-if-in-test', (value, expected) => {
  it('abcde', (value, expected) => {
    if (expected === null) {
      expect(sample(value)).toBeNull()
    } else {
      expect(sample(value).target).toEqual(expected)
    }
  })

  test('abcde', (value, expected) => {
    if (expected === null) {
      expect(sample(value)).toBeNull()
    } else {
      expect(sample(value).target).toEqual(expected)
    }
  })

  test('abcde', (value, expectedTargets) => {
    const results = sample(value)
    results.forEach((it, index) => {
      if (expectedTargets[index] === null) {
        expect(it).toBeNull()
      } else {
        expect(it.target).toEqual(expectedTargets[index])
      }
    })
  })

  const cases = []
  it.each(cases)('abcde', (value, expectedTargets) => {
    const results = sample(value)

    results.forEach((it, index) => {
      if (expectedTargets[index] === null) {
        expect(it).toBeNull()
      } else {
        expect(it.target).toEqual(expectedTargets[index])
      }
    })
  })

  test.each(cases)('abcde', (value, expectedTargets) => {
    const results = sample(value)

    results.forEach((it, index) => {
      if (expectedTargets[index] === null) {
        expect(it).toBeNull()
      } else {
        expect(it.target).toEqual(expectedTargets[index])
      }
    })
  })
})

// normal
function foo (name) {
  if (name === 'sweet') {
    return 'home'
  }

  return 'country'
}

# no-else-if

* Prohibit `else if`.

## Rule Details

* Here's a summary of why `else if` is disallowed.

### syntax sugar of nested if statements

* `else if` is the sugar-coated syntax for nesting if statements; wherever `else if` is written, there will be as many nested conditional branches as there are repeated `else if`.

### complex nested structures waste the reader's brain resources

* Complex nesting of if statements bloats the code reader's effort in chasing down conditional branches. If all ifs were not nested, there would not be a single stack of if statements in the code reader's brain, thus not wasting brain resources.

* In object-oriented programming, conditional branches with if statements can be designed without any nesting. We have decided to prohibit `else if` so that all engineers can work on programming without avoiding precise class design.

## How to Refactor to Purge `else if`

* To use `early returns` and `guard clauses` can avoid `else if` in many cases.

😩 Examples of **incorrect** code for `no-else-if` rule:

```js
function method (firstCondition, secondCondition) {
  if (firstCondition) {
    return createReturnValueAs1stCondition()
  } else if (secondCondition) {
    return createReturnValueAs2ndCondition()
  } else {
    return null
  }
}
```

😆 Examples of **correct** code for `no-else-if` rule:

```js
function method (firstCondition, secondCondition) {
  if (firstCondition) {
    return createReturnValueAs1stCondition()
  }

  if (secondCondition) {
    return createReturnValueAs2ndCondition()
  }

  return null
}
```

* When multiple branches are to be made based on the value of a single variable, it is better to use object hashing.

😩 Examples of **incorrect** code for `no-else-if` rule:

```js
function method (condition) {
  if (condition === 'aaa') {
    return 1000
  } else if (condition === 'bbb') {
    return 2000
  } else if (condition === 'ccc') {
    return 3000
  } else {
    return 0
  }
}
```

😆 Examples of **correct** code for `no-else-if` rule:

```js
function method (condition) {
  return objectHash[condition] ?? 0
}

const objectHash = {
  aaa: 1000,
  bbb: 2000,
  ccc: 3000,
}
```

## Version

* Since `0.0.0`

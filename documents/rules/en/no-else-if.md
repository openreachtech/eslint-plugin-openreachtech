# no-else-if

* Prohibit `else if`.

## Rule Details

* Here's a summary of why `else if` is disallowed.

### else if causes complex nesting

* `else if` is the sugar-coated syntax for nesting if statements. Using `else if` causes nesting of conditional branches as many times as you use it.

### complex nested structures waste the reader's brain resources

* Complex nesting of if statements increases the labor of the code reader in following the conditional branches. If every if does not nest, there is not a single stack of if statements in the code reader's brain, so brain resources will not be wasted.

* In object-oriented programming, conditional branches with if statements can be designed without any nesting. We have decided to prohibit `else if` so that complex code cannot be easily produced and all engineers can concentrate on precise class design.

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

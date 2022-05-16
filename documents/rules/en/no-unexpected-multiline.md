# no-unexpected-multiline

* When all of the following conditions are met, throw error.
  1. The node is `+` expression or `-` expression.
  2. There is line-break before the operator.
  3. The line starts with an operator is not indented.

* On error, the `--fix` option inserts `; ` before the operator.

## Rule Details

* Here's a summary of why this rule is required.

### Unexpected Multiline Expression

* Code without semicolons may produce unexpected multi-line expressions.

* Examples

```
// 1.
MyClass.prototype.myMethod = function() {
  return 42;
}  // No semicolon here.

(function() {
  // Some initialization code
  // wrapped in a function to
  // create a scope for locals.
})();


var x = {
  'i': 1,
  'j': 2
}  // No semicolon here.

// 2. Trying to do one thing on Internet Explorer and another on Firefox.
[ffVersion, ieVersion][isIE]();


var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // No semicolon here.

// 3. conditional execution a la bash
-1 == resultOfOperation() || die();
```

* In the above example, 1 and 2 do not cause problems.

* 3. causes a problem where an expression beginning with `-1` is connected to the previous line and recognized as a "subtraction expression".

### How to Resolve

* Regarding this issue, we have considered as following.

  1. A problem arose where a unary operator expression like `-1` written at the beginning of a line was recognized as "a subtraction expression following from the previous line".
  1. If a programmer "writes a line that begins with a unary operator without indentation," it can be determined that this is not the intention of "code written as a continuation of the previous line.
  1. Tell the programmer that there is an "unexpected multi-line expression" on the relevant line by raising an error in ESLint that the indentation is incorrect.

* When resolving with `--fix`, the `; ` is inserted immediately before the second line operator to eliminate "the possibility of unexpected multi-line expressions".

## Version

* Since `0.1.0`

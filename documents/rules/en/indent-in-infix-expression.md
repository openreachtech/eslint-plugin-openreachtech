# indent-in-infix-expression

* If a line break occurs in the middle of an infix expression, indentation is enforced after the second line.

* The indentation after the second line is aligned with the left operand of the infix expression, in the following condition:
  1. The infix expression is included in other syntaxes.
  2. A new line exists before the left operand.

## Rule Details

* Here's a summary of why indentation is necessary when there is a line break in the middle of a infix operator expression.

### Repeated Infix Expressions

* Writing long repeated infix expressions in a single line sacrifices the readability of the code.

  ```
  const result = leftOperand + middleOperand - rightOperand + extraOperand
  ```

* A new line for each operator improves readability.

  ```
  const result = leftOperand
    + middleOperand
    - rightOperand
    + extraOperand
  ```

* When an expression is written in multiple lines, it is common practice to indent the second and subsequent lines. However, ESLint currently has no rules to detect this error.
Cf.
[Indent for binary operators #12427](https://github.com/eslint/eslint/issues/12427)
[indent: add option for multiline [assignment] statement #12248](https://github.com/eslint/eslint/issues/12248)
[indent doesn't apply to expressions split across multiple lines #12255](https://github.com/eslint/eslint/issues/12255)

* This rule was created to support indentation in multiline infix expressions.
## ESList

* There is a pull request in the ESLint repository that is equivalent to this custom rule. This may be supported in the next version of ESLint.
[feat: indent: add BinaryExpression option #15555](https://github.com/eslint/eslint/pull/15555)

## Version

* Since `0.1.0`

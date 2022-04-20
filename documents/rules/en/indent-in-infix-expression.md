# indent-in-infix-expression

* If a line break occurs in the middle of an infix expression, indentation is enforced after the second line.

* The indentation after the second line is aligned with the left operand of the infix expression, in the following condition:
  1. The infix expression is included in other syntaxes.
  2. Exists newline before the left operand.

## Rule Details

* Here's a summary of why indentation is necessary when a infix operator expression is broken in the middle of a line.

### Nested Infix Expressions

* When nested infix expressions are written in a single column, readability is compromised because the lines are long.

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

* When an expression is written on multiple lines, it is common practice to indent the second and subsequent lines. However, ESLint currently has no rules to detect this error.
Cf.
[Indent for binary operators #12427](https://github.com/eslint/eslint/issues/12427)
[indent: add option for multiline [assignment] statement #12248](https://github.com/eslint/eslint/issues/12248)
[indent doesn't apply to expressions split across multiple lines #12255](https://github.com/eslint/eslint/issues/12255)

* This rule was created to support indentation in multiline infix expressions.
## ESList

* There is a pull request in the ESLint repository that is equivalent to this custom rule. This may be supported in the next version of ESLint.
[feat: indent: add BinaryExpression option #15555](https://github.com/eslint/eslint/pull/15555)

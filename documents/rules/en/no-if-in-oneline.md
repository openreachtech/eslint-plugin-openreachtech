# no-if-in-oneline

* Prohibit to write `if` statements in oneline.

## Rule Details

* Here's a summary of why to write `if` statements in oneline is disallowed.

### Speed of Reading Statement Structure

* Writing an `if` statement on a single line places an excessive burden on the reader of the source code. The code reader has to read the lines of an `if` statement written on a single line from left to right to see what is being done.

* Considering which of the following is easier, it is easy to see why syntactic interpretation while reading to the right is a bad idea.
  1. While moving your eyes to the right, check the position of spaces, `{ }`, `;`, etc. and construct the syntax in your brain.
  1. while moving your eyes downward, construct the syntax in your brain using the line break as a cue.

* There are many points that the reader's must check as follows:
  1. Whether the control flow of the `if` statement is a compound statement.
  1. If the control flow of an `if` statement is a compound statement, how many statements it contains.
  1. Whether there is a `return` in the control flow of the `if` statement.
  1. Whether or not `else` is included.

* If the processing flow branched by an `if` statement is written in multiple lines, the code reader can grasp the structure of the `if` statement simply by reading vertically down the "left end of each line".

```js
// You will not notice the return value unless you read the line to the right.
if (conditionFirst && conditionSecond) return
if (conditionFirst && conditionSecond) return returnValue

// You will not notice the existence of return unless you read the line to the right.
if (condition) { const result = createResult(); return result }

// You have to read the line to the right to notice the existence of else.
if (condition) { return result35 } else { return result28 }
```

```js
// If you read vertically at the leftmost position of each line, you can grasp the structure of the if statement simply by checking the first two tokens of each line.

// Existence of return value
if (conditionFirst && conditionSecond)
  return
if (conditionFirst && conditionSecond)
  return returnValue

// Existence of return
if (condition) {
  const result = createResult()

  return result
}

// Existence of `else`
if (condition) {
  return result35
} else {
  return result28
}
```

* In contrast, the advangtage of writing a single `if` statement on a single line is only one thing:
  1. Fewer apparent lines of source code

* The reader of the code is reading it sentence by sentence. If one preferred to reduce the number of physical lines of source code, it would be a superior notation to concatenate all statements with `;` and write them on a single line, but this is not the case.

* If the overall **number of statements** in the code is not reduced, then there is no point in reducing the number of lines of source code, and an `if` statement written on a single line is just a difficult code to read, forcing the reader to "read the whole line to the right".

### Short `if` statement

* In response, some developers may argue as follows:
  ```
  With a short `if` statement, the structure can be grasped without following the line to the right.
  ```

* Shortness is subjective and difficult to quantify. In the following examples, it will vary greatly from person to person as to where one can judge it to be short.

```js
if (ok) return
if (value === 3) return
if (3 < value && value <= 10) return
if (condition1 === 20 && condition2 === 40 && condition3 === 60) return
```

* If the coding rule is "if it is short, you can write an `if` statement on a single line", then the conversation about whether it is short or not will start at the time of a pull request. This custom rule was created to eliminate the time required for such conversations.

## Version

* Since `0.1.0`

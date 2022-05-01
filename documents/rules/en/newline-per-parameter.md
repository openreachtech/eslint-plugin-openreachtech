# newline-per-parameter

* Prohibit writing multiple parameter names on oneline when defining a function or method.

## Rule Details

* Here's a summary of why to write multiple parameter names on a oneline is disallowed.

### Speed of Understanding Arguments of Function Declaration

* When defining a function or method, if multiple argument definitions are written on a single line, the source code reader will have to rely on `,` to separate them in his or her brain as he or she reads. If each parameter is a plain definition with identifiers separated by `,`, it is not difficult, but if default values are specified or object syntax is used, it is difficult to read through the source code while stacking `,` in the brain.

```js
function method (first, second) {
  // ...
}

function method (first, second = 100) {
  // ...
}

function method (first, second = [1, 3, 5]) {
  // ...
}

function method (first, second = { x: 0, y: 0 }) {
  // ...
}

function method ({ first, second }) {
  // ...
}

function method ({ first = 0, second = 1 }) {
  // ...
}

function method ({ first: { x, y }, second = 1 }) {
  // ...
}
```

* If the rule is to write only one identifier per line, the reader only needs to follow the left edge of each line to grasp the argument structure.

```js
function method (
  first,
  second
) {
  // ...
}

function method (
  first,
  second = 100
) {
  // ...
}

function method (
  first,
  second = [1, 3, 5]
) {
  // ...
}

function method (
  first,
  second = {
    x: 0,
    y: 0
  }
) {
  // ...
}

function method ({
  first,
  second
}) {
  // ...
}

function method ({
  first = 0,
  second = 1
}) {
  // ...
}

function method ({
  first: {
    x,
    y
  },
  second = 1
}) {
  // ...
}
```

### Simplicity of Argument Definition

* In response, some developers may argue as follows:
  ```
  If the description is simple, with only identifiers separated by `,`, the structure can be easily grasped even if it is written on a single line.
  ```

* Simplicity is subjective and difficult to quantify. In the following examples, it will vary greatly from person to person as to where one can judge it to be short.

```js
function method (first) { ... }
function method (first, second) { ... }
function method (first, second, third) { ... }
function method (first, second, third, fourth) { ... }
function method (first, second, third, fourth, fifth) { ... }
```

* If the coding rule is "a simple argument definition may be written on a single line," the "simple or not" argument will be debated at the time of a pull request. This custom rule was created to eliminate the time required for such conversations.

### Case of Two Identifiers

* This rule requires a line break even for "a simple definition with only two identifiers. Although it is possible to make an exception for this case, we have decided not to adopt this rule for the following reasons.
  1. When a developer learns this coding rule, it is easier to remember "one identifier per line" with no exceptions.
  1. A function definition with two or more arguments is likely to be poorly designed, and breaking the line has the effect of making the developer aware that there is a poorly designed function definition there.

* The reasons for the above "a function definition with two or more arguments is likely to be poorly designed" are as follows:
  1. In a function definition with two or more arguments, it is necessary for the user of the function to remember the argument order.
  1. With object syntax, all arguments can be passed in a single argument, eliminating the need for the function caller to be aware of the argument order.

## Version

* Since `0.1.0`

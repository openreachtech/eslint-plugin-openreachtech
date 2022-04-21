# empty-line-after-super

* If a statement follows `super()` in the constructor, it forces a empty line between `super()` and the next line.

## Rule Details

* Here's a summary of why placing a empty line after `super()`.

### Two Statements with different meanings

* An empty line between two statements with different meanings improves readability.

```js
const pointX = 10
const pointY = 20
                 // <---- empty line here
const readingFileName = './source.txt'
const savingFileName = './memory.txt'
```

```js
const user = findUserById(11)
                 // <---- empty line here
const userId = user.id
const userName = user.name
                 // <---- empty line here
saveUserDetails({
  userId,
  userName,
})
```

### Role of `super()`

* The only role of `super()` is to "execute the constructor of the parent class". Though you can write statements after `super()`, those statements do not have the same meaning as `super()`.

* Thus, if a statement follows `super()`, there will always be a empty line between `super()` and the following statement.

### Simplified Review

* If someone is unaware of the practice of placing a blank line between `super()` and the following statement, the you will have to point this out in every review. This custom rule is created to save your time.

😩 Examples of **incorrect** code for `empty-line-after-super` rule:

```js
class Derived extends Base {
  constructor (firstArg, secondArg) {
    super(firstArg)
    this.secondArg = secondArg
  }
}
```

😆 Examples of **correct** code for `empty-line-after-super` rule:

```js
class Derived extends Base {
  constructor (firstArg, secondArg) {
    super(firstArg)

    this.secondArg = secondArg
  }
}
```

## Version

* Since `0.1.0`

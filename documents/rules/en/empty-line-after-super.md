# empty-line-after-super

* If a statement follows `super()` in the constructor, it forces a empty line between `super()` and the next line.

## Rule Details

* Here's a summary of why placing a empty line after `super()`.

### Two sentences with different meanings

* An empty line between two sentences with different meanings improves readability.

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

* The only role of `super()` is to "execute the constructor of the parent class". Can write statements after `super()`, but the sentence will never have the same meaning as `super()`.

* Since so, it needs to be a empty line between `super()` and the following line.

### Simplified Review

* If the practice of placing a blank line between `super()` and the following statement is not part of the culture, it will be pointed out in every code review. This custom rule was created to save you the trouble of that review.

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

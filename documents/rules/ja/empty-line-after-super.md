# empty-line-after-super

* コンストラクタ内に記述する `super()` の後続に文が置かれる場合、`super()` と次行の間に空白行を置く事を強制します。

## Rule Details

* 以下は、`super()` の後続に空白行を置く理由のまとめです。

### 意味の異なる二文

* 意味の異なるふたつの文の間には、空白行を置く事で可読性が向上します。

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

### `super()` の役割

* `super()` の役割は、「親クラスのコンストラクタを実行する」のひとつだけです。`super()` の後続に文を書くことはできますが、其れ等の文が `super()` と同じ意味の役割になる事はありません。

* 其の事から、`super()` の後続に文が置かれる場合は、`super()` と後続行の間には常に空白行を置かれる事になります。

### レビューの簡略化

* `super()` と後続文の間に空白行を置く習慣が文化になってない場合、コードレビューで毎回指摘する事になります。其のレビューの手間を省く為に、此のカスタムルールが作成されました。

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

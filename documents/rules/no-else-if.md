# no-else-if

* Prohibit `else if`.
  > `else if` を禁止します。

## Rule Details

* Here's a summary of why `else if` is disallowed.
  > 以下は、`else if` がなぜ禁止されるかのまとめです。

### syntax sugar of nested if statements<br>入れ子になった if 文の糖衣構文

* `else if` is the sugar-coated syntax for nesting if statements; wherever `else if` is written, there will be as many nested conditional branches as there are repeated `else if`.
  > `else if` は、if 文をネストさせる時の糖衣構文です。else if が書かれている場所には、else if を繰り返した数だけ条件分岐のネストが存在します。

### complex nested structures waste the reader's brain resources<br>複雑な入れ子構造は、読み手の脳のリソースを浪費させる

* Complex nesting of if statements bloats the code reader's effort in chasing down conditional branches. If all ifs were not nested, there would not be a single stack of if statements in the code reader's brain, thus not wasting brain resources.
  > if 文を複雑にネストさせるのは、コードの読み手が条件分岐を追いかける労力を肥大化させます。もしも全ての if がネストしないのであれば、コードを読む人の脳内には if 文のスタックはひとつも積まれることはないので、脳のリソースを無駄に浪費させないでしょう。

* In object-oriented programming, conditional branches with if statements can be designed without any nesting. We have decided to prohibit `else if` so that all engineers can work on programming without avoiding precise class design.
  > オブジェクト指向プログラミングでは、if 文による条件分岐を一切ネストさせる事無く設計できます。全エンジニアが精密なクラス設計を回避することなくプログラミング作業に取り組める様にする為に、`else if` を禁止する事にしました。


## How to Refactor to Purge `else if`

* To use `early returns` and `guard clauses` can avoid `else if` in many cases.
  > 早期リターンやガード節を利用すれば、多くのケースで `else if` を回避できます。

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
  > ひとつの変数の値により複数の分岐をする場合は、オブジェクトハッシュを使う方が優れています。

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

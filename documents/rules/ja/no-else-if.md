# no-else-if

* `else if` を禁止します。

## Rule Details

* 以下は、`else if` がなぜ禁止されるかのまとめです。

### 入れ子になった if 文の糖衣構文

* `else if` は、if 文をネストさせる時の糖衣構文です。else if が書かれている場所には、else if を繰り返した数だけ条件分岐のネストが存在します。

### 複雑な入れ子構造は、読み手の脳のリソースを浪費させる

* if 文を複雑にネストさせるのは、コードの読み手が条件分岐を追いかける労力を肥大化させます。もしも全ての if がネストしないのであれば、コードを読む人の脳内には if 文のスタックはひとつも積まれることはないので、脳のリソースを無駄に浪費させないでしょう。

* オブジェクト指向プログラミングでは、if 文による条件分岐を一切ネストさせる事無く設計できます。複雑なコードを簡単に生産できない様にして全エンジニアが精密なクラス設計に集中できる環境を整える為に、`else if` を禁止する事にしました。

## `else if`　の置き換え方法

* 早期リターンやガード節を利用すれば、多くのケースで `else if` を回避できます。

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

* ひとつの変数の値により複数の分岐をする場合は、オブジェクトハッシュを使う方が優れています。

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

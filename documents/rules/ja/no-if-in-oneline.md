# no-if-in-oneline

* `if` 文を一行で書く事を禁止します。

## Rule Details

* 以下は、`if` 文を一行で書くことを禁止する理由のまとめです。

### 文章構造を理解する速度

* `if` 文を一行で書くと、其のソースコードを読む人の負担は過度に増えます。コードを読む人は、一行で書かれた `if` 文の行を右に読み進めて、何が行われてるかを確認しなければなりません。

* 以下のどちらが楽かを考えれば、右に読み進めながら構文解釈するのがダメな理由は容易に理解できると思います。
  1. 右方向に目を移動させながらコンマの位置を確認して構文を脳内で構築する
  1. 目を下方向に移動しながら、改行を手掛かりにして構文を脳内で構築する

* 読み手のが確認しなければならないポイントは、以下の様に多岐に渡ります。
  1. `if` 文の制御フローが複文であるかどうか
  1. `if` 文の制御フローが複文の時、文が幾つ含まれるか
  1. `if` 文の制御フローに `return` があるかどうか
  1. `else` が含まれるかどうか

* `if` 文で分岐される処理フローを複数行で書くと、コードの読み手は「各行の左端」を縦に読み進めるだけで `if` 文の構造が把握できます。

```js
// 行を右方向へ読み進めないと return value の存在に気付かない。
if (conditionFirst && conditionSecond) return
if (conditionFirst && conditionSecond) return returnValue

// 行を右方向へ読み進めないと return の存在に気付かない。
if (condition) { const result = createResult(); return result }

// 行を右方向へ読み進めないと else の存在に気付かない。
if (condition) { return result35 } else { return result28 }
```

```js
// 各行の左端の位置で縦に読み進めれば、各行の最初の2つのトークンを確認するだけで if 文の構造が把握できる。

// return value の存在
if (conditionFirst && conditionSecond)
  return
if (conditionFirst && conditionSecond)
  return returnValue

// return の存在
if (condition) {
  const result = createResult()

  return result
}

// else の存在
if (condition) {
  return result35
} else {
  return result28
}
```

* 此れに対し、`if` 文を一行で書くことのメリットは以下に尽きます。
  1. ソースコードの見た目の行数が減る

* コードの読み手は、文単位で読み進めています。ソースコードの物理的な行を減らすのが好いのであれば、全部の文を `;` で連結して一行で書く方が優れた記法になるはずですが、そんなことはありません。

* コード含まれる全体の **文数** が減らないのであれば、ソースコードを記述する行数が減る事には意味はなく、一行で書かれた `if` 文は、読み手に「行を右側まで全部読ませる」と云う負担を強いているだけの読みにくいコードです。

### 短い `if` 文

* 此れに対して、以下の様に主張する開発者もいるでしょう。
  ```
  短い `if` 文なら、行を右方向に追いかけなくても構造は把握できる。
  ```

* 短さは主観的で、定量化するのは難しいものです。以下の例で、どこからが短いと判断できるかは、個人差が大きいでしょう。

```js
if (ok) return
if (value === 3) return
if (3 < value && value <= 10) return
if (condition1 === 20 && condition2 === 40 && condition3 === 60) return
```

* 「短ければ `if` 文を一行で書いて好い」と云うコーディング規約にすると、プルリクエスト時に「短いかどうか」の議論が始まります。其の議論の為の時間をゼロにする為に、此のカスタムルールが作られました。

## Version

* Since `0.1.0`

# newline-per-parameter

* 関数やメソッド定義時に、複数のパラメータ名を一行で書くのを禁止する。

## Rule Details

* 以下は、関数やメソッド定義時に、複数のパラメータ名を一行で書くことを禁止する理由のまとめです。

### 引数を理解する速度

* 関数やメソッドの定義時に、複数の引数定義を一行で書くと、ソースコードを読む人は `,` を頼りに脳内で区切りながら読み進めて行く事になります。各パラメータが識別子を `,` で区切るだけのプレーンな定義であれば苦労しませんが、ディフォルト値が指定されたり、オブジェクト構文が使われると、`,` を脳内でスタックしながら読み進めるのは大変です。

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

* 識別子を一行にひとつだけ記述するルールとすれば、読み手は各行の左端を追いかけるだけで、引数構造が把握できます。

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

### 引数定義のシンプルさ

* 此れに対して、以下の様に主張する開発者もいるでしょう。
  ```
  識別子のみを `,` で区切るシンプルな記述であれば、一行で書かれていたとしても容易に構造は把握できる。
  ```

* シンプルさは主観的で、定量化するのは難しいものです。以下の例で、どこからが短いと判断できるかは、個人差が大きいでしょう。

```js
function method (first) { ... }
function method (first, second) { ... }
function method (first, second, third) { ... }
function method (first, second, third, fourth) { ... }
function method (first, second, third, fourth, fifth) { ... }
```

* 「シンプルな引数定義であれば一行で書いて好い」と云うコーディング規約にすると、プルリクエスト時に「シンプルかどうか」の議論が始まります。其の議論の為の時間をゼロにする為に、此のカスタムルールが作られました。

### 識別子ふたつの場合

* 此のルールは、「識別子がふたつだけのシンプルな定義」にも改行を要求します。此のケースだけ例外的にOKとする規定も考えられますが、此れについては以下の理由で不採用としました。
  1. 開発者が此のコーディングルールを覚える時、「識別子は一行にひとつ」とする方が例外がなく覚えやすい。
  1. 引数が2つ以上ある関数定義は適切な設計ではない可能性が高く、改行させることで「其処に下手な設計がある」事を開発者に自覚させる効果がある。

* 上記の「引数が2つ以上ある関数定義は適切な設計ではない」事の理由は以下の通り。
  1. 引数が2つ以上ある関数定義では、其の関数を利用する作業者が「引数の序列」を覚える必要がある。
  1. オブジェクト構文を使えば、ひとつの引数で全引数を渡せて、関数の呼び出し元で引数の序列を意識することがなくなる。

## Version

* Since `0.1.0`

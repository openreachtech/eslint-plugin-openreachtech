# no-unexpected-multiline

* 以下の全条件が満たされた時にエラーとします。
  1. `+` 式か `-` 式である。
  2. 演算子の前で改行されている。
  3. 演算子で始まる行がインデントされていない。

* エラーの時、`--fix` オプションにより、演算子の前に `; ` を挿入します。

## Rule Details

* 以下は、此のルールが必要な理由のまとめです。

### 予期せぬ複数行式

* セミコロン無しルールで運用する際に問題となるのが、予期せぬ複数行式が生成されることです。

* コード例

```
// 1.
MyClass.prototype.myMethod = function() {
  return 42;
}  // ここにセミコロンがない

(function() {
  // この一時的なブロックスコープで初期化処理などを行う
})();


var x = {
  'i': 1,
  'j': 2
}  // セミコロンがない

// 2. Internet Explorer や FireFox のために以下のようなコードを書く
// 普通はこんな書き方はしないけど, 例なので
[ffVersion, ieVersion][isIE]();


var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // セミコロンがない

// 3. bash 風な条件文
-1 == resultOfOperation() || die();
```

* 上記のコード例で、1. と 2. は此のルールとは無関係です。

* 3. は、`-1` で始まる式が前の行と繋がって「引き算の式」として認識されてしまう問題を引き起こします。

### 回避策

* 此の問題を回避するのに、次の様に考えました。

  1. 行頭に書かれた `-1` の様な単項演算子式が、「前の行から続く引き算の式」として認識される問題が生じた。
  1. プログラマが「単項演算子で始まる行をインデントしないで書く」なら、其れは「前の行の続きとして書かれたコード」の意図ではないと判定できる。
  1. ESLint で「インデントがおかしい」とエラーを出す事で、該当行に「予期せぬ複数行式」が有ることをプログラマに伝える。

* `--fix` で解決する際、二行目の演算子の直前に `; ` を挿入する事で「予期せぬ複数行式が生じる可能性」を排除しています。

## Version

* Since `0.1.0`

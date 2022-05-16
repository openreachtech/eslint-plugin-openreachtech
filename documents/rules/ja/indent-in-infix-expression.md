# indent-in-infix-expression

* 中置演算子式の途中で改行する場合、二行目以降のインデントを強制します。

* 以下の条件の時は、2行目以降のインデントを中置演算子式の左オペランドに合わせます。
  1. 中置演算子式が他の構文に含まれている。
  2. 左オペランドの直前で改行されている。
## Rule Details

* 以下は、中置演算子式が途中で改行された時に何故インデントが必要かのまとめです。

### ネストした二項演算子式

* ネストした二項演算子式が一列で書かれると、行が長い場合は読みやすさが損なわれます。

  ```
  const result = leftOperand + middleOperand - rightOperand + extraOperand
  ```

* 演算子ごとに改行することで可読性が向上します。

  ```
  const result = leftOperand
    + middleOperand
    - rightOperand
    + extraOperand
  ```

* 或る式を複数行で記述する時、二行目以降はインデントを付与するのが一般的です。しかし、現在の ESLint には、此のエラーを検出するルールが存在しません。
Cf.
[Indent for binary operators #12427](https://github.com/eslint/eslint/issues/12427)
[indent: add option for multiline [assignment] statement #12248](https://github.com/eslint/eslint/issues/12248)
[indent doesn't apply to expressions split across multiple lines #12255](https://github.com/eslint/eslint/issues/12255)

* 複数行の二項演算子式でインデント対応する為に、此のルールを作成しました。
## ESList

* 現在、ESLint で此のカスタムルールと同等の処理ができるプルリクエストが出ています。次のバージョンアップで対応される可能性があります。
[feat: indent: add BinaryExpression option #15555](https://github.com/eslint/eslint/pull/15555)

## Version

* Since `0.1.0`

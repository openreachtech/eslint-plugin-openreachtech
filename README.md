# ESLint plugin Open Reach Tech inc.

## Overview

* This is ESLint plugin by Open Reach Tech.

* As of March 2022, the following ESLint rules are packed.

```
empty-line-after-super
indent-in-infix-expression
no-else-if
no-unexpected-multiline
```

## Usage

1. Install

    ```
    npm install --save-dev eslint-plugin-openreachtech
    ```

2. Update `.eslintrc` settings in your application package.

    ```
    ...

    plugins:
      - openreachtech

    ...

    rules:
      openreachtech/empty-line-after-super: error
      openreachtech/indent-in-infix-expression: error
      openreachtech/no-else-if: error
      openreachtech/no-unexpected-multiline: error

    ...
    ```

* Error Message.

    ```
    % npx eslint .

    /your/project/directory/target-file.js
      129:3  18:5   error  Require empty line between super call and other statements  empty-line-after-super

    /your/project/directory/target-file.js
      21:20  error  Must add indent before "-"  indent-in-infix-expression
      24:21  error  Must remove indent before "-" indent-in-infix-expression
      31:20  error  Must add indent before right operand of "+" indent-in-infix-expression
      34:21  error  Must remove indent before right operand of "-" indent-in-infix-expression

    /your/project/directory/target-file.js
      9:8  error  Never use else-if statement  openreachtech/no-else-if
    ```

## Rules

* `empty-line-after-super` [[English](./documents/rules/en/empty-line-after-super.md)] [[日本語](./documents/rules/ja/empty-line-after-super.md)]
* `indent-in-infix-expression` [[English](./documents/rules/en/indent-in-infix-expression.md)] [[日本語](./documents/rules/ja/indent-in-infix-expression.md)]
* `no-else-if` [[English](./documents/rules/en/no-else-if.md)] [[日本語](./documents/rules/ja/no-else-if.md)]
* `no-unexpected-multiline` [[English](./documents/rules/en/no-unexpected-multilinef.md)] [[日本語](./documents/rules/ja/no-unexpected-multiline.md)]

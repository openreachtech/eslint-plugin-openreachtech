# ESLint plugin Open Reach Tech inc.

## Overview

* This is ESLint plugin by Open Reach Tech.

* As of March 2022, the following ESLint rules are packed.

```
no-else-if
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
      openreachtech/no-else-if: error

    ...
    ```

* Error Message.

    ```
    % npx eslint .

    /your/project/directory/target-file.js
      9:8  error  Never use else-if statement  openreachtech/no-else-if
    ```

## Rules

* `no-else-if` [[English](./documents/rules/en/no-else-if.md)] [[日本語](./documents/rules/ja/no-else-if.md)]

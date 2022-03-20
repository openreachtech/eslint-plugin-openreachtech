# ESLint plugin Open Reach Tech

## Overview

* This is ESLint plugin by Open Reach Tech.

* As of March 2022, the following ESLint rules are packed.

```
no-else-if
```

## Usage

* Update `.eslintrc` settings in your application package.

1. Add `openreachtech` into `plugins` property.

    ```
    plugins:
      - openreachtech
    ```

2. Add `openreachtech/no-else-if: error` into `rules` property.

    ```
    rules:
      openreachtech/no-else-if: error
    ```

* Error message.

    ```
    % npx eslint .

    /your/project/directory/target-file.js
      9:8  error  Never use else-if statement  openreachtech/no-else-if
    ```

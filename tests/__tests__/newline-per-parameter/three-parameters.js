// @ts-check
'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-parameter', () => {
  const errors = ['Require to chop down per parameter of function declaration.']

  describe('three or more parameters', () => {
    describe('three plane parameters', () => {
      const validCases = []
        .concat([ // (\narg1,\narg2,\narg3\n) patterns
          {
            code: `
              function method (
                firstItem,
                secondItem,
                thirdItem
              ) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstItem,
                secondItem,
                thirdItem
              ) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstItem,
                secondItem,
                thirdItem
              ) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstItem,
                  secondItem,
                  thirdItem
                ) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstItem,
                  secondItem,
                  thirdItem
                ) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstItem,
                  secondItem,
                  thirdItem
                ) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstItem,
                  secondItem,
                  thirdItem
                ) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstItem,
                  secondItem,
                  thirdItem
                ) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstItem,
                  secondItem,
                  thirdItem
                ) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])
        .concat([ // (arg1, {\narg2\narg3\n}) patterns
          {
            code: `
              function method (firstItem, {
                secondItem,
                thirdItem,
              }) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (firstItem, {
                secondItem,
                thirdItem,
              }) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (firstItem, {
                secondItem,
                thirdItem,
              }) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (firstItem, {
                  secondItem,
                  thirdItem,
                }) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (firstItem, {
                  secondItem,
                  thirdItem,
                }) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (firstItem, {
                  secondItem,
                  thirdItem,
                }) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (firstItem, {
                  secondItem,
                  thirdItem,
                }) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (firstItem, {
                  secondItem,
                  thirdItem,
                }) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (firstItem, {
                  secondItem,
                  thirdItem,
                }) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])
        .concat([ // (\narg1,\n{\narg2,\narg3\n}\n) patterns
          {
            code: `
              function method (
                firstItem,
                {
                  secondItem,
                  thirdItem,
                }
              ) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstItem,
                {
                  secondItem,
                  thirdItem,
                }
              ) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstItem,
                {
                  secondItem,
                  thirdItem,
                }
              ) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstItem,
                  {
                    secondItem,
                    thirdItem,
                  }
                ) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstItem,
                  {
                    secondItem,
                    thirdItem,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstItem,
                  {
                    secondItem,
                    thirdItem,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstItem,
                  {
                    secondItem,
                    thirdItem,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstItem,
                  {
                    secondItem,
                    thirdItem,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstItem,
                  {
                    secondItem,
                    thirdItem,
                  }
                ) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])

      const invalidCases = ESLintHelper.expandInvalidCases([
        [
          []
            .concat([ // (arg1, arg2, arg3) patterns
              {
                code: `
                  function method (firstItem, secondItem, thirdItem) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstItem, secondItem, thirdItem) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstItem, secondItem, thirdItem) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstItem, secondItem, thirdItem) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                      this.thirdItem = thirdItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstItem, secondItem, thirdItem) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstItem, secondItem, thirdItem) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstItem, secondItem, thirdItem) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstItem, secondItem, thirdItem) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstItem, secondItem, thirdItem) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (arg1, { arg2, arg3 }) patterns
              {
                code: `
                  function method (firstItem, { secondItem, thirdItem }) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstItem, { secondItem, thirdItem }) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstItem, { secondItem, thirdItem }) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstItem, { secondItem, thirdItem }) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                      this.thirdItem = thirdItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstItem, { secondItem, thirdItem }) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstItem, { secondItem, thirdItem }) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstItem, { secondItem, thirdItem }) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstItem, { secondItem, thirdItem }) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstItem, { secondItem, thirdItem }) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (\narg1,\n{ arg2, arg3 }\n) patterns
              {
                code: `
                  function method (
                    firstItem,
                    { secondItem, thirdItem }
                  ) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (
                    firstItem,
                    { secondItem, thirdItem }
                  ) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (
                    firstItem,
                    { secondItem, thirdItem }
                  ) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (
                      firstItem,
                      { secondItem, thirdItem }
                    ) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (
                      firstItem,
                      { secondItem, thirdItem }
                    ) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (
                      firstItem,
                      { secondItem, thirdItem }
                    ) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (
                      firstItem,
                      { secondItem, thirdItem }
                    ) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (
                      firstItem,
                      { secondItem, thirdItem }
                    ) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (
                      firstItem,
                      { secondItem, thirdItem }
                    ) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ]),
          errors
        ]
      ])

      // tester.run([rule name], [rule definition], [test patterns])
      tester.run(
        'plane parameter',
        ruleBody,
        {
          valid: validCases,
          invalid: invalidCases,
        }
      )
    })

    describe('with one default value', () => {
      const validCases = []
        .concat([ // (\narg1,\narg2,\narg3 = 2\n) patterns
          {
            code: `
              function method (
                firstItem,
                secondItem,
                thirdItem = 2
              ) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstItem,
                secondItem,
                thirdItem = 2
              ) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstItem,
                secondItem,
                thirdItem = 2
              ) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstItem,
                  secondItem,
                  thirdItem = 2
                ) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstItem,
                  secondItem,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstItem,
                  secondItem,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstItem,
                  secondItem,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstItem,
                  secondItem,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstItem,
                  secondItem,
                  thirdItem = 2
                ) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])
        .concat([ // (arg1, {\narg2\narg3\n}) patterns
          {
            code: `
              function method (firstItem, {
                secondItem,
                thirdItem = 2,
              }) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (firstItem, {
                secondItem,
                thirdItem = 2,
              }) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (firstItem, {
                secondItem,
                thirdItem = 2,
              }) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (firstItem, {
                  secondItem,
                  thirdItem = 2,
                }) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (firstItem, {
                  secondItem,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (firstItem, {
                  secondItem,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (firstItem, {
                  secondItem,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (firstItem, {
                  secondItem,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (firstItem, {
                  secondItem,
                  thirdItem = 2,
                }) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])
        .concat([ // (\narg1,\n{\narg2,\narg3\n}\n) patterns
          {
            code: `
              function method (
                firstItem,
                {
                  secondItem,
                  thirdItem = 2,
                }
              ) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstItem,
                {
                  secondItem,
                  thirdItem = 2,
                }
              ) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstItem,
                {
                  secondItem,
                  thirdItem = 2,
                }
              ) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstItem,
                  {
                    secondItem,
                    thirdItem = 2,
                  }
                ) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstItem,
                  {
                    secondItem,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstItem,
                  {
                    secondItem,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstItem,
                  {
                    secondItem,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstItem,
                  {
                    secondItem,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstItem,
                  {
                    secondItem,
                    thirdItem = 2,
                  }
                ) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])

      const invalidCases = ESLintHelper.expandInvalidCases([
        [
          []
            .concat([ // (arg1, arg2, arg3 = 2) patterns
              {
                code: `
                  function method (firstItem, secondItem, thirdItem = 2) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstItem, secondItem, thirdItem = 2) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstItem, secondItem, thirdItem = 2) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstItem, secondItem, thirdItem = 2) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                      this.thirdItem = thirdItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstItem, secondItem, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstItem, secondItem, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstItem, secondItem, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstItem, secondItem, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstItem, secondItem, thirdItem = 2) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (arg1, { arg2, arg3 = 2 }) patterns
              {
                code: `
                  function method (firstItem, { secondItem, thirdItem = 2 }) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstItem, { secondItem, thirdItem = 2 }) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstItem, { secondItem, thirdItem = 2 }) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstItem, { secondItem, thirdItem = 2 }) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                      this.thirdItem = thirdItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstItem, { secondItem, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstItem, { secondItem, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstItem, { secondItem, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstItem, { secondItem, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstItem, { secondItem, thirdItem = 2 }) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (\narg1,\n{ arg2, arg3 = 2 }\n) patterns
              {
                code: `
                  function method (
                    firstItem,
                    { secondItem, thirdItem = 2 }
                  ) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (
                    firstItem,
                    { secondItem, thirdItem = 2 }
                  ) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (
                    firstItem,
                    { secondItem, thirdItem = 2 }
                  ) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (
                      firstItem,
                      { secondItem, thirdItem = 2 }
                    ) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (
                      firstItem,
                      { secondItem, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (
                      firstItem,
                      { secondItem, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (
                      firstItem,
                      { secondItem, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (
                      firstItem,
                      { secondItem, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (
                      firstItem,
                      { secondItem, thirdItem = 2 }
                    ) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ]),
          errors
        ]
      ])

      // tester.run([rule name], [rule definition], [test patterns])
      tester.run(
        'plane parameter',
        ruleBody,
        {
          valid: validCases,
          invalid: invalidCases,
        }
      )
    })

    describe('with two default values', () => {
      const validCases = []
        .concat([ // (\narg1,\narg2 = 1,\narg3 = 2\n) patterns
          {
            code: `
              function method (
                firstItem,
                secondItem = 1,
                thirdItem = 2
              ) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstItem,
                secondItem = 1,
                thirdItem = 2
              ) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstItem,
                secondItem = 1,
                thirdItem = 2
              ) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstItem,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstItem,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstItem,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstItem,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstItem,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstItem,
                  secondItem = 1,
                  thirdItem = 2
                ) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])
        .concat([ // (arg1, {\narg2\narg3\n}) patterns
          {
            code: `
              function method (firstItem, {
                secondItem = 1,
                thirdItem = 2,
              }) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (firstItem, {
                secondItem = 1,
                thirdItem = 2,
              }) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (firstItem, {
                secondItem = 1,
                thirdItem = 2,
              }) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (firstItem, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (firstItem, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (firstItem, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (firstItem, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (firstItem, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (firstItem, {
                  secondItem = 1,
                  thirdItem = 2,
                }) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])
        .concat([ // (\narg1,\n{\narg2,\narg3\n}\n) patterns
          {
            code: `
              function method (
                firstItem,
                {
                  secondItem = 1,
                  thirdItem = 2,
                }
              ) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstItem,
                {
                  secondItem = 1,
                  thirdItem = 2,
                }
              ) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstItem,
                {
                  secondItem = 1,
                  thirdItem = 2,
                }
              ) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstItem,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstItem,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstItem,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstItem,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstItem,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstItem,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])

      const invalidCases = ESLintHelper.expandInvalidCases([
        [
          []
            .concat([ // (arg1, arg2 = 1, arg3 = 2) patterns
              {
                code: `
                  function method (firstItem, secondItem = 1, thirdItem = 2) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstItem, secondItem = 1, thirdItem = 2) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstItem, secondItem = 1, thirdItem = 2) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstItem, secondItem = 1, thirdItem = 2) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                      this.thirdItem = thirdItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstItem, secondItem = 1, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstItem, secondItem = 1, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstItem, secondItem = 1, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstItem, secondItem = 1, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstItem, secondItem = 1, thirdItem = 2) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (arg1, { arg2, arg3 = 2 }) patterns
              {
                code: `
                  function method (firstItem, { secondItem = 1, thirdItem = 2 }) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstItem, { secondItem = 1, thirdItem = 2 }) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstItem, { secondItem = 1, thirdItem = 2 }) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstItem, { secondItem = 1, thirdItem = 2 }) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                      this.thirdItem = thirdItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstItem, { secondItem = 1, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstItem, { secondItem = 1, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstItem, { secondItem = 1, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstItem, { secondItem = 1, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstItem, { secondItem = 1, thirdItem = 2 }) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (\narg1,\n{ arg2, arg3 = 2 }\n) patterns
              {
                code: `
                  function method (
                    firstItem,
                    { secondItem = 1, thirdItem = 2 }
                  ) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (
                    firstItem,
                    { secondItem = 1, thirdItem = 2 }
                  ) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (
                    firstItem,
                    { secondItem = 1, thirdItem = 2 }
                  ) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (
                      firstItem,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (
                      firstItem,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (
                      firstItem,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (
                      firstItem,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (
                      firstItem,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (
                      firstItem,
                      { secondItem = 1, thirdItem = 2 }
                    ) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ]),
          errors
        ]
      ])

      // tester.run([rule name], [rule definition], [test patterns])
      tester.run(
        'plane parameter',
        ruleBody,
        {
          valid: validCases,
          invalid: invalidCases,
        }
      )
    })

    describe('with three default values', () => {
      const validCases = []
        .concat([ // (\narg1 = 0,\narg2 = 1,\narg3 = 2\n) patterns
          {
            code: `
              function method (
                firstItem = 0,
                secondItem = 1,
                thirdItem = 2
              ) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstItem = 0,
                secondItem = 1,
                thirdItem = 2
              ) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstItem = 0,
                secondItem = 1,
                thirdItem = 2
              ) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstItem = 0,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstItem = 0,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstItem = 0,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstItem = 0,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstItem = 0,
                  secondItem = 1,
                  thirdItem = 2
                ) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstItem = 0,
                  secondItem = 1,
                  thirdItem = 2
                ) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])
        .concat([ // (arg1, {\narg2\narg3\n}) patterns
          {
            code: `
              function method (firstItem = 0, {
                secondItem = 1,
                thirdItem = 2,
              }) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (firstItem = 0, {
                secondItem = 1,
                thirdItem = 2,
              }) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (firstItem = 0, {
                secondItem = 1,
                thirdItem = 2,
              }) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (firstItem = 0, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (firstItem = 0, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (firstItem = 0, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (firstItem = 0, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (firstItem = 0, {
                  secondItem = 1,
                  thirdItem = 2,
                }) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (firstItem = 0, {
                  secondItem = 1,
                  thirdItem = 2,
                }) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])
        .concat([ // (\narg1,\n{\narg2,\narg3\n}\n) patterns
          {
            code: `
              function method (
                firstItem = 0,
                {
                  secondItem = 1,
                  thirdItem = 2,
                }
              ) {
                return firstItem + secondItem + thirdItem * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstItem = 0,
                {
                  secondItem = 1,
                  thirdItem = 2,
                }
              ) {
                return firstItem + secondItem + thirdItem * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstItem = 0,
                {
                  secondItem = 1,
                  thirdItem = 2,
                }
              ) => {
                return firstItem + secondItem + thirdItem * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstItem = 0,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  this.firstItem = firstItem
                  this.secondItem = secondItem
                  this.thirdItem = thirdItem
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstItem = 0,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstItem = 0,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstItem = 0,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstItem = 0,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) {
                  return firstItem + secondItem + thirdItem * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstItem = 0,
                  {
                    secondItem = 1,
                    thirdItem = 2,
                  }
                ) => {
                  return firstItem + secondItem + thirdItem * 90
                }
              }
            `,
          },
        ])

      const invalidCases = ESLintHelper.expandInvalidCases([
        [
          []
            .concat([ // (arg1 = 0, arg2 = 1, arg3 = 2) patterns
              {
                code: `
                  function method (firstItem = 0, secondItem = 1, thirdItem = 2) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstItem = 0, secondItem = 1, thirdItem = 2) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstItem = 0, secondItem = 1, thirdItem = 2) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstItem = 0, secondItem = 1, thirdItem = 2) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                      this.thirdItem = thirdItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstItem = 0, secondItem = 1, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstItem = 0, secondItem = 1, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstItem = 0, secondItem = 1, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstItem = 0, secondItem = 1, thirdItem = 2) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstItem = 0, secondItem = 1, thirdItem = 2) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (arg1, { arg2, arg3 = 2 }) patterns
              {
                code: `
                  function method (firstItem = 0, { secondItem = 1, thirdItem = 2 }) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstItem = 0, { secondItem = 1, thirdItem = 2 }) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstItem = 0, { secondItem = 1, thirdItem = 2 }) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstItem = 0, { secondItem = 1, thirdItem = 2 }) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                      this.thirdItem = thirdItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstItem = 0, { secondItem = 1, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstItem = 0, { secondItem = 1, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstItem = 0, { secondItem = 1, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstItem = 0, { secondItem = 1, thirdItem = 2 }) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstItem = 0, { secondItem = 1, thirdItem = 2 }) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (\narg1,\n{ arg2, arg3 = 2 }\n) patterns
              {
                code: `
                  function method (
                    firstItem = 0,
                    { secondItem = 1, thirdItem = 2 }
                  ) {
                    return firstItem + secondItem + thirdItem * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (
                    firstItem = 0,
                    { secondItem = 1, thirdItem = 2 }
                  ) {
                    return firstItem + secondItem + thirdItem * 20
                  }
                `,
              },
              {
                code: `
                  const method = (
                    firstItem = 0,
                    { secondItem = 1, thirdItem = 2 }
                  ) => {
                    return firstItem + secondItem + thirdItem * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (
                      firstItem = 0,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      this.firstItem = firstItem
                      this.secondItem = secondItem
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (
                      firstItem = 0,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (
                      firstItem = 0,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (
                      firstItem = 0,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (
                      firstItem = 0,
                      { secondItem = 1, thirdItem = 2 }
                    ) {
                      return firstItem + secondItem + thirdItem * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (
                      firstItem = 0,
                      { secondItem = 1, thirdItem = 2 }
                    ) => {
                      return firstItem + secondItem + thirdItem * 90
                    }
                  }
                `,
              },
            ]),
          errors
        ]
      ])

      // tester.run([rule name], [rule definition], [test patterns])
      tester.run(
        'plane parameter',
        ruleBody,
        {
          valid: validCases,
          invalid: invalidCases,
        }
      )
    })
  })
})

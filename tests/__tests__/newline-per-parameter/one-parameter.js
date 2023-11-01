'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-parameter', () => {
  const errors = ['Require to chop down per parameter of function declaration.']

  describe('one parameter', () => {
    const validCases = []
      .concat([ // (arg) patterns
        {
          code: `
            function method (firstItem) {
              return firstItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstItem) {
              return firstItem * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstItem) {
                this.firstItem = firstItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstItem) {
                return firstItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstItem) {
                return firstItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstItem) {
                return firstItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstItem) {
                return firstItem * 80
              }
            }
          `,
        },
      ])
      .concat([ // (\narg\n) patterns
        {
          code: `
            function method (
              firstItem
            ) {
              return firstItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem
            ) {
              return firstItem * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem
            ) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem
              ) {
                this.firstItem = firstItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstItem
              ) {
                return firstItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstItem
              ) {
                return firstItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstItem
              ) {
                return firstItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstItem
              ) {
                return firstItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem
              ) => {
                return firstItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg\n}) patterns
        {
          code: `
            function method ({
              firstItem
            }) {
              return firstItem * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstItem
            }) {
              return firstItem * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstItem
            }) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstItem
              }) {
                this.firstItem = firstItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstItem
              }) {
                return firstItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstItem
              }) {
                return firstItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstItem
              }) {
                return firstItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstItem
              }) {
                return firstItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstItem
              }) => {
                return firstItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // (...args) patterns
        {
          code: `
            function method (...firstItems) {
              return firstItems.map(it => it + 10)
            }
          `,
        },
        {
          code: `
            const method = function (...firstItems) {
              return firstItems.map(it => it + 20)
            }
          `,
        },
        {
          code: `
            const method = (...firstItems) => {
              return firstItems.map(it => it + 30)
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (...firstItems) {
                this.firstItems = firstItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (...firstItems) {
                return firstItems.map(it => it + 60)
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (...firstItems) {
                return firstItems.map(it => it + 70)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (...firstItems) {
                return firstItems.map(it => it + 80)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (...firstItems) {
                return firstItems.map(it => it + 90)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (...firstItems) => {
                return firstItems.map(it => it + 100)
              }
            }
          `,
        },
      ])
      .concat([ // (\n...args\n) patterns
        {
          code: `
            function method (
              ...firstItems
            ) {
              return firstItems.map(it => it + 10)
            }
          `,
        },
        {
          code: `
            const method = function (
              ...firstItems
            ) {
              return firstItems.map(it => it + 20)
            }
          `,
        },
        {
          code: `
            const method = (
              ...firstItems
            ) => {
              return firstItems.map(it => it + 30)
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                ...firstItems
              ) {
                this.firstItems = firstItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                ...firstItems
              ) {
                return firstItems.map(it => it + 50)
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                ...firstItems
              ) {
                return firstItems.map(it => it + 60)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                ...firstItems
              ) {
                return firstItems.map(it => it + 70)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                ...firstItems
              ) {
                return firstItems.map(it => it + 80)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                ...firstItems
              ) => {
                return firstItems.map(it => it + 90)
              }
            }
          `,
        },
      ])
      .concat([ // ({\n...args\n}) patterns
        {
          code: `
            function method ({
              ...firstItems
            }) {
              return firstItems.map(it => it + 10)
            }
          `,
        },
        {
          code: `
            const method = function ({
              ...firstItems
            }) {
              return firstItems.map(it => it + 20)
            }
          `,
        },
        {
          code: `
            const method = ({
              ...firstItems
            }) => {
              return firstItems.map(it => it + 30)
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstItems
              }) {
                this.firstItems = firstItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                ...firstItems
              }) {
                return firstItems.map(it => it + 50)
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                ...firstItems
              }) {
                return firstItems.map(it => it + 60)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                ...firstItems
              }) {
                return firstItems.map(it => it + 70)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                ...firstItems
              }) {
                return firstItems.map(it => it + 80)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                ...firstItems
              }) => {
                return firstItems.map(it => it + 90)
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like valid
        {
          code: `
            const method = (firstItem) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            const method = firstItem => {
              return firstItem * 40
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem) => {
                return firstItem * 90
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: firstItem => {
                return firstItem * 100
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like invalid
        {
          code: `
            const method = ({ firstItem }) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            const method = ({ ...firstItems }) => {
              return firstItems.map(it => it + 30)
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({ ...firstItems }) => {
                return firstItems.map(it => it + 90)
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({ firstItem }) => {
                return firstItem * 90
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        []
          .concat([ // { arg } patterns
            {
              code: `
                function method ({ firstItem }) {
                  return firstItem * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstItem }) {
                  return firstItem * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstItem }) {
                    this.firstItem = firstItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstItem }) {
                    return firstItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstItem }) {
                    return firstItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstItem }) {
                    return firstItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstItem }) {
                    return firstItem * 80
                  }
                }
              `,
            },
          ])
          .concat([ // { ...args } patterns
            {
              code: `
                function method ({ ...firstItems }) {
                  return firstItems.map(it => it + 10)
                }
              `,
            },
            {
              code: `
                const method = function ({ ...firstItems }) {
                  return firstItems.map(it => it + 20)
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ ...firstItems }) {
                    this.firstItem = firstItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ ...firstItems }) {
                    return firstItems.map(it => it + 50)
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ ...firstItems }) {
                    return firstItems.map(it => it + 60)
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ ...firstItems }) {
                    return firstItems.map(it => it + 70)
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ ...firstItems }) {
                    return firstItems.map(it => it + 80)
                  }
                }
              `,
            },
          ]),
        errors,
      ],
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

  // -------------------------------------------------------- with default value
  describe('one parameter', () => {
    const validCases = []
      .concat([ // (arg = 0) patterns
        {
          code: `
            function method (firstItem = 100) {
              return firstItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstItem = 101) {
              return firstItem * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstItem = 103) {
                this.firstItem = firstItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstItem = 104) {
                return firstItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstItem = 105) {
                return firstItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstItem = 106) {
                return firstItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstItem = 107) {
                return firstItem * 80
              }
            }
          `,
        },
      ])
      .concat([ // (\narg = 0\n) patterns
        {
          code: `
            function method (
              firstItem = 200
            ) {
              return firstItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem = 201
            ) {
              return firstItem * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem = 202
            ) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem = 203
              ) {
                this.firstItem = firstItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstItem = 204
              ) {
                return firstItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstItem = 205
              ) {
                return firstItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstItem = 206
              ) {
                return firstItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstItem = 207
              ) {
                return firstItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem = 208
              ) => {
                return firstItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg = 0\n}) patterns
        {
          code: `
            function method ({
              firstItem = 300
            }) {
              return firstItem * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstItem = 301
            }) {
              return firstItem * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstItem = 302
            }) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstItem = 303
              }) {
                this.firstItem = firstItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstItem = 304
              }) {
                return firstItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstItem = 305
              }) {
                return firstItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstItem = 306
              }) {
                return firstItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstItem = 307
              }) {
                return firstItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstItem = 308
              }) => {
                return firstItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like valid
        {
          code: `
            const method = (firstItem = 102) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem = 108) => {
                return firstItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like invalid
        {
          code: `
            const method = ({ firstItem = 102 }) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({ firstItem = 108 }) => {
                return firstItem * 90
              }
            }
          `,
        },
        {
          code: `
            const method = ({ firstItem } = {}) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({ firstItem } = {}) => {
                return firstItem * 90
              }
            }
          `,
        },
        {
          code: `
            const method = (
              { firstItem } = {}
            ) => {
              return firstItem * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                { firstItem } = {}
              ) => {
                return firstItem * 90
              }
            }
          `,
        },
        {
          code: `
            const method = ({ ...firstItems } = {}) => {
              return firstItems.map(it => it + 30)
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({ ...firstItems } = {}) => {
                return firstItems.map(it => it + 90)
              }
            }
          `,
        },
        {
          code: `
            const method = (
              { ...firstItems } = {}
            ) => {
              return firstItems.map(it => it + 30)
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                { ...firstItems } = {}
              ) => {
                return firstItems.map(it => it + 90)
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        []
          .concat([ // ({ arg = 0 }) patterns
            {
              code: `
                function method ({ firstItem = 100 }) {
                  return firstItem * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstItem = 101 }) {
                  return firstItem * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstItem = 103 }) {
                    this.firstItem = firstItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstItem = 104 }) {
                    return firstItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstItem = 105 }) {
                    return firstItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstItem = 106 }) {
                    return firstItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstItem = 107 }) {
                    return firstItem * 80
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg } = {}) patterns
            {
              code: `
                function method ({ firstItem } = {}) {
                  return firstItem * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstItem } = {}) {
                  return firstItem * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstItem } = {}) {
                    this.firstItem = firstItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstItem } = {}) {
                    return firstItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstItem } = {}) {
                    return firstItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstItem } = {}) {
                    return firstItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstItem } = {}) {
                    return firstItem * 80
                  }
                }
              `,
            },
          ])
          .concat([ // (\n{ arg } = {}\n) patterns
            {
              code: `
                function method (
                  { firstItem } = {}
                ) {
                  return firstItem * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  { firstItem } = {}
                ) {
                  return firstItem * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    { firstItem } = {}
                  ) {
                    this.firstItem = firstItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (
                    { firstItem } = {}
                  ) {
                    return firstItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    { firstItem } = {}
                  ) {
                    return firstItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    { firstItem } = {}
                  ) {
                    return firstItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    { firstItem } = {}
                  ) {
                    return firstItem * 80
                  }
                }
              `,
            },
          ])
          .concat([ // ({ ...args } = {}) patterns
            {
              code: `
                function method ({ ...firstItems } = {}) {
                  return firstItems.map(it => it + 10)
                }
              `,
            },
            {
              code: `
                const method = function ({ ...firstItems } = {}) {
                  return firstItems.map(it => it + 20)
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ ...firstItems } = {}) {
                    this.firstItems = firstItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ ...firstItems } = {}) {
                    return firstItems.map(it => it + 50)
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ ...firstItems } = {}) {
                    return firstItems.map(it => it + 60)
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ ...firstItems } = {}) {
                    return firstItems.map(it => it + 70)
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ ...firstItems } = {}) {
                    return firstItems.map(it => it + 80)
                  }
                }
              `,
            },
          ])
          .concat([ // (\n.{..args} = {}\n) patterns
            {
              code: `
                function method (
                  { ...firstItems } = {}
                ) {
                  return firstItems.map(it => it + 10)
                }
              `,
            },
            {
              code: `
                const method = function (
                  { ...firstItems } = {}
                ) {
                  return firstItems.map(it => it + 20)
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    { ...firstItems } = {}
                  ) {
                    this.firstItems = firstItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (
                    { ...firstItems } = {}
                  ) {
                    return firstItems.map(it => it + 50)
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    { ...firstItems } = {}
                  ) {
                    return firstItems.map(it => it + 60)
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    { ...firstItems } = {}
                  ) {
                    return firstItems.map(it => it + 70)
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    { ...firstItems } = {}
                  ) {
                    return firstItems.map(it => it + 80)
                  }
                }
              `,
            },
          ]),
        errors,
      ],
    ])

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      'with default value',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })
})

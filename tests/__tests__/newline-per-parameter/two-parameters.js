// @ts-check
'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-parameter', () => {
  const errors = ['Require to chop down per parameter of function declaration.']

  describe('two parameters', () => {
    const validCases = []
      .concat([ // (\narg1,\narg2\n) patterns
        {
          code: `
            function method (
              firstItem,
              secondItem
            ) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem,
              secondItem
            ) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem,
              secondItem
            ) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem,
                secondItem
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
                secondItem
              ) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstItem,
                secondItem
              ) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstItem,
                secondItem
              ) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstItem,
                secondItem
              ) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem,
                secondItem
              ) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // (arg1, {\narg2\n}) patterns
        {
          code: `
            function method (firstItem, {
              secondItem
            }) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstItem, {
              secondItem
            }) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = (firstItem, {
              secondItem
            }) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstItem, {
                secondItem
              }) {
                this.firstItem = firstItem
                this.secondItem = secondItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstItem, {
                secondItem
              }) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstItem, {
                secondItem
              }) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstItem, {
                secondItem
              }) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstItem, {
                secondItem
              }) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem, {
                secondItem
              }) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // (\narg1,\n{\narg2\n}\n) patterns
        {
          code: `
            function method (
              firstItem,
              {
                secondItem
              }
            ) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem,
              {
                secondItem
              }
            ) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem,
              {
                secondItem
              }
            ) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem,
                {
                  secondItem
                }
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
                {
                  secondItem
                }
              ) {
                return firstItem + secondItem * 50
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
                  secondItem
                }
              ) {
                return firstItem + secondItem * 60
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
                  secondItem
                }
              ) {
                return firstItem + secondItem * 70
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
                  secondItem
                }
              ) {
                return firstItem + secondItem * 80
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
                  secondItem
                }
              ) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg1,\narg2\n}) patterns
        {
          code: `
            function method ({
              firstItem,
              secondItem,
            }) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstItem,
              secondItem,
            }) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstItem,
              secondItem,
            }) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstItem,
                secondItem,
              }) {
                this.firstItem = firstItem
                this.secondItem = secondItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstItem,
                secondItem,
              }) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstItem,
                secondItem,
              }) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstItem,
                secondItem,
              }) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstItem,
                secondItem,
              }) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstItem,
                secondItem,
              }) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        []
          .concat([ // (arg1, arg2) patterns
            {
              code: `
                function method (firstItem, secondItem) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstItem, secondItem) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = (firstItem, secondItem) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstItem, secondItem) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstItem, secondItem) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstItem, secondItem) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstItem, secondItem) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstItem, secondItem) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (firstItem, secondItem) => {
                    return firstItem + secondItem * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (arg1, { arg2 }) patterns
            {
              code: `
                function method (firstItem, { secondItem }) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstItem, { secondItem }) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = (firstItem, { secondItem }) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstItem, { secondItem }) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstItem, { secondItem }) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstItem, { secondItem }) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstItem, { secondItem }) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstItem, { secondItem }) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (firstItem, { secondItem }) => {
                    return firstItem + secondItem * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (\narg1,\n{ arg2 }\n) patterns
            {
              code: `
                function method (
                  firstItem,
                  { secondItem }
                ) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  firstItem,
                  { secondItem }
                ) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = (
                  firstItem,
                  { secondItem }
                ) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    firstItem,
                    { secondItem }
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
                    { secondItem }
                  ) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    firstItem,
                    { secondItem }
                  ) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    firstItem,
                    { secondItem }
                  ) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    firstItem,
                    { secondItem }
                  ) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (
                    firstItem,
                    { secondItem }
                  ) => {
                    return firstItem + secondItem * 90
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg1, arg2 }) patterns
            {
              code: `
                function method ({ firstItem, secondItem }) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstItem, secondItem }) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = ({ firstItem, secondItem }) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstItem, secondItem }) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstItem, secondItem }) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstItem, secondItem }) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstItem, secondItem }) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstItem, secondItem }) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: ({ firstItem, secondItem }) => {
                    return firstItem + secondItem * 90
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
      'two plane parameters',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })

  describe('two parameters', () => {
    const validCases = []
      .concat([ // (\narg1,\narg2 = 1\n) patterns
        {
          code: `
            function method (
              firstItem,
              secondItem = 1
            ) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem,
              secondItem = 1
            ) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem,
              secondItem = 1
            ) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem,
                secondItem = 1
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
                secondItem = 1
              ) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstItem,
                secondItem = 1
              ) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstItem,
                secondItem = 1
              ) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstItem,
                secondItem = 1
              ) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem,
                secondItem = 1
              ) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // (arg1, {\narg2\n} = {}) patterns
        {
          code: `
            function method (firstItem, {
              secondItem
            } = {}) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstItem, {
              secondItem
            } = {}) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = (firstItem, {
              secondItem
            } = {}) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstItem, {
                secondItem
              } = {}) {
                this.firstItem = firstItem
                this.secondItem = secondItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstItem, {
                secondItem
              } = {}) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstItem, {
                secondItem
              } = {}) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstItem, {
                secondItem
              } = {}) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstItem, {
                secondItem
              } = {}) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem, {
                secondItem
              } = {}) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // (\narg1,\n{\narg2\n} = {}\n) patterns
        {
          code: `
            function method (
              firstItem,
              {
                secondItem
              } = {}
            ) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem,
              {
                secondItem
              } = {}
            ) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem,
              {
                secondItem
              } = {}
            ) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem,
                {
                  secondItem
                } = {}
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
                {
                  secondItem
                } = {}
              ) {
                return firstItem + secondItem * 50
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
                  secondItem
                } = {}
              ) {
                return firstItem + secondItem * 60
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
                  secondItem
                } = {}
              ) {
                return firstItem + secondItem * 70
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
                  secondItem
                } = {}
              ) {
                return firstItem + secondItem * 80
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
                  secondItem
                } = {}
              ) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg1,\narg2 = 1\n}) patterns
        {
          code: `
            function method ({
              firstItem,
              secondItem = 1,
            }) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstItem,
              secondItem = 1,
            }) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstItem,
              secondItem = 1,
            }) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstItem,
                secondItem = 1,
              }) {
                this.firstItem = firstItem
                this.secondItem = secondItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstItem,
                secondItem = 1,
              }) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstItem,
                secondItem = 1,
              }) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstItem,
                secondItem = 1,
              }) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstItem,
                secondItem = 1,
              }) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstItem,
                secondItem = 1,
              }) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        []
          .concat([ // (arg1, { arg2 } = {}) patterns
            {
              code: `
                function method (firstItem, { secondItem } = {}) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstItem, { secondItem } = {}) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = (firstItem, { secondItem } = {}) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstItem, { secondItem } = {}) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstItem, { secondItem } = {}) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstItem, { secondItem } = {}) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstItem, { secondItem } = {}) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstItem, { secondItem } = {}) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (firstItem, { secondItem } = {}) => {
                    return firstItem + secondItem * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (\narg1,\n{ arg2 } = {}\n) patterns
            {
              code: `
                function method (
                  firstItem,
                  { secondItem } = {}
                ) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  firstItem,
                  { secondItem } = {}
                ) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = (
                  firstItem,
                  { secondItem } = {}
                ) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    firstItem,
                    { secondItem } = {}
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
                    { secondItem } = {}
                  ) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    firstItem,
                    { secondItem } = {}
                  ) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    firstItem,
                    { secondItem } = {}
                  ) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    firstItem,
                    { secondItem } = {}
                  ) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (
                    firstItem,
                    { secondItem } = {}
                  ) => {
                    return firstItem + secondItem * 90
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg1, arg2 = 1 }) patterns
            {
              code: `
                function method ({ firstItem, secondItem = 1 }) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstItem, secondItem = 1 }) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = ({ firstItem, secondItem = 1 }) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstItem, secondItem = 1 }) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstItem, secondItem = 1 }) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstItem, secondItem = 1 }) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstItem, secondItem = 1 }) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstItem, secondItem = 1 }) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: ({ firstItem, secondItem = 1 }) => {
                    return firstItem + secondItem * 90
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
      'with one default value',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })

  describe('two parameters', () => {
    const validCases = []
      .concat([ // (\narg1 = 0,\narg2 = 1\n) patterns
        {
          code: `
            function method (
              firstItem = 0,
              secondItem = 1
            ) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem = 0,
              secondItem = 1
            ) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem = 0,
              secondItem = 1
            ) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem = 0,
                secondItem = 1
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
                secondItem = 1
              ) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstItem = 0,
                secondItem = 1
              ) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstItem = 0,
                secondItem = 1
              ) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstItem = 0,
                secondItem = 1
              ) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem = 0,
                secondItem = 1
              ) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // (\narg1 = 0,\n{\narg2\n} = {}\n) patterns
        {
          code: `
            function method (
              firstItem = 0,
              {
                secondItem
              } = {}
            ) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem = 0,
              {
                secondItem
              } = {}
            ) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem = 0,
              {
                secondItem
              } = {}
            ) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem = 0,
                {
                  secondItem
                } = {}
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
                {
                  secondItem
                } = {}
              ) {
                return firstItem + secondItem * 50
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
                  secondItem
                } = {}
              ) {
                return firstItem + secondItem * 60
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
                  secondItem
                } = {}
              ) {
                return firstItem + secondItem * 70
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
                  secondItem
                } = {}
              ) {
                return firstItem + secondItem * 80
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
                  secondItem
                } = {}
              ) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg1 = 0,\narg2 = 1\n}) patterns
        {
          code: `
            function method ({
              firstItem = 0,
              secondItem = 1,
            }) {
              return firstItem + secondItem * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstItem = 0,
              secondItem = 1,
            }) {
              return firstItem + secondItem * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstItem = 0,
              secondItem = 1,
            }) => {
              return firstItem + secondItem * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstItem = 0,
                secondItem = 1,
              }) {
                this.firstItem = firstItem
                this.secondItem = secondItem
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstItem = 0,
                secondItem = 1,
              }) {
                return firstItem + secondItem * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstItem = 0,
                secondItem = 1,
              }) {
                return firstItem + secondItem * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstItem = 0,
                secondItem = 1,
              }) {
                return firstItem + secondItem * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstItem = 0,
                secondItem = 1,
              }) {
                return firstItem + secondItem * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstItem = 0,
                secondItem = 1,
              }) => {
                return firstItem + secondItem * 90
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        []
          .concat([ // (arg1 = 0, arg2 = 1) patterns
            {
              code: `
                function method (firstItem = 0, secondItem = 1) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstItem = 0, secondItem = 1) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = (firstItem = 0, secondItem = 1) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstItem = 0, secondItem = 1) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstItem = 0, secondItem = 1) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstItem = 0, secondItem = 1) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstItem = 0, secondItem = 1) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstItem = 0, secondItem = 1) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (firstItem = 0, secondItem = 1) => {
                    return firstItem + secondItem * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (\narg1 = 0,\n{ arg2 } = {}\n) patterns
            {
              code: `
                function method (
                  firstItem = 0,
                  { secondItem } = {}
                ) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  firstItem = 0,
                  { secondItem } = {}
                ) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = (
                  firstItem = 0,
                  { secondItem } = {}
                ) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    firstItem = 0,
                    { secondItem } = {}
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
                    { secondItem } = {}
                  ) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    firstItem = 0,
                    { secondItem } = {}
                  ) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    firstItem = 0,
                    { secondItem } = {}
                  ) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    firstItem = 0,
                    { secondItem } = {}
                  ) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (
                    firstItem = 0,
                    { secondItem } = {}
                  ) => {
                    return firstItem + secondItem * 90
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg1 = 0, arg2 = 1 }) patterns
            {
              code: `
                function method ({ firstItem = 0, secondItem = 1 }) {
                  return firstItem + secondItem * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstItem = 0, secondItem = 1 }) {
                  return firstItem + secondItem * 20
                }
              `,
            },
            {
              code: `
                const method = ({ firstItem = 0, secondItem = 1 }) => {
                  return firstItem + secondItem * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstItem = 0, secondItem = 1 }) {
                    this.firstItem = firstItem
                    this.secondItem = secondItem
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstItem = 0, secondItem = 1 }) {
                    return firstItem + secondItem * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstItem = 0, secondItem = 1 }) {
                    return firstItem + secondItem * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstItem = 0, secondItem = 1 }) {
                    return firstItem + secondItem * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstItem = 0, secondItem = 1 }) {
                    return firstItem + secondItem * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: ({ firstItem = 0, secondItem = 1 }) => {
                    return firstItem + secondItem * 90
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
      'with two default values',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })
})

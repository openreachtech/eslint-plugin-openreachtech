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
      ])
      .concat([ // (\narg1,\n...args\n) patterns
        {
          code: `
            function method (
              firstItem,
              ...secondItems
            ) {
              return firstItem + secondItems.length * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem,
              ...secondItems
            ) {
              return firstItem + secondItems.length * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem,
                ...secondItems
              ) {
                this.firstItem = firstItem
                this.secondItems = secondItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstItem,
                ...secondItems
              ) {
                return firstItem + secondItems.length * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstItem,
                ...secondItems
              ) {
                return firstItem + secondItems.length * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstItem,
                ...secondItems
              ) {
                return firstItem + secondItems.length * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstItem,
                ...secondItems
              ) {
                return firstItem + secondItems.length * 80
              }
            }
          `,
        },
      ])
      .concat([ // (arg1, {\n...args\n}) patterns
        {
          code: `
            function method (firstItem, {
              ...secondItems
            }) {
              return firstItem + secondItems.length * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstItem, {
              ...secondItems
            }) {
              return firstItem + secondItems.length * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstItem, {
                ...secondItems
              }) {
                this.firstItem = firstItem
                this.secondItem = secondItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstItem, {
                ...secondItems
              }) {
                return firstItem + secondItems.length * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstItem, {
                ...secondItems
              }) {
                return firstItem + secondItems.length * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstItem, {
                ...secondItems
              }) {
                return firstItem + secondItems.length * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstItem, {
                ...secondItems
              }) {
                return firstItem + secondItems.length * 80
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg1,\n...args\n}) patterns
        {
          code: `
            function method ({
              firstItem,
              ...secondItems
            }) {
              return firstItem + secondItems.length * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstItem,
              ...secondItems
            }) {
              return firstItem + secondItems.length * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstItem,
                ...secondItems
              }) {
                this.firstItem = firstItem
                this.secondItem = secondItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstItem,
                ...secondItems
              }) {
                return firstItem + secondItems.length * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstItem,
                ...secondItems
              }) {
                return firstItem + secondItems.length * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstItem,
                ...secondItems
              }) {
                return firstItem + secondItems.length * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstItem,
                ...secondItems
              }) {
                return firstItem + secondItems.length * 80
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like valid
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
            const object = {
              method: (firstItem, {
                secondItem
              }) => {
                return firstItem + secondItem * 90
              }
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
        {
          code: `
            const method = (
              firstItem,
              ...secondItems
            ) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem,
                ...secondItems
              ) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
        {
          code: `
            const method = (firstItem, {
              ...secondItems
            }) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem, {
                ...secondItems
              }) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
        {
          code: `
            const method = ({
              firstItem,
              ...secondItems
            }) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstItem,
                ...secondItems
              }) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like invalid
        {
          code: `
            const method = (firstItem, secondItem) => {
              return firstItem + secondItem * 30
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
        {
          code: `
            const method = (firstItem, { secondItem }) => {
              return firstItem + secondItem * 30
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
        {
          code: `
            const method = ({ firstItem, secondItem }) => {
              return firstItem + secondItem * 30
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
        {
          code: `
            const method = (firstItem, ...secondItems) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem, ...secondItems) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
        {
          code: `
            const method = (firstItem, { ...secondItems }) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem, { ...secondItems }) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
        {
          code: `
            const method = ({ firstItem, ...secondItems }) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({ firstItem, ...secondItems }) => {
                return firstItem + secondItems.length * 90
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
          ])
          .concat([ // (arg1, ...args) patterns
            {
              code: `
                function method (firstItem, ...secondItems) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstItem, ...secondItems) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstItem, ...secondItems) {
                    this.firstItem = firstItem
                    this.secondItems = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstItem, ...secondItems) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstItem, ...secondItems) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstItem, ...secondItems) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstItem, ...secondItems) {
                    return firstItem + secondItems.length * 80
                  }
                }
              `,
            },
          ])
          .concat([ // (arg1, { ...args }) patterns
            {
              code: `
                function method (firstItem, { ...secondItems }) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstItem, { ...secondItems }) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstItem, { ...secondItems }) {
                    this.firstItem = firstItem
                    this.secondItem = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstItem, { ...secondItems }) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstItem, { ...secondItems }) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstItem, { ...secondItems }) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstItem, { ...secondItems }) {
                    return firstItem + secondItems.length * 80
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg1, ...args }) patterns
            {
              code: `
                function method ({ firstItem, ...secondItems }) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstItem, ...secondItems }) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstItem, ...secondItems }) {
                    this.firstItem = firstItem
                    this.secondItem = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstItem, ...secondItems }) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstItem, ...secondItems }) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstItem, ...secondItems }) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstItem, ...secondItems }) {
                    return firstItem + secondItems.length * 80
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
      ])
      .concat([ // (arg1, {\n...args\n} = {}) patterns
        {
          code: `
            function method (firstItem, {
              ...secondItems
            } = {}) {
              return firstItem + secondItems.length * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstItem, {
              ...secondItems
            } = {}) {
              return firstItem + secondItems.length * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstItem, {
                ...secondItems
              } = {}) {
                this.firstItem = firstItem
                this.secondItems = secondItems
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstItem, {
                ...secondItems
              } = {}) {
                return firstItem + secondItems.length * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstItem, {
                ...secondItems
              } = {}) {
                return firstItem + secondItems.length * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstItem, {
                ...secondItems
              } = {}) {
                return firstItem + secondItems.length * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstItem, {
                ...secondItems
              } = {}) {
                return firstItem + secondItems.length * 80
              }
            }
          `,
        },
      ])
      .concat([ // (\narg1,\n{\n...args\n} = {}\n) patterns
        {
          code: `
            function method (
              firstItem,
              {
                ...secondItems
              } = {}
            ) {
              return firstItem + secondItems.length * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem,
              {
                ...secondItems
              } = {}
            ) {
              return firstItem + secondItems.length * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem,
                {
                  ...secondItems
                } = {}
              ) {
                this.firstItem = firstItem
                this.secondItems = secondItems
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
                  ...secondItems
                } = {}
              ) {
                return firstItem + secondItems.length * 50
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
                  ...secondItems
                } = {}
              ) {
                return firstItem + secondItems.length * 60
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
                  ...secondItems
                } = {}
              ) {
                return firstItem + secondItems.length * 70
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
                  ...secondItems
                } = {}
              ) {
                return firstItem + secondItems.length * 80
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like valid
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
            const object = {
              method: (firstItem, {
                secondItem
              } = {}) => {
                return firstItem + secondItem * 90
              }
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
        {
          code: `
            const method = (firstItem, {
              ...secondItems
            } = {}) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem, {
                ...secondItems
              } = {}) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem,
              {
                ...secondItems
              } = {}
            ) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem,
                {
                  ...secondItems
                } = {}
              ) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like invalid
        {
          code: `
            const method = (firstItem, { secondItem } = {}) => {
              return firstItem + secondItem * 30
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
        {
          code: `
            const method = ({ firstItem, secondItem = 1 }) => {
              return firstItem + secondItem * 30
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
        {
          code: `
            const method = (firstItem, { ...secondItems } = {}) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstItem, { ...secondItems } = {}) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
        {
          code: `
            const method = (
              firstItem,
              { ...secondItems } = {}
            ) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem,
                { ...secondItems } = {}
              ) => {
                return firstItem + secondItems.length * 90
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
          ])
          .concat([ // (arg1, { ...args } = {}) patterns
            {
              code: `
                function method (firstItem, { ...secondItems } = {}) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstItem, { ...secondItems } = {}) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstItem, { ...secondItems } = {}) {
                    this.firstItem = firstItem
                    this.secondItems = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstItem, { ...secondItems } = {}) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstItem, { ...secondItems } = {}) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstItem, { ...secondItems } = {}) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstItem, { ...secondItems } = {}) {
                    return firstItem + secondItems.length * 80
                  }
                }
              `,
            },
          ])
          .concat([ // (\narg1,\n{ ...args } = {}\n) patterns
            {
              code: `
                function method (
                  firstItem,
                  { ...secondItems } = {}
                ) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  firstItem,
                  { ...secondItems } = {}
                ) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    firstItem,
                    { ...secondItems } = {}
                  ) {
                    this.firstItem = firstItem
                    this.secondItems = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (
                    firstItem,
                    { ...secondItems } = {}
                  ) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    firstItem,
                    { ...secondItems } = {}
                  ) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    firstItem,
                    { ...secondItems } = {}
                  ) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    firstItem,
                    { ...secondItems } = {}
                  ) {
                    return firstItem + secondItems.length * 80
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
      ])
      .concat([ // (\narg1 = 0,\n{\n...args\n} = {}\n) patterns
        {
          code: `
            function method (
              firstItem = 0,
              {
                ...secondItems
              } = {}
            ) {
              return firstItem + secondItems.length * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstItem = 0,
              {
                ...secondItems
              } = {}
            ) {
              return firstItem + secondItems.length * 20
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstItem = 0,
                {
                  ...secondItems
                } = {}
              ) {
                this.firstItem = firstItem
                this.secondItems = secondItems
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
                  ...secondItems
                } = {}
              ) {
                return firstItem + secondItems.length * 50
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
                  ...secondItems
                } = {}
              ) {
                return firstItem + secondItems.length * 60
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
                  ...secondItems
                } = {}
              ) {
                return firstItem + secondItems.length * 70
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
                  ...secondItems
                } = {}
              ) {
                return firstItem + secondItems.length * 80
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like valid
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
        {
          code: `
            const method = (
              firstItem = 0,
              {
                ...secondItems
              } = {}
            ) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem = 0,
                {
                  ...secondItems
                } = {}
              ) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
      ])
      .concat([ // fo ArrowFunctionExpression like invalid
        {
          code: `
            const method = (firstItem = 0, secondItem = 1) => {
              return firstItem + secondItem * 30
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
        {
          code: `
            const method = ({ firstItem = 0, secondItem = 1 }) => {
              return firstItem + secondItem * 30
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
        {
          code: `
            const method = (
              firstItem = 0,
              { ...secondItems } = {}
            ) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstItem = 0,
                { ...secondItems } = {}
              ) => {
                return firstItem + secondItems.length * 90
              }
            }
          `,
        },
        {
          code: `
            const method = ({ firstItem = 0, ...secondItems } = {}) => {
              return firstItem + secondItems.length * 30
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({ firstItem = 0, ...secondItems } = {}) => {
                return firstItem + secondItems.length * 90
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
          ])
          .concat([ // (\narg1 = 0,\n{ ...args } = {}\n) patterns
            {
              code: `
                function method (
                  firstItem = 0,
                  { ...secondItems } = {}
                ) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  firstItem = 0,
                  { ...secondItems } = {}
                ) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    firstItem = 0,
                    { ...secondItems } = {}
                  ) {
                    this.firstItem = firstItem
                    this.secondItems = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (
                    firstItem = 0,
                    { ...secondItems } = {}
                  ) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    firstItem = 0,
                    { ...secondItems } = {}
                  ) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    firstItem = 0,
                    { ...secondItems } = {}
                  ) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    firstItem = 0,
                    { ...secondItems } = {}
                  ) {
                    return firstItem + secondItems.length * 80
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg1 = 0, ...args } = {}) patterns
            {
              code: `
                function method ({ firstItem = 0, ...secondItems } = {}) {
                  return firstItem + secondItems.length * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstItem = 0, ...secondItems } = {}) {
                  return firstItem + secondItems.length * 20
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstItem = 0, ...secondItems } = {}) {
                    this.firstItem = firstItem
                    this.secondItems = secondItems
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstItem = 0, ...secondItems } = {}) {
                    return firstItem + secondItems.length * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstItem = 0, ...secondItems } = {}) {
                    return firstItem + secondItems.length * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstItem = 0, ...secondItems } = {}) {
                    return firstItem + secondItems.length * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstItem = 0, ...secondItems } = {}) {
                    return firstItem + secondItems.length * 80
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
      'with two default values',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })
})

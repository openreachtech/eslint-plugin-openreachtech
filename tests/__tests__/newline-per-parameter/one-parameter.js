'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-parameter', () => {
  const errors = ['Require to chop down per parameter of function declaration.']

  describe('one argument', () => {
    const validCases = []
      .concat([ // (arg) patterns
        {
          code: `
            function method (firstArgument) {
              return firstArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstArgument) {
              return firstArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (firstArgument) => {
              return firstArgument * 30
            }
          `,
        },
        {
          code: `
            const method = firstArgument => {
              return firstArgument * 40
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstArgument) {
                this.firstArgument = firstArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstArgument) {
                return firstArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstArgument) {
                return firstArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstArgument) {
                return firstArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstArgument) {
                return firstArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstArgument) => {
                return firstArgument * 90
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: firstArgument => {
                return firstArgument * 100
              }
            }
          `,
        },
      ])
      .concat([ // (\narg\n) patterns
        {
          code: `
            function method (
              firstArgument
            ) {
              return firstArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstArgument
            ) {
              return firstArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstArgument
            ) => {
              return firstArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstArgument
              ) {
                this.firstArgument = firstArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstArgument
              ) {
                return firstArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstArgument
              ) {
                return firstArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstArgument
              ) {
                return firstArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstArgument
              ) {
                return firstArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstArgument
              ) => {
                return firstArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg\n}) patterns
        {
          code: `
            function method ({
              firstArgument
            }) {
              return firstArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstArgument
            }) {
              return firstArgument * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstArgument
            }) => {
              return firstArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstArgument
              }) {
                this.firstArgument = firstArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstArgument
              }) {
                return firstArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstArgument
              }) {
                return firstArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstArgument
              }) {
                return firstArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstArgument
              }) {
                return firstArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstArgument
              }) => {
                return firstArgument * 90
              }
            }
          `,
        },
      ])

    const invalidCases = ESLintHelper.expandInvalidCases([
      [
        [
          {
            code: `
              function method ({ firstArgument }) {
                return firstArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function ({ firstArgument }) {
                return firstArgument * 20
              }
            `,
          },
          {
            code: `
              const method = ({ firstArgument }) => {
                return firstArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor ({ firstArgument }) {
                  this.firstArgument = firstArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method ({ firstArgument }) {
                  return firstArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method ({ firstArgument }) {
                  return firstArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method ({ firstArgument }) {
                  return firstArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function ({ firstArgument }) {
                  return firstArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: ({ firstArgument }) => {
                  return firstArgument * 90
                }
              }
            `,
          },
        ],
        errors
      ],
    ])

    // tester.run([rule name], [rule definition], [test patterns])
    tester.run(
      'plane argument',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })

  // -------------------------------------------------------- with default value
  describe('one argument', () => {
    const validCases = []
      .concat([ // (arg = 0) patterns
        {
          code: `
            function method (firstArgument = 100) {
              return firstArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstArgument = 101) {
              return firstArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (firstArgument = 102) => {
              return firstArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstArgument = 103) {
                this.firstArgument = firstArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstArgument = 104) {
                return firstArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstArgument = 105) {
                return firstArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstArgument = 106) {
                return firstArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstArgument = 107) {
                return firstArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstArgument = 108) => {
                return firstArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // (\narg = 0\n) patterns
        {
          code: `
            function method (
              firstArgument = 200
            ) {
              return firstArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstArgument = 201
            ) {
              return firstArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstArgument = 202
            ) => {
              return firstArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstArgument = 203
              ) {
                this.firstArgument = firstArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstArgument = 204
              ) {
                return firstArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstArgument = 205
              ) {
                return firstArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstArgument = 206
              ) {
                return firstArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstArgument = 207
              ) {
                return firstArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstArgument = 208
              ) => {
                return firstArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg = 0\n}) patterns
        {
          code: `
            function method ({
              firstArgument = 300
            }) {
              return firstArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstArgument = 301
            }) {
              return firstArgument * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstArgument = 302
            }) => {
              return firstArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstArgument = 303
              }) {
                this.firstArgument = firstArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstArgument = 304
              }) {
                return firstArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstArgument = 305
              }) {
                return firstArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstArgument = 306
              }) {
                return firstArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstArgument = 307
              }) {
                return firstArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstArgument = 308
              }) => {
                return firstArgument * 90
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
                function method ({ firstArgument = 100 }) {
                  return firstArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstArgument = 101 }) {
                  return firstArgument * 20
                }
              `,
            },
            {
              code: `
                const method = ({ firstArgument = 102 }) => {
                  return firstArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstArgument = 103 }) {
                    this.firstArgument = firstArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstArgument = 104 }) {
                    return firstArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstArgument = 105 }) {
                    return firstArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstArgument = 106 }) {
                    return firstArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstArgument = 107 }) {
                    return firstArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: ({ firstArgument = 108 }) => {
                    return firstArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg } = {}) patterns
            {
              code: `
                function method ({ firstArgument } = {}) {
                  return firstArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstArgument } = {}) {
                  return firstArgument * 20
                }
              `,
            },
            {
              code: `
                const method = ({ firstArgument } = {}) => {
                  return firstArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstArgument } = {}) {
                    this.firstArgument = firstArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstArgument } = {}) {
                    return firstArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstArgument } = {}) {
                    return firstArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstArgument } = {}) {
                    return firstArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstArgument } = {}) {
                    return firstArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: ({ firstArgument } = {}) => {
                    return firstArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (\n{ arg } = {}\n) patterns
            {
              code: `
                function method (
                  { firstArgument } = {}
                ) {
                  return firstArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  { firstArgument } = {}
                ) {
                  return firstArgument * 20
                }
              `,
            },
            {
              code: `
                const method = (
                  { firstArgument } = {}
                ) => {
                  return firstArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    { firstArgument } = {}
                  ) {
                    this.firstArgument = firstArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (
                    { firstArgument } = {}
                  ) {
                    return firstArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    { firstArgument } = {}
                  ) {
                    return firstArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    { firstArgument } = {}
                  ) {
                    return firstArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    { firstArgument } = {}
                  ) {
                    return firstArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (
                    { firstArgument } = {}
                  ) => {
                    return firstArgument * 90
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
      'with default value',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })
})

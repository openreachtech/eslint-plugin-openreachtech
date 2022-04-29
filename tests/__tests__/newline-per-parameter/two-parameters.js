// @ts-check
'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-parameter', () => {
  const errors = ['Require to chop down per parameter of function declaration.']

  describe('two arguments', () => {
    const validCases = []
      .concat([ // (\narg1,\narg2\n) patterns
        {
          code: `
            function method (
              firstArgument,
              secondArgument
            ) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstArgument,
              secondArgument
            ) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstArgument,
              secondArgument
            ) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstArgument,
                secondArgument
              ) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstArgument,
                secondArgument
              ) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstArgument,
                secondArgument
              ) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstArgument,
                secondArgument
              ) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstArgument,
                secondArgument
              ) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstArgument,
                secondArgument
              ) => {
                return firstArgument + secondArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // (arg1, {\narg2\n}) patterns
        {
          code: `
            function method (firstArgument, {
              secondArgument
            }) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstArgument, {
              secondArgument
            }) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (firstArgument, {
              secondArgument
            }) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstArgument, {
                secondArgument
              }) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstArgument, {
                secondArgument
              }) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstArgument, {
                secondArgument
              }) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstArgument, {
                secondArgument
              }) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstArgument, {
                secondArgument
              }) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstArgument, {
                secondArgument
              }) => {
                return firstArgument + secondArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // (\narg1,\n{\narg2\n}\n) patterns
        {
          code: `
            function method (
              firstArgument,
              {
                secondArgument
              }
            ) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstArgument,
              {
                secondArgument
              }
            ) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstArgument,
              {
                secondArgument
              }
            ) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstArgument,
                {
                  secondArgument
                }
              ) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstArgument,
                {
                  secondArgument
                }
              ) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstArgument,
                {
                  secondArgument
                }
              ) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstArgument,
                {
                  secondArgument
                }
              ) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstArgument,
                {
                  secondArgument
                }
              ) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstArgument,
                {
                  secondArgument
                }
              ) => {
                return firstArgument + secondArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg1,\narg2\n}) patterns
        {
          code: `
            function method ({
              firstArgument,
              secondArgument,
            }) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstArgument,
              secondArgument,
            }) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstArgument,
              secondArgument,
            }) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstArgument,
                secondArgument,
              }) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstArgument,
                secondArgument,
              }) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstArgument,
                secondArgument,
              }) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstArgument,
                secondArgument,
              }) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstArgument,
                secondArgument,
              }) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstArgument,
                secondArgument,
              }) => {
                return firstArgument + secondArgument * 90
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
                function method (firstArgument, secondArgument) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstArgument, secondArgument) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = (firstArgument, secondArgument) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstArgument, secondArgument) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstArgument, secondArgument) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstArgument, secondArgument) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstArgument, secondArgument) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstArgument, secondArgument) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (firstArgument, secondArgument) => {
                    return firstArgument + secondArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (arg1, { arg2 }) patterns
            {
              code: `
                function method (firstArgument, { secondArgument }) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstArgument, { secondArgument }) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = (firstArgument, { secondArgument }) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstArgument, { secondArgument }) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstArgument, { secondArgument }) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstArgument, { secondArgument }) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstArgument, { secondArgument }) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstArgument, { secondArgument }) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (firstArgument, { secondArgument }) => {
                    return firstArgument + secondArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (\narg1,\n{ arg2 }\n) patterns
            {
              code: `
                function method (
                  firstArgument,
                  { secondArgument }
                ) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  firstArgument,
                  { secondArgument }
                ) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = (
                  firstArgument,
                  { secondArgument }
                ) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    firstArgument,
                    { secondArgument }
                  ) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (
                    firstArgument,
                    { secondArgument }
                  ) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    firstArgument,
                    { secondArgument }
                  ) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    firstArgument,
                    { secondArgument }
                  ) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    firstArgument,
                    { secondArgument }
                  ) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (
                    firstArgument,
                    { secondArgument }
                  ) => {
                    return firstArgument + secondArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg1, arg2 }) patterns
            {
              code: `
                function method ({ firstArgument, secondArgument }) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstArgument, secondArgument }) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = ({ firstArgument, secondArgument }) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstArgument, secondArgument }) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstArgument, secondArgument }) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstArgument, secondArgument }) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstArgument, secondArgument }) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstArgument, secondArgument }) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: ({ firstArgument, secondArgument }) => {
                    return firstArgument + secondArgument * 90
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
      'two plane arguments',
      ruleBody,
      {
        valid: validCases,
        invalid: invalidCases,
      }
    )
  })

  describe('two arguments', () => {
    const validCases = []
      .concat([ // (\narg1,\narg2 = 1\n) patterns
        {
          code: `
            function method (
              firstArgument,
              secondArgument = 1
            ) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstArgument,
              secondArgument = 1
            ) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstArgument,
              secondArgument = 1
            ) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstArgument,
                secondArgument = 1
              ) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstArgument,
                secondArgument = 1
              ) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstArgument,
                secondArgument = 1
              ) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstArgument,
                secondArgument = 1
              ) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstArgument,
                secondArgument = 1
              ) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstArgument,
                secondArgument = 1
              ) => {
                return firstArgument + secondArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // (arg1, {\narg2\n} = {}) patterns
        {
          code: `
            function method (firstArgument, {
              secondArgument
            } = {}) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (firstArgument, {
              secondArgument
            } = {}) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (firstArgument, {
              secondArgument
            } = {}) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (firstArgument, {
                secondArgument
              } = {}) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (firstArgument, {
                secondArgument
              } = {}) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (firstArgument, {
                secondArgument
              } = {}) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (firstArgument, {
                secondArgument
              } = {}) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (firstArgument, {
                secondArgument
              } = {}) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (firstArgument, {
                secondArgument
              } = {}) => {
                return firstArgument + secondArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // (\narg1,\n{\narg2\n} = {}\n) patterns
        {
          code: `
            function method (
              firstArgument,
              {
                secondArgument
              } = {}
            ) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstArgument,
              {
                secondArgument
              } = {}
            ) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstArgument,
              {
                secondArgument
              } = {}
            ) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstArgument,
                {
                  secondArgument
                } = {}
              ) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstArgument,
                {
                  secondArgument
                } = {}
              ) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstArgument,
                {
                  secondArgument
                } = {}
              ) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstArgument,
                {
                  secondArgument
                } = {}
              ) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstArgument,
                {
                  secondArgument
                } = {}
              ) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstArgument,
                {
                  secondArgument
                } = {}
              ) => {
                return firstArgument + secondArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg1,\narg2 = 1\n}) patterns
        {
          code: `
            function method ({
              firstArgument,
              secondArgument = 1,
            }) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstArgument,
              secondArgument = 1,
            }) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstArgument,
              secondArgument = 1,
            }) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstArgument,
                secondArgument = 1,
              }) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstArgument,
                secondArgument = 1,
              }) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstArgument,
                secondArgument = 1,
              }) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstArgument,
                secondArgument = 1,
              }) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstArgument,
                secondArgument = 1,
              }) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstArgument,
                secondArgument = 1,
              }) => {
                return firstArgument + secondArgument * 90
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
                function method (firstArgument, { secondArgument } = {}) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstArgument, { secondArgument } = {}) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = (firstArgument, { secondArgument } = {}) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstArgument, { secondArgument } = {}) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstArgument, { secondArgument } = {}) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstArgument, { secondArgument } = {}) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstArgument, { secondArgument } = {}) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstArgument, { secondArgument } = {}) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (firstArgument, { secondArgument } = {}) => {
                    return firstArgument + secondArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (\narg1,\n{ arg2 } = {}\n) patterns
            {
              code: `
                function method (
                  firstArgument,
                  { secondArgument } = {}
                ) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  firstArgument,
                  { secondArgument } = {}
                ) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = (
                  firstArgument,
                  { secondArgument } = {}
                ) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    firstArgument,
                    { secondArgument } = {}
                  ) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (
                    firstArgument,
                    { secondArgument } = {}
                  ) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    firstArgument,
                    { secondArgument } = {}
                  ) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    firstArgument,
                    { secondArgument } = {}
                  ) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    firstArgument,
                    { secondArgument } = {}
                  ) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (
                    firstArgument,
                    { secondArgument } = {}
                  ) => {
                    return firstArgument + secondArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg1, arg2 = 1 }) patterns
            {
              code: `
                function method ({ firstArgument, secondArgument = 1 }) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstArgument, secondArgument = 1 }) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = ({ firstArgument, secondArgument = 1 }) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstArgument, secondArgument = 1 }) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstArgument, secondArgument = 1 }) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstArgument, secondArgument = 1 }) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstArgument, secondArgument = 1 }) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstArgument, secondArgument = 1 }) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: ({ firstArgument, secondArgument = 1 }) => {
                    return firstArgument + secondArgument * 90
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

  describe('two arguments', () => {
    const validCases = []
      .concat([ // (\narg1 = 0,\narg2 = 1\n) patterns
        {
          code: `
            function method (
              firstArgument = 0,
              secondArgument = 1
            ) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstArgument = 0,
              secondArgument = 1
            ) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstArgument = 0,
              secondArgument = 1
            ) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstArgument = 0,
                secondArgument = 1
              ) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstArgument = 0,
                secondArgument = 1
              ) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstArgument = 0,
                secondArgument = 1
              ) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstArgument = 0,
                secondArgument = 1
              ) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstArgument = 0,
                secondArgument = 1
              ) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstArgument = 0,
                secondArgument = 1
              ) => {
                return firstArgument + secondArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // (\narg1 = 0,\n{\narg2\n} = {}\n) patterns
        {
          code: `
            function method (
              firstArgument = 0,
              {
                secondArgument
              } = {}
            ) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function (
              firstArgument = 0,
              {
                secondArgument
              } = {}
            ) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = (
              firstArgument = 0,
              {
                secondArgument
              } = {}
            ) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor (
                firstArgument = 0,
                {
                  secondArgument
                } = {}
              ) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method (
                firstArgument = 0,
                {
                  secondArgument
                } = {}
              ) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method (
                firstArgument = 0,
                {
                  secondArgument
                } = {}
              ) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method (
                firstArgument = 0,
                {
                  secondArgument
                } = {}
              ) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function (
                firstArgument = 0,
                {
                  secondArgument
                } = {}
              ) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: (
                firstArgument = 0,
                {
                  secondArgument
                } = {}
              ) => {
                return firstArgument + secondArgument * 90
              }
            }
          `,
        },
      ])
      .concat([ // ({\narg1 = 0,\narg2 = 1\n}) patterns
        {
          code: `
            function method ({
              firstArgument = 0,
              secondArgument = 1,
            }) {
              return firstArgument + secondArgument * 10
            }
          `,
        },
        {
          code: `
            const method = function ({
              firstArgument = 0,
              secondArgument = 1,
            }) {
              return firstArgument + secondArgument * 20
            }
          `,
        },
        {
          code: `
            const method = ({
              firstArgument = 0,
              secondArgument = 1,
            }) => {
              return firstArgument + secondArgument * 30
            }
          `,
        },
        {
          code: `
            class TestClass {
              constructor ({
                firstArgument = 0,
                secondArgument = 1,
              }) {
                this.firstArgument = firstArgument
                this.secondArgument = secondArgument
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              method ({
                firstArgument = 0,
                secondArgument = 1,
              }) {
                return firstArgument + secondArgument * 50
              }
            }
          `,
        },
        {
          code: `
            class TestClass {
              static method ({
                firstArgument = 0,
                secondArgument = 1,
              }) {
                return firstArgument + secondArgument * 60
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method ({
                firstArgument = 0,
                secondArgument = 1,
              }) {
                return firstArgument + secondArgument * 70
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: function ({
                firstArgument = 0,
                secondArgument = 1,
              }) {
                return firstArgument + secondArgument * 80
              }
            }
          `,
        },
        {
          code: `
            const object = {
              method: ({
                firstArgument = 0,
                secondArgument = 1,
              }) => {
                return firstArgument + secondArgument * 90
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
                function method (firstArgument = 0, secondArgument = 1) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function (firstArgument = 0, secondArgument = 1) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = (firstArgument = 0, secondArgument = 1) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (firstArgument = 0, secondArgument = 1) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (firstArgument = 0, secondArgument = 1) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (firstArgument = 0, secondArgument = 1) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (firstArgument = 0, secondArgument = 1) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (firstArgument = 0, secondArgument = 1) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (firstArgument = 0, secondArgument = 1) => {
                    return firstArgument + secondArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // (\narg1 = 0,\n{ arg2 } = {}\n) patterns
            {
              code: `
                function method (
                  firstArgument = 0,
                  { secondArgument } = {}
                ) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function (
                  firstArgument = 0,
                  { secondArgument } = {}
                ) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = (
                  firstArgument = 0,
                  { secondArgument } = {}
                ) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor (
                    firstArgument = 0,
                    { secondArgument } = {}
                  ) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method (
                    firstArgument = 0,
                    { secondArgument } = {}
                  ) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method (
                    firstArgument = 0,
                    { secondArgument } = {}
                  ) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method (
                    firstArgument = 0,
                    { secondArgument } = {}
                  ) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function (
                    firstArgument = 0,
                    { secondArgument } = {}
                  ) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: (
                    firstArgument = 0,
                    { secondArgument } = {}
                  ) => {
                    return firstArgument + secondArgument * 90
                  }
                }
              `,
            },
          ])
          .concat([ // ({ arg1 = 0, arg2 = 1 }) patterns
            {
              code: `
                function method ({ firstArgument = 0, secondArgument = 1 }) {
                  return firstArgument + secondArgument * 10
                }
              `,
            },
            {
              code: `
                const method = function ({ firstArgument = 0, secondArgument = 1 }) {
                  return firstArgument + secondArgument * 20
                }
              `,
            },
            {
              code: `
                const method = ({ firstArgument = 0, secondArgument = 1 }) => {
                  return firstArgument + secondArgument * 30
                }
              `,
            },
            {
              code: `
                class TestClass {
                  constructor ({ firstArgument = 0, secondArgument = 1 }) {
                    this.firstArgument = firstArgument
                    this.secondArgument = secondArgument
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  method ({ firstArgument = 0, secondArgument = 1 }) {
                    return firstArgument + secondArgument * 50
                  }
                }
              `,
            },
            {
              code: `
                class TestClass {
                  static method ({ firstArgument = 0, secondArgument = 1 }) {
                    return firstArgument + secondArgument * 60
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method ({ firstArgument = 0, secondArgument = 1 }) {
                    return firstArgument + secondArgument * 70
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: function ({ firstArgument = 0, secondArgument = 1 }) {
                    return firstArgument + secondArgument * 80
                  }
                }
              `,
            },
            {
              code: `
                const object = {
                  method: ({ firstArgument = 0, secondArgument = 1 }) => {
                    return firstArgument + secondArgument * 90
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

// @ts-check
'use strict'

const ESLintHelper = require('../../tools/ESLintHelper')
const ruleBody = require('../../../lib/newline-per-parameter')

// ESLint tester instead of Jest `test()`
const tester = ESLintHelper.createTester()

describe('newline-per-argument', () => {
  const errors = ['Require to chop down per argument.']

  describe('three or more arguments', () => {
    describe('three plane arguments', () => {
      const validCases = []
        .concat([ // (\narg1,\narg2,\narg3\n) patterns
          {
            code: `
              function method (
                firstArgument,
                secondArgument,
                thirdArgument
              ) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstArgument,
                secondArgument,
                thirdArgument
              ) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstArgument,
                secondArgument,
                thirdArgument
              ) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstArgument,
                  secondArgument,
                  thirdArgument
                ) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstArgument,
                  secondArgument,
                  thirdArgument
                ) {
                  return firstArgument + secondArgument + thirdArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstArgument,
                  secondArgument,
                  thirdArgument
                ) {
                  return firstArgument + secondArgument + thirdArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstArgument,
                  secondArgument,
                  thirdArgument
                ) {
                  return firstArgument + secondArgument + thirdArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstArgument,
                  secondArgument,
                  thirdArgument
                ) {
                  return firstArgument + secondArgument + thirdArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstArgument,
                  secondArgument,
                  thirdArgument
                ) => {
                  return firstArgument + secondArgument + thirdArgument * 90
                }
              }
            `,
          },
        ])
        .concat([ // (arg1, {\narg2\narg3\n}) patterns
          {
            code: `
              function method (firstArgument, {
                secondArgument,
                thirdArgument,
              }) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (firstArgument, {
                secondArgument,
                thirdArgument,
              }) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (firstArgument, {
                secondArgument,
                thirdArgument,
              }) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (firstArgument, {
                  secondArgument,
                  thirdArgument,
                }) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (firstArgument, {
                  secondArgument,
                  thirdArgument,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (firstArgument, {
                  secondArgument,
                  thirdArgument,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (firstArgument, {
                  secondArgument,
                  thirdArgument,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (firstArgument, {
                  secondArgument,
                  thirdArgument,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (firstArgument, {
                  secondArgument,
                  thirdArgument,
                }) => {
                  return firstArgument + secondArgument + thirdArgument * 90
                }
              }
            `,
          },
        ])
        .concat([ // (\narg1,\n{\narg2,\narg3\n}\n) patterns
          {
            code: `
              function method (
                firstArgument,
                {
                  secondArgument,
                  thirdArgument,
                }
              ) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstArgument,
                {
                  secondArgument,
                  thirdArgument,
                }
              ) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstArgument,
                {
                  secondArgument,
                  thirdArgument,
                }
              ) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstArgument,
                  {
                    secondArgument,
                    thirdArgument,
                  }
                ) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
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
                    secondArgument,
                    thirdArgument,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 50
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
                    secondArgument,
                    thirdArgument,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 60
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
                    secondArgument,
                    thirdArgument,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 70
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
                    secondArgument,
                    thirdArgument,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 80
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
                    secondArgument,
                    thirdArgument,
                  }
                ) => {
                  return firstArgument + secondArgument + thirdArgument * 90
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
                  function method (firstArgument, secondArgument, thirdArgument) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstArgument, secondArgument, thirdArgument) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstArgument, secondArgument, thirdArgument) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstArgument, secondArgument, thirdArgument) {
                      this.firstArgument = firstArgument
                      this.secondArgument = secondArgument
                      this.thirdArgument = thirdArgument
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstArgument, secondArgument, thirdArgument) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstArgument, secondArgument, thirdArgument) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstArgument, secondArgument, thirdArgument) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstArgument, secondArgument, thirdArgument) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstArgument, secondArgument, thirdArgument) => {
                      return firstArgument + secondArgument + thirdArgument * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (arg1, { arg2, arg3 }) patterns
              {
                code: `
                  function method (firstArgument, { secondArgument, thirdArgument }) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstArgument, { secondArgument, thirdArgument }) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstArgument, { secondArgument, thirdArgument }) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstArgument, { secondArgument, thirdArgument }) {
                      this.firstArgument = firstArgument
                      this.secondArgument = secondArgument
                      this.thirdArgument = thirdArgument
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstArgument, { secondArgument, thirdArgument }) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstArgument, { secondArgument, thirdArgument }) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstArgument, { secondArgument, thirdArgument }) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstArgument, { secondArgument, thirdArgument }) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstArgument, { secondArgument, thirdArgument }) => {
                      return firstArgument + secondArgument + thirdArgument * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (\narg1,\n{ arg2, arg3 }\n) patterns
              {
                code: `
                  function method (
                    firstArgument,
                    { secondArgument, thirdArgument }
                  ) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (
                    firstArgument,
                    { secondArgument, thirdArgument }
                  ) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (
                    firstArgument,
                    { secondArgument, thirdArgument }
                  ) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (
                      firstArgument,
                      { secondArgument, thirdArgument }
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
                      { secondArgument, thirdArgument }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (
                      firstArgument,
                      { secondArgument, thirdArgument }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (
                      firstArgument,
                      { secondArgument, thirdArgument }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (
                      firstArgument,
                      { secondArgument, thirdArgument }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (
                      firstArgument,
                      { secondArgument, thirdArgument }
                    ) => {
                      return firstArgument + secondArgument + thirdArgument * 90
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
        'plane argument',
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
                firstArgument,
                secondArgument,
                thirdArgument = 2
              ) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstArgument,
                secondArgument,
                thirdArgument = 2
              ) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstArgument,
                secondArgument,
                thirdArgument = 2
              ) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstArgument,
                  secondArgument,
                  thirdArgument = 2
                ) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstArgument,
                  secondArgument,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstArgument,
                  secondArgument,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstArgument,
                  secondArgument,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstArgument,
                  secondArgument,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstArgument,
                  secondArgument,
                  thirdArgument = 2
                ) => {
                  return firstArgument + secondArgument + thirdArgument * 90
                }
              }
            `,
          },
        ])
        .concat([ // (arg1, {\narg2\narg3\n}) patterns
          {
            code: `
              function method (firstArgument, {
                secondArgument,
                thirdArgument = 2,
              }) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (firstArgument, {
                secondArgument,
                thirdArgument = 2,
              }) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (firstArgument, {
                secondArgument,
                thirdArgument = 2,
              }) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (firstArgument, {
                  secondArgument,
                  thirdArgument = 2,
                }) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (firstArgument, {
                  secondArgument,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (firstArgument, {
                  secondArgument,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (firstArgument, {
                  secondArgument,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (firstArgument, {
                  secondArgument,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (firstArgument, {
                  secondArgument,
                  thirdArgument = 2,
                }) => {
                  return firstArgument + secondArgument + thirdArgument * 90
                }
              }
            `,
          },
        ])
        .concat([ // (\narg1,\n{\narg2,\narg3\n}\n) patterns
          {
            code: `
              function method (
                firstArgument,
                {
                  secondArgument,
                  thirdArgument = 2,
                }
              ) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstArgument,
                {
                  secondArgument,
                  thirdArgument = 2,
                }
              ) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstArgument,
                {
                  secondArgument,
                  thirdArgument = 2,
                }
              ) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstArgument,
                  {
                    secondArgument,
                    thirdArgument = 2,
                  }
                ) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
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
                    secondArgument,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 50
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
                    secondArgument,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 60
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
                    secondArgument,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 70
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
                    secondArgument,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 80
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
                    secondArgument,
                    thirdArgument = 2,
                  }
                ) => {
                  return firstArgument + secondArgument + thirdArgument * 90
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
                  function method (firstArgument, secondArgument, thirdArgument = 2) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstArgument, secondArgument, thirdArgument = 2) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstArgument, secondArgument, thirdArgument = 2) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstArgument, secondArgument, thirdArgument = 2) {
                      this.firstArgument = firstArgument
                      this.secondArgument = secondArgument
                      this.thirdArgument = thirdArgument
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstArgument, secondArgument, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstArgument, secondArgument, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstArgument, secondArgument, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstArgument, secondArgument, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstArgument, secondArgument, thirdArgument = 2) => {
                      return firstArgument + secondArgument + thirdArgument * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (arg1, { arg2, arg3 = 2 }) patterns
              {
                code: `
                  function method (firstArgument, { secondArgument, thirdArgument = 2 }) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstArgument, { secondArgument, thirdArgument = 2 }) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstArgument, { secondArgument, thirdArgument = 2 }) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstArgument, { secondArgument, thirdArgument = 2 }) {
                      this.firstArgument = firstArgument
                      this.secondArgument = secondArgument
                      this.thirdArgument = thirdArgument
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstArgument, { secondArgument, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstArgument, { secondArgument, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstArgument, { secondArgument, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstArgument, { secondArgument, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstArgument, { secondArgument, thirdArgument = 2 }) => {
                      return firstArgument + secondArgument + thirdArgument * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (\narg1,\n{ arg2, arg3 = 2 }\n) patterns
              {
                code: `
                  function method (
                    firstArgument,
                    { secondArgument, thirdArgument = 2 }
                  ) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (
                    firstArgument,
                    { secondArgument, thirdArgument = 2 }
                  ) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (
                    firstArgument,
                    { secondArgument, thirdArgument = 2 }
                  ) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (
                      firstArgument,
                      { secondArgument, thirdArgument = 2 }
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
                      { secondArgument, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (
                      firstArgument,
                      { secondArgument, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (
                      firstArgument,
                      { secondArgument, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (
                      firstArgument,
                      { secondArgument, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (
                      firstArgument,
                      { secondArgument, thirdArgument = 2 }
                    ) => {
                      return firstArgument + secondArgument + thirdArgument * 90
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
        'plane argument',
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
                firstArgument,
                secondArgument = 1,
                thirdArgument = 2
              ) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstArgument,
                secondArgument = 1,
                thirdArgument = 2
              ) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstArgument,
                secondArgument = 1,
                thirdArgument = 2
              ) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstArgument,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstArgument,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstArgument,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstArgument,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstArgument,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstArgument,
                  secondArgument = 1,
                  thirdArgument = 2
                ) => {
                  return firstArgument + secondArgument + thirdArgument * 90
                }
              }
            `,
          },
        ])
        .concat([ // (arg1, {\narg2\narg3\n}) patterns
          {
            code: `
              function method (firstArgument, {
                secondArgument = 1,
                thirdArgument = 2,
              }) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (firstArgument, {
                secondArgument = 1,
                thirdArgument = 2,
              }) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (firstArgument, {
                secondArgument = 1,
                thirdArgument = 2,
              }) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (firstArgument, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (firstArgument, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (firstArgument, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (firstArgument, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (firstArgument, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (firstArgument, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) => {
                  return firstArgument + secondArgument + thirdArgument * 90
                }
              }
            `,
          },
        ])
        .concat([ // (\narg1,\n{\narg2,\narg3\n}\n) patterns
          {
            code: `
              function method (
                firstArgument,
                {
                  secondArgument = 1,
                  thirdArgument = 2,
                }
              ) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstArgument,
                {
                  secondArgument = 1,
                  thirdArgument = 2,
                }
              ) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstArgument,
                {
                  secondArgument = 1,
                  thirdArgument = 2,
                }
              ) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstArgument,
                  {
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 50
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 60
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 70
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 80
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) => {
                  return firstArgument + secondArgument + thirdArgument * 90
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
                  function method (firstArgument, secondArgument = 1, thirdArgument = 2) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstArgument, secondArgument = 1, thirdArgument = 2) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstArgument, secondArgument = 1, thirdArgument = 2) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstArgument, secondArgument = 1, thirdArgument = 2) {
                      this.firstArgument = firstArgument
                      this.secondArgument = secondArgument
                      this.thirdArgument = thirdArgument
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstArgument, secondArgument = 1, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstArgument, secondArgument = 1, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstArgument, secondArgument = 1, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstArgument, secondArgument = 1, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstArgument, secondArgument = 1, thirdArgument = 2) => {
                      return firstArgument + secondArgument + thirdArgument * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (arg1, { arg2, arg3 = 2 }) patterns
              {
                code: `
                  function method (firstArgument, { secondArgument = 1, thirdArgument = 2 }) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstArgument, { secondArgument = 1, thirdArgument = 2 }) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstArgument, { secondArgument = 1, thirdArgument = 2 }) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstArgument, { secondArgument = 1, thirdArgument = 2 }) {
                      this.firstArgument = firstArgument
                      this.secondArgument = secondArgument
                      this.thirdArgument = thirdArgument
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstArgument, { secondArgument = 1, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstArgument, { secondArgument = 1, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstArgument, { secondArgument = 1, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstArgument, { secondArgument = 1, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstArgument, { secondArgument = 1, thirdArgument = 2 }) => {
                      return firstArgument + secondArgument + thirdArgument * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (\narg1,\n{ arg2, arg3 = 2 }\n) patterns
              {
                code: `
                  function method (
                    firstArgument,
                    { secondArgument = 1, thirdArgument = 2 }
                  ) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (
                    firstArgument,
                    { secondArgument = 1, thirdArgument = 2 }
                  ) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (
                    firstArgument,
                    { secondArgument = 1, thirdArgument = 2 }
                  ) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (
                      firstArgument,
                      { secondArgument = 1, thirdArgument = 2 }
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
                      { secondArgument = 1, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (
                      firstArgument,
                      { secondArgument = 1, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (
                      firstArgument,
                      { secondArgument = 1, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (
                      firstArgument,
                      { secondArgument = 1, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (
                      firstArgument,
                      { secondArgument = 1, thirdArgument = 2 }
                    ) => {
                      return firstArgument + secondArgument + thirdArgument * 90
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
        'plane argument',
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
                firstArgument = 0,
                secondArgument = 1,
                thirdArgument = 2
              ) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstArgument = 0,
                secondArgument = 1,
                thirdArgument = 2
              ) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstArgument = 0,
                secondArgument = 1,
                thirdArgument = 2
              ) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstArgument = 0,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (
                  firstArgument = 0,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (
                  firstArgument = 0,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (
                  firstArgument = 0,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (
                  firstArgument = 0,
                  secondArgument = 1,
                  thirdArgument = 2
                ) {
                  return firstArgument + secondArgument + thirdArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (
                  firstArgument = 0,
                  secondArgument = 1,
                  thirdArgument = 2
                ) => {
                  return firstArgument + secondArgument + thirdArgument * 90
                }
              }
            `,
          },
        ])
        .concat([ // (arg1, {\narg2\narg3\n}) patterns
          {
            code: `
              function method (firstArgument = 0, {
                secondArgument = 1,
                thirdArgument = 2,
              }) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (firstArgument = 0, {
                secondArgument = 1,
                thirdArgument = 2,
              }) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (firstArgument = 0, {
                secondArgument = 1,
                thirdArgument = 2,
              }) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (firstArgument = 0, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                method (firstArgument = 0, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 50
                }
              }
            `,
          },
          {
            code: `
              class TestClass {
                static method (firstArgument = 0, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 60
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method (firstArgument = 0, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 70
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: function (firstArgument = 0, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) {
                  return firstArgument + secondArgument + thirdArgument * 80
                }
              }
            `,
          },
          {
            code: `
              const object = {
                method: (firstArgument = 0, {
                  secondArgument = 1,
                  thirdArgument = 2,
                }) => {
                  return firstArgument + secondArgument + thirdArgument * 90
                }
              }
            `,
          },
        ])
        .concat([ // (\narg1,\n{\narg2,\narg3\n}\n) patterns
          {
            code: `
              function method (
                firstArgument = 0,
                {
                  secondArgument = 1,
                  thirdArgument = 2,
                }
              ) {
                return firstArgument + secondArgument + thirdArgument * 10
              }
            `,
          },
          {
            code: `
              const method = function (
                firstArgument = 0,
                {
                  secondArgument = 1,
                  thirdArgument = 2,
                }
              ) {
                return firstArgument + secondArgument + thirdArgument * 20
              }
            `,
          },
          {
            code: `
              const method = (
                firstArgument = 0,
                {
                  secondArgument = 1,
                  thirdArgument = 2,
                }
              ) => {
                return firstArgument + secondArgument + thirdArgument * 30
              }
            `,
          },
          {
            code: `
              class TestClass {
                constructor (
                  firstArgument = 0,
                  {
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  this.firstArgument = firstArgument
                  this.secondArgument = secondArgument
                  this.thirdArgument = thirdArgument
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 50
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 60
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 70
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) {
                  return firstArgument + secondArgument + thirdArgument * 80
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
                    secondArgument = 1,
                    thirdArgument = 2,
                  }
                ) => {
                  return firstArgument + secondArgument + thirdArgument * 90
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
                  function method (firstArgument = 0, secondArgument = 1, thirdArgument = 2) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstArgument = 0, secondArgument = 1, thirdArgument = 2) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstArgument = 0, secondArgument = 1, thirdArgument = 2) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstArgument = 0, secondArgument = 1, thirdArgument = 2) {
                      this.firstArgument = firstArgument
                      this.secondArgument = secondArgument
                      this.thirdArgument = thirdArgument
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstArgument = 0, secondArgument = 1, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstArgument = 0, secondArgument = 1, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstArgument = 0, secondArgument = 1, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstArgument = 0, secondArgument = 1, thirdArgument = 2) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstArgument = 0, secondArgument = 1, thirdArgument = 2) => {
                      return firstArgument + secondArgument + thirdArgument * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (arg1, { arg2, arg3 = 2 }) patterns
              {
                code: `
                  function method (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) {
                      this.firstArgument = firstArgument
                      this.secondArgument = secondArgument
                      this.thirdArgument = thirdArgument
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    method (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (firstArgument = 0, { secondArgument = 1, thirdArgument = 2 }) => {
                      return firstArgument + secondArgument + thirdArgument * 90
                    }
                  }
                `,
              },
            ])
            .concat([ // (\narg1,\n{ arg2, arg3 = 2 }\n) patterns
              {
                code: `
                  function method (
                    firstArgument = 0,
                    { secondArgument = 1, thirdArgument = 2 }
                  ) {
                    return firstArgument + secondArgument + thirdArgument * 10
                  }
                `,
              },
              {
                code: `
                  const method = function (
                    firstArgument = 0,
                    { secondArgument = 1, thirdArgument = 2 }
                  ) {
                    return firstArgument + secondArgument + thirdArgument * 20
                  }
                `,
              },
              {
                code: `
                  const method = (
                    firstArgument = 0,
                    { secondArgument = 1, thirdArgument = 2 }
                  ) => {
                    return firstArgument + secondArgument + thirdArgument * 30
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    constructor (
                      firstArgument = 0,
                      { secondArgument = 1, thirdArgument = 2 }
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
                      { secondArgument = 1, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 50
                    }
                  }
                `,
              },
              {
                code: `
                  class TestClass {
                    static method (
                      firstArgument = 0,
                      { secondArgument = 1, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 60
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method (
                      firstArgument = 0,
                      { secondArgument = 1, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 70
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: function (
                      firstArgument = 0,
                      { secondArgument = 1, thirdArgument = 2 }
                    ) {
                      return firstArgument + secondArgument + thirdArgument * 80
                    }
                  }
                `,
              },
              {
                code: `
                  const object = {
                    method: (
                      firstArgument = 0,
                      { secondArgument = 1, thirdArgument = 2 }
                    ) => {
                      return firstArgument + secondArgument + thirdArgument * 90
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
        'plane argument',
        ruleBody,
        {
          valid: validCases,
          invalid: invalidCases,
        }
      )
    })
  })
})

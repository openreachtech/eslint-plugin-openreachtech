// @ts-check
'use strict'

/**
 * @typedef {*} ASTNode - AST Node.
 */

/**
 * @typedef {{
 *   range: [number, number],
 *   text: string
 * }} AutoFixParams - Auto-fix parameters.
 */

/**
 * @typedef {{
 *   insertTextAfter: Function,
 *   insertTextAfterRange: Function,
 *   insertTextBefore: Function,
 *   insertTextBeforeRange: Function,
 *   replaceText: Function,
 *   replaceTextRange: Function,
 *   remove: Function,
 *   removeRange: Function'
 * }} Fixer - Fixer.
 */

/**
 * @typedef {{
 *   line: number,
 *   column: number,
 * }} Position - Location position.
 */

/**
 * @typedef {{
 *   id: string, // rule name
 *   options: Array<*>, // options to the rule
 *   report: Function,
 *   getSourceCode: Function,
 * }} RuleContext - Rule context.
 */

/**
 * @typedef {Object.<string, Function>} RuleHandler - Rule handler.
 */

/**
 * @typedef {{
 *   start: Position,
 *   end: Position
 * }} SourceLocation - Location at source.
 */

/**
 * @typedef {{
 *   type: string,
 *   value: string, // raw code
 *   loc: SourceLocation,
 *   range: [number, number],
 * }} Token - Token.
 */

/** @type {*} */
module.exports = {}

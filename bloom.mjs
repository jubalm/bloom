#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { Command } from 'commander'
import { ESLint } from 'eslint'
import stylistic from '@stylistic/eslint-plugin'

const program = new Command()
program.parse()

const target = path.resolve(process.cwd(), program.args[0])
const statTarget = await fs.lstat(target)
const files = statTarget.isFile() ? target : ['**/*.ts', '**/*.tsx']

const require = createRequire(import.meta.url);
const parser = require.resolve('@typescript-eslint/parser');

const eslint = new ESLint({
	plugins: {
		'@stylistic': stylistic,
	},
	cwd: statTarget.isFile() ? path.dirname(target) : target,
	baseConfig: {
		parser,
		plugins: ['@stylistic'],
		rules: {
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/block-spacing': ['error', 'always'],
			'@stylistic/eol-last': ['error', 'always'],
			'@stylistic/max-len': ['error', { code: 9999 }],
			'@stylistic/jsx-equals-spacing': ['error', 'always'],
			'@stylistic/jsx-indent': ['error', 'tab'],
			'@stylistic/jsx-quotes': ['error', 'prefer-single'],
			'@stylistic/jsx-curly-spacing': ['error', { when: 'always' }],
		},
	},
	fix: true,
})

try {
	const results = await eslint.lintFiles(files)
	await ESLint.outputFixes(results)
	console.info(`✔ Successfully formatted ${target}`)
} catch (error) {
	if (error instanceof Error) {
		console.error(error.message)
	} 
	console.error(error)
}

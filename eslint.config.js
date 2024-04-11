import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'

export default [
	{
		plugins: {
			'@stylistic': stylistic,
		},
		languageOptions: {
			parser: parserTs,
		},
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			// '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/block-spacing': ['error', 'always'],
			'@stylistic/eol-last': ['error', 'always'],
			'@stylistic/max-len': ['error', { code: 9999 }],
			'@stylistic/jsx-quotes': ['error', 'prefer-single'],
			'@stylistic/jsx-equals-spacing': ['error', 'always'],
		},
	},
]

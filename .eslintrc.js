module.exports = {
   env: {
      node: true,
      browser: true,
      es2021: true,
   },
   root: true,
   extends: ['@react-native', 'eslint:recommended'],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   rules: {
      quotes: [1, 'single'],
      'prettier/prettier': [
         'error',
         {
            arrowParens: 'avoid',
            bracketSameLine: true,
            bracketSpacing: false,
            singleQuote: true,
            trailingComma: 'all',
            semi: true,
            printWidth: 80,
            tabWidth: 3,
            endOfLine: 'auto',
         },
      ],
   },
};

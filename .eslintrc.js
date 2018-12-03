module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        mocha: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'off',
        'no-useless-escape': 'off',
        'no-undef': 'off',
        'react/no-deprecated': 'off',
        'react/prop-types': 'off',
        'prettier/prettier': 'error'
    }
};

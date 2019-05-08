module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        'standard',
        'plugin:vue/recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    // add your custom rules here
    rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/require-v-for-key': ['warn'],
        'vue/html-indent': 'off',
        'brace-style': ['warn'],
        'comma-dangle': [2, 'only-multiline'],
        'comma-spacing': ['warn'],
        indent: ['warn', 4],
        'no-console': [
            1,
            {
                allow: ['warn', 'error']
            }
        ],
        'no-extra-semi': 2,
        'no-multiple-empty-lines': ['warn'],
        'no-trailing-spaces': ['warn'],
        'no-unused-vars': ['warn'],
        'padded-blocks': ['warn'],
        quotes: ['warn'],
        semi: [1,'always'],
        'space-before-function-paren': 'off',
        'space-infix-ops': ['warn'],
        'spaced-comment': ['warn']
    },
    globals: {}
};

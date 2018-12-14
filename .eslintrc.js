module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
    },
    env: {
        browser: true,
        node: true
    },
    extends: ['eslint:recommended'],
    rules:{
        'indent': ['error', 'tab'],
        'semi': ['error', 'always'],
        'no-console': 0,
        'new-cap': 0,
        'no-useless-escape': 0,
        'no-redeclare': 0,
        'linebreak-style': ['error', 'unix'],
        'brace-style': ['error', '1tbs'],
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'multi-line'],
        'no-shadow-restricted-names': ['error'],
        'no-labels': ['error'],
        'no-extend-native': ['error'],
        'space-unary-ops': ['error'],
        'space-infix-ops': ['error'],
        'no-self-assign': ['error'],
        'no-throw-literal': ['warn'],
        'no-use-before-define': ['error', {
            'variables': true,
            'functions': false,
            'classes': false
        }],
        'no-multi-assign': ['warn'],
        'no-invalid-this': ['warn'],
        'new-cap': ['error'],
    },
};

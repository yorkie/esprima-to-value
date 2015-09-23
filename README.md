# esprima-to-value

convert an esprima ast object/literal to an real object

### Install

```sh
$ npm install esprima-to-value --save
```

### Usage

```js
const esprima = require('esprima');
const toValue = require('esprima-to-value');

const ast = esprima.parse(code);
console.log(ast.body);
/**
 * [
 *   { type: 'Literal', value: 10 },
 *   { type: 'ObjectExpression', properties: ... },
 *   { type: 'ArrayExpression', elements: ... },
 *   { type: 'FunctionExpression', body: { type: 'ReturnStatement', ... } },
 *  ]
 */
console.log(toValue(ast.body));
/**
 * will output:
 * [ 10, { ... }, [ ... ], 'res.body' ]
 */
```

### Author

- [Yorkie Lui](https://github.com/yorkie)

### License

MIT

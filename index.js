
'use strict';

const getObject = require('esprima-get-object');

function toValue (tree) {
  if (Array.isArray(tree)) {
    return tree.map(toValue);
  } else {
    let ret = undefined;
    switch (tree.type) {
      case 'Literal': 
        ret = tree.value; 
        break;
      case 'ArrayExpression': 
        ret = tree.elements.map(toValue); 
        break;
      case 'FunctionExpression':
        ret = getReturn(tree.body.body);
        break;
      case 'ObjectExpression':
        ret = {};
        for (let prop of tree.properties) {
          ret[prop.key.name] = toValue(prop.value);
        }
        break;
    }
    return ret;
  }
}

function getReturn (body) {
  const tree = body.shift();
  if (tree.type === 'ReturnStatement') {
    return getObject(tree.argument);
  } else if (tree.type === 'TryStatement') {
    return getReturn(tree.block.body);
  } else {
    return getReturn(body);
  }
}

module.exports = toValue;

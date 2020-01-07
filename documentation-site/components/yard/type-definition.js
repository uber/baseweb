/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import {useStyletron} from 'baseui';
import {formatCode} from 'react-view';

export function resolveToLast(type) {
  switch (type.kind) {
    case 'id':
    case 'object':
    case 'import':
      return type;
    case 'memberExpression':
      return resolveToLast(type.object);
    default:
      break;
  }
}

export function resolveFromGeneric(type) {
  if (type.kind !== 'generic') return type;
  if (type.typeParams) {
    // If a generic type is an Array, we don't want to just return the value,
    // But also the entire type object, so we can parse the typeParams later on.
    return type;
  }
  if (type.value.kind === 'generic') {
    return resolveFromGeneric(type.value);
  }
  return type.value;
}

export function reduceToObj(type) {
  const reducableKinds = ['generic', 'object', 'intersection'];
  if (type.kind === 'generic') {
    // Only attempt to reduce generic if it has a reducable value
    // Unreducable generics that have an identifier value, e.g. ElementConfig, are still valid
    // so we return early to avoid the console warn below
    return reducableKinds.includes(type.value.kind)
      ? reduceToObj(type.value)
      : [];
  } else if (type.kind === 'object') {
    return type.members;
  } else if (type.kind === 'intersection') {
    return type.types.reduce((acc, i) => [...acc, ...reduceToObj(i)], []);
  }
  /* eslint-disable-next-line no-console */
  console.warn('was expecting to reduce to an object and could not', type);
  return [];
}

const unaryWhiteList = ['-', '+', '!'];

function mapConvertAndJoin(array, joiner = ', ') {
  if (!Array.isArray(array)) return '';
  return array.map(a => convert(a)).join(joiner);
}

const converters = {
  /*
  If the value here is undefined, we can safely assume that we're dealing with
  a BooleanTypeAnnotation and not a BooleanLiteralTypeAnnotation.
  */
  boolean: type => (type.value != null ? type.value.toString() : type.kind),
  exists: type => '*',
  /*
    If the value here is undefined, we can safely assume that we're dealing with
    a NumberTypeAnnotation and not a NumberLiteralTypeAnnotation.
    */
  number: type => (type.value != null ? type.value.toString() : type.kind),
  /*
  If the value here is undefined, we can safely assume that we're dealing with
  a StringTypeAnnotation and not a StringLiteralTypeAnnotation.
*/
  string: type =>
    type.value != null ? `"${type.value.toString()}"` : type.kind,
  custom: type => type.value.toString(),
  any: type => type.kind,
  void: type => 'undefined',
  literal: type => `${type.kind}`,
  mixed: type => type.kind,
  null: type => 'null',
  logicalExpression: type => {
    return `${convert(type.left)} ${type.operator} ${convert(type.right)}`;
  },
  unary: type => {
    let space = unaryWhiteList.includes(type.operator) ? '' : ' ';
    return `${type.operator}${space}${convert(type.argument)}`;
  },

  id: type => {
    return type.name;
  },
  // this is not right and needs to be improved
  opaqueType: type => {
    return convert(type.id);
  },
  interfaceDeclaration: type => {
    return convert(type.id);
  },
  typeCastExpression: type => {
    return convert(type.expression);
  },
  JSXMemberExpression: type => {
    return `${convert(type.object)}.${convert(type.property)}`;
  },
  JSXExpressionContainer: type => {
    return `{${convert(type.expression)}}`;
  },
  JSXOpeningElement: type => {
    return `${convert(type.name)} ${mapConvertAndJoin(type.attributes, ' ')}`;
  },
  JSXElement: type => {
    return `<${convert(type.value)} />`;
  },

  JSXIdentifier: type => {
    return `${type.value}`;
  },

  JSXAttribute: type => {
    return `${convert(type.name)}=${convert(type.value)}`;
  },

  binary: type => {
    const left = convert(type.left);
    const right = convert(type.right);
    return `${left} ${type.operator} ${right}`;
  },

  function: type => {
    return `(${mapConvertAndJoin(type.parameters)}) => ${
      type.returnType === null ? 'undefined' : convert(type.returnType)
    }`;
  },
  /*
    Make this resolve members in a unique way that will allow us to
    handle property keys with no assigned value
  */
  objectPattern: type => {
    // ({ a, b }) => undefined ({a: a, b: b}) => undefined
    // ({ a = 2, b }) => undefined  ({a: a = 2, b: b })=> undefined
    return `{ ${mapConvertAndJoin(type.members)} }`;
  },

  rest: type => {
    return `...${convert(type.argument)}`;
  },

  assignmentPattern: type => {
    return `${convert(type.left)} = ${convert(type.right)}`;
  },

  param: type => {
    // this will not hold once we have types
    return convert(type.value);
  },

  array: type => {
    return `[${mapConvertAndJoin(type.elements)}]`;
  },

  arrayType: type => {
    // return `Array of ${convert(type.type)}`;
    return `Array<${convert(type.type)}>`;
  },

  spread: type => {
    return `...${convert(type.value)}`;
  },

  property: type => {
    // const sameId =
    //   type.key.kind === 'id' &&
    //   type.value.kind === 'id' &&
    //   type.key.name === type.value.name;

    // const assignmentSameId =
    //   type.value.kind === 'assignmentPattern' &&
    //   type.key.kind === 'id' &&
    //   type.value.left.kind === 'id' &&
    //   type.key.name === type.value.left.name;

    // if (sameId) {
    //   // If both keys are IDs we're applying syntactic sugar
    //   return `${convert(type.key)}`;
    // } else if (assignmentSameId) {
    //   // If the value is an assignment pattern with a left hand ID that is the same as our type.key, just return the resolved value.
    //   return `${convert(type.value)}`;
    // } else {
    return `${convert(type.key)}${type.optional ? '?' : ''}: ${convert(
      type.value,
    )}`;
    // }
  },

  object: type => {
    if (type.members.length === 0) return `{}`;
    return `{ ${mapConvertAndJoin(type.members)} }`;
  },

  memberExpression: type => {
    const object = resolveToLast(type.object);
    const property = convert(type.property);

    switch (object.kind) {
      case 'id':
        return `${convert(type.object)}.${property}`;
      case 'object': {
        const mem = object.members.find(m => {
          if (typeof m.key !== 'string') {
            // Issue here is that convert(key) can result in either a String type or an Id type,
            // one returns the value wrapped in quotations, the other does not.
            // We're stripping the quotations so we can do an accurate match against the property which is always an Id
            return convert(m.key).replace(/"/g, '') === property;
          }
          return m.key === property;
        });
        if (mem && mem.value) {
          return convert(mem.value);
        } else {
          console.error(`${property} not found in ${convert(object)}`);
          return 'undefined';
        }
      }
      case 'import':
        return `${convert(type.object)}.${property}`;
      default:
        console.error('failed to resolve member expression');
        return '';
    }
  },

  call: type => {
    let callSignature = '';
    if (type.callee.referenceIdName) {
      callSignature = type.callee.referenceIdName;
    } else if (type.callee.id) {
      callSignature = convert(type.callee.id);
    } else {
      callSignature = convert(type.callee);
    }
    // $FlowFixMe - this is incorrectly reading type.callee.referenceIdName as possibly not a string.
    return `${callSignature}(${mapConvertAndJoin(type.args)})`;
  },

  new: type => {
    const callee = convert(type.callee);
    const args = mapConvertAndJoin(type.args);
    return `new ${callee}(${args})`;
  },

  variable: type => {
    const val = type.declarations[type.declarations.length - 1];
    if (val.value) {
      return convert(val.value);
    }
    return convert(val.id);
  },

  templateExpression: type => {
    return `${convert(type.tag)}`;
  },

  templateLiteral: type => {
    let str = type.quasis.reduce((newStr, v, i) => {
      let quasi = convert(v);
      let newStrClone = newStr;
      newStrClone = `${newStrClone}${quasi}`;
      if (type.expressions[i]) {
        let exp = convert(type.expressions[i]);
        newStrClone = `${newStrClone}\${${exp}}`;
      }
      return newStrClone;
    }, '');
    return `\`${str}\``;
  },

  templateElement: type => {
    return type.value.cooked.toString();
  },
  class: type => {
    return convert(type.name);
  },
  // We should write these
  generic: type => {
    const typeParams = type.typeParams ? convert(type.typeParams) : '';
    const value = convert(type.value);
    return `${value}${typeParams}`;
  },
  intersection: type => `${mapConvertAndJoin(type.types, ' & ')}`,

  nullable: type => `?${convert(type.arguments)}`,
  typeParam: type => `${type.name}`,
  typeParams: type => `<${mapConvertAndJoin(type.params, ', ')}>`,
  typeParamsDeclaration: type => `<${mapConvertAndJoin(type.params, ', ')}>`,
  typeof: type => {
    return type.name ? `typeof ${type.name}` : `${type.type.kind}`;
  },
  union: type => `${mapConvertAndJoin(type.types, ' | ')}`,
  import: type => {
    if (type.name === 'default') {
      return `${type.moduleSpecifier}`;
    } else {
      return `${type.moduleSpecifier}.${type.name}`;
    }
  },
  export: type => {
    if (type.exports.length === 1) {
      return convert(type.exports[0]);
    }
    return '';
  },
  exportSpecifier: (type, mode) => convert(type.exported),

  // TS
  tuple: type => `[${mapConvertAndJoin(type.types)}]`,
};

export function convert(type, expandType) {
  if (!type) {
    console.error('No type argument has been passed in');
    return '';
  }

  if (type.referenceIdName && !expandType) {
    return type.referenceIdName;
  }

  const converter = converters[type.kind];
  if (!converter) {
    if (!type.kind) {
      console.error('convert was passed an object without a kind', type);
    } else {
      console.error('could not find converter for', type.kind);
    }
  } else {
    return converter(type);
  }
  return '';
}

const getPropTypes = propTypesObj => {
  let resolvedTypes = resolveFromGeneric(propTypesObj);
  let propTypes;
  if (resolvedTypes.kind === 'object') {
    propTypes = resolvedTypes.members;
  } else if (resolvedTypes.kind === 'intersection') {
    propTypes = resolvedTypes.types.reduce(
      (acc, type) => [...acc, ...reduceToObj(type)],
      [],
    );
  }
  return propTypes;
};

function TypeDefinition(props) {
  const [css, theme] = useStyletron();

  let name = '';
  let value = null;
  let definition = '';
  let errored = false;

  try {
    if (props.type.component.value.name === '$Shape') {
      value = props.type.component.typeParams.params[0];
      name = value.value.referenceIdName;
    } else {
      value = props.type.component.value;
      name = value.referenceIdName;
    }

    const proptypes = getPropTypes(value).map(property => {
      return convert(property, true);
    });

    definition = formatCode(`type ${name} = {` + proptypes.join(',') + '}');
  } catch (e) {
    errored = true;
  }

  if (errored) {
    return (
      <div
        className={css({
          paddingLeft: theme.sizing.scale700,
          paddingRight: theme.sizing.scale700,
        })}
      >
        <p>
          extract-react-types is not being run in dev mode for speed reasons. If
          you need to see prop types, run:
        </p>
        <p>
          <code>FORCE_EXTRACT_REACT_TYPES=true yarn documentation:dev</code>
        </p>
      </div>
    );
  }

  return (
    <div
      className={css({
        whiteSpace: 'pre',
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: theme.sizing.scale500,
      })}
    >
      {definition}
    </div>
  );
}

export default TypeDefinition;

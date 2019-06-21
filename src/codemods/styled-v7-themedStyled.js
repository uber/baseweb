/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module */

// @flow

import {containsFlowComment, getStyledImportName} from './shared.js';

function findTypedStyledCalls(j, root) {
  const styledImportName = getStyledImportName(j, root);
  return root.find(j.CallExpression, {
    callee: {name: styledImportName},
    typeArguments: {type: 'TypeParameterInstantiation'},
  });
}

function findStyledElementsWithTheme(j, root) {
  return findTypedStyledCalls(j, root).filter(path => {
    return (
      path.value.typeArguments.params.length === 2 &&
      path.value.arguments.length &&
      path.value.arguments[0].type === 'Literal'
    );
  });
}

function findStyledComponentsWithTheme(j, root) {
  return findTypedStyledCalls(j, root).filter(path => {
    return (
      path.value.typeArguments.params.length === 3 &&
      path.value.typeArguments.params[0].type === 'TypeofTypeAnnotation' &&
      path.value.arguments.length &&
      path.value.arguments[0].type === 'Identifier'
    );
  });
}

function visitStyledCall(j, path, index) {
  const ThemeT = path.node.typeArguments.params.pop();
  const nextCalleeName = `themedStyled${index + 1}`;
  path.node.callee.name = nextCalleeName;

  const createThemedStyled = j.variableDeclaration('const', [
    j.variableDeclarator(
      j.identifier(nextCalleeName),
      j.callExpression(j.identifier('createThemedStyled'), []),
    ),
  ]);

  createThemedStyled.declarations[0].init.callee.typeAnnotation = j.typeParameterInstantiation(
    [ThemeT],
  );

  j(path)
    .closest(j.VariableDeclaration)
    .insertBefore(createThemedStyled);
}

module.exports = function(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  if (containsFlowComment(j, root)) {
    const styledElements = findStyledElementsWithTheme(j, root);
    styledElements.forEach((path, index) => visitStyledCall(j, path, index));

    const styledComponents = findStyledComponentsWithTheme(j, root);
    styledComponents.forEach((path, index) => visitStyledCall(j, path, index));

    if (styledElements.length || styledComponents.length) {
      const baseImport = root.find(j.ImportDeclaration, {
        source: {value: 'baseui'},
      });
      const createThemedStyledSpecifier = j.importSpecifier(
        j.identifier('createThemedStyled'),
      );

      baseImport.get(0).node.specifiers.push(createThemedStyledSpecifier);
    }
  }

  return root.toSource();
};

module.exports.parser = 'flow';

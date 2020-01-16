/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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

class ThemeCache {
  count = 0;
  visitedGenericTypes = {};

  insert(node) {
    if (node.type === 'GenericTypeAnnotation') {
      this.count++;
      this.visitedGenericTypes[node.id.name] = {node, position: this.count};
    } else {
      this.count++;
    }
  }

  read(node) {
    if (node.type === 'GenericTypeAnnotation') {
      const value = this.visitedGenericTypes[node.id.name];
      return value ? value.node : null;
    } else {
      return null;
    }
  }

  position(node) {
    if (
      node.type === 'GenericTypeAnnotation' &&
      this.visitedGenericTypes[node.id.name]
    ) {
      return this.visitedGenericTypes[node.id.name].position;
    } else {
      return this.count;
    }
  }
}

function buildThemedStyledXName(position) {
  if (position <= 1) {
    return 'themedStyled';
  }
  return `themedStyled${position}`;
}

function visitStyledCall(j, path, themes) {
  const theme = path.node.typeArguments.params.pop();

  if (themes.read(theme)) {
    path.node.callee.name = buildThemedStyledXName(themes.position(theme));
  } else {
    themes.insert(theme);

    const nextCalleeName = buildThemedStyledXName(themes.position(theme));
    path.node.callee.name = nextCalleeName;

    const createThemedStyled = j.variableDeclaration('const', [
      j.variableDeclarator(
        j.identifier(nextCalleeName),
        j.callExpression(j.identifier('createThemedStyled'), []),
      ),
    ]);

    createThemedStyled.declarations[0].init.callee.typeAnnotation = j.typeParameterInstantiation(
      [themes.read(theme) || theme],
    );

    j(path)
      .closest(j.VariableDeclaration)
      .insertBefore(createThemedStyled);
  }
}

module.exports = function(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  if (containsFlowComment(j, root)) {
    const themes = new ThemeCache();
    const styledElements = findStyledElementsWithTheme(j, root);
    styledElements.forEach(path => visitStyledCall(j, path, themes));

    const styledComponents = findStyledComponentsWithTheme(j, root);
    styledComponents.forEach(path => visitStyledCall(j, path, themes));

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

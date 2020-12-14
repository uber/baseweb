/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as t from '@babel/types';
import {withJsFiles} from '@dubstep/core';

import {containsFlowComment, getStyledLocalImportName} from './shared.js';

function findTypedStyledCalls(p) {
  const styledLocalImportName = getStyledLocalImportName(p);
  const paths = [];
  p.traverse({
    CallExpression(path) {
      if (
        path.node.callee.name === styledLocalImportName &&
        path.node.typeArguments
      ) {
        paths.push(path);
      }
    },
  });
  return paths;
}

function findStyledElementsWithTheme(p) {
  return findTypedStyledCalls(p).filter(path => {
    return (
      path.node.typeArguments.params.length === 2 &&
      path.node.arguments.length &&
      path.node.arguments[0].type === 'StringLiteral'
    );
  });
}

function findStyledComponentsWithTheme(p) {
  return findTypedStyledCalls(p).filter(path => {
    return (
      path.node.typeArguments.params.length === 3 &&
      path.node.typeArguments.params[0].type === 'TypeofTypeAnnotation' &&
      path.node.arguments.length &&
      path.node.arguments[0].type === 'Identifier'
    );
  });
}

class ThemeCache {
  count: number;
  // eslint-disable-next-line flowtype/no-weak-types
  visitedGenericTypes: {[string]: {node: any, position: number}};

  constructor() {
    this.count = 0;
    this.visitedGenericTypes = {};
  }

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

function visitStyledCall(path, themes) {
  const theme = path.node.typeArguments.params.pop();

  if (themes.read(theme)) {
    path.node.callee.name = buildThemedStyledXName(themes.position(theme));
  } else {
    themes.insert(theme);

    const nextCalleeName = buildThemedStyledXName(themes.position(theme));
    path.node.callee.name = nextCalleeName;

    const createThemedStyled = t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier(nextCalleeName),
        t.callExpression(t.identifier('createThemedStyled'), []),
      ),
    ]);

    createThemedStyled.declarations[0].init.callee.typeAnnotation = t.typeParameterInstantiation(
      [themes.read(theme) || theme],
    );

    const parent = path.findParent(n => n.isVariableDeclaration());
    parent.insertBefore(createThemedStyled);
  }
}

async function styledV8ToThemedStyled(options: {dir: string}) {
  await withJsFiles(`${options.dir}/**/*.js`, async p => {
    if (containsFlowComment(p)) {
      const themes = new ThemeCache();
      const styledElements = findStyledElementsWithTheme(p);
      styledElements.forEach(path => visitStyledCall(path, themes));

      const styledComponents = findStyledComponentsWithTheme(p);
      styledComponents.forEach(path => visitStyledCall(path, themes));

      if (styledElements.length || styledComponents.length) {
        p.traverse({
          ImportDeclaration(path) {
            let shouldImportCreateThemedStyled = true;
            if (path.node.source.value === 'baseui') {
              for (const specifier of path.node.specifiers) {
                if (specifier.imported.name === 'createThemedStyled') {
                  shouldImportCreateThemedStyled = false;
                  break;
                }
              }

              if (shouldImportCreateThemedStyled) {
                const createThemedStyledSpecifier = t.importSpecifier(
                  t.identifier('createThemedStyled'),
                  t.identifier('createThemedStyled'),
                );
                path.node.specifiers.push(createThemedStyledSpecifier);
              }
            }
          },
        });
      }
    }
  });
}

export default styledV8ToThemedStyled;

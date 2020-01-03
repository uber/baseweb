/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

export function containsFlowComment(j, root) {
  const getBodyNode = () => root.find(j.Program).get('body', 0).node;
  const comments = getBodyNode().comments || [];
  return comments.filter(e => e.value.indexOf('@flow') !== -1).length > 0;
}

export function getStyledImportName(j, root) {
  const baseImports = root.find(j.ImportDeclaration, {
    source: {value: 'baseui'},
  });
  if (baseImports.length) {
    const styledImports = baseImports.find(j.ImportSpecifier, {
      imported: {name: 'styled'},
    });

    if (styledImports.length) {
      return styledImports.get(0).node.local.name;
    }
  }
  return null;
}

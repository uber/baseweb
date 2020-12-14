/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {generateJs} from '@dubstep/core';

// eslint-disable-next-line flowtype/no-weak-types
export function containsFlowComment(program: any) {
  const FLOW_PRAGMA = /^\s*(\/*\*+|\/\/)\s*@flow/;
  return FLOW_PRAGMA.test(generateJs(program));
}

// returns null if baseui styled is not imported, otherwise returns the local name
// eslint-disable-next-line flowtype/no-weak-types
export function getStyledLocalImportName(program: any) {
  let localStyledName = null;
  program.traverse({
    ImportDeclaration(path) {
      if (path.get('source').node.value === 'baseui') {
        path.get('specifiers').forEach(specifier => {
          if (specifier.get('imported').node.name === 'styled') {
            localStyledName = specifier.get('local').node.name;
          }
        });
      }
    },
  });
  return localStyledName;
}

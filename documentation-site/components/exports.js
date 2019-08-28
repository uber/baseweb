/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';

import {H3} from './markdown-elements';
import Code from './code';

const Exports = props => {
  const {component, path, title} = props;

  const exportNames = Object.keys(component);
  const code = `import {${exportNames[0]}} from '${path}'`;
  return (
    <React.Fragment>
      <H3>{title}</H3>
      This component exports the following subcomponents or utils:
      <ul>
        {exportNames.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      To start using them, you can import them into your application using
      something like this:
      <Code>{code}</Code>
    </React.Fragment>
  );
};

export default Exports;

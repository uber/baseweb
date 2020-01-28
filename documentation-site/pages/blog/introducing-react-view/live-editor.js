/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useView, Compiler, Error} from 'react-view';
//$FlowFixMe
import Editor from '../../../components/yard/editor';

/* eslint-disable */

import presetTypescript from '@babel/preset-typescript';
/* eslint-enable */

export default ({initialCode}: {initialCode: string}) => {
  const params = useView({
    initialCode,
    scope: {},
    onUpdate: console.log,
  });

  return (
    <React.Fragment>
      <div
        style={{
          marginBottom: '8px',
          fontFamily: `system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`,
        }}
      >
        <Compiler {...params.compilerProps} presets={[presetTypescript]} />
      </div>
      <Editor {...params.editorProps} language="tsx" />
      <Error {...params.errorProps} />
    </React.Fragment>
  );
};

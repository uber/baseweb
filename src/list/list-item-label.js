/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Label2, Paragraph2, Paragraph3} from '../typography/index.js';

import type {LabelPropsT} from './types.js';

function ListItemLabel(props: LabelPropsT) {
  if (props.sublist) {
    return <Paragraph2>{props.children}</Paragraph2>;
  }

  return (
    <div>
      <Label2>{props.children}</Label2>
      {props.description && (
        <Paragraph3 $style={{marginTop: 0, marginBottom: 0}}>
          {props.description}
        </Paragraph3>
      )}
    </div>
  );
}

export default ListItemLabel;

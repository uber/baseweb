/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Tag, KIND, VARIANT} from '../index.js';

export const name = 'tag';

// eslint-disable-next-line flowtype/no-weak-types
const Row = ({kind, color}: {kind: any, color: string}) => (
  <tr>
    <td>
      {kind}
      {kind === KIND.primary ? '*' : ''}
    </td>
    {[false, true].map(closeable =>
      [false, true].map(disabled =>
        Object.keys(VARIANT).map(variant => (
          <td
            key={`${kind}-${closeable ? 'C' : 'NC'}-${
              disabled ? 'D' : 'ND'
            }-${variant}`}
            style={{padding: '4px'}}
          >
            <Tag
              closeable={closeable}
              disabled={disabled}
              variant={variant}
              kind={kind}
              {...(kind === 'custom' ? {color} : {})}
            >
              Hello
            </Tag>
          </td>
        )),
      ),
    )}
  </tr>
);

export const component = () => (
  <React.Fragment>
    <table style={{marginBottom: '12px'}}>
      <thead>
        <tr>
          <th></th>
          <th colSpan={6} style={{backgroundColor: 'Lavender'}}>
            {`closeable={false}`}
          </th>
          <th colSpan={6} style={{backgroundColor: 'Lavender'}}>
            {`closeable={true}`}
          </th>
        </tr>
        <tr>
          <th></th>
          <th colSpan={3} style={{backgroundColor: 'Thistle'}}>
            {`disabled={false}`}
          </th>
          <th colSpan={3} style={{backgroundColor: 'Thistle'}}>
            {`disabled={true}`}
          </th>
          <th colSpan={3} style={{backgroundColor: 'Thistle'}}>
            {`disabled={false}`}
          </th>
          <th colSpan={3} style={{backgroundColor: 'Thistle'}}>
            {`disabled={true}`}
          </th>
        </tr>
        <tr>
          <th></th>
          {Array.from({length: 4}, () =>
            Object.keys(VARIANT).map(variant => (
              <th key={variant} style={{backgroundColor: 'Plum'}}>
                {variant}
                {variant === 'solid' ? '*' : ''}
              </th>
            )),
          )}
        </tr>
      </thead>
      <tbody>
        <tr style={{height: '10px'}}></tr>
        {Object.keys(KIND).map(kind => (
          <Row
            key={kind}
            kind={kind}
            {...(kind === 'custom' ? {color: '#748ecc'} : {})}
          />
        ))}
      </tbody>
    </table>
    <em>
      <strong>*</strong> default value
    </em>
  </React.Fragment>
);

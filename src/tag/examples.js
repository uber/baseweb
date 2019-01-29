/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';
// Styled elements
import {Tag, KIND, StyledRoot} from './index.js';
import {withStyle} from 'styletron-react';
import type {TagKindT} from './types.js';
import tests from './examples-list.js';

const tagStyleKinds: Array<TagKindT> = Object.keys(KIND);

export default {
  [tests.ALL_BASIC_COLORS]: () => {
    return (
      <React.Fragment>
        <div style={{width: '200px'}}>
          <Tag
            key="default"
            onActionClick={(e, tag) => {
              if (typeof tag === 'string') {
                // eslint-disable-next-line no-console
                console.log('Tag is clicked:' + tag);
              }
            }}
          >
            Default Color
          </Tag>
          {tagStyleKinds.map(kind => (
            <Tag
              key={kind}
              kind={kind}
              color={kind === 'custom' ? '#748ecc' : undefined}
              onActionClick={(e, tag) => {
                if (typeof tag === 'string') {
                  // eslint-disable-next-line no-console
                  console.log('Tag is clicked:' + tag);
                }
              }}
            >
              kind {kind}
            </Tag>
          ))}
        </div>
      </React.Fragment>
    );
  },
  [tests.WITH_CUSTOM_COLORS]: () => {
    return (
      <React.Fragment>
        <div style={{width: '200px'}}>
          {['#000000', '#00ff35'].map((color: string) => (
            <Tag
              key={color}
              color={color}
              kind="custom"
              onActionClick={(e, tag) => {
                if (typeof tag === 'string') {
                  // eslint-disable-next-line no-console
                  console.log('Tag is clicked:' + tag);
                }
              }}
              overrides={{
                Root: withStyle(StyledRoot, props => ({
                  color: props.$color,
                })),
              }}
            >
              Color {color}
            </Tag>
          ))}
        </div>
      </React.Fragment>
    );
  },
  [tests.DISABLED]: () => {
    return (
      <React.Fragment>
        <div style={{width: '200px'}}>
          {tagStyleKinds.map(kind => (
            <Tag
              disabled={true}
              key={kind}
              kind={kind}
              onActionClick={(e, tag = '') => {
                if (typeof tag === 'string') {
                  // eslint-disable-next-line no-console
                  console.log('Tag is clicked:' + tag);
                }
              }}
            >
              kind {kind}
            </Tag>
          ))}
        </div>
      </React.Fragment>
    );
  },
  [tests.UNCLOSEABLE]: () => {
    return (
      <React.Fragment>
        <div style={{width: '200px'}}>
          {tagStyleKinds.map(kind => (
            <Tag
              key={kind}
              kind={kind}
              color={kind === 'custom' ? '#748ecc' : undefined}
              closeable={false}
            >
              kind {kind}
            </Tag>
          ))}
        </div>
      </React.Fragment>
    );
  },
};

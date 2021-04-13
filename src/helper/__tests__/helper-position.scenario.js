/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';

import {Unstable_Helper as Helper, PLACEMENT} from '../index.js';

export default function Scenario() {
  const [css] = useStyletron();
  const [index, setIndex] = React.useState(-1);
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select value={index} onChange={e => setIndex(Number(e.target.value))}>
        <option value={-1}>Show All</option>
        {Object.keys(PLACEMENT).map((placement, i) => {
          if (placement === "auto") {
            return null;
          }
          
          return (
            <option key={placement} value={i}>
              {placement}
            </option>
          );
        })}
      </select>
      <div
        className={css({
          backgroundColor: 'lightskyblue',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '500px',
          flexWrap: 'wrap',
          paddingTop: '24px',
        })}
      >
        {Object.keys(PLACEMENT).map((placement, i) => {
          if (index !== i && index !== -1) {
            return null;
          }
          return (
            <div
              key={placement}
              className={css({
                paddingTop: '64px',
                paddingBottom: '64px',
                paddingLeft: '48px',
                paddingRight: '48px',
              })}
            >
              <Helper
                placement={PLACEMENT[placement]}
                content={() => (
                  <div className={css({padding: '12px'})}>content</div>
                )}
                isOpen
                showArrow
              >
                <span>{placement}</span>
              </Helper>
            </div>
          );
        })}
      </div>
    </div>
  );
}

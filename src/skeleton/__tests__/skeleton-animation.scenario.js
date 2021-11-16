/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Skeleton} from '../index.js';
import {useStyletron} from '../../styles/index.js';

export function Scenario() {
  const [css] = useStyletron();
  return (
    <div className={css({width: '1000px', display: 'flex', flexWrap: 'wrap'})}>
      {Array(8)
        .fill()
        .map((item, index) => (
          <div className={css({margin: '10px'})} key={index}>
            <Skeleton
              height="150px"
              width="300px"
              animation={true}
              overrides={{
                Root: {
                  style: {
                    marginBottom: '10px',
                  },
                },
              }}
            />

            <div
              className={css({
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              })}
            >
              <Skeleton
                width="50px"
                height="50px"
                animation={true}
                overrides={{
                  Root: {
                    style: {
                      borderRadius: '50%',
                    },
                  },
                }}
              />

              <Skeleton animation={true} rows={2} width="220px" />
            </div>
          </div>
        ))}
    </div>
  );
}

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Skeleton} from '../index.js';
import {useStyletron} from '../../styles/index.js';

export default function Scenario() {
  const [css] = useStyletron();
  return (
    <div className={css({width: '1000px', display: 'flex', flexWrap: 'wrap'})}>
      {Array(8)
        .fill()
        .map(() => (
          <div>
            <Skeleton
              animation={true}
              overrides={{
                Row: {
                  style: {
                    width: '300px',
                    height: '150px',
                  },
                },
              }}
            />
            <div className={css({display: 'flex', flexDirection: 'row'})}>
              <Skeleton
                animation={true}
                overrides={{
                  Row: {
                    style: {
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    },
                  },
                }}
              />
              <Skeleton
                animation={true}
                rows={2}
                overrides={{
                  Row: {
                    style: {
                      width: '220px',
                      height: '15px',
                      marginBottum: '0px',
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

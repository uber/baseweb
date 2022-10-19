/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { MobileHeader } from '..';
import { ArrowLeft, Plus, Check, Delete } from '../../icon';
import { Button } from '../../button';
import { Iphone6 } from './styled-components';

export function Scenario() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => setExpanded(!expanded)}>{expanded ? 'Collapse' : 'Expand'}</Button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Iphone6>
          <MobileHeader
            title="Header title"
            expanded={expanded}
            navButton={{
              icon: ArrowLeft,
              onClick: () => console.log('Nav Button Click'),
              ariaLabel: 'Go back',
            }}
            additionalButtons={[
              {
                icon: Check,
                onClick: () => console.log('Check Button Click'),
                ariaLabel: 'Confirm entries',
              },
              {
                icon: Plus,
                onClick: () => console.log('Plus Button Click'),
                ariaLabel: 'Add a new entry',
              },
            ]}
          />
          <div style={{ padding: '12px', height: '900px' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </Iphone6>

        <Iphone6>
          <MobileHeader
            title="Excessively long title that truncates"
            expanded={expanded}
            navButton={{
              icon: Delete,
              onClick: () => console.log('Nav Button Click'),
              ariaLabel: 'Go back',
            }}
            additionalButtons={[
              {
                icon: Check,
                onClick: () => console.log('Check Button Click'),
                ariaLabel: 'Confirm entries',
              },
              {
                icon: Plus,
                onClick: () => console.log('Plus Button Click'),
                ariaLabel: 'Add a new entry',
              },
            ]}
          />
          <div style={{ padding: '12px', height: '900px' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </Iphone6>

        <Iphone6>
          <MobileHeader
            title="Excessively long title that truncates"
            expanded={expanded}
            navButton={{
              icon: Delete,
              onClick: () => console.log('Nav Button Click'),
              ariaLabel: 'Go back',
            }}
            additionalButtons={[
              {
                icon: Check,
                onClick: () => console.log('Check Button Click'),
                ariaLabel: 'Confirm entries',
              },
            ]}
          />
          <div style={{ padding: '12px', height: '900px' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </Iphone6>
      </div>
    </div>
  );
}

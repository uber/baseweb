/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { MobileHeader } from '..';
import { styled } from '../../styles';
import { ArrowLeft, Plus, Check, Menu } from '../../icon';
import map from './map-san-francisco.png';

const StyledIphone6 = styled('div', {
  width: '375px',
  height: '667px',
  border: '1px solid #ECECEC',
  borderRadius: '12px',
  backgroundColor: '#ECECEC',
  overflow: 'auto',
  position: 'relative',
});

const StyledHeaderContainer = styled('div', {
  width: '100%',
  position: 'absolute',
  pointerEvents: 'none',
});

const StyledBody = styled('div', { height: '100%', width: '100%', overflow: 'auto' });

export function Scenario() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <StyledIphone6>
        <StyledHeaderContainer>
          <MobileHeader
            type="floating"
            navButton={{
              renderIcon: ArrowLeft,
              onClick: () => console.log('Nav Button Click'),
              label: 'Go back',
            }}
            actionButtons={[
              {
                renderIcon: Check,
                onClick: () => console.log('Check Button Click'),
                label: 'Confirm entries',
              },
              {
                renderIcon: Plus,
                onClick: () => console.log('Plus Button Click'),
                label: 'Add a new entry',
              },
            ]}
          />
        </StyledHeaderContainer>
        <StyledBody tabIndex={0}>
          <img src={map} alt="map of San Francisco" />
        </StyledBody>
      </StyledIphone6>

      <StyledIphone6>
        <StyledHeaderContainer>
          <MobileHeader
            type="floating"
            navButton={{
              renderIcon: Menu,
              onClick: () => console.log('Nav Button Click'),
              label: 'Open menu',
            }}
            actionButtons={[
              {
                onClick: () => console.log('Money Button Click'),
                label: '$25.18',
              },
            ]}
          />
        </StyledHeaderContainer>

        <StyledBody tabIndex={0}>
          <img src={map} alt="map of San Francisco" />
        </StyledBody>
      </StyledIphone6>

      <StyledIphone6>
        <StyledHeaderContainer>
          <MobileHeader
            type="floating"
            navButton={{
              onClick: () => console.log('Nav Button Click'),
              label: 'Go Back',
            }}
            actionButtons={[
              {
                onClick: () => console.log('Money Button Click'),
                label: 'Action',
              },
            ]}
          />
        </StyledHeaderContainer>

        <StyledBody tabIndex={0}>
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
        </StyledBody>
      </StyledIphone6>
    </div>
  );
}

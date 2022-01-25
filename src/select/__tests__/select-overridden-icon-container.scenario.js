/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Select, StyledIconsContainer, TYPE} from '../index.js';

const options = [
  {label: 'AliceBlue', id: '#F0F8FF'},
  {label: 'AntiqueWhite', id: '#FAEBD7'},
  {label: 'Aqua', id: '#00FFFF'},
  {label: 'Aquamarine', id: '#7FFFD4'},
  {label: 'Azure', id: '#F0FFFF'},
  {label: 'Beige', id: '#F5F5DC'},
];

function IconsContainerOverride({children, onCustomClick, ...props}) {
  const isIconShowing = React.Children.toArray(children).length;

  return (
    <StyledIconsContainer {...props}>
      {children}
      {!isIconShowing && (
        <button data-testId="custom-icon" onClick={onCustomClick}>
          HI
        </button>
      )}
    </StyledIconsContainer>
  );
}

export function Scenario() {
  const [value, setValue] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const onCustomClick = React.useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <Select
        options={options}
        onChange={({value}) => setValue(value)}
        overrides={{
          IconsContainer: {
            component: IconsContainerOverride,
            props: {onCustomClick},
          },
        }}
        type={TYPE.search}
        value={value}
      />
      <p>
        custom element click count{' '}
        <span data-testId="click-count">{count}</span>
      </p>
    </div>
  );
}

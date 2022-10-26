/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { Button, KIND, SHAPE, SIZE } from '../button';
import { Input as DefaultInput } from '../input';
import { Plus, CheckIndeterminate } from '../icon';
import { StyledRoot } from './styled-components';
import { useStyletron } from '../styles';
import type { StepperProps } from './types';

const DefaultButton = ({ children, ...restProps }) => {
  return (
    <Button shape={SHAPE.circle} kind={KIND.secondary} size={SIZE.compact} {...restProps}>
      {children}
    </Button>
  );
};

export function Stepper({
  count,
  disabled = false,
  overrides = {},
  setCount,
  minCount = 0,
  maxCount,
}: StepperProps) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Input, inputProps] = getOverrides(overrides.Input, DefaultInput);
  const [DecrementButton, decrementButtonProps] = getOverrides(
    overrides.DecrementButton,
    DefaultButton
  );
  const [DecrementButtonIcon, decrementButtonIconProps] = getOverrides(
    overrides.DecrementButtonIcon,
    CheckIndeterminate
  );
  const [IncrementButton, incrementButtonProps] = getOverrides(
    overrides.DecrementButton,
    DefaultButton
  );
  const [IncrementButtonIcon, incrementButtonIconProps] = getOverrides(
    overrides.DecrementButtonIcon,
    Plus
  );

  const handleInputChange = (e) => {
    const newCount = Number(e.target.value);
    if (!isNaN(newCount) && (!maxCount || newCount <= maxCount) && newCount >= minCount) {
      setCount(newCount);
    }
  };

  const [, theme] = useStyletron();

  return (
    <Root {...rootProps}>
      <DecrementButton
        onClick={() => setCount(count - 1)}
        disabled={disabled || count <= minCount}
        {...decrementButtonProps}
      >
        <DecrementButtonIcon {...decrementButtonIconProps} />
      </DecrementButton>
      <Input
        value={count}
        onChange={handleInputChange}
        disabled={disabled}
        overrides={{
          Root: {
            style: {
              maxWidth: '36px',
              height: '36px',
              borderLeftStyle: 'none',
              borderRightStyle: 'none',
              borderTopStyle: 'none',
              borderBottomStyle: 'none',
            },
          },
          Input: {
            style: {
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              textAlign: 'center',
              backgroundColor: theme.colors.backgroundPrimary,
              ...theme.typography.LabelLarge,
            },
          },
        }}
        {...inputProps}
      />
      <IncrementButton
        onClick={() => setCount(count + 1)}
        disabled={disabled || count >= maxCount}
        {...incrementButtonProps}
      >
        <IncrementButtonIcon {...incrementButtonIconProps} />
      </IncrementButton>
    </Root>
  );
}

export default Stepper;

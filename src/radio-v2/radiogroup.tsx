/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { getOverrides } from '../helpers/overrides';

import { RadioGroupRoot as StyledRadioGroupRoot } from './styled-components';
import type { RadioGroupProps } from './types';
import { isFocusVisible } from '../utils/focusVisible';
import { ALIGN, LABEL_PLACEMENT } from './constants';
import { RadioGroupContext } from './radio-context';

import type { ChangeEvent } from 'react';

const StatelessRadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    overrides = {},
    name = '',
    value = '',
    disabled = false,
    autoFocus = false,
    labelPlacement = LABEL_PLACEMENT.right,
    align = ALIGN.vertical,
    error = false,
    required = false,
    onChange = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onFocus = () => {},
    onBlur = () => {},
    children,
    id,
  } = props;

  const [isFocusVisibleState, setIsFocusVisibleState] = React.useState(false);
  const [focusedRadioIndex, setFocusedRadioIndex] = React.useState(-1);

  // Registration counter for child radios
  const radioIndexRef = React.useRef(0);

  // Reset the registration counter before each render
  React.useLayoutEffect(() => {
    radioIndexRef.current = 0;
  });

  const registerRadio = React.useCallback(() => {
    const index = radioIndexRef.current;
    radioIndexRef.current += 1;
    return index;
  }, []);

  const handleFocus = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      if (isFocusVisible(event)) {
        setIsFocusVisibleState(true);
      }
      setFocusedRadioIndex(index);
      onFocus && onFocus(event);
    },
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      if (isFocusVisibleState !== false) {
        setIsFocusVisibleState(false);
      }
      setFocusedRadioIndex(-1);
      onBlur && onBlur(event);
    },
    [isFocusVisibleState, onBlur],
  );

  const [RadioGroupRoot, radioGroupRootProps] = getOverrides(
    overrides.RadioGroupRoot,
    StyledRadioGroupRoot,
  );

  const contextValue = React.useMemo(
    () => ({
      name,
      selectedValue: value,
      disabled,
      autoFocus,
      error,
      required,
      align,
      labelPlacement,
      focusedIndex: focusedRadioIndex,
      isFocusVisible: isFocusVisibleState,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      registerRadio,
    }),
    [
      name,
      value,
      disabled,
      autoFocus,
      error,
      required,
      align,
      labelPlacement,
      focusedRadioIndex,
      isFocusVisibleState,
      onChange,
      onMouseEnter,
      onMouseLeave,
      handleFocus,
      handleBlur,
      registerRadio,
    ],
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <RadioGroupRoot
        id={id}
        role='radiogroup'
        aria-describedby={props['aria-describedby']}
        aria-errormessage={props['aria-errormessage']}
        aria-invalid={error || null}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        aria-required={required || null}
        $align={align}
        $disabled={disabled}
        $error={error}
        $required={required}
        $labelPlacement={labelPlacement}
        {...radioGroupRootProps}
      >
        {children}
      </RadioGroupRoot>
    </RadioGroupContext.Provider>
  );
};

StatelessRadioGroup.displayName = 'StatelessRadioGroup';

export default StatelessRadioGroup;

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverride, getOverrideProps } from '../helpers/overrides';
import type { SwitchProps } from './types';
import {
  Toggle as StyledToggle,
  Input as StyledInput,
  Label as StyledLabel,
  Root as StyledRoot,
  ToggleTrack as StyledToggleTrack,
} from './styled-components';
import { isFocusVisible as isFocusVisibleCheck } from '../utils/focusVisible';
import { LABEL_PLACEMENT, SIZE } from './constants';
import type { ChangeEvent } from 'react';

const stopPropagation = (e: ChangeEvent<HTMLInputElement>) => e.stopPropagation();

const Switch = (props: SwitchProps) => {
  const {
    overrides = {},
    checked = false,
    containsInteractiveElement = false,
    disabled = false,
    autoFocus = false,
    showIcon = false,
    labelPlacement = LABEL_PLACEMENT.right,
    size = SIZE.default,
    onChange = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onMouseDown = () => {},
    onMouseUp = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onKeyDown, // don't add fallback no-op to allow native keydown behavior if not customized.
    onKeyUp, // don't add fallback no-op to allow native keyup behavior if not customized.
    value,
    id,
    name,
    children,
    required,
    title,
    inputRef,
  } = props;
  const [isFocused, setIsFocused] = React.useState(autoFocus);
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const fallbackInputRef = React.useRef<HTMLInputElement>(null);
  const internalInputRef = inputRef || fallbackInputRef;

  React.useEffect(() => {
    if (autoFocus) {
      internalInputRef.current?.focus();
    }
  }, [autoFocus, internalInputRef]);

  const onMouseEnterHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsHovered(true);
      onMouseEnter(e);
    },
    [onMouseEnter]
  );

  const onMouseLeaveHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsHovered(false);
      setIsActive(false);
      onMouseLeave(e);
    },
    [onMouseLeave]
  );

  const onMouseDownHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsActive(true);
      onMouseDown(e);
    },
    [onMouseDown]
  );

  const onMouseUpHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsActive(false);
      onMouseUp(e);
    },
    [onMouseUp]
  );

  const onFocusHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus(e);
      if (isFocusVisibleCheck(e)) {
        setIsFocusVisible(true);
      }
    },
    [onFocus]
  );

  const onBlurHandler = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur(e);
      if (!isFocusVisibleCheck(e)) {
        setIsFocusVisible(false);
      }
    },
    [onBlur]
  );

  const onKeyUpHandler = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      /**
       * Handles 'Enter' key press to toggle the switch.
       */

      if (event.key === ' ') {
        setIsActive(false);
      }
      if (event.key === 'Enter') {
        setIsActive(false);
        onChange?.({
          ...event,
          currentTarget: {
            ...event.currentTarget,
            checked: !checked,
          },
          target: {
            ...event.target,
            checked: !checked,
          },
        } as unknown as ChangeEvent<HTMLInputElement>);
      }
      onKeyUp?.(event);
    },
    [onKeyUp, onChange, checked]
  );

  const onKeyDownHandler = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      /**
       * Handles 'Enter' key press to toggle the switch.
       */
      if (event.key === 'Enter') {
        setIsActive(true);
      }

      if (event.key === ' ') {
        setIsActive(true);
      }
      onKeyDown?.(event);
    },
    [onKeyDown]
  );

  const {
    Root: RootOverride,
    Toggle: ToggleOverride,
    Label: LabelOverride,
    Input: InputOverride,
    ToggleTrack: ToggleTrackOverride,
  } = overrides;

  const Root = getOverride(RootOverride) || StyledRoot;
  const ToggleTrack = getOverride(ToggleTrackOverride) || StyledToggleTrack;
  const Toggle = getOverride(ToggleOverride) || StyledToggle;
  const Label = getOverride(LabelOverride) || StyledLabel;
  const Input = getOverride(InputOverride) || StyledInput;

  const inputEvents = {
    onChange,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    onKeyDown: onKeyDownHandler,
    onKeyUp: onKeyUpHandler,
  };
  const mouseEvents = {
    onMouseEnter: onMouseEnterHandler,
    onMouseLeave: onMouseLeaveHandler,
    onMouseDown: onMouseDownHandler,
    onMouseUp: onMouseUpHandler,
  };
  const sharedProps = {
    $isFocused: isFocused,
    $isFocusVisible: isFocusVisible,
    $isHovered: isHovered,
    $isActive: isActive,
    $checked: checked,
    $required: required,
    $disabled: disabled,
    $value: value,
    $showIcon: showIcon,
    $size: size,
  };

  const labelComponent = children && (
    <Label $labelPlacement={labelPlacement} {...sharedProps} {...getOverrideProps(LabelOverride)}>
      {containsInteractiveElement ? (
        // Prevents the event from bubbling up to the label and moving focus to the switch control.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div onClick={(e) => e.preventDefault()}>{children}</div>
      ) : (
        children
      )}
    </Label>
  );

  return (
    <Root
      data-baseweb="switch"
      title={title || null}
      $labelPlacement={labelPlacement}
      {...sharedProps}
      {...mouseEvents}
      {...getOverrideProps(RootOverride)}
    >
      {labelPlacement === LABEL_PLACEMENT.left && labelComponent}

      <ToggleTrack {...sharedProps} {...getOverrideProps(ToggleTrackOverride)}>
        <Toggle {...sharedProps} {...getOverrideProps(ToggleOverride)} />
      </ToggleTrack>

      <Input
        value={value}
        id={id}
        name={name}
        checked={checked}
        required={required}
        aria-label={props['aria-label'] || props.ariaLabel}
        aria-describedby={props['aria-describedby']}
        aria-errormessage={props['aria-errormessage']}
        aria-invalid={props['aria-invalid']}
        aria-required={required || null}
        disabled={disabled}
        type="checkbox"
        role="switch"
        ref={internalInputRef}
        // Prevent a second click event from firing when label is clicked.
        // See https://github.com/uber/baseweb/issues/3847
        onClick={stopPropagation}
        {...sharedProps}
        {...inputEvents}
        {...getOverrideProps(InputOverride)}
      />
      {labelPlacement === LABEL_PLACEMENT.right && labelComponent}
    </Root>
  );
};

export default Switch;

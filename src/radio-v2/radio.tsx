/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import {
  Root as StyledRoot,
  Label as StyledLabel,
  LabelWrapper as StyledLabelWrapper,
  Input as StyledInput,
  RadioBackplate as StyledRadioBackplate,
  RadioMarkInner as StyledRadioMarkInner,
  RadioMarkOuter as StyledRadioMarkOuter,
  Description as StyledDescription,
} from './styled-components';
import type { RadioProps, LabelPlacement } from './types';
import type { ChangeEvent } from 'react';
import { ALIGN, LABEL_PLACEMENT } from './constants';
import { useRadioGroupContext } from './radio-context';

function isLabelTopLeft(labelPlacement: LabelPlacement) {
  return (
    labelPlacement === LABEL_PLACEMENT.top ||
    labelPlacement === LABEL_PLACEMENT.left
  );
}

function isLabelBottomRight(labelPlacement: LabelPlacement) {
  return (
    labelPlacement === LABEL_PLACEMENT.bottom ||
    labelPlacement === LABEL_PLACEMENT.right
  );
}

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

const Radio: React.FC<RadioProps> = (props) => {
  const groupContext = useRadioGroupContext();

  // Register with the group to get a unique index for this radio.
  // Each radio needs its own index so the RadioGroup can track which radio triggered
  // events (focus, blur, keyboard navigation). The index is used to identify the source
  // of events when communicating with the parent RadioGroup.
  // Also tabIndex may need this information if no radio is selected in the group. (First radio gets tabIndex 0)
  const [radioIndex] = React.useState(
    () => groupContext?.registerRadio() ?? -1,
  );

  const {
    overrides = {},
    containsInteractiveElement = false,
    checked: checkedProp = false,
    disabled: disabledProp = false,
    autoFocus: autoFocusProp = false,
    inputRef = React.createRef<HTMLInputElement>(),
    align: alignProp = ALIGN.vertical,
    labelPlacement: labelPlacementProp = LABEL_PLACEMENT.right,
    error: errorProp = false,
    onChange: onChangeProp = () => {},
    onMouseEnter: onMouseEnterProp = () => {},
    onMouseLeave: onMouseLeaveProp = () => {},
    onMouseDown = () => {},
    onMouseUp = () => {},
    onFocus: onFocusProp = () => {},
    onBlur: onBlurProp = () => {},
    children,
    description,
    isFocused: isFocusedProp,
    isFocusVisible: isFocusVisibleProp,
    name: nameProp,
    required: requiredProp,
    tabIndex: tabIndexProp,
    value,
  } = props;

  // Group context takes precedence to ensure consistency
  // For disabled, allow local override (individual radio can be disabled even if group isn't)
  const name = groupContext?.name ?? nameProp;
  const disabled = disabledProp || (groupContext?.disabled ?? false);
  const autoFocus = groupContext?.autoFocus ?? autoFocusProp;
  const error = groupContext?.error ?? errorProp;
  const required = groupContext?.required ?? requiredProp;
  const align = groupContext?.align ?? alignProp;
  const labelPlacement = groupContext?.labelPlacement ?? labelPlacementProp;

  // Compute derived values
  const checked = groupContext
    ? groupContext.selectedValue === value
    : checkedProp;
  const isFocused = groupContext
    ? groupContext.focusedIndex === radioIndex
    : isFocusedProp;
  const isFocusVisible = groupContext?.isFocusVisible ?? isFocusVisibleProp;

  // Compute tabIndex based on context or prop
  let tabIndex = tabIndexProp;
  if (groupContext) {
    // First radio (index 0) gets tabIndex 0 if no value selected, otherwise checked radio gets 0
    tabIndex =
      (radioIndex === 0 && !groupContext.selectedValue) || checked ? '0' : '-1';
  }

  // Event handlers - use group handlers if in a group
  const onChange = groupContext?.onChange ?? onChangeProp;
  const onMouseEnter = groupContext?.onMouseEnter ?? onMouseEnterProp;
  const onMouseLeave = groupContext?.onMouseLeave ?? onMouseLeaveProp;

  const onFocus = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (groupContext?.onFocus) {
        groupContext.onFocus(e, radioIndex);
      } else {
        onFocusProp(e);
      }
    },
    [groupContext, radioIndex, onFocusProp],
  );

  const onBlur = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (groupContext?.onBlur) {
        groupContext.onBlur(e, radioIndex);
      } else {
        onBlurProp(e);
      }
    },
    [groupContext, radioIndex, onBlurProp],
  );

  const [isActive, setIsActive] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);

  const handleMouseEnter = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsHovered(true);
      onMouseEnter && onMouseEnter(e);
    },
    [onMouseEnter],
  );

  const handleMouseLeave = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsHovered(false);
      onMouseLeave && onMouseLeave(e);
    },
    [onMouseLeave],
  );

  const handleMouseDown = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsActive(true);
      onMouseDown && onMouseDown(e);
    },
    [onMouseDown],
  );

  const handleMouseUp = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIsActive(false);
      onMouseUp && onMouseUp(e);
    },
    [onMouseUp],
  );

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
  const [LabelWrapper, labelWrapperProps] = getOverrides(
    overrides.LabelWrapper,
    StyledLabelWrapper,
  );
  const [Input, inputProps] = getOverrides(overrides.Input, StyledInput);
  const [Description, descriptionProps] = getOverrides(
    overrides.Description,
    StyledDescription,
  );
  const [RadioBackplate, radioBackplateProps] = getOverrides(
    overrides.RadioBackplate,
    StyledRadioBackplate,
  );
  const [RadioMarkInner, radioMarkInnerProps] = getOverrides(
    overrides.RadioMarkInner,
    StyledRadioMarkInner,
  );
  const [RadioMarkOuter, radioMarkOuterProps] = getOverrides(
    overrides.RadioMarkOuter,
    StyledRadioMarkOuter,
  );

  const sharedProps = {
    $align: align,
    $checked: checked,
    $disabled: disabled,
    $hasDescription: !!description,
    $isActive: isActive,
    $error: error,
    $isFocused: isFocused,
    $isFocusVisible: isFocused && isFocusVisible,
    $isHovered: isHovered,
    $labelPlacement: labelPlacement,
    $required: required,
    $value: value,
  };

  const label = (
    <Label {...sharedProps} {...labelProps}>
      {containsInteractiveElement ? (
        // Prevents the event from bubbling up to the label and moving focus to the radio button
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={(e) => e.preventDefault()}>{children}</div>
      ) : (
        children
      )}
    </Label>
  );

  const labelWithDescription = (
    <LabelWrapper {...sharedProps} {...labelWrapperProps}>
      {label}
      {!!description && (
        <Description {...sharedProps} {...descriptionProps}>
          {description}
        </Description>
      )}
    </LabelWrapper>
  );

  return (
    <Root
      data-baseweb='radio'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...sharedProps}
      {...rootProps}
    >
      {!!children && isLabelTopLeft(labelPlacement) && labelWithDescription}

      <RadioBackplate {...sharedProps} {...radioBackplateProps}>
        <RadioMarkOuter {...sharedProps} {...radioMarkOuterProps}>
          <RadioMarkInner {...sharedProps} {...radioMarkInnerProps} />
        </RadioMarkOuter>
      </RadioBackplate>

      <Input
        aria-describedby={props['aria-describedby']}
        aria-errormessage={props['aria-errormessage']}
        aria-invalid={error || null}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        checked={checked}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
        // Prevent a second click event from firing when label is clicked.
        // See https://github.com/uber/baseweb/issues/3847 & https://github.com/uber/baseweb/issues/4033
        onClick={stopPropagation}
        onChange={onChange}
        ref={inputRef}
        required={required}
        tabIndex={tabIndex}
        type='radio'
        value={value}
        {...sharedProps}
        {...inputProps}
      />
      {!!children && isLabelBottomRight(labelPlacement) && labelWithDescription}
    </Root>
  );
};

export default Radio;

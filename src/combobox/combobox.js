/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Input, SIZE} from '../input/index.js';
import {scrollItemIntoView} from '../menu/utils.js';
import {getOverrides, withOverrides} from '../helpers/overrides.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import getBuiId from '../utils/get-bui-id.js';

import {
  StyledRoot,
  StyledInputContainer,
  StyledListBox,
  StyledListItem,
} from './styled-components.js';
import type {PropsT} from './types.js';

const ENTER = 13;
const ESCAPE = 27;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

// aria 1.1 spec: https://www.w3.org/TR/wai-aria-practices/#combobox
// aria 1.2 spec: https://www.w3.org/TR/wai-aria-practices-1.2/#combobox
function Combobox<OptionT>(props: PropsT<OptionT>) {
  const {
    autocomplete = true,
    disabled = false,
    error = false,
    onBlur,
    onChange,
    onFocus,
    onSubmit,
    mapOptionToNode,
    mapOptionToString,
    id,
    name,
    options,
    overrides = {},
    positive = false,
    size = SIZE.default,
    value,
  } = props;

  const [selectionIndex, setSelectionIndex] = React.useState(-1);
  const [tempValue, setTempValue] = React.useState(value);
  const [isOpen, setIsOpen] = React.useState(false);

  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const selectedOptionRef = React.useRef(null);

  const activeDescendantId = React.useMemo(() => getBuiId(), []);
  const listboxId = React.useMemo(() => getBuiId(), []);

  // Handles case where an application wants to update the value in the input element
  // from outside of the combobox component.
  React.useEffect(() => {
    setTempValue('');
  }, [value]);

  // Changing the 'selected' option temporarily updates the visible text string
  // in the input element until the user clicks an option or presses enter.
  React.useEffect(() => {
    // If no option selected, display the most recently user-edited string.
    if (selectionIndex === -1) {
      setTempValue(value);
    } else if (selectionIndex > options.length) {
      // Handles the case where option length is variable. After user clicks an
      // option and selection index is not in option bounds, reset it to default.
      setSelectionIndex(-1);
    } else {
      if (autocomplete) {
        let selectedOption = options[selectionIndex];
        if (selectedOption) {
          setTempValue(mapOptionToString(selectedOption));
        }
      }
    }
  }, [options, selectionIndex]);

  React.useEffect(() => {
    if (isOpen && selectedOptionRef.current && listboxRef.current) {
      scrollItemIntoView(
        selectedOptionRef.current,
        listboxRef.current,
        selectionIndex === 0,
        selectionIndex === options.length - 1,
      );
    }
  }, [isOpen, selectedOptionRef.current, listboxRef.current]);

  const listboxWidth = React.useMemo(() => {
    if (rootRef.current) {
      return `${rootRef.current.clientWidth}px`;
    }
    return null;
  }, [rootRef.current]);

  function handleOpen() {
    if (!disabled) {
      setIsOpen(true);
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === ARROW_DOWN) {
      event.preventDefault();
      handleOpen();
      setSelectionIndex(prev => {
        let next = prev + 1;
        if (next > options.length - 1) {
          next = -1;
        }
        return next;
      });
    }
    if (event.keyCode === ARROW_UP) {
      event.preventDefault();
      setSelectionIndex(prev => {
        let next = prev - 1;
        if (next < -1) {
          next = options.length - 1;
        }
        return next;
      });
    }
    if (event.keyCode === ENTER) {
      let clickedOption = options[selectionIndex];
      if (clickedOption) {
        event.preventDefault();
        setIsOpen(false);
        setSelectionIndex(-1);
        onChange(mapOptionToString(clickedOption), clickedOption);
      } else {
        if (onSubmit) {
          onSubmit({closeListbox: () => setIsOpen(false), value});
        }
      }
    }
    if (event.keyCode === ESCAPE) {
      // NOTE(chase): aria 1.2 spec outlines a pattern where when escape is
      // pressed, it closes the listbox and further presses will clear value.
      // Google search and some other examples I've seen do not implement this,
      // but something to consider when the 1.2 spec becomes more widespread.
      setIsOpen(false);
      setSelectionIndex(-1);
      setTempValue(value);
    }
  }

  function handleFocus(event) {
    if (!isOpen && options.length) {
      handleOpen();
    }
    if (onFocus) onFocus(event);
  }

  function handleBlur(event) {
    if (
      listboxRef.current &&
      event.relatedTarget &&
      // NOTE(chase): Contains method expects a Node type, but relatedTarget is
      // EventTarget which is a super type of Node. Passing an EventTarget seems
      // to work fine, assuming the flow type is too strict.
      // eslint-disable-next-line flowtype/no-weak-types
      listboxRef.current.contains((event.relatedTarget: any))
    ) {
      return;
    }
    setIsOpen(false);
    setSelectionIndex(-1);
    setTempValue(value);
    if (onBlur) onBlur(event);
  }

  function handleInputChange(event) {
    handleOpen();
    setSelectionIndex(-1);
    onChange(event.target.value, null);
    setTempValue(event.target.value);
  }

  function handleOptionClick(index) {
    let clickedOption = options[index];
    if (clickedOption) {
      const stringified = mapOptionToString(clickedOption);
      setIsOpen(false);
      setSelectionIndex(index);
      onChange(stringified, clickedOption);
      setTempValue(stringified);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [InputContainer, inputContainerProps] = getOverrides(
    overrides.InputContainer,
    StyledInputContainer,
  );
  const [ListBox, listBoxProps] = getOverrides(
    overrides.ListBox,
    StyledListBox,
  );
  const [ListItem, listItemProps] = getOverrides(
    overrides.ListItem,
    StyledListItem,
  );
  const [
    OverriddenInput,
    // $FlowFixMe
    {overrides: inputOverrides = {}, ...restInputProps},
  ] = getOverrides(overrides.Input, Input);
  const [
    OverriddenPopover,
    // $FlowFixMe
    {overrides: popoverOverrides = {}, ...restPopoverProps},
  ] = getOverrides(overrides.Popover, Popover);

  return (
    <Root
      // eslint-disable-next-line flowtype/no-weak-types
      ref={(rootRef: any)}
      {...rootProps}
    >
      <OverriddenPopover
        isOpen={isOpen}
        overrides={popoverOverrides}
        placement={PLACEMENT.bottomLeft}
        content={
          <ListBox
            // TabIndex attribute exists to exclude option clicks from triggering onBlur event actions.
            tabIndex="-1"
            id={listboxId}
            // eslint-disable-next-line flowtype/no-weak-types
            ref={(listboxRef: any)}
            role="listbox"
            $width={listboxWidth}
            {...listBoxProps}
          >
            {options.map((option, index) => {
              const isSelected = selectionIndex === index;
              const ReplacementNode = mapOptionToNode;
              return (
                // List items are not focusable, therefore will never trigger a key event from it.
                // Secondly, key events are handled from the input element.
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <ListItem
                  aria-selected={isSelected}
                  id={isSelected ? activeDescendantId : null}
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  // eslint-disable-next-line flowtype/no-weak-types
                  ref={isSelected ? (selectedOptionRef: any) : null}
                  role="option"
                  $isSelected={isSelected}
                  $size={size}
                  {...listItemProps}
                >
                  {ReplacementNode ? (
                    <ReplacementNode isSelected={isSelected} option={option} />
                  ) : (
                    mapOptionToString(option)
                  )}
                </ListItem>
              );
            })}
          </ListBox>
        }
        {...restPopoverProps}
      >
        <InputContainer
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          // a11y linter implements the older 1.0 spec, suppressing to use updated 1.1
          // https://github.com/A11yance/aria-query/issues/43
          // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/442
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          {...inputContainerProps}
        >
          <OverriddenInput
            inputRef={inputRef}
            aria-activedescendant={
              selectionIndex >= 0 ? activeDescendantId : undefined
            }
            aria-autocomplete="list"
            aria-controls={listboxId}
            disabled={disabled}
            error={error}
            name={name}
            id={id}
            onBlur={handleBlur}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            overrides={inputOverrides}
            positive={positive}
            size={size}
            value={tempValue ? tempValue : value}
            {...restInputProps}
          />
        </InputContainer>
      </OverriddenPopover>
    </Root>
  );
}

export default withOverrides(Combobox, 'Combobox');

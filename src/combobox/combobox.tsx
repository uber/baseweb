/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Input, SIZE } from '../input';
import { scrollItemIntoView } from '../menu/utils';
import { getOverrides } from '../helpers/overrides';
import { Popover, PLACEMENT } from '../popover';
import { useUIDSeed } from 'react-uid';

import {
  StyledRoot,
  StyledInputContainer,
  StyledListBox,
  StyledListItem,
} from './styled-components';
import type { PropsT } from './types';

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
    listBoxLabel,
    mapOptionToNode,
    mapOptionToString,
    id,
    name,
    options,
    overrides = {},
    positive = false,
    inputRef: forwardInputRef,
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

  const seed = useUIDSeed();
  const activeDescendantId = seed('descendant');
  const listboxId = seed('listbox');

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
        selectionIndex === options.length - 1
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
      setSelectionIndex((prev) => {
        let next = prev + 1;
        if (next > options.length - 1) {
          next = -1;
        }
        return next;
      });
    }
    if (event.keyCode === ARROW_UP) {
      event.preventDefault();
      setSelectionIndex((prev) => {
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
          onSubmit({ closeListbox: () => setIsOpen(false), value });
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
      listboxRef.current.contains(event.relatedTarget as any)
    ) {
      return;
    }
    setIsOpen(false);
    setSelectionIndex(-1);
    setTempValue(value);
    if (onBlur) onBlur(event);
  }

  function handleInputClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (!isOpen && options.length) {
      handleOpen();
    }
  }

  function handleInputChange(event) {
    handleOpen();
    setSelectionIndex(-1);
    onChange(event.target.value, null);
    setTempValue(event.target.value);
  }

  function handleInputRef(input) {
    inputRef.current = input;
    if (forwardInputRef) {
      if (typeof forwardInputRef === 'function') {
        forwardInputRef(input);
      } else {
        // @ts-expect-error todo(flow->ts)
        forwardInputRef.current = input;
      }
    }
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
    StyledInputContainer
  );
  const [ListBox, listBoxProps] = getOverrides(overrides.ListBox, StyledListBox);
  const [ListItem, listItemProps] = getOverrides(overrides.ListItem, StyledListItem);
  const [OverriddenInput, { overrides: inputOverrides = {}, ...restInputProps }] = getOverrides(
    overrides.Input,
    Input
  );
  const [OverriddenPopover, { overrides: popoverOverrides = {}, ...restPopoverProps }] =
    getOverrides(overrides.Popover, Popover);

  return (
    <Root ref={rootRef as any} {...rootProps}>
      <OverriddenPopover
        // React-focus-lock used in Popover used to skip non-tabbable elements (`tabIndex=-1`) elements for focus, we had ListBox with tabIndex to disable focus on
        // the ListBox, but we can just disable autoFocus (as ListBox / ListItem should not be focusable) (and input is also not autoFocused).
        // Select Component does the same thing
        autoFocus={false}
        isOpen={isOpen}
        overrides={popoverOverrides}
        placement={PLACEMENT.bottomLeft}
        onClick={handleInputClick}
        content={
          <ListBox
            // TabIndex attribute exists to exclude option clicks from triggering onBlur event actions.
            tabIndex="-1"
            id={listboxId}
            ref={listboxRef as any}
            role="listbox"
            aria-label={listBoxLabel}
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
                  ref={isSelected ? (selectedOptionRef as any) : null}
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
            inputRef={handleInputRef}
            aria-activedescendant={isOpen && selectionIndex >= 0 ? activeDescendantId : undefined}
            aria-autocomplete="list"
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
            {...(isOpen ? { 'aria-controls': listboxId } : {})}
            {...restInputProps}
          />
        </InputContainer>
      </OverriddenPopover>
    </Root>
  );
}

export default Combobox;

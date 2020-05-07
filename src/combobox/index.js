/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Input, SIZE} from '../input/index.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';
import getBuiId from '../utils/get-bui-id.js';

import type {PropsT} from './types.js';

const ENTER = 13;
const ESCAPE = 27;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

function buildStylesForSize(size: $Keys<typeof SIZE>, theme) {
  switch (size) {
    case SIZE.mini:
      return {
        ...theme.typography.ParagraphXSmall,
        height: '30px',
        paddingLeft: theme.sizing.scale200,
      };
    case SIZE.compact:
      return {
        ...theme.typography.ParagraphSmall,
        height: '36px',
        paddingLeft: theme.sizing.scale400,
      };
    case SIZE.large:
      return {
        ...theme.typography.ParagraphLarge,
        height: '56px',
        paddingLeft: theme.sizing.scale650,
      };
    case SIZE.default:
    default:
      return {
        ...theme.typography.ParagraphMedium,
        height: '48px',
        paddingLeft: theme.sizing.scale550,
      };
  }
}

// __Likely overrides__
// Root
// InputContainer
// Input
// Popover
// ListBox
// ListItem

// aria 1.1 spec: https://www.w3.org/TR/wai-aria-practices/#combobox
// aria 1.2 spec: https://www.w3.org/TR/wai-aria-practices-1.2/#combobox
export function Combobox<OptionT>(props: PropsT<OptionT>) {
  const {
    disabled = false,
    onChange,
    options,
    mapOptionToNode,
    mapOptionToString,
    size = SIZE.default,
    value,
  } = props;

  const [css, theme] = useStyletron();
  const [selectionIndex, setSelectionIndex] = React.useState(-1);
  const [tempValue, setTempValue] = React.useState(value);
  const [isOpen, setIsOpen] = React.useState(false);

  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const selectedOptionRef = React.useRef(null);

  const activeDescendantId = React.useMemo(() => getBuiId(), []);
  const listboxId = React.useMemo(() => getBuiId(), []);

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
      // NOTE(chase): May want to consider adding an option to _not_ autocomplete the
      // temporary value in the input element. If a feature request comes up, this is
      // where it would go.
      let selectedOption = options[selectionIndex];
      if (selectedOption) {
        setTempValue(mapOptionToString(selectedOption));
      }
    }
  }, [options, selectionIndex]);

  React.useEffect(() => {
    if (isOpen && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({block: 'nearest'});
    }
  }, [isOpen, selectedOptionRef.current]);

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
      setIsOpen(false);
      setSelectionIndex(-1);
      onChange(tempValue);
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

  function handleBlur(event) {
    if (
      rootRef.current &&
      event.relatedTarget &&
      // NOTE(chase): Contains method expects a Node type, but relatedTarget is
      // EventTarget which is a super type of Node. Passing an EventTarget seems
      // to work fine, assuming the flow type is too strict.
      // eslint-disable-next-line flowtype/no-weak-types
      rootRef.current.contains((event.relatedTarget: any))
    ) {
      return;
    }

    setIsOpen(false);
    setSelectionIndex(-1);
    setTempValue(value);
  }

  function handleInputChange(event) {
    handleOpen();
    setSelectionIndex(-1);
    onChange(event.target.value);
    setTempValue(event.target.value);
  }

  function handleOptionClick(index) {
    let clickedOption = options[index];
    if (clickedOption) {
      const stringified = mapOptionToString(clickedOption);
      setIsOpen(false);
      setSelectionIndex(index);
      onChange(stringified);
      setTempValue(stringified);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }

  return (
    <div ref={rootRef}>
      <Popover
        isOpen={isOpen}
        placement={PLACEMENT.bottomLeft}
        mountNode={rootRef.current ? rootRef.current : undefined}
        content={
          <ul
            className={css({
              backgroundColor: theme.colors.backgroundPrimary,
              marginBlockStart: 'unset',
              marginBlockEnd: 'unset',
              maxHeight: '480px',
              overflowY: 'auto',
              outline: 'none',
              paddingInlineStart: 'unset',
              width: listboxWidth,
            })}
            // TabIndex attribute exists to exclude option clicks from triggering onBlur event actions.
            tabIndex="-1"
            id={listboxId}
            role="listbox"
          >
            {options.map((option, index) => {
              const isSelected = selectionIndex === index;
              const ReplacementNode = mapOptionToNode;
              return (
                // List items are not focusable, therefore will never trigger a key event from it.
                // Secondly, key events are handled from the input element.
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                  aria-selected={isSelected}
                  className={css({
                    ...buildStylesForSize(size, theme),
                    alignItems: 'center',
                    backgroundColor: isSelected
                      ? theme.colors.comboboxListItemFocus
                      : null,
                    cursor: 'default',
                    display: 'flex',
                    listStyle: 'none',
                    ':hover': {
                      backgroundColor: isSelected
                        ? null
                        : theme.colors.comboboxListItemHover,
                    },
                  })}
                  id={isSelected ? activeDescendantId : null}
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  ref={isSelected ? selectedOptionRef : null}
                  role="option"
                >
                  {ReplacementNode ? (
                    <ReplacementNode isSelected={isSelected} option={option} />
                  ) : (
                    mapOptionToString(option)
                  )}
                </li>
              );
            })}
          </ul>
        }
      >
        <div
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          // a11y linter implements the older 1.0 spec, supressing to use updated 1.1
          // https://github.com/A11yance/aria-query/issues/43
          // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/442
          // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
        >
          <Input
            inputRef={inputRef}
            // TODO(chase): move aria labels to overrides, or consider adding props
            // to input component.
            aria-activedescendant={
              selectionIndex >= 0 ? activeDescendantId : null
            }
            aria-autocomplete="list"
            aria-controls={listboxId}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            size={size}
            value={tempValue ? tempValue : value}
          />
        </div>
      </Popover>
    </div>
  );
}

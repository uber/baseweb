// @flow

import * as React from 'react';
import {useStyletron} from '../styles/index.js';

import type {PropsT} from './types.js';

const ENTER = 13;
const ESCAPE = 27;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

export function Combobox<OptionT>(props: PropsT<OptionT>) {
  const [css, theme] = useStyletron();
  const {onChange, options, mapOptionToNode, mapOptionToString, value} = props;
  const [selectionIndex, setSelectionIndex] = React.useState(-1);
  const [tempValue, setTempValue] = React.useState(value);
  const [isOpen, setIsOpen] = React.useState(false);

  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);

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
      let selectedOption = options[selectionIndex];
      if (selectedOption) {
        setTempValue(mapOptionToString(selectedOption));
      }
    }
  }, [options, selectionIndex]);

  function handleKeyDown(event) {
    if (event.keyCode === ARROW_DOWN) {
      event.preventDefault();
      setIsOpen(true);
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
      setIsOpen(false);
      setSelectionIndex(-1);
      setTempValue(value);
    }
  }

  function handleBlur(event) {
    if (rootRef.current.contains(event.relatedTarget)) {
      return;
    }

    setIsOpen(false);
    setSelectionIndex(-1);
    setTempValue(value);
  }

  function handleInputChange(event) {
    setIsOpen(true);
    onChange(event.target.value);
    setSelectionIndex(-1);
    setTempValue(event.target.value);
  }

  function handleOptionClick(index) {
    let clickedOption = options[index];
    if (clickedOption) {
      const stringified = mapOptionToString(clickedOption);
      setSelectionIndex(index);
      setTempValue(stringified);
      onChange(stringified);
      setIsOpen(false);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }

  return (
    <div ref={rootRef} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <div
        // aria-owns="REFERENCE_TO_LISTBOX_ID"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="combobox"
      >
        <input
          ref={inputRef}
          // aria-activedescendant="REFERENCE_TO_OPTION_ID"
          aria-autocomplete="list"
          // aria-controls="REFERENCE_TO_LISTBOX_ID"
          onChange={handleInputChange}
          value={tempValue ? tempValue : value}
        />
      </div>

      {isOpen && (
        <ul
          className={css({outline: 'none'})}
          tabIndex="-1"
          // id="UNIQUE_ID_VALUE"
          role="listbox"
        >
          {options.map((option, index) => {
            const isSelected = selectionIndex === index;
            const ReplacementNode = mapOptionToNode;
            return (
              <li
                aria-selected={isSelected}
                // id="UNIQUE_ID_VALUE"
                className={css({
                  backgroundColor: isSelected ? theme.colors.accent : null,
                  cursor: 'default',
                  listStyle: 'none',
                  ':hover': {
                    backgroundColor: isSelected ? null : theme.colors.warning,
                  },
                })}
                key={index}
                onClick={() => handleOptionClick(index)}
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
      )}
    </div>
  );
}

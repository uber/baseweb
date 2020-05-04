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
  const {onChange, options, mapOptionToString, value} = props;
  const [selectionIndex, setSelectionIndex] = React.useState(-1);
  const [tempValue, setTempValue] = React.useState('');

  // Value changes should clear transient state. This takes care of how
  // typing into the input element will clear keyboard selection.
  React.useEffect(() => {
    setSelectionIndex(-1);
    setTempValue(value);
  }, [value]);

  // Changing the 'selected' option temporarily updates the visible text string
  // in the input element until the user clicks an option or presses enter.
  React.useEffect(() => {
    // If no option selected, display the most recently user-edited string.
    if (selectionIndex === -1) {
      setTempValue(value);
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
      // TODO(chase): handle opening the dropdown
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
      // TODO(chase): handle closing the dropdown
      onChange(tempValue);
    }
    if (event.keyCode === ESCAPE) {
      // TODO(chase): handle closing the dropdown
      setSelectionIndex(-1);
      setTempValue(value);
    }
  }

  function handleBlur() {
    // TODO(chase): handle closing the dropdown
    setSelectionIndex(-1);
    setTempValue(value);
  }

  function handleOptionClick(index) {
    let clickedOption = options[index];
    if (clickedOption) {
      onChange(mapOptionToString(clickedOption));
    }
  }

  // TODO(chase): include aria-activedescendant attributes
  return (
    <div onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <input
        onChange={event => onChange(event.target.value)}
        value={tempValue ? tempValue : value}
      />
      <ul>
        {options.map((option, index) => {
          const isSelected = selectionIndex === index;
          return (
            <li
              className={css({
                backgroundColor: isSelected ? theme.colors.accent : null,
                cursor: 'default',
                ':hover': {
                  backgroundColor: isSelected ? null : theme.colors.warning,
                },
              })}
              key={index}
              onClick={() => handleOptionClick(index)}
            >
              {/* TODO(chase): implement custom mapOptionToNode renderer */}
              {mapOptionToString(option)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

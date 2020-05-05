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
      setSelectionIndex(-1);
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

  function handleInputChange(event) {
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
    }
  }

  // TODO(chase): include aria-activedescendant attributes
  return (
    <div onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <input
        onChange={handleInputChange}
        value={tempValue ? tempValue : value}
      />
      <ul>
        {options.map((option, index) => {
          const isSelected = selectionIndex === index;
          const ReplacementNode = mapOptionToNode;
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
              {ReplacementNode ? (
                <ReplacementNode isSelected={isSelected} option={option} />
              ) : (
                mapOptionToString(option)
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

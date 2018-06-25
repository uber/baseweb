// @flow
/* eslint-disable import/prefer-default-export */

export const STATE_CHANGE_TYPES = {
  keyPressArrowUp: 'keyPressArrowUp',
  keyPressArrowDown: 'keyPressArrowDown',
};

// Dict of props to prepend $ to pass thru to styletron
export const STYLETRON_PROP_MAPPER = {
  ref: true,
  isHighlighted: true,
};

export const KEY_STRINGS = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Enter: 'Enter',
};

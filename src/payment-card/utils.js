/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import valid from 'card-validator';

export const addGaps = (gaps: number[], value: string) =>
  gaps.reduce(
    (prev, gap, index) =>
      `${prev.slice(0, gap + index)} ${prev.slice(gap + index)}`.trim(),
    `${value}`,
  );

export const sanitizeNumber = (input: string) => {
  const number = input.replace(/[^0-9]/gi, '');
  const validatedValue = valid.number(number);
  if (validatedValue.card && Array.isArray(validatedValue.card.lengths)) {
    return number.slice(
      0,
      validatedValue.card.lengths[validatedValue.card.lengths.length - 1],
    );
  }
  // CC number NEVER can have more than 19 digits
  return number.slice(0, 19);
};

export const getCaretPosition = (
  value: string,
  prevValue: string,
  position: number,
) => {
  const cleanValue = sanitizeNumber(value);
  const validatedValue = valid.number(cleanValue);

  // skipping over a gap
  if (validatedValue.card && Array.isArray(validatedValue.card.gaps)) {
    const gaps = validatedValue.card.gaps;
    const valueWithGaps = addGaps(gaps, cleanValue);
    if (
      cleanValue.length > prevValue.length &&
      valueWithGaps[position - 1] === ' '
    ) {
      return [position + 1, cleanValue];
    }
  }

  // deleting a gap
  const prevValidatedValue = valid.number(prevValue);
  if (prevValidatedValue.card && Array.isArray(prevValidatedValue.card.gaps)) {
    const gaps = prevValidatedValue.card.gaps;
    const valueWithGaps = addGaps(gaps, prevValue);
    if (prevValue === cleanValue && valueWithGaps.length > value.length) {
      const newValue =
        valueWithGaps.slice(0, position - 1) + valueWithGaps.slice(position);
      return [position - 1, sanitizeNumber(newValue)];
    }
  }

  // change without crossing a gap
  return [position, cleanValue];
};

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { ChangeEvent } from 'react';
import type { Align, LabelPlacement } from './types';

export type RadioGroupContextValue = {
  // Registration (required - needed for auto-indexing)
  // Register with the group to get a unique index for this radio.
  // Each radio needs its own index so the RadioGroup can track which radio triggered
  // events (focus, blur, keyboard navigation). The index is used to identify the source
  // of events when communicating with the parent RadioGroup.
  // Also tabIndex may need this information if no radio is selected in the group. (First radio gets tabIndex 0)
  registerRadio: () => number;

  // Shared props (optional - have sensible defaults)
  name?: string;
  selectedValue?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: boolean;
  required?: boolean;
  align?: Align;
  labelPlacement?: LabelPlacement;

  // Focus state (optional)
  focusedIndex?: number;
  isFocusVisible?: boolean;

  // Callbacks (optional)
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onMouseEnter?: (e: ChangeEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
};

export const RadioGroupContext =
  React.createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}

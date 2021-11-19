/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import type { OverrideT } from '../helpers/overrides';
import { SIZE } from '../input';

import type { ChangeEvent } from 'react';

export type PropsT<OptionT = unknown> = {
  // Controls if the input value will be updated while keyboard navigating. Defaults to true.
  autocomplete?: boolean;
  // Disallows text input and listbox opening.
  disabled?: boolean;
  // Proxies value through to Input component.
  error?: boolean;
  // Label used for the listbox/popup with options
  listBoxLabel?: string;
  // Used to render a custom node besides the default.
  mapOptionToNode?: React.ComponentType<{
    isSelected: boolean;
    option: OptionT;
  }>;
  // Options are often fetched from remote server, provides a simple way to
  // map whatever value the client gets into a visible string in the list item.
  mapOptionToString: (a: OptionT) => string;
  id?: string;
  name?: string;
  // A ref to access the inner Input component.
  // todo(flow->ts)  <any>
  inputRef?: React.Ref<HTMLElement>;
  // Called when input loses focus.
  onBlur?: (a: ChangeEvent<HTMLInputElement>) => unknown;
  // Called when input value changes or option is selected. If user selects a
  // suggested option, that option will be provided as the second function parameter.
  // Otherwise the second parameter will be null.
  // TODO(v11): consider consolidating function params into a single object bag.
  onChange: (b: string, a: OptionT | null) => unknown;
  // Called when input enters focus.
  onFocus?: (a: ChangeEvent<HTMLInputElement>) => unknown;
  // Called when no option is selected and the enter key is pressed. An argument to this
  // function is another function to close the listbox if needed.
  onSubmit?: (a: { closeListbox: () => void; value: string }) => unknown;
  // Data to populate list items in the dropdown menu.
  options: OptionT[];
  overrides?: {
    Root?: OverrideT;
    InputContainer?: OverrideT;
    Input?: OverrideT;
    Popover?: OverrideT;
    ListBox?: OverrideT;
    ListItem?: OverrideT;
  };
  // Proxies value through to Input component.
  positive?: boolean;
  // Configures the height of input and list item elements.
  size?: keyof typeof SIZE;
  // Initial text provided to the input element.
  value: string;
};

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import {SIZE} from '../input/index.js';

export type PropsT<OptionT = mixed> = {|
  // Controls if the input value will be updated while keyboard navigating. Defaults to true.
  autocomplete?: boolean,
  // Disallows text input and listbox opening.
  disabled?: boolean,
  // Proxies value through to Input component.
  error?: boolean,
  // Used to render a custom node besides the default.
  mapOptionToNode?: React.AbstractComponent<{|
    isSelected: boolean,
    option: OptionT,
  |}>,
  // Options are often fetched from remote server, provides a simple way to
  // map whatever value the client gets into a visible string in the list item.
  mapOptionToString: OptionT => string,
  id?: string,
  name?: string,
  // A ref to access the inner Input component.
  inputRef?: React.ElementRef<*>,
  // Called when input loses focus.
  onBlur?: (SyntheticInputEvent<HTMLInputElement>) => mixed,
  // Called when input value changes or option is selected. If user selects a
  // suggested option, that option will be provided as the second function parameter.
  // Otherwise the second parameter will be null.
  // TODO(v11): consider consolidating function params into a single object bag.
  onChange: (string, OptionT | null) => mixed,
  // Called when input enters focus.
  onFocus?: (SyntheticInputEvent<HTMLInputElement>) => mixed,
  // Called when no option is selected and the enter key is pressed. An argument to this
  // function is another function to close the listbox if needed.
  onSubmit?: ({closeListbox: () => void, value: string}) => mixed,
  // Data to populate list items in the dropdown menu.
  options: OptionT[],
  overrides?: {|
    Root?: OverrideT,
    InputContainer?: OverrideT,
    Input?: OverrideT,
    Popover?: OverrideT,
    ListBox?: OverrideT,
    ListItem?: OverrideT,
  |},
  // Proxies value through to Input component.
  positive?: boolean,
  // Configures the height of input and list item elements.
  size?: $Keys<typeof SIZE>,
  // Initial text provided to the input element.
  value: string,
|};

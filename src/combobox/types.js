/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {SIZE} from '../input/index.js';

export type PropsT<OptionT = mixed> = {|
  disabled?: boolean,
  // Used to render a custom node besides the default.
  mapOptionToNode?: React.AbstractComponent<{|
    isSelected: boolean,
    option: OptionT,
  |}>,
  // Options are often fetched from remote server, provides a simple way to
  // map whatever value the client gets into a visible string in the list item.
  mapOptionToString: OptionT => string,
  // Called when input value changes or option is selected.
  onChange: string => mixed,
  // Data to populate list items in the dropdown menu.
  options: OptionT[],
  // Configures the height of input and list item elements.
  size?: $Keys<typeof SIZE>,
  // Initial text provided to the input element.
  value: string,
|};

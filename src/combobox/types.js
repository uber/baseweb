// @flow

import * as React from 'react';

export type PropsT<OptionT = mixed> = {|
  // Used to render a custom node besides the default.
  mapOptionToNode?: React.AbstractComponent<{
    isSelected: boolean,
    option: OptionT,
  }>,
  // Options are often fetched from remote server, provides a simple way to
  // map whatever value the client gets into a visible string in the list item.
  mapOptionToString: OptionT => string,
  // Called when input value changes or option is selected.
  onChange: string => mixed,
  // Data to populate list items in the dropdown menu.
  options: OptionT[],
  // Initial text provided to the input element.
  value: string,
|};

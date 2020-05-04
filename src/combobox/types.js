// @flow

import * as React from 'react';

export type PropsT<OptionT = mixed> = {|
  // Used to render a custom node besides the default.
  mapOptionToNode?: React.AbstractComponent<{
    option: OptionT,
    isMouseHighlighted: boolean,
    isKeyboardHighlighted: boolean,
  }>,
  // Options are often fetched from remote server, provides a simple way to
  // map whatever value the client gets into a visible string in the list item.
  mapOptionToString: OptionT => string,
  // Called when input value changes.
  onChange: string => mixed,
  // Data to populate items in the dropdown menu.
  options: OptionT[],
  // Test in the input box.
  value: string,
|};

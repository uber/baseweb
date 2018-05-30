// @flow
import * as React from 'react';
import createReactContext from 'create-react-context';
import LIGHT_THEME from '../themes/light-theme';

import type {ThemeT} from './types';

export const ThemeContext = createReactContext(LIGHT_THEME);

const ThemeProvider = (props: {theme: ThemeT, children: ?React.Node}) => {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

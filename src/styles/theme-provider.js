// @flow
import * as React from 'react';
import LIGHT_THEME from '../themes/light-theme';

import type {ThemeT} from './types';

export const ThemeContext = React.createContext(LIGHT_THEME);

const ThemeProvider = (props: {theme: ThemeT, children: ?React.Node<any>}) => {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

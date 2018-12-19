import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, ThemeProvider} from '../../src';
// import {Card, StyledTitle} from '../../src/card';

import getStyletron from '../helpers/styletron';

export default function Hello() {
  return (
    <StyletronProvider value={getStyletron()}>
      <ThemeProvider theme={LightTheme}>Alma</ThemeProvider>
    </StyletronProvider>
  );
}

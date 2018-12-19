import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, ThemeProvider} from 'baseui';
import {Card, StyledTitle, StyledBody} from 'baseui/card';

import getStyletron from '../helpers/styletron';

export default function Hello() {
  return (
    <StyletronProvider value={getStyletron()}>
      <ThemeProvider theme={LightTheme}>
        <Card>
          <StyledTitle>Hello from Base UI</StyledTitle>
          <StyledBody>Lorem ipsum...</StyledBody>
        </Card>
      </ThemeProvider>
    </StyletronProvider>
  );
}

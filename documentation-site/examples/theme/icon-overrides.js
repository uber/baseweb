// @flow
import * as React from 'react';
import {StatefulPagination} from 'baseui/pagination';

import {createTheme, lightThemePrimitives} from 'baseui';
import {ThemeProvider} from 'baseui';
import ArrowLeft from 'baseui/icon/arrow-left';

const themeWithIcons = createTheme(
  {
    ...lightThemePrimitives,
  },
  {
    icons: {
      ChevronLeft: ArrowLeft,
    },
  },
);

export default function Example() {
  return (
    <ThemeProvider theme={themeWithIcons}>
      <StatefulPagination numPages={10} />
    </ThemeProvider>
  );
}

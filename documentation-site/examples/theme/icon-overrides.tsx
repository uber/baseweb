import * as React from 'react';
import {StatefulPagination} from 'spaceweb/pagination';

import {createTheme, lightThemePrimitives} from 'spaceweb';
import {ThemeProvider} from 'spaceweb';
import {ArrowLeft} from 'spaceweb/icon';

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

export default () => (
  <ThemeProvider theme={themeWithIcons}>
    <StatefulPagination numPages={10} />
  </ThemeProvider>
);

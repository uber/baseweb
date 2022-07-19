import * as React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-monolithic';
import { LightTheme, DarkTheme } from '../src/themes/index.js';
import BaseProvider from '../src/helpers/base-provider.js';

const engine = new Styletron();

export const Provider: React.FC<{
  globalState: {
    theme: string;
    rtl: string;
  };
}> = ({ children, globalState }) => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider
        theme={{
          ...(globalState.theme === 'dark' ? DarkTheme : LightTheme),
          direction: globalState.rtl ? 'rtl' : 'ltr',
        }}
      >
        {children}
      </BaseProvider>
    </StyletronProvider>
  );
};

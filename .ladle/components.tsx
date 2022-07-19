import * as React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { LightTheme, DarkTheme } from '../src/themes/index.js';
import BaseProvider from '../src/helpers/base-provider.js';

let prevWidth = 0;

// finds the closest document.head (one in iframe or top-level)
const getDocument = (story: string) => {
  const iframe = document.querySelector(`[title='Story ${story}']`) as HTMLIFrameElement;
  return iframe && iframe.contentDocument ? iframe.contentDocument : document;
};

export const Provider: React.FC<{
  globalState: {
    theme: string;
    rtl: string;
    story: string;
    width: number;
  };
}> = ({ children, globalState }) => {
  const [engine, setEngine] = React.useState(
    new Styletron({ container: getDocument(globalState.story).head })
  );

  React.useEffect(() => {
    // change engine target container when adding/removing iframe
    if ((prevWidth > 0 && globalState.width === 0) || (prevWidth === 0 && globalState.width > 0)) {
      const targetHead = getDocument(globalState.story).head;
      // clear out previously created styles first to prevent any naming clashes
      [...targetHead.children].forEach((child) => {
        if (child.tagName === 'STYLE' && child.innerHTML === '') {
          child.remove();
        }
      });
      setEngine(new Styletron({ container: getDocument(globalState.story).head }));
    }
    prevWidth = globalState.width;
  }, [globalState.width]);

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

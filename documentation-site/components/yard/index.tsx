import * as React from 'react';
import {Card} from 'baseui/card';
import {Button} from 'baseui/button';
import {Paragraph2} from 'baseui/typography';
import getConfig from 'next/config';
import {TYardProps} from './types';
import {useStyletron} from 'baseui';

const {publicRuntimeConfig} = getConfig();

import {Spinner} from 'baseui/spinner';

const isBrowser = typeof window !== 'undefined';

const Yard = React.lazy(() => import('./yard'));

type TYardWrapperProps = TYardProps & {
  defaultHeight: number;
};

const YardWrapper: React.FC<TYardWrapperProps> = ({
  componentName,
  scopeConfig,
  propsConfig,
  themeConfig,
  defaultHeight,
}) => {
  const [useCss] = useStyletron();
  const [loadYard, setLoadYard] = React.useState(
    process.env.NODE_ENV !== 'development' ||
      publicRuntimeConfig.loadYard === 'true',
  );

  const loadingCx = useCss({
    height: `${defaultHeight + 16}px`,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  });

  return (
    <Card>
      {!isBrowser ? (
        <div className={loadingCx} />
      ) : (
        <React.Suspense
          fallback={
            <div className={loadingCx}>
              <Spinner />
            </div>
          }
        >
          {loadYard ? (
            <Yard
              componentName={componentName}
              scopeConfig={scopeConfig}
              propsConfig={propsConfig}
              themeConfig={themeConfig}
            />
          ) : (
            <div className={loadingCx}>
              <Button onClick={() => setLoadYard(true)}>Load Yard</Button>
              <Paragraph2>
                Yard is not automatically loaded in the dev mode to speed up
                HMR. Click the button or use{' '}
                <b>
                  <code>LOAD_YARD="true"</code>
                </b>{' '}
                env flag.
              </Paragraph2>
            </div>
          )}
        </React.Suspense>
      )}
    </Card>
  );
};

export default YardWrapper;

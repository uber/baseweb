import * as React from 'react';
import {Card, StyledBody} from 'baseui/card';
import {Button} from 'baseui/button';
import {Paragraph2} from 'baseui/typography';
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

import {Spinner} from 'baseui/spinner';

const isBrowser = typeof window !== 'undefined';

const Yard = React.lazy(() => import('./yard'));

type YardMainProps = {
  componentName: 'Button' | 'Input';
  defaultHeight: number;
};

const LoadingScreen: React.FC<{
  defaultHeight: number;
  showSpinner: boolean;
}> = ({defaultHeight, showSpinner}) => (
  <StyledBody
    $style={{
      height: `${defaultHeight + 16}px`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {showSpinner && <Spinner />}
  </StyledBody>
);

const YardMain: React.FC<YardMainProps> = ({componentName, defaultHeight}) => {
  const [loadYard, setLoadYard] = React.useState(
    process.env.NODE_ENV !== 'development' ||
      publicRuntimeConfig.loadYard === 'true',
  );
  return (
    <Card>
      {!isBrowser ? (
        <LoadingScreen
          defaultHeight={defaultHeight}
          key="loading"
          showSpinner={false}
        />
      ) : (
        <React.Suspense
          fallback={
            <LoadingScreen
              defaultHeight={defaultHeight}
              key="loading"
              showSpinner
            />
          }
        >
          {loadYard ? (
            <StyledBody>
              <Yard componentName={componentName} />
            </StyledBody>
          ) : (
            <StyledBody
              $style={{
                height: `${defaultHeight + 16}px`,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <Button onClick={() => setLoadYard(true)}>Load Yard</Button>
              <Paragraph2>
                Yard is not automatically loaded in the dev mode to speed up
                HMR. Click the button or use{' '}
                <b>
                  <code>LOAD_YARD="true"</code>
                </b>{' '}
                env flag.
              </Paragraph2>
            </StyledBody>
          )}
        </React.Suspense>
      )}
    </Card>
  );
};

export default YardMain;

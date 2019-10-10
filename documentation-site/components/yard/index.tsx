import * as React from 'react';
import {Card} from 'baseui/card';
import {Spinner} from 'baseui/spinner';
import {TYardProps} from './types';
import Yard from './yard';
import {withRouter} from 'next/router';
import {useStyletron} from 'baseui';

const YardWrapper: React.FC<
  TYardProps & {placeholderHeight: number; router: any}
> = ({router, placeholderHeight, ...restProps}) => {
  const [useCss] = useStyletron();
  const placeholderCx = useCss({
    height: `${placeholderHeight}px`,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <Card>
      <Yard
        minHeight={placeholderHeight}
        pathname={router.pathname}
        urlCode={router.query.code}
        placeholderElement={() => {
          if (!placeholderHeight) return null;

          return (
            <div className={placeholderCx}>
              <Spinner size={placeholderHeight > 50 ? 50 : placeholderHeight} />
            </div>
          );
        }}
        {...restProps}
      />
    </Card>
  );
};

export default withRouter(YardWrapper);

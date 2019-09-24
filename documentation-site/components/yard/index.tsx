import * as React from 'react';
import {Card} from 'baseui/card';
import {Spinner} from 'baseui/spinner';
import {TYardProps} from './types';
import Yard from './yard';
import {useStyletron} from 'baseui';

const YardWrapper: React.FC<TYardProps & {placeholderHeight: number}> = ({
  componentName,
  scopeConfig,
  propsConfig,
  themeConfig,
  placeholderHeight,
}) => {
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
        componentName={componentName}
        scopeConfig={scopeConfig}
        propsConfig={propsConfig}
        themeConfig={themeConfig}
        minHeight={placeholderHeight}
        placeholderElement={() => (
          <div className={placeholderCx}>
            <Spinner size={placeholderHeight > 50 ? 50 : placeholderHeight} />
          </div>
        )}
      />
    </Card>
  );
};

export default YardWrapper;

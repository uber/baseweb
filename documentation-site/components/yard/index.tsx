import * as React from 'react';
import {Card} from 'baseui/card';
import {TYardProps} from './types';
import Yard from './yard';

const YardWrapper: React.FC<TYardProps> = ({
  componentName,
  scopeConfig,
  propsConfig,
  themeConfig,
}) => {
  return (
    <Card>
      <Yard
        componentName={componentName}
        scopeConfig={scopeConfig}
        propsConfig={propsConfig}
        themeConfig={themeConfig}
      />
    </Card>
  );
};

export default YardWrapper;

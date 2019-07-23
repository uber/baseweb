import * as React from 'react';
import {Block} from 'baseui/block';
import {StatefulCheckbox} from 'baseui/checkbox';
import {Alert} from 'baseui/icon';

export default () => (
  <StatefulCheckbox
    onChange={console.log}
    overrides={{
      Checkmark: props => (
        <Block
          color={props.checked ? 'primary' : 'mono700'}
          marginTop="3px"
          marginRight="3px"
        >
          <Alert />
        </Block>
      ),
    }}
  >
    With style overrides
  </StatefulCheckbox>
);

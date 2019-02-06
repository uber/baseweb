import React from 'react';
import {Block} from 'baseui/block';
import {StatefulCheckbox} from 'baseui/checkbox';
import Alert from 'baseui/icon/alert';

const CustomCheckmark = props => (
  <Block
    color={props.checked ? 'primary' : 'mono700'}
    marginTop="3px"
    marginRight="3px"
  >
    <Alert />
  </Block>
);

export default () => (
  <StatefulCheckbox
    onChange={console.log}
    overrides={{Checkmark: CustomCheckmark}}
  >
    With style overrides
  </StatefulCheckbox>
);

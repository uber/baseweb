import * as React from 'react';
import {Checkbox} from 'spaceweb/checkbox';

export default () => (
  <React.Fragment>
    <Checkbox disabled>Disabled checkbox</Checkbox>
    <Checkbox disabled checked>
      Disabled checkbox (checked)
    </Checkbox>
  </React.Fragment>
);

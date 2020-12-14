import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';

export default function Example() {
  return (
    <React.Fragment>
      <Checkbox disabled>Disabled checkbox</Checkbox>
      <Checkbox disabled checked>
        Disabled checkbox (checked)
      </Checkbox>
    </React.Fragment>
  );
}

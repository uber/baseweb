import * as React from 'react';
import {StatefulTextarea as Textarea} from 'baseui/textarea';
import {SIZE} from 'baseui/input';

export default () => (
  <React.Fragment>
    <Textarea size={SIZE.compact} placeholder="Compact textarea" />
    <br />
    <Textarea
      initialState={{value: 'uber'}}
      placeholder="Default textarea"
    />
    <br />
    <Textarea
      size={SIZE.large}
      positive
      placeholder="Large textarea"
    />
    <br />
    <Textarea error={true} placeholder="Placeholder" />
    <br />
    <Textarea disabled placeholder="Disabled textarea" />
  </React.Fragment>
);

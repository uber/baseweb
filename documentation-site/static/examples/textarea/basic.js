import * as React from 'react';
import {StatefulTextarea as Textarea, SIZE} from 'baseui/textarea';

export default () => (
  <React.Fragment>
    <Textarea size={SIZE.compact} placeholder="Placeholder" />
    <br />
    <Textarea
      initialState={{value: 'uber'}}
      size={SIZE.compact}
      placeholder="Placeholder"
    />
    <br />
    <Textarea size={SIZE.compact} error={true} placeholder="Placeholder" />
    <br />
    <Textarea size={SIZE.compact} disabled placeholder="Disabled textarea" />
  </React.Fragment>
);

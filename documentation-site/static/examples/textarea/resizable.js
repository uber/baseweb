import * as React from 'react';
import {StatefulTextarea as Textarea} from 'baseui/textarea';

export default () => (
  <Textarea
    placeholder="Resizable > 100px & < 300px"
    overrides={{
      Input: {
        style: {
          maxHeight: '300px',
          minHeight: '100px',
          resize: 'both',
        },
      },
    }}
  />
);

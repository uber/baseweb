// @flow
import * as React from 'react';
import {StatefulTextarea as Textarea} from 'baseui/textarea';

export default () => (
  <Textarea
    placeholder="Resizable: 100px<height<300px 300px<width<100%"
    overrides={{
      Input: {
        style: {
          maxHeight: '300px',
          minHeight: '100px',
          minWidth: '300px',
          width: '100vw', //fill all available space up to parent max-width
          resize: 'both',
        },
      },
      InputContainer: {
        style: {
          maxWidth: '100%',
          width: 'min-content',
        },
      },
    }}
  />
);

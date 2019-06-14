import * as React from 'react';
import {AspectRatioBox} from 'baseui/aspect-ratio-box';

const props = {
  overrides: {
    Root: {
      style: {
        border: 'grey solid 2px',
      },
    },
    Body: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
};

export default () => (
  <React.Fragment>
    <AspectRatioBox {...props}>Square by default</AspectRatioBox>
    <AspectRatioBox {...props} aspectRatio={16 / 9}>
      16:9 ratio
    </AspectRatioBox>
  </React.Fragment>
);

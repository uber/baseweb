import * as React from 'react';
import {AspectRatioBox, StyledBody} from 'baseui/aspect-ratio-box';

const ImageBodyComponent = () => (
  <StyledBody
    $as="img"
    src="https://api.adorable.io/avatars/285/11@adorable.io.png"
  />
);

const props = {
  overrides: {
    Root: {
      style: ({$theme}) => ({
        width: $theme.sizing.scale1400,
      }),
    },
    Body: {
      component: ImageBodyComponent,
    },
  },
};

export default () => <AspectRatioBox {...props} />;

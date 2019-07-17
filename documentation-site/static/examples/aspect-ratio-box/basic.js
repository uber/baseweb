// @flow
import * as React from 'react';
import {
  AspectRatioBox,
  AspectRatioBoxBody,
} from 'baseui/aspect-ratio-box';

const bodyProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overrides: {
    Block: {
      style: {
        border: 'grey solid 2px',
      },
    },
  },
};

export default () => (
  <React.Fragment>
    <AspectRatioBox>
      <AspectRatioBoxBody {...bodyProps}>
        Square by default
      </AspectRatioBoxBody>
    </AspectRatioBox>
    <AspectRatioBox aspectRatio={16 / 9}>
      <AspectRatioBoxBody {...bodyProps}>
        16:9 aspect ratio
      </AspectRatioBoxBody>
    </AspectRatioBox>
  </React.Fragment>
);
